# WildAIGC-Bench V3 evaluation

600 AI images and 638 real photographs. All values are percentages. Results use processed AI images and unchanged real photographs. Balanced accuracy averages AI recall and real-image specificity.

| Method | Raw recall ↑ | Processed recall ↑ | Real FPR ↓ | Processed BAcc ↑ |
|:---|---:|---:|---:|---:|
| **Classification models** | | | | |
| DRCT | 29.83 | 29.67 | 14.11 | 57.78 |
| DDA | 37.33 | 37.67 | 8.46 | 64.60 |
| AIDE | 16.50 | 21.33 | 12.38 | 54.48 |
| B-Free | 35.83 | 36.33 | 3.13 | 66.60 |
| Effort | 27.33 | 28.00 | 20.69 | 53.66 |
| PGC | 15.67 | 15.50 | 14.58 | 50.46 |
| OmniAID | 30.00 | 30.83 | 5.80 | 62.52 |
| CO-SPY | 31.50 | 33.50 | 26.49 | 53.51 |
| PE-336 | 19.67 | 20.50 | 8.62 | 55.94 |
| PE-518 | 22.00 | 22.83 | 1.72 | 60.55 |
| **Multimodal large language models** | | | | |
| FakeVLM | 64.50 | 66.50 | 49.53 | 58.49 |
| Veritas++ | 33.67 | 35.33 | 3.13 | 66.10 |
| BusterX2026 | 23.83 | 24.67 | 14.11 | 55.28 |
| DeepVRM | 30.17 | 30.17 | 18.65 | 55.76 |
| FakeShield | 31.00 | 30.33 | 11.76 | 59.29 |
| UniGenDet | 43.00 | 45.00 | 9.56 | 67.72 |
| Qwen3.6-35B-A3B | 39.17 | 37.17 | 1.88 | 67.64 |
| Qwen3.8-27B | 55.50 | 54.50 | 12.38 | 71.06 |
| GLM-5.3-Flash | 50.00 | 46.50 | 1.41 | 72.54 |
| Kimi-K3 | 60.00 | 57.33 | 3.13 | 77.10 |
| DeepSeek-V4.1-Flash | 60.17 | 57.33 | 5.80 | 75.77 |
| MiniMax-M3 | 61.50 | 61.50 | 16.61 | 72.44 |

Each model is reported at its evaluated operating point. Higher recall alone does not imply better overall performance. Raw and processed real images are identical.

[V1 historical cross-benchmark results](results-v1.md) preserve the original configurations and 407-image evaluation. They are not recomputed by joining scores from new V3 runs.
