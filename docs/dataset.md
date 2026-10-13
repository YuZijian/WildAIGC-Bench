# Dataset construction and usage

[Project page](https://yuzijian.github.io/WildAIGC-Bench/) · [Dataset](https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench) · [Repository overview](../README.md)

## From event to accepted sample

1. Discover news events, fact-check reports and social-media claims involving potentially synthetic imagery.
2. Acquire the relevant media file and preserve the downloaded bytes, with available source references.
3. Check the correspondence between the image and claim, photographic appearance, evidence of generative involvement and evidence limitations.
4. Check raw-file SHA256 duplicates, review visual similarity and group related images/events. A group is not a guarantee that every image is an independent event.
5. Have two reviewers decide the authenticity label and, separately, release inclusion. Screening considers duplicates, sensitive content, unsuitable creative examples and image quality.
6. Inspect every accepted image for crop suitability. Preserve raw, save a crop only where needed, then freeze IDs, hashes and a versioned manifest.

The 407-image release includes only accepted candidates labeled `aigc`; evidence-only assets and rejected candidates are not detector inputs. Source findings are recorded rather than presented as independently repeated forensic tests.

## Human review and selection

The maintainers report that **two reviewers examined every one of the 407 accepted images**. They jointly resolved disagreements using image context and source evidence, retaining a sample only after reaching agreement with sufficient evidence. Accepted evidence included creator declarations, explicit detection of generation-platform watermarks (including SynthID or OpenAI-related signals), and fact-checking conclusions identifying AI involvement. Not every sample uses every evidence route, and the release does not claim independent repetition of every reported forensic test.

**Outputs of general-purpose AI-image detectors (including the compared methods) were never used for dataset inclusion. Generation-platform watermark tests used as provenance evidence are distinct from these detector predictions.** Manual screening excluded obvious artistic AI creations; low-quality cases included low resolution, extreme blur, severe truncation without a fuller source, and platform-added AI labels without an available clean version. No numerical quality cutoff was recorded. All 407 labels remain the accepted human annotations; this documentation update does not re-audit or relabel samples. Evidence and human judgments remain fallible; corrections should identify the sample and supporting source.

Internal records contain 320 related-sample groups; these are not a validated count of independent events. Group identifiers are not included in the public metadata. Sources are concentrated in news and fact-check coverage, so the set does not represent all internet AI imagery. A per-image complete generation/edit taxonomy was not established and is not retrospectively inferred from titles.

## Raw versus processed

Raw is the acquired online file, including any interface, comments, captions, watermarks or platform identifiers already present. It need not be the generator's first output.

Processed focuses on the target image where a rectangular crop is appropriate. Cropping may exclude peripheral comments, generation marks, platform identifiers or whitespace. It does not involve local erasure, inpainting, enhancement, resizing or resampling. Some cues may remain.

Every image was reviewed for whether cropping was needed. If no crop was applied, processed is byte-identical to raw. Where a crop exists, it is saved as a lossless PNG from raw raster coordinates. The crop box is `[x, y, width, height]`; no EXIF rotation is applied.

## Access status

As of 13 October 2026, the maintainer confirms the Hugging Face repository is private. Public access is pending. Loading examples become usable for the public after release; an exact public revision will then be recorded.

## Files in the Hugging Face release

- `raw/` and `processed/`: the paired 407-image files.
- `data/test-*.parquet`: two image columns plus core metadata, configured as the `default/test` split for preview and loading.
- `metadata.jsonl` and `samples.csv`: the same 11 core metadata fields, with native arrays in JSONL.
- `release_manifest.json`: sample IDs, paths, SHA256 hashes, dimensions and crop coordinates.
- `checksums.sha256`, `validation.json` and `SOURCE_GAPS.txt`: file integrity and known provenance gaps.
- `README.md` and `LICENSE`: usage and component-specific rights information.

The 11 metadata fields are `sample_id`, `label`, `title`, `background`, `evidence_summary`, `source_page_url`, `image_url`, `social_source_urls`, `reference_urls`, `raw_path`, and `processed_path`.

A recorded source page may be a news or fact-check report. It is not necessarily the original social post. Missing references remain empty; expired signed acquisition URLs have signing parameters omitted and may not resolve. Source gaps are documented in the release.

## Exact-byte loading

```python
import hashlib
import json
from datasets import Image, load_dataset
from huggingface_hub import hf_hub_download

repo = "yuzj1997yzj/WildAIGC-Bench"
# Replace main with a published release commit when recording an evaluation.
revision = "main"
ds = load_dataset(repo, revision=revision, split="test")
ds = ds.cast_column("processed_image", Image(decode=False))
manifest_path = hf_hub_download(repo, "release_manifest.json", revision=revision, repo_type="dataset")
with open(manifest_path) as f:
    manifest = json.load(f)
expected = {r["sample_id"]: r["processed_sha256"] for r in manifest["samples"]}
item = ds[0]
assert hashlib.sha256(item["processed_image"]["bytes"]).hexdigest() == expected[item["sample_id"]]
```

Use one pinned revision consistently for images, metadata and the manifest. Do not use test images for training or threshold selection when reporting benchmark performance.
