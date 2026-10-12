# WildAIGC-Bench

A hard benchmark for AI-generated and edited image detection in real-world online circulation.

Project website: https://yuzijian.github.io/WildAIGC-Bench/
Dataset: https://huggingface.co/datasets/yuzj1997yzj/WildAIGC-Bench

## First release

407 human-accepted AI images; 83 manually cropped, 324 unchanged. Raw acquired files and processed crops are paired without resizing. The dataset is positive-only; AI-image recall is the primary standalone metric.

Dataset upload is underway. The technical report, formal citation and full evaluation settings are in preparation.

## Website contents

Buildless HTML/CSS/JS: `index.html`, `style.css`, `app.js`, `.nojekyll` and `assets/`.
Includes editable SVG construction / statistics figures, four accepted examples, a recall comparison chart and all four completed evaluation tables from the 2026-10-12 snapshot. Data are in `assets/evaluation_results.json` and `assets/statistics.json`.

The evaluation snapshot is supplied by the maintainer; website generation did not rerun model inference. Full and sampled results are distinguished. Pending runs are not filled in. Two additional standard benchmarks are planned; their results are not included.

For GitHub Pages: Settings → Pages → Deploy from a branch → main → / (root).

## Rights and external data

Images remain subject to applicable third-party rights. The dataset LICENSE distinguishes the maintainers' metadata from third-party images. ITW-SM files are not redistributed; obtain independent authorized access and cite the original work.

## Acknowledgment

The presentation was informed by the ITW-SM project page: https://mever-team.github.io/itw-sm/ . All displayed WildAIGC measurements and examples come from this project's frozen release and supplied evaluation snapshot.
