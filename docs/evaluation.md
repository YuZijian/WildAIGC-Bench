# Evaluation protocol and results

[Project page](https://yuzijian.github.io/WildAIGC-Bench/#evaluation) · [Model settings](model-settings.md) · [Results JSON](../assets/evaluation_results.json) · [Processed predictions](../assets/processed_predictions.jsonl)

Snapshot: 13 October 2026. Ten selected methods are displayed; this is not an exhaustive list of internal experiments. No model was rerun while preparing these results.

## Metrics and operating points

The positive class is AI-generated/edited (`fake=1`). WildAIGC contains 407 positive samples: report **AI-image recall**, TP/(TP+FN). There is no standalone WildAIGC FPR or AUROC. ITW-SM provides an external reference of 5,000 fake and 5,000 real images. Its real-image FPR is FP/(FP+TN); it is not a source-matched real control for WildAIGC.

The first table presents WildAIGC alone: raw/processed recall, detection counts, unknown counts and change in percentage points. A paired table analyzes the 83 cropped samples. Cross-benchmark recall and real-image FPR are separate reference tables. FPR includes all external dimensions with supplied real-image metrics, not only ITW-SM. All ten displayed configurations have lower processed recall on WildAIGC than on ITW-SM's fake subset. This is an observed difference between collections, not a causal estimate of compression damage or a claim about every possible model configuration. Models are evaluated at their recorded operating points, **not calibrated to equal FPR**. Other-benchmark accuracy is supplementary and is not subtracted from WildAIGC recall. Different benchmark content and sampling coverage still limit comparisons.

Unknown, parsing-failure or error outputs are mapped to real: FN for fake inputs and TN for real inputs. Unknown counts are reported separately. This policy can lower FPR while increasing fake misses; it must not be described as a correct classification of every unknown. MLLMs provide labels, so AUROC is not computed for them.

## Data provenance and retained records

- Eight external benchmark aggregates come from the supplied `summary.csv`, selected full runs for small models and sample runs for large models. The maintainer explicitly confirmed CSV precedence over the older narrative report, including FakeVLM synthbuster/UnivFD.
- All 407 processed predictions for each displayed method match the frozen sample-ID set exactly, with no duplicate IDs. Processed metrics are recomputed from these records.
- ITW-SM predictions are recomputed where available (10,000 unique records, 5,000 per class). AIDE ITW-SM metrics are supplied aggregates; its per-image file is absent.
- The 13 October supplement provides raw files and a separate 83-image raw subset for the changed images. IDs match the frozen crop list exactly; subset predictions match the full supplied raw files. The 324 byte-identical images have matching raw/processed predictions; these files do not establish whether unchanged inputs were independently rerun. Processed predictions agree with the prior materials.
- Qwen raw in the supplement is 155/407 (0.3808), versus the prior aggregate 149/407 (0.3661). The new version is used and the earlier figure is retained in the local change audit; no claim is made about why runs differ.
- The published processed prediction file contains sample IDs, versions, labels/scores and unknown flags. Internal paths and generated response text are omitted.

No confidence interval is presented as population representativeness: the set is curated and related images exist. Stored group IDs are not a validated independent-event partition.

## Sampling and class composition

Standard benchmarks: EvalGen, synthbuster, UnivFD. In-the-Wild: AIGIBench, Chameleon, SynthWildx, WildRF, RRDataset, ITW-SM and WildAIGC.

Small-model runs use the full eight external dimensions. Large-model runs use fixed lists of 2,000 on large dimensions; synthbuster (4,000), SynthWildx (1,781) and WildRF (1,834) use full lists. ITW-SM and WildAIGC are full for all methods. Blank cells indicate no supplied aggregate. A 2,000-image list can include real images: 2,000 is not necessarily the recall denominator.

The supplied sampling description states seed 42 and label stratification. Available list class counts are recorded in [sampling coverage](sampling-coverage.json); this does not assume equal class counts. Exact input lists contain internal storage references and are not published as runnable public download lists. Aggregate-only full-set class counts cannot all be reconstructed from rounded metrics. Results therefore retain each evaluated total n and metric provenance; no fabricated denominator is supplied.

## Crop subset and shared misses

All images were reviewed for crop suitability: 83 cropped, 324 byte-identical. The crop table now pairs the 83 changed inputs by sample ID. For AIDE, 18 misses become detections and 2 detections become misses; FakeVLM has 13 and 8 respectively. Both directions are reported because aggregate deltas can hide prediction changes. Paired predictions are downloadable in [crop_paired_predictions.jsonl](../assets/crop_paired_predictions.jsonl).

These are descriptive comparisons of the supplied runs. Cropping can remove peripheral comments, platform marks or whitespace while changing input geometry and subsequent model preprocessing. No causal attribution solely to watermarks is made, and possible run variability is not isolated. Unknowns use the same mapping as the main results.

Thirty processed samples are missed by all ten displayed methods. These IDs appear in the results JSON, alongside sanitized predictions. This is descriptive of these configurations; it neither proves a shared failure mechanism nor means all future detectors will fail. Gallery examples retain their original selection and show model detection counts without selecting new images for low scores.

## PE model selection

The maintainer reports that 5% of the training data was held out for validation. Training ran for 10 epochs; `best` denotes the checkpoint with the highest validation accuracy. Benchmark sample selection did not use detector predictions. Exact training-data composition, weight hashes and the complete validation split are not supplied here; no broader training-overlap audit is claimed.

## Reproduce metrics without rerunning inference

The standalone [scorer](../scripts/score_predictions.py) accepts normalized predictions, validates unique IDs and reports counts/recall/FPR/unknowns. It requires no model or external data access. For example, after downloading this repository:

```bash
python scripts/score_predictions.py assets/processed_predictions.jsonl --method dda
```

This recomputes the released predictions (DDA: 148/407 detected); it does not independently authenticate the image files. Once the data manifest is available, add `--manifest /path/to/release_manifest.json` to require the same sample-ID set. See `--help` for normalized input format. It is a metric scorer, not a complete detector inference harness. Match the same frozen 407 sample IDs and explicitly report raw or processed.

Optional future experiments: calibrated Recall@FPR using a separate real calibration split; repeated-run controls if estimating variability or isolating crop mechanisms. Neither is required to use this release or requested as a mandatory rerun.
