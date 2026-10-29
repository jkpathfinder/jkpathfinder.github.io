---
title: "MotionDecipher: LLM-Assisted Clinical Interpretation of Human Motion Signals for Efficient Gait Analysis"
collection: publications
order: 1                                           # position on the Publications page (1 = top)
date: 2026-12-01
venue: 'Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies (IMWUT)'
image: '/images/publications/motiondecipher.png'   # representative figure
paperurl: ''                                       # hidden until officially published; set to the DOI link then
status: 'Accepted'                                 # optional badge, e.g. 'Accepted' / 'To Appear'
codeurl: ''                                        # optional link to code
tldr: 'TLDR: This paper introduces MotionDecipher, an LLM-based framework that translates continuous human motion signals into clinical gait descriptions through a Human Motion Tokenizer, a Meta Feature Selector, and a Hybrid Context Constructor for In-Context Learning. Evaluated on gait lab data from 122 patients and 46 controls, MotionDecipher achieves 0.91 BERTScore (13% over GPT-5) and is ranked highest by clinical experts in Correctness, Completeness, and Conciseness.'
---

**Abstract:** Clinical gait and motion analysis is widely used to guide targeted interventions for patients with neurological disorders, the outcome of which is typically a report with descriptions of joint movements and forces. Current practices rely on experts' manual effort, which is labor-intensive and time-consuming. Recent advancements in Large Language Models (LLMs) provide opportunities to address this problem, but translating human motion into clinical gait descriptions remains challenging because the quality of the context directly affects LLMs' reasoning capability over continuous motion signals. To tackle this, we introduce MotionDecipher, a novel framework bridging the semantic gap between motion data and clinical interpretations. Specifically, we made 3 key advancements: 1) a Human Motion Tokenizer that converts motion signals into domain-specific tokens for time- and frequency-informed gait interpretation; 2) a Meta Feature Selector that transforms tokens into Structured Representations; and 3) a Hybrid Context Constructor to determine the optimal demonstration-based prompt for In-Context Learning. We evaluated MotionDecipher on data collected at an accredited gait lab from 122 patients and 46 controls. Results show that MotionDecipher achieves 0.91 BERTScore (13% over GPT-5), while expert evaluation ranks MotionDecipher highest in Correctness, Completeness, and Conciseness compared to baselines, highlighting its promise for efficient gait analysis.
