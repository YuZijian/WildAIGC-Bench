# WildAIGC-Bench

Project: https://yuzijian.github.io/WildAIGC-Bench/
Dataset: https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench

407 human-reviewed AI images, raw and processed versions. 83 manually cropped, 324 unchanged. Raw bytes and exact crop regions are preserved in the dataset.

Static GitHub Pages site: `index.html`, `style.css`, `app.js`, `.nojekyll`, `assets/`. No build step.

## Current website

Neutral navy/slate styling; six maintainer-selected examples with raw/processed switching and large-image viewer; editable construction / statistics SVGs; two evaluation tables from the latest supplied 2026-10-12 snapshot.

`assets/evaluation_results.json` holds 11 methods, cross-benchmark accuracy and WildAIGC metrics. Missing measurements are null and left blank on the page. † marks sampled large-benchmark dimensions for large models. Averages use only completed benchmarks and exclude WildAIGC. The descriptive accuracy gap uses raw WildAIGC, as supplied.

`assets/sample_examples.json` records the six example IDs, exact-byte asset URLs, dimensions and crop status. Unchanged samples share an asset because raw and processed bytes are identical.

The technical report and real-image false-positive analysis are follow-up work. The website update does not rerun inference or modify the frozen dataset. ITW-SM remains an evaluated benchmark, not a resource download hosted here.

## Rights

See the dataset LICENSE for the distinction between maintainer metadata and third-party image rights. Examples retain their source links. Obtain external benchmark files from their respective authors under applicable access terms.
