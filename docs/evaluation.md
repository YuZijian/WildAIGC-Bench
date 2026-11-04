# Evaluation guide · V3

[V3 results](detailed-results.md) · [Cross-benchmark recall](cross-benchmark-v3.md) · [V1 historical results](results-v1.md)

## Task and metrics

V3 contains 600 AI-generated or edited images and 638 real photographs. The main results use processed AI images and unchanged real photographs. Detectors receive images alone.

- **AI recall:** fraction of AI images detected.
- **Real-image FPR:** fraction of real photographs classified as AI.
- **Balanced accuracy:** the mean of AI recall and real-image specificity (1 − FPR).

All current tables use percentages. Each model uses its evaluated operating point, rather than calibration to a common FPR. Higher recall alone does not imply better overall detection performance. The real and AI cohorts are not fully source- or event-matched.

## External comparisons

The external columns retain their existing benchmark evaluations. WildAIGC columns use V3 processed recall. The external mean equally weights EvalGen, synthbuster, UnivFD, AIGIBench, Chameleon, SynthWildx, WildRF, RRDataset and ITW-SM. Recall drop is external mean minus V3 recall, in percentage points.

Only models with corresponding external results are included in this comparison. External runs were not repeated for this update; configuration differences and dataset differences can both affect the gap. BusterX2026 is not combined with historical BusterX++ scores. Existing sampling coverage is recorded in [sampling coverage](sampling-coverage.json).

## Raw and processed

Raw and processed recall are reported separately. Real photographs are identical across versions. Cropping can change surrounding content, geometry and subsequent model preprocessing, so differences do not isolate a single degradation effect.

The paper evaluates V1 (407 AI images); those results remain in the explicitly labeled historical archive. Current V3 results do not replace the paper's measurements.

## Reporting your results

Identify the dataset revision, raw/processed version, sample counts and decision rule. Report unknown or failed predictions and their treatment explicitly; do not silently omit them. The repository's historical metric scorer maps unknowns to real, so check its policy before using it for a two-class evaluation.

Do not use the test set for training or threshold selection. Results describe the evaluated configurations on a curated collection, not population-wide performance or a causal explanation of difficulty.

## PE baselines

PE-336 and PE-518 combine PE-Core-Large (Perception Encoder) with a classification head. Their names indicate input resolution. Further details are provided in the paper.
