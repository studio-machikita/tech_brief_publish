<!--
---
title: "Tech News Radio — 2026-08-12"
subtitle: "ONESTRUCTION、AWS GenAIICと石垣IDS基盤モデルを構築 / GitHub Copilot for JetBrains、Copilot..."
date: "2026-08-12"
vol: 134
topics:
  - AI
  - Cloud
  - DevOps
  - LLM
  - Hardware
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-08-12

*📖 約10分で読めます ｜ 🏷️ AI, Cloud, DevOps, LLM, Hardware*

---

## 📌 今日のハイライト
- 🤖 **ONESTRUCTION、AWS GenAIICと石垣IDS基盤モデルを構築** — 建設特化AI「Ishigaki-IDS」をAWSと共同構築
- 🤖 **GitHub Copilot for JetBrains、Copilotのメモリ機能とOllamaに対応** — JetBrains版Copilotに記憶機能とOllama連携が追加
- 🤖 **マルチモーダル大規模言語モデルのための統合ハルシネーションファジング** — マルチモーダルAIの幻覚を評価する新フレームワーク
- 🤖 **SiTime CEO、AIデータセンターでの役割とルネサスとの提携について語る** — SiTime、AI需要でタイミング半導体が急成長
- 🤖 **BM25を使用してCodexのトークンの消費を30%抑える** — BM25でCodexのトークン消費を30%削減
- 🤖 **評価的AIのための議論的基盤に向けて** — 評価型AIに議論理論で説明性と反論性を持たせる提案

---

## 🤖 ONESTRUCTION、AWS GenAIICと石垣IDS基盤モデルを構築
`AI` `Cloud`

<details>
<summary>📄 原題: How ONESTRUCTION built the Ishigaki-IDS foundation model with AWS GenAIIC</summary>
</details>

> **一言で**: 建設特化AI「Ishigaki-IDS」をAWSと共同構築

- ONESTRUCTIONがAWS Generative AI Innovation Centerの技術支援で開発
- 建設・BIM（建物情報モデリング）業務に特化した基盤モデル「Ishigaki-IDS」
- 合成データと3段階の学習パイプラインを採用
- 検証可能な報酬（verifiable rewards）をAmazon EC2上で活用
- データが少ない建設分野で専用モデルを構築した事例

💡 **なぜ重要か**
建設業界はデータが少なく、AI活用が難しい分野と見られています。汎用の大規模言語モデルでは業界特有の図面や仕様の理解が難しいため、専用モデルの需要が高まっています。今回の事例は、データが乏しい領域でも工夫次第で高精度な基盤モデルを作れることを示しています。 特定業界に特化した基盤モデルの開発手法が広がれば、製造業や医療などデータが限られる他分野にも応用が進むと考えられます。クラウド事業者による技術支援モデルも今後の標準的な協業形態になりそうです。

🎯 **今日のアクション**
自社データが少ない場合は合成データの活用や段階的な学習パイプラインの設計を検討すべきです。AWSなどのクラウド事業者が提供する技術支援プログラムの活用も有効な選択肢です。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/how-onestruction-built-the-ishigaki-ids-foundation-model-with-aws-genaiic/)

---

## 🤖 GitHub Copilot for JetBrains、Copilotのメモリ機能とOllamaに対応
`AI` `DevOps`

<details>
<summary>📄 原題: Copilot memory and Ollama in GitHub Copilot for JetBrains</summary>
</details>

> **一言で**: JetBrains版Copilotに記憶機能とOllama連携が追加

- 会話内容を記憶する永続メモリー機能を導入
- Ollamaによるローカルモデルへのアクセスに対応
- 企業向けの管理機能を強化
- 日常のチャット操作の使いやすさを改善
- MCPサーバー関連の信頼性問題を解消

💡 **なぜ重要か**
GitHub CopilotはJetBrains系IDEでも使われており、開発者の作業効率を左右する重要な機能です。特にローカルモデル対応は、社外にコードを送りたくない企業のニーズに応えるものと見られています。 AIコーディング支援ツールがクラウド依存から脱却し、ローカル実行との併用が広がる可能性があります。企業のセキュリティ要件に合わせた選択肢が増えそうです。

🎯 **今日のアクション**
JetBrainsユーザーは新しいメモリー機能とOllama連携を試し、社内のセキュリティ方針に合う使い方を検討するとよいでしょう。

🔗 [原文を読む](https://github.blog/changelog/2026-08-11-copilot-memory-and-ollama-in-github-copilot-for-jetbrains)

---

## 🤖 マルチモーダル大規模言語モデルのための統合ハルシネーションファジング
`AI` `LLM`

<details>
<summary>📄 原題: Unified Hallucination Fuzzing for Multimodal Large Language Models</summary>
</details>

> **一言で**: マルチモーダルAIの幻覚を評価する新フレームワーク

- MLLM（マルチモーダル大規模言語モデル）の幻覚問題を評価する新手法を提案
- 既存の静的ベンチマークは分類の網羅性が低く性能が飽和しやすい課題あり
- 現実の変化するシナリオでのモデルの頑健性を測る評価枠組みを構築

💡 **なぜ重要か**
MLLMは画像やテキストを組み合わせて理解しますが、実際には存在しない内容を答える幻覚が起きます。高リスクな用途で使うには、この問題への信頼できる評価方法が欠けていました。 評価手法が標準化されれば、企業がMLLMを医療や自動運転などの分野に安心して導入しやすくなると見られています。逆に評価が不十分だと誤った出力への対策が後手に回るリスクがあります。

🎯 **今日のアクション**
MLLMを使う開発者は、静的ベンチマークだけでなく多様なシナリオでの検証を取り入れるべきです。新しい評価フレームワークの動向を追い、自社の評価プロセスに反映することが大切です。

🔗 [原文を読む](https://arxiv.org/abs/2608.07525)

---

## 🤖 SiTime CEO、AIデータセンターでの役割とルネサスとの提携について語る
`AI` `Hardware`

<details>
<summary>📄 原題: SiTime CEO on Role in AI Data Centers, Renesas Deal</summary>
</details>

> **一言で**: SiTime、AI需要でタイミング半導体が急成長

- SiTimeのCEOがAI需要と売上高の急成長について語る
- 売上高は前年比で三桁成長という驚異的なペース
- 同社の技術はデータセンター内の時刻同期を担う
- TPU、GPU、スイッチ、光モジュールなど幅広く対応
- Renesasとの提携についても話題に上ったそうです

💡 **なぜ重要か**
AIデータセンターの規模拡大で、内部の各部品を正確に同期させる技術の重要性が増しています。SiTimeのタイミング半導体（水晶発振器に代わる精密な時刻制御チップ）は、GPUやTPU、スイッチ間のズレを抑え、処理性能とコスト効率を両立させる役割を担っているそうです。 AIインフラの高速化が進むほど、タイミング精度の要求は一段と厳しくなると見られています。半導体サプライチェーンの中でも、こうした地味だが不可欠な部品メーカーの存在価値が高まっていく可能性があります。

🎯 **今日のアクション**
データセンターやハードウェア関連のエンジニアは、AI需要が半導体サプライチェーンの上流にどう波及しているかを把握しておくとよいでしょう。

🔗 [原文を読む](https://www.bloomberg.com/news/videos/2026-08-11/sitime-ceo-on-role-in-ai-data-centers-renesas-deal-video)

---

## 🤖 BM25を使用してCodexのトークンの消費を30%抑える
`AI` `LLM`

> **一言で**: BM25でCodexのトークン消費を30%削減

- ナレッジセンスがコード探索にBM25を組み込んで検証
- 論文『BM25 Wins at Scale』が検証のきっかき
- Claude CodeやCodexのファイル検索が多くのトークンを消費
- 自社コードベースで回答品質とトークン消費の変化を計測

💡 **なぜ重要か**
コーディングエージェントはファイル検索にシンプルなキーワード検索を使い、トークンを多く消費する傾向があるそうです。BM25は文書検索で使われる古典的なアルゴリズムで、単語の出現頻度などから関連度を計算します。これをコード探索に応用することで、検索精度を保ちながらトークン消費を抑えられるか検証したと見られています。 AIコーディングツールの運用コストは利用量に応じて増えるため、トークン消費の削減は実務上重要です。BM25のような軽量な検索手法を組み合わせる工夫は、他のコーディングエージェントにも広がる可能性があります。

🎯 **今日のアクション**
自社でコーディングエージェントを使う場合は、検索方式の見直しでコスト削減ができるか検討するとよいでしょう。BM25のような既存技術の応用例として、この検証結果を参考にすることをおすすめします。

🔗 [原文を読む](https://zenn.dev/knowledgesense/articles/9e55a3bb67729c)

---

## 🤖 評価的AIのための議論的基盤に向けて
`AI` `Science`

<details>
<summary>📄 原題: Towards an Argumentative Foundation for Evaluative AI</summary>
</details>

> **一言で**: 評価型AIに議論理論で説明性と反論性を持たせる提案

- Evaluative AI（EAI）は単一の推奨でなく複数の仮説と根拠を提示する手法
- 本論文は計算論的argumentation（議論理論）をEAIの理論的基盤に据える立場を示す
- 説明可能で反論可能なEAIの形式的・計算可能な土台づくりを目指す
- 長期的な研究の方向性を示すポジションペーパーという位置づけ

💡 **なぜ重要か**
AIの意思決定支援では、単一の答えを出すより複数の仮説と根拠を示す方が人間の判断を助けやすいと考えられています。ただ、こうした評価型のAIをどう理論的に組み立てるかは未整理でした。計算論的argumentation（議論理論）は、賛成・反対の根拠を構造化して扱う分野で、EAIが目指す説明性や反論可能性と自然に噛み合う考え方です。 AIの判断根拠を人間が検証しやすくする仕組みが整えば、医療や法律など高リスク分野でのAI活用がより受け入れられやすくなります。単一の正解を出すAIから、複数の視点を提示し人間が最終判断を下すAIへと、設計思想の転換が進む可能性があります。

🎯 **今日のアクション**
AIシステムに説明責任を求められる開発者は、議論理論の基本概念を学んでおくと役立ちます。意思決定支援ツールを設計するリーダーは、単一予測だけでなく根拠の提示方法も検討材料に加えるべきです。

🔗 [原文を読む](https://arxiv.org/abs/2608.07473)

---

## 📝 まとめ

この3つのニュースに共通するのは、汎用的な大規模言語モデルから、特定領域や利用文脈に最適化されたAIへと進化のフェーズが移行しているという流れです。ONESTRUCTIONの建設特化モデルは業界固有知識への特化を示し、Copilotのメモリ機能やローカルLLM(Ollama)対応は開発者個人の作業文脈への適応を志向しており、いずれも「汎用性」から「個別最適化」への重心移動を体現しています。同時に、マルチモーダルLLMのハルシネーション評価フレームワークは、こうした実用化・専門化が進むほどAIの信頼性や正確性の検証が不可欠になるという裏側の課題を浮き�ずみにしています。つまり業界全体としては、AIを実務に深く組み込むための「特化」と「記憶・継続性」を追求する動きと、それに伴う「信頼性保証」の仕組み作りが並行して進んでいると言えるでしょう。

---

## 🎯 今日の実務アクション 3 選

1. **ONESTRUCTION、AWS GenAIICと石垣IDS基盤モデルを構築**: 自社データが少ない場合は合成データの活用や段階的な学習パイプラインの設計を検討すべきです。AWSなどのクラウド事業者が提供する技術支援プログラムの活用も有効な選択肢です。
2. **GitHub Copilot for JetBrains、Copilotのメモリ機能とOllamaに対応**: JetBrainsユーザーは新しいメモリー機能とOllama連携を試し、社内のセキュリティ方針に合う使い方を検討するとよいでしょう。
3. **マルチモーダル大規模言語モデルのための統合ハルシネーションファジング**: MLLMを使う開発者は、静的ベンチマークだけでなく多様なシナリオでの検証を取り入れるべきです。新しい評価フレームワークの動向を追い、自社の評価プロセスに反映することが大切です。

---

## 🔗 出典一覧
- [ONESTRUCTION、AWS GenAIICと石垣IDS基盤モデルを構築](https://aws.amazon.com/blogs/machine-learning/how-onestruction-built-the-ishigaki-ids-foundation-model-with-aws-genaiic/)
- [GitHub Copilot for JetBrains、Copilotのメモリ機能とOllamaに対応](https://github.blog/changelog/2026-08-11-copilot-memory-and-ollama-in-github-copilot-for-jetbrains)
- [マルチモーダル大規模言語モデルのための統合ハルシネーションファジング](https://arxiv.org/abs/2608.07525)
- [SiTime CEO、AIデータセンターでの役割とルネサスとの提携について語る](https://www.bloomberg.com/news/videos/2026-08-11/sitime-ceo-on-role-in-ai-data-centers-renesas-deal-video)
- [BM25を使用してCodexのトークンの消費を30%抑える](https://zenn.dev/knowledgesense/articles/9e55a3bb67729c)
- [評価的AIのための議論的基盤に向けて](https://arxiv.org/abs/2608.07473)