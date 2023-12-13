
# ManifoldCF Document Security

## Document Security Issues

### Overview

ManifoldCF provides a security model for documents which is typically enforced by the search engine the documents are indexed with. Often, this search engine is Apache Lucene, but others may be used either now or in the future. This page describes how document security is enforced, and what the limitations are of this technique.

#### How Search Engines Work

A standard search engine has one or more _indexes_, which associate _terms_ with _documents_. A _query_ is issued to the search engine, which uses one or more of the indexes to generate a list of documents. The list of documents is then _scored_, which means that they are given a numeric ranking value based on how closely they match the query. The scoring operation typically also makes use of statistic measures, such as how frequently a term appears in documents in the index.

#### Security Definitions

Complete definitions of security usually include elements of _confidentiality_, _integrity_, and _availability_. Confidentiality has a strict definition, which not only prevents a user from seeing information belonging to another user, but also prevents a user from even knowing about the existence of information belonging to another user. Integrity means that a user can see everything they are allowed to see. And availability means that information is as available as possible to the user who is supposed to have access to it.

#### How ManifoldCF Applies Security

Typically, documents are excluded by what is known as _query modification_. This means that the query presented to the search engine is modified in such a way as to exclude the documents that the user is not supposed to see. This is typically done by a ManifoldCF Plugin, which the system integrator must use to apply user-level security. The query modification is performed in such a way that it does not affect the relative scoring of documents.

### Potential Security Issues with ManifoldCF

#### Scoring-based Discovery of Document Keywords

One way that confidentiality can be breached in part with a search engine like Lucene relies on the fact that its scoring uses global document statistics. It is theoretically possible to determine information about how many documents contain a term, or whether the number of documents that contain the term changes over time, by submitting queries to the system and examining the relative ordering of the results.

While this technically is a violation of the confidentiality principle, an attacker still cannot see the contents or extracts of documents that are restricted. The ability of an unauthorized user to know about the existence of other documents with certain keywords may or may not be of concern to the system designers, depending on the situation. But if it **is** a concern, the right solution is to modify how the search engine does scoring, so that it either does not score documents based on global term statistics, or perhaps it adjusts scores by a random factor, etc. There exist papers on this subject, which we encourage especially security-conscious developers to consult.
