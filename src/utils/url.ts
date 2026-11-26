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

export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!base) {
    return normalized;
  }
  return `${base}${normalized}`;
}

export function isActivePath(currentPathname: string, targetPath: string): boolean {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const cleanCurrent = currentPathname
    .replace(new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), '')
    .replace(/\/+$/, '') || '/';
  const cleanTarget = targetPath.replace(/\/+$/, '') || '/';

  if (cleanTarget === '/') {
    return cleanCurrent === '/';
  }
  return cleanCurrent === cleanTarget || cleanCurrent.startsWith(`${cleanTarget}/`);
}
