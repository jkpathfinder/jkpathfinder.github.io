---
title: "BTAD: A binary transformer deep neural network model for anomaly detection in multivariate time series data"
collection: publications
permalink: /publication/2023-03-27-paper-title-number-3
excerpt: 'This article introduces the Bi-Transformer anomaly detection method (BTAD) for anomaly detection in multivariate time series data, and proposes corresponding enhancements such as an adaptive multi-head attention mechanism and a modified Decoder structure to further improve BTAD's performance. Experimental results on multiple mainstream multivariate time series datasets demonstrate that BTAD exhibits outstanding overall anomaly detection performance.'
date: 2023-03-27
venue: 'Advanced Engineering Informatics'
paperurl: 'http://jkpathfinder.github.io/files/paper3.pdf'
citation: 'Ma M, Han L, Zhou C. BTAD: A binary transformer deep neural network model for anomaly detection in multivariate time series data[J]. <i>Advanced Engineering Informatics</i>, 2023, 56: 101949.'
---

In the context of big data, if the task of multivariate time series data anomaly detection cannot be performed efficiently and accurately, it will bring great security risks to industrial systems. However, fast model inference requirements, unlabeled datasets and excessively long time series make it a challenging problem to build an accurate and fast anomaly detection model. In this paper, we propose an unsupervised Bi-Transformer anomaly detection method (BTAD) for multivariate time series data, which uses Bi-Transformer structure to extract dataset association features, and uses an improved adaptive multi-head attention mechanism to infer trends in each meta-dimension of multivariate time series data in parallel. The modified Decoder structure prevents the reconstructed output of BTAD from being disturbed by the input information. Self-conditioning mechanism could enhance the robustness to noisy data, and improve model's generalization ability. Experiments show that BTAD could outperform other models in detection performance and training efficiency. Taking NAB dataset as an example, the AUC and F1 of BTAD are increased by more than 4.78% and 1.40% separately. Finally, we look forward to the future development trend of BTAD, and put forward the corresponding improvement ideas.
