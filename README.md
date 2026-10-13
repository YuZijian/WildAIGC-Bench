# WildAIGC-Bench

**An evidence-linked benchmark of AI-generated and edited images documented in real online circulation.**

[Project page](https://yuzijian.github.io/WildAIGC-Bench/) · [Dataset on Hugging Face](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) · [Detailed results](docs/detailed-results.md) · [Evaluation protocol](docs/evaluation.md)

WildAIGC-Bench v1.0 contains **407 human-reviewed AI images** associated with real news events and social-media claims. It focuses on photographic-looking content acquired from online circulation, with source references and paired raw / processed versions.

**Release status:** the dataset is publicly available on Hugging Face. The technical report is in preparation.

## What makes it useful?

- **Real online circulation.** Images come from news and social-media contexts, without applying synthetic degradation to construct the benchmark.
- **Two reviewers, every image.** Inclusion is based on source evidence and reviewer consensus, without consulting general-purpose detector predictions.
- **A challenging evaluation.** Among the ten displayed configurations, the highest processed recall is **54.05%**; **30 of 407** processed images are missed by all ten.
- **Traceable, paired files.** Raw preserves the acquired bytes. Processed crops the target region where needed, removing surrounding comments, platform marks or other extraneous content without resizing. Uncropped pairs are byte-identical.

[View six examples and enlarge them on the project page →](https://yuzijian.github.io/WildAIGC-Bench/#dataset)

## Results at a glance

![AI-image recall on WildAIGC-Bench and external benchmarks](assets/recall_overview.svg)

The figure compares processed AI-image recall with the equally weighted mean recall on the nine external benchmarks evaluated by all displayed methods. These are different image collections, so the gap is a descriptive comparison, not an isolated measure of propagation loss.

Results reflect each model’s evaluated configuration and decision rule. Higher recall alone does not imply better overall detection performance; consult the external real-image FPR results in the [detailed tables](docs/detailed-results.md).

**WildAIGC-Bench is positive-only:** accuracy equals AI-image recall. Unknown predictions count as misses. Real-image false-positive rates and additional results are reported separately.

[WildAIGC results](https://yuzijian.github.io/WildAIGC-Bench/#evaluation) · [All detailed tables](docs/detailed-results.md) · [Protocol and metric definitions](docs/evaluation.md) · [Model settings](docs/model-settings.md)

PE-336 and PE-518 are our trained baselines: a pretrained **PE-Core-Large (Perception Encoder)** backbone with a classification head, using 336 × 336 and 518 × 518 inputs respectively. Further training details will accompany the technical report.

## Quick start

Load the publicly available dataset:

```python
from datasets import load_dataset

ds = load_dataset("yuzj1997yzj/WildAIGC-Bench", split="test")
sample = ds[0]
image = sample["processed_image"]
print(sample["sample_id"], sample["label"])
```

Use `processed_image` for the processed evaluation and `raw_image` for the acquired version. Report the dataset revision, image version and decision threshold alongside results. See [data format and provenance](docs/dataset.md) for metadata fields, crop coordinates and file hashes.

## Construction

![Discover, trace evidence, deduplicate, human review, freeze release](assets/construction_illustrated.png)

Source evidence supports human annotation; **detectors receive images alone**. The collection does not reconstruct complete reposting or compression histories. Read the [construction and data documentation](docs/dataset.md) for the full protocol, and the [project page](https://yuzijian.github.io/WildAIGC-Bench/#statistics) for resolution and source distributions.

## Repository guide

| Location | Contents |
|---|---|
| [Project page](https://yuzijian.github.io/WildAIGC-Bench/) | Overview, examples, key results and dataset statistics |
| [docs/dataset.md](docs/dataset.md) | Construction, data format and usage |
| [docs/detailed-results.md](docs/detailed-results.md) | Full evaluation tables, including crop analysis and real-image FPR |
| [docs/evaluation.md](docs/evaluation.md) | Evaluation protocol, metrics and limitations |
| [docs/model-settings.md](docs/model-settings.md) | Detector configurations and known settings |
| [scripts/score_predictions.py](scripts/score_predictions.py) | Standalone metric scorer |
| `index.html`, `style.css`, `app.js`, `assets/` | Homepage source, figures and example assets |

The full inference harness is not yet released. Benchmark images are distributed through the Hugging Face dataset rather than this repository.

## Citation and rights

A formal citation will accompany the technical report. For now, reference **WildAIGC-Bench v1.0**, this repository and the exact revision used.

The dataset [LICENSE](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench/blob/main/LICENSE) distinguishes maintainer-authored metadata from third-party image rights. Source attribution does not grant blanket rights to redistribute third-party images; external benchmarks retain their own access terms.

For corrections, rights concerns or reproducibility questions, [open an issue](https://github.com/YuZijian/WildAIGC-Bench/issues) with the relevant sample ID or evaluation configuration.
