<div align="center">

# WildAIGC-Bench

### AI images behind real news events and online claims.
### A hard test for today’s detectors.

**Broad Coverage · Timely Updates · Human-Verified Labels**

[**🤗 Dataset**](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) &nbsp; · &nbsp; [**Project page ↗**](https://yuzijian.github.io/WildAIGC-Bench/) &nbsp; · &nbsp; [**Results**](docs/detailed-results.md) &nbsp; · &nbsp; [**Paper ↗**](https://arxiv.org/abs/2610.28087)

</div>

WildAIGC-Bench brings together AI-generated and edited images tied to real news events and online claims, where fabricated content can mislead, enable scams or fuel public controversy. Scheduled tasks automatically collect, screen, and preliminarily annotate candidates across news websites, fact-checking sources, and related social media content. Human reviewers verify the annotations and perform quality control before inclusion. The collection preserves photographic appearance and the effects of actual online circulation.

| Broad Coverage | Timely Updates | Human-Verified Labels |
|:---|:---|:---|
| Collection spans news websites, fact-checking sources, and related social media content, covering public figures, social affairs, disasters, and varied forms of image generation and editing. | Scheduled tasks continually collect, screen, and preliminarily annotate new candidates. Human-reviewed additions will enter subsequent releases, while each published evaluation set remains fixed. | Human reviewers verify automatic annotations against image-specific evidence and perform quality control. Candidates with uncertain AI involvement or insufficient evidence are excluded. |

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

Dedicated visual detectors, multimodal large language models, and our PE-Det baselines all show lower recall on WildAIGC-Bench than their external benchmark mean.

![WildAIGC processed recall and external benchmark means where available](assets/recall_overview.svg?v=20261015-complete)

The figure compares WildAIGC processed recall with an equally weighted mean across the same nine external benchmarks. The highest displayed processed recall is 60.93%.

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

## A continuously operating construction pipeline

![Automatic collection, screening and preliminary annotation followed by human verification, quality control and continued releases](assets/construction_pipeline.svg?v=20261020)

1. **Automatic collection, screening, and preliminary annotation.** Scheduled tasks are already running. They gather newly circulating candidates from multiple websites, covering public figures, social affairs, disasters, and other widely discussed events. Preliminary annotations draw on source descriptions, creator disclosures, watermark evidence, and fact-checking findings.
2. **Human verification and quality control.** Human reviewers check automatic annotations against image-specific evidence and decide final inclusion. Candidates with insufficient evidence or uncertain AI involvement are excluded. Invisible-watermark evidence comes from results publicly reported by fact-checking organizations.
3. **Versioned releases and continued expansion.** Accepted images retain their acquired form, source links, and evidence summaries. Ongoing collection supplies future releases while each evaluation set remains fixed.

**No AI-image detectors are used for sample selection.** Source evidence is used to verify AI labels; detection is evaluated solely from the images. See the [construction and annotation protocol](docs/dataset.md) for details.

## Current release and what comes next

The current v1.0 release contains **407 verified AI-generated or edited images**, with 83 cropped images and 324 unchanged pairs. Linked source pages span **78 website hostnames**.

Future releases will add more samples and broaden event and source coverage. We also plan to add **real-image controls**, including original photographs underlying some AI recreations, enhancements, or edits. These source originals will be part of a broader real-image collection, supporting both paired comparisons and false-positive evaluation.

## Dataset profile

![Image short-edge resolution and recorded source website distribution](assets/dataset_profile.png?v=20261015)

Resolution is measured by the shorter edge in pixels. Source counts describe recorded report websites, not necessarily the original social platforms.

## Explore further

| Resource | What you will find |
|:---|:---|
| [Paper on arXiv](https://arxiv.org/abs/2610.28087) | Full methodology, experiments and appendix |
| [Hugging Face dataset](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) | Images, labels, context and dataset preview |
| [Project page](https://yuzijian.github.io/WildAIGC-Bench/) | Interactive examples, figures and dataset statistics |
| [Dataset guide](docs/dataset.md) | Construction overview, raw/processed semantics and metadata |
| [Evaluation guide](docs/evaluation.md) | Metrics, sampling and comparison scope |
| [Result tables](docs/detailed-results.md) | Per-benchmark performance and crop analysis |
| [Metric scorer](scripts/score_predictions.py) | Score your own normalized predictions |

PE-336 and PE-518 are our trained baselines, combining PE-Core-Large (Perception Encoder) with a classification head. Their names indicate input resolution. See the [evaluation guide](docs/evaluation.md) for training-data and inference details.

## Citation and feedback

Our paper is available on [arXiv](https://arxiv.org/abs/2610.28087). If you use WildAIGC-Bench, please cite:

```bibtex
@misc{yu2026wildaigcbench,
  title={WildAIGC-Bench: Can AI Image Detectors Handle the Wild? A Benchmark of Generated and Edited Images in Online Circulation},
  author={Zijian Yu and Hangwei Zhang and Jun Lan and Huijia Zhu and Weiqiang Wang and Jianfu Zhang},
  year={2026},
  eprint={2610.28087},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2610.28087}
}
```

Also report the dataset revision and image version used.

Read the dataset [LICENSE](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench/blob/main/LICENSE) for metadata licensing and third-party image rights. For corrections or rights concerns, [open an issue](https://github.com/YuZijian/WildAIGC-Bench/issues) with the relevant sample ID.

**If WildAIGC-Bench is useful to your research, consider starring this repository to follow the project.**

