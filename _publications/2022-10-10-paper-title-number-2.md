---
title: "Detection method for c language family based on graph neural network and generic vulnerability analysis framework"
collection: publications
permalink: /publication/2022-10-10-paper-title-number-2
excerpt: 'This paper proposes CSVDM for static vulnerability detection tasks of C family languages. By combining Graph Neural Network with Generic Vulnerability Analysis Framework, CSVDM can perform high-precision multi-class classification tasks.'
date: 2022-10-10
venue: 'Netinfo Security'
paperurl: 'http://jkpathfinder.github.io/files/paper2.pdf'
citation: 'ZHU Lina, MA Mingrui, ZHU Dongzhao. Detection Method for C Language Family Based on Graph Neural Network and Generic Vulnerability Analysis Framework[J]. <i>Netinfo Security</i>, 2022, 22(10): 59-68.'
---

Most of the existing automated vulnerability mining tools have poor generalization ability and high false positive and false negative rale. In this paper, a static detection model called CSVDM was proposed for multi-class vulnerabilities in C language family. CSVDM used code similarity detection and generic vulnerability analysis framework module to perform vulnerability mining at the source code level. The similarity detection module integrated longest commonsubsequence(LCS) algorithm and graph neural network to implement code cloning and homology detection, generating the vulnerability similarity list according to a preset threshold. The generic vulnerability analysis framework module performed context-dependent data flow and controled flow analysis of the source code to be tested to compensate for the the similarity detection module's high false negatives in detecting vulnerabilities not caused by code cloning, and generated the vulnerability analysis list. CSVDM combined the vulnerability similarity list and the vulnerability analysis list to generate the final vulnerability detection report. The experimental results show that CSVDM has a substantial improvement in evaluation metrics compared to other vulnerability mining tools such as checkmarx.
