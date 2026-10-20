<div align="center">

# WildAIGC-Bench

### AI images behind real news events and online claims.
### A hard test for today’s detectors.

**407 human-annotated AI images · Real online circulation · Photographic appearance**

[**🤗 Dataset**](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) &nbsp; · &nbsp; [**Project page ↗**](https://yuzijian.github.io/WildAIGC-Bench/) &nbsp; · &nbsp; [**Results**](docs/detailed-results.md) &nbsp; · &nbsp; **Technical report — coming soon**

</div>

WildAIGC-Bench brings together AI-generated and edited images tied to real news events and online claims, where fabricated content can mislead, enable scams or fuel public controversy. Every label is manually confirmed with AI evidence. The collection preserves the complex degradation encountered in actual internet and social-media circulation.

| Real events, real-world risks | Human-verified, evidence-supported | Real circulation, complex degradation |
|:---|:---|:---|
| AI imagery tied to news events and online claims, focusing on potential misinformation, scams and public controversy. | Each image is manually confirmed using creator disclosures, generation watermarks or documented evidence of AI involvement. | Actual compression, screen capture and rephotography introduce complex propagation effects that challenge current detectors. |

## A look at the collection

<table>
<tr>
<td align="center" width="33%"><img src="assets/img_0fe24cc6e96245b8-processed.png" height="190" alt="AI-edited retail poster"><br><sub>Retail poster</sub></td>
<td align="center" width="33%"><img src="assets/img_1b3026fd893bf218-raw.jpg" height="190" alt="AI-generated parcels scene"><br><sub>Everyday scene</sub></td>
<td align="center" width="33%"><img src="assets/img_2bb3885c6b59817a-raw.jpg" height="190" alt="AI-edited football spectator"><br><sub>Local image editing</sub></td>
</tr>
<tr>
<td align="center"><img src="assets/img_6cfd077cd16360a7-raw.jpg" height="190" alt="Fabricated celebrity wedding"><br><sub>Celebrity event</sub></td>
<td align="center"><img src="assets/img_2662f72eae79741a-raw.jpg" height="190" alt="AI-generated public-event formation"><br><sub>Public-event claim</sub></td>
<td align="center"><img src="assets/img_eef641f81db6498b-raw.jpg" height="190" alt="AI-generated urban queue"><br><sub>Urban scene</sub></td>
</tr>
</table>

Illustrative processed examples. [Enlarge images and explore their source context →](https://yuzijian.github.io/WildAIGC-Bench/#dataset)

## How do detectors perform?

The WildAIGC comparison includes Qwen3.8-27B and GLM-5.3-Flash alongside classification and multimodal detectors.

Under real circulation conditions, these images present a clear challenge across the evaluated detectors.

![WildAIGC processed recall and external benchmark means where available](assets/recall_overview.svg?v=20261015-complete)

The figure compares WildAIGC processed recall with an equally weighted mean across the same nine external benchmarks. Qwen3.8-27B and GLM-5.3-Flash now include all external benchmarks, using sampled evaluation where indicated. The highest displayed processed recall is 60.93%.

**WildAIGC is positive-only.** Higher recall alone does not establish better overall detection performance. Balanced accuracy (BAcc), real-image FPR, raw/processed results and the 83-image paired crop analysis are available in the [full results](docs/detailed-results.md); see the [evaluation protocol](docs/evaluation.md) for metric definitions and sampling scope.

The [paper-aligned tables](docs/detailed-results.md) cover all 16 configurations. External mean recall averages nine benchmarks; mean BAcc and FPR average the eight with real images. ITW-SM uses all 10,000 images for every method.

## Get started

```python
from datasets import load_dataset

ds = load_dataset("yuzj1997yzj/WildAIGC-Bench", split="test")
image = ds[0]["processed_image"]
print(ds[0]["sample_id"], ds[0]["label"])
```

- **Processed:** target-region crop where needed, with no resizing; otherwise identical to raw.
- **Raw:** the acquired online file.
- **Metadata:** labels, event context, evidence summaries and source links.

Report the dataset revision and image version used. See [data format and usage](docs/dataset.md) for the file layout and integrity checks.

## From online circulation to a benchmark

![Collection, evidence review, human annotation and image provenance](assets/construction_pipeline.png?v=20261015)

Source context supports manual annotation; **evaluated detectors receive images alone**. General-purpose detector outputs were not used to select samples. This is a curated challenge set, not an estimate of the entire internet’s AI-image distribution.

## Dataset profile

![Image short-edge resolution and recorded source website distribution](assets/dataset_profile.png?v=20261015)

Resolution is measured by the shorter edge in pixels. Source counts describe recorded report websites, not necessarily the original social platforms.

## Explore further

| Resource | What you will find |
|:---|:---|
| [Hugging Face dataset](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) | Images, labels, context and dataset preview |
| [Project page](https://yuzijian.github.io/WildAIGC-Bench/) | Interactive examples, figures and dataset statistics |
| [Dataset guide](docs/dataset.md) | Construction overview, raw/processed semantics and metadata |
| [Evaluation guide](docs/evaluation.md) | Metrics, sampling and comparison scope |
| [Result tables](docs/detailed-results.md) | Per-benchmark performance and crop analysis |
| [Metric scorer](scripts/score_predictions.py) | Score your own normalized predictions |

PE-336 and PE-518 are our trained baselines, combining PE-Core-Large (Perception Encoder) with a classification head. Their names indicate input resolution. See the [evaluation guide](docs/evaluation.md) for training-data and inference details.

## Citation and feedback

The technical report and formal citation are in preparation. For now, cite **WildAIGC-Bench v1.0**, this repository and the dataset revision used.

Read the dataset [LICENSE](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench/blob/main/LICENSE) for metadata licensing and third-party image rights. For corrections or rights concerns, [open an issue](https://github.com/YuZijian/WildAIGC-Bench/issues) with the relevant sample ID.

**If WildAIGC-Bench is useful to your research, consider starring this repository to follow the project.**

