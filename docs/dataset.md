# Dataset guide

[Dataset on Hugging Face](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) · [Repository](../README.md) · [Evaluation](evaluation.md)

## Collection and annotation

WildAIGC-Bench v1.0 contains 407 human-annotated AI-generated or edited images from documented news events and online claims. Collection follows event discovery, source/evidence review, duplicate checking, manual confirmation and release selection.

Each retained label is supported by source evidence, such as creator disclosures, detected generation-platform watermarks or documented fact-check findings. General-purpose detector predictions were not used for inclusion. Source reports do not imply that every forensic test was independently repeated by the maintainers.

Selection favors ordinary photographic appearance and excludes overtly stylized artwork, unsuitable image quality and redundant samples. This is a curated challenge set, concentrated in news and fact-check contexts; it does not represent the full distribution of online AI imagery. Source references support annotation, while detector evaluation uses images alone.

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
