# Dataset guide

[Dataset on Hugging Face](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) · [Repository](../README.md) · [Evaluation](evaluation.md)

## Collection and annotation

WildAIGC-Bench v1.0 contains 407 human-annotated AI-generated or edited images. Collection follows event discovery, source/evidence review, duplicate checking, manual confirmation and release selection.

- **Real events, real-world risks.** Images are tied to real news events and online claims, focusing on fabricated content that may mislead, enable scams or fuel public controversy. A real event or circulation context does not mean the scene depicted in an image actually occurred.
- **Human-verified, evidence-supported.** Every retained image is manually confirmed with evidence of AI generation or editing, including creator disclosures, visible generation marks, detected platform watermarks or documented fact-check findings. General-purpose detector predictions were not used for inclusion.
- **Real circulation, complex degradation.** The collection preserves effects encountered in actual web and social-media circulation, including compression, screen capture and rephotography, creating a challenging setting for image detection.

Selection favors ordinary photographic appearance and excludes overtly stylized artwork, unsuitable image quality and redundant samples. This is a curated challenge set concentrated in news and fact-check contexts. Source references support annotation, while detector evaluation uses images alone. Recorded source evidence does not imply every forensic test was independently repeated by the maintainers.

## Raw and processed

`raw` preserves the acquired online file, which need not be the generator’s first output. `processed` is a rectangular crop of the target region where appropriate, removing peripheral comments, platform marks or whitespace. No resizing, resampling, inpainting or enhancement is applied. When no crop is needed, processed is byte-identical to raw.

Crop boxes are `[x, y, width, height]` in decoded raw raster coordinates without EXIF rotation. Crops are saved as lossless PNGs. Raw/processed dimensions, coordinates and SHA256 hashes are recorded in the manifest.

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
