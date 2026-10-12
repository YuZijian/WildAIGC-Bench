# Evaluation scope and interpretation

[Interactive result tables](https://yuzijian.github.io/WildAIGC-Bench/#evaluation) · [Structured results](../assets/evaluation_results.json) · [Repository overview](../README.md)

## Benchmark groups

| Group | Benchmarks |
|---|---|
| Standard | EvalGen, synthbuster, UnivFD |
| In-the-Wild | AIGIBench, Chameleon, SynthWildx, WildRF, RRDataset, ITW-SM |
| This project | WildAIGC-Bench raw and processed |

The current project page shows a selected baseline set. Missing measurements are null in JSON and blank in the tables. Counts and summaries describe the displayed measurements, not all algorithms ever evaluated internally.

## Two result tables

1. **Cross-benchmark accuracy:** per-method accuracy and the average of completed benchmarks excluding WildAIGC. Methods with missing cells have different averaging coverage.
2. **WildAIGC detail:** raw accuracy, processed accuracy, their difference, the other-benchmark average, and the gap between that average and WildAIGC raw accuracy.

The displayed data preserve the supplied values and rounding. Derived aggregates have not been recomputed from the displayed four-decimal cells.

## Sampling

A dagger (`†`) marks large-model evaluations using subsets of up to 2,000 images on large benchmark dimensions. Smaller dimensions are evaluated in full. WildAIGC uses all 407 accepted images. Full and sampled evaluations must be identified when comparing results; exact dimension sizes and sampling settings will accompany the full evaluation protocol.

## Metric boundaries

WildAIGC is positive-only: accuracy equals AI-image recall. Standalone AUROC, false-positive rate and true-negative rate are not defined without real-image controls.

The accuracy gap against averages of other benchmarks is a descriptive number across different class compositions and sources. It is not a matched-recall decline or causal estimate of what makes an image difficult. Model versions, checkpoints, thresholds, prompts and preprocessing need to be specified for a reproducible model comparison.

All accepted images were inspected for crop suitability; processed differs from raw only where cropping was needed. A small overall raw/processed difference cannot establish that a detector ignores peripheral cues, because unchanged images and opposite-direction prediction changes may mask effects. A crop-subset and paired-prediction analysis is planned.

## Next releases

- Complete remaining empty results.
- Publish full model configurations and the evaluation harness after documentation and cleanup.
- Add real-image false-positive-rate analysis under the corresponding external dataset access terms.
- Complete the technical report and formal citation.

External benchmark images are obtained from their authors; this repository does not redistribute them. The current snapshot is supplied by the maintainer, and preparing this website did not rerun inference.
