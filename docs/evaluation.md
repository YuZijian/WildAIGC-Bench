# Evaluation guide

[Results](detailed-results.md) · [Dataset](dataset.md) · [Project page](https://yuzijian.github.io/WildAIGC-Bench/)

## Task and metrics

The positive class is AI-generated or edited imagery (`aigc` / `fake=1`). WildAIGC-Bench contains only positive samples, so its accuracy equals AI-image recall: the fraction of AI images detected. It does not independently measure real-image false-positive rate (FPR) or AUROC. Unknown outputs count as misses on WildAIGC.

External real-image FPR is shown separately. Those real images are not source-matched controls for WildAIGC. Evaluations use each model’s evaluated configuration and decision rule, not a calibration to equal FPR. Higher recall alone does not imply better overall detection performance. Label-only methods have no reported AUROC.

## Coverage and averaging

The results include Effort, D3QE, FatFormer, PGC, OmniAID and CO-SPY, evaluated on the full benchmark sets. Their supplied runs contain no unknown outputs.

Standard benchmarks: EvalGen, synthbuster and UnivFD. In-the-Wild benchmarks: AIGIBench, Chameleon, SynthWildx, WildRF, RRDataset and ITW-SM. WildAIGC is reported as a separate challenge set.

Classification models use the full external benchmark sets. Multimodal large language models use fixed subsets of 2,000 images for EvalGen, UnivFD, AIGIBench, Chameleon and RRDataset; synthbuster, SynthWildx and WildRF use their full evaluated lists. ITW-SM and WildAIGC are evaluated in full. Subsets are marked with † in the tables. Sample totals and class counts are available in [sampling coverage](sampling-coverage.json).

Recall and Accuracy means give equal weight to all nine external benchmarks. FPR means cover the eight containing real images, excluding EvalGen. Every method uses the same benchmark coverage; WildAIGC is excluded from these means. Means inherit the precision of the component results. Differences in content and full-versus-subset evaluation should be considered when comparing methods.

## Unknown outputs

WildAIGC unknowns are misses. Historical external results map unknowns to a real prediction: a miss for an AI image, but a true negative for a real image. This can reduce reported FPR. The supplementary synthbuster and UnivFD accuracy results for BusterX++, FakeVLM and Veritas++ instead count unknowns as incorrect. External accuracy therefore retains a mixed historical policy and should not be described as uniformly rescored. FPR counts explicit fake predictions among real images.

## Raw and processed

The main challenge score uses processed images. Raw results and the paired crop analysis are reported separately. Cropping can change surrounding content, input geometry and subsequent model preprocessing. Raw/processed differences do not isolate watermark removal or compression effects.

The results describe the evaluated configurations on a curated collection. They do not establish a universal detector ranking, a causal explanation of difficulty, or population-wide performance. Context and sources are used for annotation; detectors receive images alone.

## Score your predictions

The [scorer](../scripts/score_predictions.py) accepts JSONL records with `sample_id`, `gt`, `pred_fake` and `unknown`:

```bash
python scripts/score_predictions.py predictions.jsonl --manifest release_manifest.json
```

Use the dataset’s manifest to check sample IDs and report the raw or processed version used. This utility maps unknowns to real; on the positive-only WildAIGC set, they count as misses. It is a metric scorer, not a model inference package. Test images must not be used for training or threshold selection.

## PE baselines

PE-336 and PE-518 are our trained detectors using PE-Core-Large (Perception Encoder) and a classification head. Their names indicate 336 × 336 and 518 × 518 input resolutions. Model implementation and training details are outside this release.
