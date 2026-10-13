# WildAIGC-Bench

**A hard benchmark for AI-generated and edited image detection in real-world online circulation.**

[Project page](https://yuzijian.github.io/WildAIGC-Bench/) · [Dataset on Hugging Face](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) · [Evaluation notes](docs/evaluation.md) · [Construction and data format](docs/dataset.md) · [Issues](https://github.com/YuZijian/WildAIGC-Bench/issues)

The first release contains **407 human-reviewed AI images** connected to news events and social-media claims. Each sample includes recorded source references and evidence context. The collection targets photographic-looking content acquired from actual online circulation, rather than recreating propagation effects with a synthetic degradation recipe.

The dataset is currently private on Hugging Face; public release is pending. The technical report and formal paper citation are in preparation. This repository provides documentation, project-page source, reusable figures, example assets and structured evaluation results. The prepared full image release is stored on Hugging Face but is not yet publicly accessible.

## Dataset at a glance

- **Positive-only test set:** all 407 accepted samples are labeled `aigc`. Standalone accuracy therefore equals AI-image recall; separate real-image controls are needed for false-positive rates and complete binary metrics.
- **Human review throughout:** two reviewers checked every image and resolved disagreements using context and source evidence. General-purpose AI-image detector outputs were never used for inclusion; generation-platform watermark tests served as provenance evidence. All images were inspected for crop suitability.
- **Raw and processed versions:** raw preserves acquired bytes. Processed uses a rectangular crop of the target where needed, without resizing, inpainting or enhancement; otherwise it is byte-identical to raw.
- **Traceable context:** compact metadata records the image, claim, available evidence, limitations and source links. A separate manifest records dimensions, crop coordinates and hashes.
- **Frozen v1.0:** sample IDs and file hashes identify the release. Additional collection or corrections should use a new version and a changelog.

[Explore the six interactive examples on the project page →](https://yuzijian.github.io/WildAIGC-Bench/#dataset)

## Load the dataset

After the maintainer makes the Hugging Face repository public (or with authorized access):

```python
from datasets import load_dataset

ds = load_dataset("yuzj1997yzj/WildAIGC-Bench", split="test")
sample = ds[0]
image = sample["processed_image"]  # default evaluation input
print(sample["sample_id"], sample["label"])
```

The `raw_image` column provides the acquired version. Both columns contain the corresponding original file bytes; decoded display size is not a benchmark transformation. Specify the version used when reporting results.

See [dataset format and provenance notes](docs/dataset.md) for fields, crop semantics, source gaps and exact-byte verification.

## Collection and release workflow

![Construction workflow](assets/construction_workflow.svg)

Discover an event → acquire relevant media → check image–claim correspondence and evidence → check duplicates and group related samples → human annotation and admission → crop where needed and freeze a release manifest.

The collection does not claim to reconstruct every image's complete reposting or compression history. Reported source findings and their limitations remain distinct from the final human annotation.

## Dataset statistics

![Raw and processed image dimensions](assets/resolution_distribution.svg)

[Source-website distribution](assets/source_website_distribution.svg) · [Statistics JSON](assets/statistics.json)

Source-website counts refer to recorded reports or fact-check pages, not necessarily the earliest publisher or original social platform. Counts are per image, not independent event counts.

## Evaluation snapshot — 13 October 2026

![Comparable fake-class recall](assets/recall_comparison.svg)

Ten selected configurations have lower recall on WildAIGC processed than on ITW-SM fake images. The page now reports the **same fake-class recall metric**, with ITW-SM real-image FPR beside it. No mixed-class accuracy-minus-recall gap is used. Thirty processed images are missed by all ten displayed methods. These observations do not establish a causal degradation mechanism.

[Full tables](https://yuzijian.github.io/WildAIGC-Bench/#evaluation) · [Protocol](docs/evaluation.md) · [Model settings](docs/model-settings.md) · [Results JSON](assets/evaluation_results.json) · [Processed predictions](assets/processed_predictions.jsonl)

Processed and retained ITW-SM records were recomputed without new inference. Raw results and AIDE ITW-SM are supplied aggregates. Raw per-image records were overwritten, so paired crop transitions are unavailable. Unknown outputs are reported and treated as real under the supplied scoring policy.

## Repository contents

```text
index.html / style.css / app.js   Project page and interactive examples
docs/dataset.md                  Construction, format and usage notes
docs/evaluation.md               Benchmark groups and evaluation caveats
assets/evaluation_results.json   Current displayed measurements
assets/statistics.json           Frozen-release statistics
assets/*.svg                     Editable construction and distribution figures
assets/sample_examples.json      Six example IDs and paired asset references
```

A standalone metric scorer is in `scripts/score_predictions.py`. Model configuration notes document known settings and missing details; the full inference harness and technical report are not yet released. ITW-SM real-image FPR is available; matched-FPR calibration is future work.

## Citation, rights and corrections

Formal citation will be added with the technical report. For now, cite **WildAIGC-Bench v1.0**, the repository URL and the exact revision used.

See the dataset's [LICENSE](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench/blob/main/LICENSE) for the distinction between maintainer-authored metadata and third-party image rights. Image source attribution is not a blanket image license. External benchmarks remain subject to their authors' access terms.

Use [repository issues](https://github.com/YuZijian/WildAIGC-Bench/issues) for corrections, rights concerns and reproducibility questions; include sample IDs or the relevant result configuration.
