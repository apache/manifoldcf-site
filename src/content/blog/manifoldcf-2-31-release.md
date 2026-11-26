---
title: "Apache ManifoldCF 2.31 Released: The Java 25 Leap, Virtual Threads, and Next-Gen Core Modernization"
description: "Official release announcement for Apache ManifoldCF 2.31 featuring Java 25 baseline, Virtual Threads (Project Loom) concurrency, Jetty 12.1 web stack, 88K lines legacy code pruning, and automated Docker testing."
pubDate: 2026-07-31T12:00:00Z
author: "Piergiorgio Lucidi"
tags: ["Release", "Java 25", "Virtual Threads", "Performance"]
summary: "Official release of Apache ManifoldCF 2.31 under CONNECTORS-1784: Java 25 runtime baseline, Project Loom Virtual Threads across the crawling engine, Jetty 12.1 modernization, 88,000+ lines of legacy code removed, and automated Docker CI/CD integration testing."
featured: true
---

## 1. Key Highlights at a Glance

We are thrilled to announce the official release of **Apache ManifoldCF 2.31**!

This release marks one of the most significant architectural milestones in the history of the Apache ManifoldCF project under issue **CONNECTORS-1784** (*Core Performance & Modernization: The Java 25 Leap*).

With ManifoldCF 2.31, we have embraced modern Java runtime capabilities, adopting **Java 25**, introducing native support for **Virtual Threads (Project Loom)** across the crawling engine, upgrading our embedded web server stack to **Jetty 12.1**, pruning tens of thousands of lines of legacy code, and streamlining our Docker and CI/CD pipelines.

| Feature / Area | Upgrade / Change | Key Benefit |
| --- | --- | --- |
| **Java Baseline** | **Java 25** (with `--enable-preview`) | Modern JVM features, updated class formats, long-term stability |
| **Concurrency Engine** | **Virtual Threads** (Project Loom) | Massively scalable concurrency with low OS thread & memory overhead |
| **Embedded Web Server** | **Jetty 12.1** | Modern HTTP server stack, native virtual thread integration |
| **Codebase Pruning** | Removed Legacy Connectors (~88K lines deleted) | Leaner build, zero legacy bloat, smaller attack surface |
| **Logging System** | Log4j & SLF4J startup optimizations | Silenced startup warnings, package-scan deprecations fixed |
| **DevOps & Testing** | Docker Integration Test Suite & GitHub Workflows | Automated Docker builds, continuous container testing |

## 2. The Java 25 Leap & Virtual Thread Concurrency

Enterprise content integration engines spend a substantial portion of their execution lifecycle waiting on I/O operations—network latency from HTTP calls, REST endpoints, database queries, and repository API responses. In traditional architectures, each worker thread maps directly to an OS platform thread, consuming significant system memory (stack allocation) and causing expensive context switching when thousands of concurrent documents are fetched.

> **What Changed in Core Architecture (CONNECTORS-1784):**
>
> - **CrawlerAgent & Worker Threads:** Document processing workers and queue dispatchers now utilize lightweight Java 25 Virtual Threads (`Executors.newVirtualThreadPerTaskExecutor()`).
> - **AgentsDaemon:** Central service management converted to virtual thread execution.
> - **Network & Socket Handlers:** `InterruptibleSocketFactory`, `ThrottledFetcher`, and `CommonsHTTPSender` were reworked to ensure socket read/write operations unmount virtual threads cleanly without pinning carrier threads.
> - **Authority Servlets:** `UserACLServlet` now serves high-concurrency permission check requests using virtual threads.

**Performance Impact:** Virtual threads allow ManifoldCF to scale worker concurrency into thousands of simultaneous fetching operations per node without experiencing thread starvation or excessive memory growth.

## 3. Web Stack Modernization: Jetty 12.1 Integration

To support Java 25 and modern HTTP protocols, the embedded application container and test harnesses have been updated to **Jetty 12.1**.

- **Virtual Thread Connector Engine:** Jetty 12 natively supports Virtual Thread executors for handling incoming HTTP requests to the ManifoldCF UI and REST APIs.
- **Updated Servlet Specs:** Aligning with modern Jakarta EE standards.
- **Improved Security & Performance:** Lower connection latency and better resource cleanup during connector shutdown cycles.

## 4. Codebase Pruning: Streamlining Legacy Connectors

Over the years, ManifoldCF accumulated legacy connectors for obsolete or proprietary systems (e.g., legacy Documentum, FileNet, and Meridio integration code) requiring legacy third-party SDKs that are no longer available in public repositories.

In 2.31, we conducted a major cleanup, removing **over 88,000 lines of unmaintained legacy code**:

- **Removed:** Legacy Documentum, FileNet, and Meridio connector modules.
- **Result:** Faster build times with Apache Ant and Apache Maven, simplified dependency graph, reduced CVE risks, and a smaller Docker image footprint.

> **Active Enterprise Connectors Preserved:** Active enterprise connectors—such as Apache Solr, OpenSearch, Elasticsearch, CMIS, Web, JDBC, Google Drive, Amazon S3, SharePoint, Nuxeo, and Generic REST/JSON—remain fully supported and updated.

## 5. Logging & Startup Diagnostics Cleanup

Starting up enterprise daemons should produce clean, predictable log output. In 2.31, we addressed two persistent logging friction points:

- **Log4j Package Scanning:** Resolved deprecation warnings regarding package scanning in Log4j configuration (`logging.xml`).
- **SLF4J Provider Selection:** Fixed missing SLF4J provider warnings at startup across single-process, multi-process, and Docker environments.

## 6. Container-First & CI/CD Enhancements

With ManifoldCF increasingly deployed in modern Cloud Native environments (Kubernetes, AWS ECS, OpenShift), release 2.31 upgrades our infrastructure stack:

- **Official Java 25 Dockerfile:** Updated base images to Java 25 runtimes.
- **Automated Docker Integration Tests:** Added `docker-integration-test` module and GitHub Workflows to validate end-to-end containerized deployments automatically on every pull request and release build.
- **Maven & Release Workflows:** Streamlined GitHub Actions for generating Release Candidates and publishing artifacts to Maven Central.

## 7. How to Upgrade to Apache ManifoldCF 2.31

**Prerequisites:** OpenJDK 25 or higher (with `--enable-preview` passed to the JVM).

**Ant Build & Execution:**

```bash
# Build the complete release package
ant clean build

# Run single-process example with Java 25
cd dist/example
java --enable-preview -jar start.jar
```

**Docker Quickstart:**

```bash
docker pull apache/manifoldcf:2.31
docker run -d -p 8345:8345 --name manifoldcf apache/manifoldcf:2.31
```

## 8. Acknowledgments & Community

This release was made possible by the dedicated work of the Apache ManifoldCF PMC and community contributors. Special thanks to all developers, testers, and users who provided feedback during the 2.31 development cycle!

- **GitHub Repository:** [apache/manifoldcf](https://github.com/apache/manifoldcf)
- **Technical Wiki:** [github.com/apache/manifoldcf/wiki](https://github.com/apache/manifoldcf/wiki)
- **Issue Tracker:** [Apache Jira (CONNECTORS)](https://issues.apache.org/jira/projects/CONNECTORS)
- **Mailing Lists:** `dev@manifoldcf.apache.org` / `user@manifoldcf.apache.org`
