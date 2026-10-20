# Dataset guide

[Dataset on Hugging Face](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) · [Repository](../README.md) · [Evaluation](evaluation.md)

## Collection and annotation

WildAIGC-Bench combines a continuously operating construction pipeline with human verification and quality control. Collection spans news websites, fact-checking sources, and related social media content, covering public figures, social affairs, disasters, and other widely discussed events.

### Automatic collection, screening, and preliminary annotation

Scheduled tasks are already running: they collect potential AI-generated or edited images, perform initial screening, and prepare preliminary annotations using source descriptions, creator disclosures, watermark evidence, and fact-checking findings. Recurring collection brings newly circulating material into the candidate pool, supporting timely updates and diverse event coverage. Automatic annotations remain provisional until human review.

### Human verification and quality control

Human reviewers verify the automatic annotations and decide whether each sample enters the benchmark. Evidence must establish AI generation or editing of the target image; a false event claim alone is insufficient. Accepted evidence includes creator disclosures, visible platform watermarks, and explicit fact-checking findings. Invisible-watermark evidence is based on detection results publicly reported by fact-checking organizations, rather than independent watermark-tool runs by the team.

Candidates with insufficient evidence or uncertain AI involvement are excluded. Quality control also removes redundant samples, overtly stylized artwork, and unusable images, while retaining real circulation effects such as compression, screenshots, and recapture. No AI-image detectors are used for sample selection.

Each accepted image has a source webpage link and an evidence summary. Source evidence is used to verify AI labels; detection is evaluated solely from the images. A documented circulation context does not establish that the depicted event actually occurred.

## Versioned release and continued expansion

The current v1.0 release contains **407 verified AI-generated or edited images**, with source pages spanning **78 website hostnames**. It is a curated positive-only challenge set focused on photographic imagery from news events and online claims.

Ongoing candidate collection is separate from this fixed evaluation set. New candidates undergo human verification and quality control before inclusion in a subsequent release, and evaluation results remain tied to a fixed version.

Future releases will broaden event and source coverage and add more AI images and real-image controls. Planned real images include, but are not limited to, original photographs underlying some AI recreations, enhancements, or edits. This will support paired source-image comparisons and false-positive evaluation.

## Raw and processed

`raw` preserves the acquired online file, which need not be the generator’s first output. `processed` is a rectangular crop of the target region where appropriate, removing peripheral comments, platform marks or whitespace. No resizing, resampling, inpainting or enhancement is applied. There are 83 cropped images and 324 unchanged pairs. When no crop is needed, processed is byte-identical to raw.

Crop boxes are `[x, y, width, height]` in decoded raw raster coordinates without EXIF rotation. Crops are saved as lossless PNGs. Raw/processed dimensions, coordinates and SHA256 hashes are recorded in the manifest.

### Why remove peripheral text?

In the Imran Khan hospital-arrival example, the acquired screenshot includes the uploader's AI-enhancement disclosure and a comment calling the image fake. [Soch Fact Check](https://www.sochfactcheck.com/viral-image-of-imran-khan-in-an-ambulance-at-shifa-hospital-is-ai-generated/) separately reports a positive SynthID detection supporting the label. MLLMs can read the peripheral text and potentially infer the label without detecting manipulation in the target image, giving them an advantage over visual detectors focused on image features. Cropping removes these direct clues and supports a more comparable assessment of the target content. Both versions remain available for evaluation.

## Files and loading

The dataset is publicly available on Hugging Face.

| File | Contents |
|---|---|
| `raw/`, `processed/` | Paired benchmark images |
| `data/test-*.parquet` | Dataset Viewer and `load_dataset` input, including both image columns |
| `metadata.jsonl`, `samples.csv` | Labels, context, evidence and source links |
| `release_manifest.json` | Version, sample IDs, image hashes, dimensions and crop coordinates |
| `checksums.sha256`, `validation.json` | File integrity and validation summary |
| `SOURCE_GAPS.txt` | Missing or expired source references |
| `LICENSE` | Metadata licensing and third-party image rights |

```python
from datasets import load_dataset

ds = load_dataset("yuzj1997yzj/WildAIGC-Bench", split="test")
image = ds[0]["processed_image"]
```

Metadata fields are `sample_id`, `label`, `title`, `background`, `evidence_summary`, `source_page_url`, `image_url`, `social_source_urls`, `reference_urls`, `raw_path` and `processed_path`. Parquet additionally contains `raw_image` and `processed_image` with the corresponding file bytes. The configuration is `default`, split `test`.

A recorded source page may be a report rather than the original social post. Acquisition URLs and reference links may expire; missing values remain empty. Evidence summaries and source links are retained for inspection and corrections. For screenshots or composites, the label concerns the target AI-generated/edited content.

Use one pinned dataset revision consistently, identify the evaluated image version, and retain sample IDs when scoring. Do not use test images for training or threshold selection. Report corrections or rights concerns through [repository issues](https://github.com/YuZijian/WildAIGC-Bench/issues).

