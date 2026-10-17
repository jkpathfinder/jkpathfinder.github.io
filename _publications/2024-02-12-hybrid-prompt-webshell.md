---
title: "Large language models are few-shot generators: Proposing hybrid prompt algorithm to generate webshell escape samples"
collection: publications
date: 2024-02-12
venue: 'Arxiv Preprint'
image: '/images/publications/hybrid-prompt-webshell.png'   # representative figure
paperurl: 'https://arxiv.org/pdf/2402.07408'    # the title links here; leave '' if the PDF is not public yet
status: ''                                      # optional badge, e.g. 'Accepted' / 'To Appear'
codeurl: ''                                     # optional link to code
tldr: 'TLDR: This article introduces the Hybird Prompt algorithm, which combines the advantages of various prompt algorithms such as CoT, ToT, and SC. It generates webshell samples with high Escape Rate and Survival Rate through various components and hierarchical reasoning steps.'
citation: 'Ma M, Han L, Zhou C. Large Language Models are Few-shot Generators: Proposing Hybrid Prompt Algorithm To Generate Webshell Escape Samples[J]. <i>arXiv preprint</i> arXiv:2402.07408, 2024.'
---

**Abstract:** The frequent occurrence of cyber-attacks has made webshell attacks and defense gradually become a research hotspot in the field of network security. However, the lack of publicly available benchmark datasets and the over-reliance on manually defined rules for webshell escape sample generation have slowed down the progress of research related to webshell escape sample generation strategies and artificial intelligence-based webshell detection algorithms. To address the drawbacks of weak webshell sample escape capabilities, the lack of webshell datasets with complex malicious features, and to promote the development of webshell detection technology, we propose the Hybrid Prompt algorithm for webshell escape sample generation with the help of large language models. As a prompt algorithm specifically developed for webshell sample generation, the Hybrid Prompt algorithm not only combines various prompt ideas including Chain of Thought, Tree of Thought, but also incorporates various components such as webshell hierarchical module and few-shot example to facilitate the LLM in learning and reasoning webshell escape strategies. Experimental results show that the Hybrid Prompt algorithm can work with multiple LLMs with excellent code reasoning ability to generate high-quality webshell samples with high Escape Rate (88.61% with GPT-4 model on VIRUSTOTAL detection engine) and Survival Rate (54.98% with GPT-4 model).
