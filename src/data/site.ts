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

export const WIKI_BASE = 'https://github.com/apache/manifoldcf/wiki';

export const SITE = {
  name: 'Apache ManifoldCF',
  title: 'Apache ManifoldCF™ — Enterprise Content Integration & Security Trimming',
  description:
    'Open-source enterprise content integration framework connecting SharePoint, CMIS, S3, Google Drive, Confluence, and more to Apache Solr, OpenSearch, and Elasticsearch with native document-level ACL security trimming.',
  latestVersion: '2.31',
  latestReleaseDate: 'July 30, 2026',
  nextVersion: '2.32-SNAPSHOT',
  sdkVersion: '1.0.2',
  sdkReleaseDate: 'February 10, 2025',
  githubUrl: 'https://github.com/apache/manifoldcf',
  wikiUrl: WIKI_BASE,
  sdkUrl: 'https://github.com/apache/manifoldcf-sdk',
  jiraUrl: 'https://issues.apache.org/jira/projects/CONNECTORS',
  dockerHubUrl: 'https://hub.docker.com/r/apache/manifoldcf',
  deepWikiUrl: 'https://deepwiki.com/apache/manifoldcf',
  javadoc231Url: 'https://manifoldcf.apache.org/release/release-2.31/api/framework/index.html',
};

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Architecture', href: '/architecture/' },
  { label: 'Downloads', href: '/downloads/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Community', href: '/community/' },
  { label: 'Security', href: '/security/' },
  { label: 'Wiki Docs', href: WIKI_BASE, external: true },
];

export const WIKI_LINKS = [
  {
    title: 'Concepts & Architecture',
    description: 'Core crawling model, authority groups, job lifecycle, and incremental ingestion.',
    href: `${WIKI_BASE}/Concepts-and-Architecture`,
  },
  {
    title: 'How to Build & Deploy',
    description: 'Single-process, multi-process ZooKeeper, PostgreSQL/MariaDB, Docker, and Java 25 setup.',
    href: `${WIKI_BASE}/How-to-Build-and-Deploy`,
  },
  {
    title: 'Spring Boot & Modern Admin Console',
    description: 'Executable WAR (2.32-SNAPSHOT), /ui/ Modern Console, Actuator probes, and Tomcat 11.',
    href: `${WIKI_BASE}/Spring-Boot-and-Modern-Admin-Console`,
  },
  {
    title: 'Included Connectors Matrix',
    description: 'Repository, Authority, Transformation, User Mapping, Output, and Notification connectors.',
    href: `${WIKI_BASE}/Included-Connectors`,
  },
  {
    title: 'REST API v2 & GitOps',
    description: 'OpenAPI 3.x spec, Swagger UI, declarative YAML/JSON configuration-as-code, and v1 API.',
    href: `${WIKI_BASE}/REST-API-v2-and-GitOps`,
  },
  {
    title: 'Writing Custom Connectors',
    description: 'Developer guides and Apache ManifoldCF SDK for building custom plugins in Java.',
    href: `${WIKI_BASE}/Developer-Resources`,
  },
];

export interface ReleaseArtifact {
  label: string;
  filename: string;
  url: string;
  asc: string;
  sha512: string;
}

export interface ReleaseEntry {
  version: string;
  date: string;
  summary: string;
  keysUrl: string;
  changesUrl: string;
  isArchive?: boolean;
  artifacts: {
    source: ReleaseArtifact[];
    binary: ReleaseArtifact[];
    lib: ReleaseArtifact[];
  };
}

function makeArtifacts(version: string, archived: boolean): ReleaseEntry['artifacts'] {
  const dlBase = archived
    ? `https://archive.apache.org/dist/manifoldcf/apache-manifoldcf-${version}`
    : `https://www.apache.org/dyn/closer.lua/manifoldcf/apache-manifoldcf-${version}`;
  const sigBase = archived
    ? `https://archive.apache.org/dist/manifoldcf/apache-manifoldcf-${version}`
    : `https://downloads.apache.org/manifoldcf/apache-manifoldcf-${version}`;

  const buildPair = (kind: 'src' | 'bin' | 'lib', labelPrefix: string): ReleaseArtifact[] => [
    {
      label: `${labelPrefix} (.tar.gz)`,
      filename: `apache-manifoldcf-${version}-${kind}.tar.gz`,
      url: `${dlBase}/apache-manifoldcf-${version}-${kind}.tar.gz`,
      asc: `${sigBase}/apache-manifoldcf-${version}-${kind}.tar.gz.asc`,
      sha512: `${sigBase}/apache-manifoldcf-${version}-${kind}.tar.gz.sha512`,
    },
    {
      label: `${labelPrefix} (.zip)`,
      filename: `apache-manifoldcf-${version}-${kind}.zip`,
      url: `${dlBase}/apache-manifoldcf-${version}-${kind}.zip`,
      asc: `${sigBase}/apache-manifoldcf-${version}-${kind}.zip.asc`,
      sha512: `${sigBase}/apache-manifoldcf-${version}-${kind}.zip.sha512`,
    },
  ];

  return {
    binary: buildPair('bin', 'Binary'),
    source: buildPair('src', 'Source'),
    lib: buildPair('lib', 'Libraries'),
  };
}

export const LATEST_RELEASE: ReleaseEntry = {
  version: '2.31',
  date: 'July 30, 2026',
  summary:
    'Core Modernization (CONNECTORS-1784): Java 25 LTS baseline, Project Loom Virtual Threads across crawling and authority services, embedded Jetty 12.1, ~88K lines of unmaintained legacy connectors removed, and automated Docker CI/CD integration tests.',
  keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
  changesUrl: 'https://downloads.apache.org/manifoldcf/apache-manifoldcf-2.31/apache-manifoldcf-2.31.CHANGES.txt',
  artifacts: makeArtifacts('2.31', false),
};

export const SDK_RELEASE = {
  version: '1.0.2',
  date: 'February 10, 2025',
  keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
  changesUrl:
    'https://downloads.apache.org/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2.CHANGES.txt',
  artifacts: [
    {
      label: 'Source (.tar.gz)',
      filename: 'apache-manifoldcf-sdk-1.0.2-src.tar.gz',
      url: 'https://www.apache.org/dyn/closer.lua/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2-src.tar.gz',
      asc: 'https://downloads.apache.org/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2-src.tar.gz.asc',
      sha512:
        'https://downloads.apache.org/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2-src.tar.gz.sha512',
    },
    {
      label: 'Source (.zip)',
      filename: 'apache-manifoldcf-sdk-1.0.2-src.zip',
      url: 'https://www.apache.org/dyn/closer.lua/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2-src.zip',
      asc: 'https://downloads.apache.org/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2-src.zip.asc',
      sha512:
        'https://downloads.apache.org/manifoldcf/apache-manifoldcf-sdk-1.0.2/apache-manifoldcf-sdk-1.0.2-src.zip.sha512',
    },
  ],
};

export const EARLIER_RELEASES: ReleaseEntry[] = [
  {
    version: '2.30',
    date: 'April 11, 2026',
    summary:
      'Java 25 upgrade (CONNECTORS-1779), RepriorizationTracker NPE fix, duplicate pipeline connector UI fix, MariaDB/MySQL rollback fix, and Ant/Maven dependency alignment.',
    keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
    changesUrl:
      'https://downloads.apache.org/manifoldcf/apache-manifoldcf-2.30/apache-manifoldcf-2.30.CHANGES.txt',
    artifacts: makeArtifacts('2.30', false),
  },
  {
    version: '2.29',
    date: 'September 12, 2025',
    summary: 'Maintenance release with connector stability fixes and dependency upgrades.',
    keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
    changesUrl:
      'https://downloads.apache.org/manifoldcf/apache-manifoldcf-2.29/apache-manifoldcf-2.29.CHANGES.txt',
    artifacts: makeArtifacts('2.29', false),
  },
  {
    version: '2.28',
    date: 'January 15, 2025',
    summary:
      'Solr 9 Ingester connector, Google Drive API upgrade, Generic JSON Authority connector, Active Directory Groups management, and PostgreSQL JDBC upgrade.',
    keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
    changesUrl:
      'https://downloads.apache.org/manifoldcf/apache-manifoldcf-2.28/apache-manifoldcf-2.28.CHANGES.txt',
    artifacts: makeArtifacts('2.28', false),
  },
  {
    version: '2.27',
    date: 'September 26, 2024',
    summary:
      'Official Docker images (CONNECTORS-1492), ManifoldCF SDK (CONNECTORS-1706), and GitHub Actions CI & release pipelines.',
    keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
    changesUrl:
      'https://archive.apache.org/dist/manifoldcf/apache-manifoldcf-2.27/apache-manifoldcf-2.27.CHANGES.txt',
    isArchive: true,
    artifacts: makeArtifacts('2.27', true),
  },
  {
    version: '2.26',
    date: 'November 1, 2023',
    summary: 'Archived 2.26 release available from the ASF Release Archive.',
    keysUrl: 'https://downloads.apache.org/manifoldcf/KEYS',
    changesUrl:
      'https://archive.apache.org/dist/manifoldcf/apache-manifoldcf-2.26/apache-manifoldcf-2.26.CHANGES.txt',
    isArchive: true,
    artifacts: makeArtifacts('2.26', true),
  },
];

export const CONNECTOR_FAMILIES = [
  {
    name: 'Repository Connectors',
    role: 'Crawl documents, metadata, incremental version strings, and native ACLs from source repositories.',
    examples: [
      'SharePoint',
      'CMIS',
      'Amazon S3',
      'Google Drive',
      'Confluence',
      'Jira',
      'Alfresco',
      'Dropbox',
      'File System',
      'Windows Shares',
      'JDBC',
      'Web & RSS',
      'Email',
      'HDFS',
      'GridFS',
      'Wiki',
    ],
    wikiHref: `${WIKI_BASE}/Repository-Connectors`,
  },
  {
    name: 'Authority & User Mapping',
    role: 'Resolve user identities and return active allow/deny access tokens for search-time security trimming.',
    examples: [
      'Active Directory',
      'LDAP',
      'SharePoint Authority',
      'Generic JSON Authority',
      'Amazon S3 Authority',
      'Confluence Authority',
      'Alfresco WebScripts',
      'RegExp User Mapper',
    ],
    wikiHref: `${WIKI_BASE}/Authority-Connectors`,
  },
  {
    name: 'Transformation Connectors',
    role: 'Enrich, extract text, filter, normalize metadata, and run NLP pipelines before indexing.',
    examples: [
      'Apache Tika Extractor',
      'Forced Metadata',
      'OpenNLP Entity Extractor',
      'Document Filter',
      'Allowed Documents',
      'Metadata Adjuster',
      'Content Limiter',
    ],
    wikiHref: `${WIKI_BASE}/Transformation-Connectors`,
  },
  {
    name: 'Output Connectors',
    role: 'Index processed document content, metadata, and security tokens into search engines and data sinks.',
    examples: [
      'Apache Solr (incl. Solr 9)',
      'OpenSearch',
      'Elasticsearch',
      'Apache Kafka',
      'MongoDB',
      'HDFS',
      'CMIS Output',
      'File System',
      'Amazon CloudSearch',
    ],
    wikiHref: `${WIKI_BASE}/Output-Connectors`,
  },
  {
    name: 'Notification Connectors',
    role: 'Emit automated job completion and operational notifications to engineering teams.',
    examples: ['Email (SMTP)', 'Slack', 'Rocket.Chat'],
    wikiHref: `${WIKI_BASE}/Notification-Connectors`,
  },
];

export const MAILING_LISTS = [
  {
    name: 'User Mailing List',
    address: 'user@manifoldcf.apache.org',
    description: 'Questions about deploying, configuring, operating, and integrating Apache ManifoldCF.',
    subscribe: 'mailto:user-subscribe@manifoldcf.apache.org',
    unsubscribe: 'mailto:user-unsubscribe@manifoldcf.apache.org',
    archive: 'https://lists.apache.org/list.html?user@manifoldcf.apache.org',
  },
  {
    name: 'Development Mailing List',
    address: 'dev@manifoldcf.apache.org',
    description: 'Architecture proposals, connector development, release votes, and contributor discussions.',
    subscribe: 'mailto:dev-subscribe@manifoldcf.apache.org',
    unsubscribe: 'mailto:dev-unsubscribe@manifoldcf.apache.org',
    archive: 'https://lists.apache.org/list.html?dev@manifoldcf.apache.org',
  },
  {
    name: 'Commits Mailing List',
    address: 'commits@manifoldcf.apache.org',
    description: 'Automated notifications for every commit across ManifoldCF repositories.',
    subscribe: 'mailto:commits-subscribe@manifoldcf.apache.org',
    unsubscribe: 'mailto:commits-unsubscribe@manifoldcf.apache.org',
    archive: 'https://lists.apache.org/list.html?commits@manifoldcf.apache.org',
  },
];

export const COMMITTERS = [
  { name: 'Shinichiro Abe', id: 'shinichiro' },
  { name: 'Ahmet Arslan', id: 'iorixxx' },
  { name: 'Alessandro Benedetti', id: 'abenedetti' },
  { name: 'Antonio David Pérez Morales', id: 'adperezmorales' },
  { name: 'Luis Cabaceira', id: 'cabaceira1974' },
  { name: 'Tuğba Doğan', id: 'tugbadogan' },
  { name: 'Erlend Garåsen', id: 'ridder' },
  { name: 'Cihad Guzel', id: 'cguzel' },
  { name: 'Rafa Haro', id: 'rharo' },
  { name: 'Furkan Kamaci', id: 'kamaci' },
  { name: 'Kishore Kumar', id: 'kishore' },
  { name: 'Maciej Lizewski', id: 'mlizewski' },
  { name: 'Piergiorgio Lucidi', id: 'piergiorgio' },
  { name: 'Julien Massiera', id: 'jmssiera' },
  { name: 'Muhammed Olgun', id: 'molgun' },
  { name: 'Minoru Osuka', id: 'minoru' },
  { name: 'Hitoshi Ozawa', id: 'hozawa' },
  { name: 'Maurizio Pillitu', id: 'maoo' },
  { name: 'Steph van Schalkwyk', id: 'steffmari' },
  { name: 'Markus Schuch', id: 'schuch' },
  { name: 'Graeme Seaton', id: 'graemes' },
  { name: 'Simon Willnauer', id: 'simonw' },
  { name: 'Karl Wright', id: 'kwright' },
  { name: 'Mingchun Zhao', id: 'mingchun' },
  { name: 'Jukka Zitting', id: 'jukka' },
];

export const COMMUNITY_RESOURCES = [
  {
    type: 'Book',
    title: 'ManifoldCF in Action — Revised Open PDFs',
    author: 'Karl Wright',
    href: 'https://github.com/DaddyWri/manifoldcfinaction/tree/master/pdfs',
  },
  {
    type: 'Podcast',
    title: 'OSS Prague: Apache ManifoldCF and Incubation',
    author: 'Piergiorgio Lucidi (Apache Feathercast)',
    href: 'https://feathercast.apache.org/2017/10/30/oss-prague-apache-manifoldcf-and-incubation-piergiorgio-lucidi/',
  },
  {
    type: 'Presentation',
    title: 'Securing Documents in Solr with ManifoldCF',
    author: 'Karl Wright (Lucene Revolution)',
    href: 'https://www.slideshare.net/lucenerevolution/wright-nokia-manifoldcfeurocon-2011',
  },
  {
    type: 'Presentation',
    title: 'Apache ManifoldCF Overview',
    author: 'Piergiorgio Lucidi',
    href: 'https://www.slideshare.net/PiergiorgioLucidi/apache-manifoldcf-9508286',
  },
  {
    type: 'Presentation',
    title: 'Apache ManifoldCF Technical Introduction',
    author: 'Shinichiro Abe',
    href: 'https://www.slideshare.net/ShinichiroAbe/apache-manifoldcf-9231499',
  },
];

export const ASF_FOOTER_LINKS = [
  { label: 'Apache Software Foundation', href: 'https://www.apache.org/' },
  { label: 'License (Apache 2.0)', href: 'https://www.apache.org/licenses/' },
  { label: 'Security', href: 'https://www.apache.org/security/' },
  { label: 'Events', href: 'https://www.apache.org/events/current-event.html' },
  { label: 'Sponsorship', href: 'https://www.apache.org/foundation/sponsorship.html' },
  { label: 'Privacy Policy', href: 'https://privacy.apache.org/policies/privacy-policy-public.html' },
  { label: 'Thanks', href: 'https://www.apache.org/foundation/thanks.html' },
];

export const RELATED_APACHE_PROJECTS = [
  { label: 'Apache Solr', href: 'https://solr.apache.org/' },
  { label: 'Apache Tika', href: 'https://tika.apache.org/' },
  { label: 'Apache Lucene', href: 'https://lucene.apache.org/' },
  { label: 'Apache OpenNLP', href: 'https://opennlp.apache.org/' },
  { label: 'Apache Kafka', href: 'https://kafka.apache.org/' },
  { label: 'Apache Nutch', href: 'https://nutch.apache.org/' },
];
