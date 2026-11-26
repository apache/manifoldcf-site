// Licensed to the Apache Software Foundation (ASF) under one or more
// contributor license agreements.  See the NOTICE file distributed with
// this work for additional information regarding copyright ownership.
// The ASF licenses this file to You under the Apache License, Version 2.0
// (the "License"); you may not use this file except in compliance with
// the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// 1. Conditionally load popover polyfill ONLY when native support is missing
if (!Object.hasOwn(HTMLElement.prototype, 'popover')) {
  import('@oddbird/popover-polyfill');
}

// 2. Responsive Navbar: collapse to popover only when the inline row doesn't fit
function initNavbar(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  const inner = header?.querySelector<HTMLElement>('.header-inner');
  const menu = header?.querySelector<HTMLElement>('#site-menu');
  if (!header || !inner || !menu) return;

  let lastMeasuredWidth = 0;

  const updateLayout = (force = false): void => {
    const headerWidth = header.clientWidth;
    const isCurrentlyWide = header.classList.contains('is-wide');

    if (!force && !isCurrentlyWide && headerWidth <= lastMeasuredWidth) {
      return;
    }

    const wasOpen =
      !isCurrentlyWide &&
      (menu.matches(':popover-open') || menu.classList.contains(':popover-open'));

    header.classList.add('is-measuring', 'is-wide');
    menu.removeAttribute('popover');

    const fits = inner.scrollWidth <= inner.clientWidth + 1;
    lastMeasuredWidth = headerWidth;

    if (!fits) {
      header.classList.remove('is-wide');
      menu.setAttribute('popover', 'auto');
      if (wasOpen && typeof menu.showPopover === 'function') {
        try {
          menu.showPopover();
        } catch {
          // Ignore if popover cannot be re-opened during transition
        }
      }
    }

    requestAnimationFrame(() => {
      header.classList.remove('is-measuring');
    });
  };

  updateLayout(true);

  const observer = new ResizeObserver(() => updateLayout(false));
  observer.observe(header);
  observer.observe(menu);

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => updateLayout(true));
  }
}

// 3. Two-state Theme Toggle (System default vs opposite literal override)
function initThemeToggle(): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  const toggleBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!meta || !toggleBtn) return;

  const mq = window.matchMedia('(prefers-color-scheme: dark)');

  const getSystemScheme = (): 'light' | 'dark' => (mq.matches ? 'dark' : 'light');

  const getStoredScheme = (): 'light' | 'dark' | null => {
    try {
      const value = localStorage.getItem('color-scheme');
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  };

  const applyScheme = (stored: 'light' | 'dark' | null): void => {
    meta.content = stored ?? 'light dark';
  };

  toggleBtn.addEventListener('click', () => {
    const system = getSystemScheme();
    const current = getStoredScheme() ?? system;
    const target: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';

    if (target === system) {
      try {
        localStorage.removeItem('color-scheme');
      } catch {
        // Storage unavailable; apply in-memory override
      }
      applyScheme(null);
    } else {
      try {
        localStorage.setItem('color-scheme', target);
      } catch {
        // Storage unavailable; apply in-memory override
      }
      applyScheme(target);
    }
  });

  // Sync theme override across browser tabs
  window.addEventListener('storage', (event) => {
    if (event.key === 'color-scheme') {
      applyScheme(getStoredScheme());
    }
  });
}

// 4. Copy Button (Invoker Commands + progressive fallback + VoiceOver announcement dedup)
function initCopyButtons(): void {
  const timers = new WeakMap<HTMLElement, number>();
  let lastMessage = '';

  function report(button: HTMLElement, ok: boolean): void {
    const tip = button.nextElementSibling;
    const existing = timers.get(button);
    if (existing !== undefined) {
      window.clearTimeout(existing);
    }

    button.removeAttribute('data-copied');
    button.removeAttribute('data-failed');

    let message = ok ? 'Copied' : 'Copy failed';
    if (message === lastMessage) {
      message += '\u00A0';
    }
    lastMessage = message;

    if (tip) {
      tip.textContent = '';
    }
    void button.offsetWidth;
    button.setAttribute(ok ? 'data-copied' : 'data-failed', '');

    requestAnimationFrame(() => {
      if (tip) {
        tip.textContent = message;
      }
    });

    const timeoutId = window.setTimeout(() => {
      button.removeAttribute('data-copied');
      button.removeAttribute('data-failed');
      if (tip) {
        tip.textContent = '';
      }
    }, 2000);
    timers.set(button, timeoutId);
  }

  async function copy(button: HTMLElement, target: HTMLElement): Promise<void> {
    const text =
      target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement
        ? target.value
        : target.innerText.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      report(button, true);
    } catch {
      report(button, false);
    }
  }

  // Register only ONE of native Invoker Commands or click fallback so clicks never copy twice
  if ('CommandEvent' in window) {
    document.addEventListener(
      'command',
      (event: Event) => {
        const cmdEvent = event as Event & { command?: string; source?: HTMLElement };
        if (
          cmdEvent.command?.startsWith('--copy') &&
          cmdEvent.source instanceof HTMLElement &&
          event.target instanceof HTMLElement
        ) {
          copy(cmdEvent.source, event.target);
        }
      },
      true
    );
  } else {
    document.addEventListener('click', (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const origin = event.target instanceof Element ? event.target : null;
      const button = origin?.closest<HTMLButtonElement>('button[command^="--copy"]');
      if (!button) return;
      const targetId = button.getAttribute('commandfor');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        copy(button, target);
      }
    });
  }
}

initNavbar();
initThemeToggle();
initCopyButtons();
