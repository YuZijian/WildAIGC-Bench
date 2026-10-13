# Model settings in the supplied evaluation

These settings describe the supplied adapters, not a claim that every implementation exactly reproduces its original paper. Exact public checkpoint revisions/hashes and a pinned environment are not supplied; complete inference reproducibility remains incomplete. Internal filesystem paths and API credentials are not published.

| Method | Supplied configuration | Decision / caveat |
|---|---|---|
| DRCT | CLIP ViT-L/14; 224 center crop; ImageNet normalization; checkpoint basename `13_acc0.9664.pth` | fake score = 1 − softmax class 0 |
| DDA | DINOv2-L + LoRA; 336 center crop; CLIP normalization; `DDA_ckpt.pth` | sigmoid score |
| AIDE | ConvNeXt-XXLarge; resize 256; ImageNet normalization; five DCT views; `GenImage_train.pth` | softmax class 1; recorded batch size 8 |
| B-Free | DINOv2 ViT-B/14 reg4; five native patch-grid crops of size 504; ImageNet normalization; `model_epoch_best.pth` | sigmoid score; adapter default long-edge cap 2048 can downsample oversized inputs; no claim of universally resize-free inference |
| PE-336 / PE-518 | PE-Core-L14 with task head; project transforms at 336 / 518; `best_aggregate_model.pth` | sigmoid score; 5% training holdout, best validation accuracy over 10 epochs; full external transform definition and exact weights not provided |
| Qwen3.6-35B (API) | Supplied adapter describes Qwen3.6-35B-A3B; thinking disabled; Veritas system/user prompt | label-only; endpoint/backend revision not pinned |
| FakeVLM | LLaVA-based detector; checkpoint-bundled processor; bf16; greedy decoding, **64** new tokens in supplied code | generic prompt below; not verified as the original paper's recommended prompt |
| BusterX++ | Qwen2.5-VL-based detector; multiple choice A=real/B=fake with boxed answer | native prompt file is referenced but its exact contents are absent from this materials package |
| Veritas++ | Qwen3-VL-8B, merged LoRA per adapter; bf16; greedy, up to 1024 new tokens | processor compatibility shim is referenced but not supplied |

Visual detectors use `score > 0.5` for fake (strict inequality). Supplied source code takes precedence over prose summaries: FakeVLM's code uses 64 new tokens (summary said 256), and B-Free can cap large images at 2048 (summary said no resize). These describe supplied code; missing execution logs prevent confirming every runtime override.

FakeVLM user prompt:

> Is this image real or fake? Answer real or fake.

Qwen/Veritas system prompt:

> You are an expert visual analyst. Please think about the question as if you were a human pondering deeply. It's encouraged to include self-reflection or verification in the reasoning process. Then, give a final verdict within tags.

User prompt:

> Is this image real or fake?

FakeVLM parsing checks fake/real text; BusterX parsing checks boxed A/B with a fallback; Qwen/Veritas use verdict parsing. Error/unknown outputs are mapped to real and counted separately. Reproducing model predictions requires the exact weights, missing dependencies/prompts and parser implementation, beyond the metric scorer included here.
