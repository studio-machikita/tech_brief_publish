<!--
---
title: "Tech News Radio — 2026-07-25"
subtitle: "AlphaFold AIを活用し、遺伝子編集タンパク質をより安全に再設計することにチームが成功 / 体外で臓器を生き続けさせる挑戦 / Gemma 4とR..."
date: "2026-07-25"
vol: 116
topics:
  - AI
  - Science
  - Hardware
  - LLM
  - Cloud
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-07-25

*📖 約12分で読めます ｜ 🏷️ AI, Science, Hardware, LLM, Cloud*

---

## 📌 今日のハイライト
- 🤖 **AlphaFold AIを活用し、遺伝子編集タンパク質をより安全に再設計することにチームが成功** — AlphaFoldでゲノム編集タンパク質を安全に再設計
- 🔬 **体外で臓器を生き続けさせる挑戦** — 臓器を体外で長期保存する技術の最前線
- 🤖 **Gemma 4とRAG Engineのサーバーレスが公開** — Gemma 4とRAG Engineのサーバーレスが公開
- 🤖 **DataPrep-Bench: 学習データ準備者としてのLLMのベンチマーク評価** — LLMの学習データ準備能力を測る統一ベンチマーク登場
- 📊 **PostgresのLISTEN/NOTIFYは実際にスケールする | DBOS** — PostgreSQLのLISTEN/NOTIFYはスケールする
- 🤖 **Claude Opus 5がGitHub Copilotで利用可能に** — Claude Opus 5がGitHub Copilotで利用可能に

---

## 🤖 AlphaFold AIを活用し、遺伝子編集タンパク質をより安全に再設計することにチームが成功
`AI` `Science`

<details>
<summary>📄 原題: Team uses AlphaFold AI to redesign gene-editing proteins to make them safer</summary>
</details>

> **一言で**: AlphaFoldでゲノム編集タンパク質を安全に再設計

- GoogleのAlphaFoldを使い、ゲノム編集タンパク質の「誤作動を起こす部位」を特定できる
- 特定した部位を再設計することで、より安全なゲノム編集ツールの開発につながる
- AIによるタンパク質構造解析が、医療・バイオ分野の安全性向上に直結する事例

💡 **なぜ重要か**
ゲノム編集技術（DNAを狙った箇所で切り貼りする技術）は医療や農業で注目されていますが、意図しない箇所を編集してしまう「オフターゲット効果」が安全上の課題でした。AlphaFoldはタンパク質の3D構造を高精度に予測するAIで、2020年代に入って研究加速の起爆剤となっています。今回の研究はそのAlphaFoldを使い、編集ミスを引き起こす構造的な原因を特定しようとするものです。 AIによるタンパク質設計の応用範囲が、創薬だけでなくゲノム編集ツールの安全設計にまで広がりつつあります。将来的には、AIが「より安全な編集酵素」を自律的に設計する流れが加速し、バイオテック分野でのAI活用が標準になると見られています。

🎯 **今日のアクション**
バイオ・ヘルスケア領域のエンジニアやリーダーは、AlphaFoldなどのタンパク質構造予測AIを自社の研究パイプラインに組み込む可能性を検討する価値があります。オープンソースで公開されているAlphaFoldのAPIや関連ツールを試しておくと、今後の応用展開に備えられます。

🔗 [原文を読む](https://arstechnica.com/science/2026/07/team-uses-alphafold-ai-to-redesign-gene-editing-proteins-to-make-them-safer/)

---

## 🔬 体外で臓器を生き続けさせる挑戦
`Science` `Hardware`

<details>
<summary>📄 原題: The quest to keep organs alive outside the body</summary>
</details>

> **一言で**: 臓器を体外で長期保存する技術の最前線

- ドナー臓器不足の主因は「時間」——氷上保存でも数時間しか持たない
- 医師たちが夢見る「臓器バンク」実現に向けた研究が進む
- 体外での臓器生存時間を延ばす技術が、移植医療を変える可能性

💡 **なぜ重要か**
臓器移植の現場では、ドナー不足に加えて「保存時間の短さ」が深刻な問題です。摘出した臓器は数時間以内に移植しなければならず、遠方への搬送や適切なレシピエント（受け取る患者）の選定が難しくなっています。体外保存技術の進歩は、この時間的制約を根本から変えうる取り組みです。 臓器の長期保存が実現すれば、移植医療のロジスティクスが大きく変わります。臓器バンクが整備されれば、緊急搬送の負担が減り、より多くの患者に移植の機会が届くようになるでしょう。医療インフラ全体の設計にも影響を与える可能性があります。

🎯 **今日のアクション**
医療テックや生命科学分野に関わるエンジニアやリーダーは、臓器保存技術の動向を注視しておくとよいでしょう。低温保存・灌流（かんりゅう）装置などの関連技術は、IoTやデータ管理との連携が進む領域でもあります。

🔗 [原文を読む](https://www.technologyreview.com/2026/07/24/1140790/the-quest-to-keep-organs-alive-outside-the-body/)

---

## 🤖 Gemma 4とRAG Engineのサーバーレスが公開
`AI` `LLM` `Cloud`

<details>
<summary>📄 原題: April 03, 2026</summary>
</details>

> **一言で**: Gemma 4とRAG Engineのサーバーレスが公開

- Gemma 4 26B A4B ITがVertex AI Model Gardenで実験的に公開
- テキストと画像を入力できるマルチモーダルなオープンモデル
- Vertex AI RAG Engineのサーバーレスモードがパブリックプレビューに
- サーバーレスモードはDBのプロビジョニングや拡張を自動管理
- Spannerモードとサーバーレスモードをシームレスに切り替え可能

💡 **なぜ重要か**
Google DeepMindが開発するGemmaシリーズは、オープンモデルとして開発者に広く使われています。今回のGemma 4はマルチモーダル対応を果たし、実用範囲が広がりました。一方、RAG（検索拡張生成）はAIの回答精度を高める手法として注目されており、そのインフラ管理の煩雑さを解消するサーバーレス化は現場のニーズに直結します。 オープンなマルチモーダルモデルの普及により、画像とテキストを組み合わせたAIアプリの開発障壁が下がります。またRAGのサーバーレス化は、AIシステムの運用コストと管理負担を大きく減らし、中小規模のチームでも本格的なRAG活用が現実的になるでしょう。

🎯 **今日のアクション**
Gemma 4 26B A4B ITをModel Gardenで試し、既存のテキスト系ユースケースに画像入力を組み合わせた検証を始めましょう。RAGを使っているチームはサーバーレスモードへの移行コストを評価し、Spannerモードとの使い分けを検討してください。

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_03_2026)

---

## 🤖 DataPrep-Bench: 学習データ準備者としてのLLMのベンチマーク評価
`AI` `LLM` `Data`

<details>
<summary>📄 原題: DataPrep-Bench: Benchmarking LLMs as Training Data Preparators</summary>
</details>

> **一言で**: LLMの学習データ準備能力を測る統一ベンチマーク登場

- DataPrep-Benchは、LLMが学習データを準備する能力を測る初の統一ベンチマーク
- データ構築（生データを教師あり学習データへ変換）と品質評価の2軸で評価
- エージェントやデータ中心ワークフローも評価対象に含む
- 学習データの質がLLMの性能を左右するという問題意識が背景にある

💡 **なぜ重要か**
LLMの性能は学習データの質に大きく左右されます。しかし、データ準備のプロセス全体を評価する統一的な指標がこれまで存在しませんでした。研究者や開発者はそれぞれ独自の方法でデータ品質を評価しており、比較や再現が難しい状況でした。DataPrep-Benchはこのギャップを埋めようとする試みです。 LLMを使ったデータ準備パイプラインの標準化が進む可能性があります。ベンチマークが普及すれば、データ準備ツールや手法の優劣を客観的に比較できるようになり、業界全体のデータ品質向上につながると見られています。

🎯 **今日のアクション**
自社のデータ準備パイプラインを見直す際の評価軸として、DataPrep-Benchの評価観点（データ構築と品質評価）を参考にするとよいでしょう。論文（arXiv:2607.20465）を確認し、自社ワークフローへの適用可能性を検討してみてください。

🔗 [原文を読む](https://arxiv.org/abs/2607.20465)

---

## 📊 PostgresのLISTEN/NOTIFYは実際にスケールする | DBOS
`Data` `OSS` `Cloud`

<details>
<summary>📄 原題: Postgres LISTEN/NOTIFY Actually Scales | DBOS</summary>
</details>

> **一言で**: PostgreSQLのLISTEN/NOTIFYはスケールする

- PostgreSQLのLISTEN/NOTIFY機能がスケール可能だと主張する記事
- DBOSによる技術的な検証・考察と見られる内容
- 信頼性の高いワークフロー基盤としてPostgreSQLを活用する文脈での発信

💡 **なぜ重要か**
PostgreSQLのLISTEN/NOTIFYは、データベース内でイベント通知をやり取りする仕組みです。「スケールしない」という先入観を持つエンジニアも多く、その認識を覆す内容だと見られています。DBOSはPostgreSQLを基盤にした耐久性のある実行ライブラリを開発しており、この機能の実用性を示す動機があります。 もしLISTEN/NOTIFYの大規模利用が実証されれば、外部のメッセージキューやブローカーを使わずにPostgreSQLだけでイベント駆動アーキテクチャを構築できる可能性が広がります。システム構成をシンプルに保ちたいチームにとって、有力な選択肢になりえます。

🎯 **今日のアクション**
自社のイベント通知基盤にRedisやKafkaなどを使っている場合、PostgreSQLのLISTEN/NOTIFYで代替できるか、負荷特性を踏まえて改めて評価してみる価値があります。

🔗 [原文を読む](https://www.dbos.dev/blog/postgres-listen-notify-scalability)

---

## 🤖 Claude Opus 5がGitHub Copilotで利用可能に
`AI` `LLM` `DevOps`

<details>
<summary>📄 原題: Claude Opus 5 is now available in GitHub Copilot</summary>
</details>

> **一言で**: Claude Opus 5がGitHub Copilotで利用可能に

- AnthropicのClaude Opus 5がGitHub Copilotに統合された
- 複雑で長時間にわたるコーディングタスクに特化した設計
- 高度な推論能力とツール活用の信頼性が特徴とされる

💡 **なぜ重要か**
GitHub CopilotはAIコーディング支援ツールとして広く普及しており、搭載モデルの選択肢が開発者の生産性に直結します。AnthropicのOpusシリーズは高い推論能力で知られており、複雑なコードベースの解析や長時間タスクへの対応が求められる現場ニーズに応える形での統合だと見られています。 主要な開発環境にAnthropicモデルが組み込まれることで、OpenAIやGoogleとの競争がコーディング支援の領域でも本格化します。開発者が日常的に複数のAIモデルを使い分ける時代が加速し、モデル選定がエンジニアリングチームの重要な意思決定になっていくでしょう。

🎯 **今日のアクション**
GitHub Copilotを使っているチームは、Claude Opus 5を複雑なリファクタリングや設計レビューなど推論が必要なタスクで試し、既存モデルとの使い分けを検討してみてください。

🔗 [原文を読む](https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot)

🔗 [原文を読む](https://github.blog/changelog/2026-07-23-copilot-cloud-agent-for-linear-is-now-generally-available)

🔗 [原文を読む](https://github.blog/changelog/2026-07-17-repository-level-github-copilot-usage-metrics-generally-available)

---

## 📝 まとめ

これら3つのニュースに共通するのは、**AIと先端テクノロジーが生命科学・医療分野の限界を押し広げている**という潮流です。AlphaFoldによるタンパク質再設計と臓器の体外保存技術はいずれも、従来は不可能とされていた生物学的課題に対してテクノロジーが正面から挑んでいる事例であり、医療や創薬の未来を根本から変える可能性を秘めています。一方でGemma 4やRAG Engineのサーバーレス公開は、こうした高度な研究を支えるAI基盤がより民主化・アクセシブルになっていることを示しており、研究機関や医療スタートアップが大規模なインフラを持たずとも最先端のAIを活用できる環境が整いつつあります。つまり、生命科学領域におけるAI活用の加速と、それを下支えするAIインフラの整備が同時並行で進んでおり、両者が相互に作用することで、医療イノベーションのサイクルがかつてないスピードで回り始めているといえるでしょう。

---

## 🎯 今日の実務アクション 3 選

1. **AlphaFold AIを活用し、遺伝子編集タンパク質をより安全に再設計することにチームが成功**: バイオ・ヘルスケア領域のエンジニアやリーダーは、AlphaFoldなどのタンパク質構造予測AIを自社の研究パイプラインに組み込む可能性を検討する価値があります。オープンソースで公開されているAlphaFoldのAPIや関連ツールを試しておくと、今後の応用展開に備えられます。
2. **体外で臓器を生き続けさせる挑戦**: 医療テックや生命科学分野に関わるエンジニアやリーダーは、臓器保存技術の動向を注視しておくとよいでしょう。低温保存・灌流（かんりゅう）装置などの関連技術は、IoTやデータ管理との連携が進む領域でもあります。
3. **Gemma 4とRAG Engineのサーバーレスが公開**: Gemma 4 26B A4B ITをModel Gardenで試し、既存のテキスト系ユースケースに画像入力を組み合わせた検証を始めましょう。RAGを使っているチームはサーバーレスモードへの移行コストを評価し、Spannerモードとの使い分けを検討してください。

---

## 🔗 出典一覧
- [AlphaFold AIを活用し、遺伝子編集タンパク質をより安全に再設計することにチームが成功](https://arstechnica.com/science/2026/07/team-uses-alphafold-ai-to-redesign-gene-editing-proteins-to-make-them-safer/)
- [体外で臓器を生き続けさせる挑戦](https://www.technologyreview.com/2026/07/24/1140790/the-quest-to-keep-organs-alive-outside-the-body/)
- [Gemma 4とRAG Engineのサーバーレスが公開](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_03_2026)
- [DataPrep-Bench: 学習データ準備者としてのLLMのベンチマーク評価](https://arxiv.org/abs/2607.20465)
- [PostgresのLISTEN/NOTIFYは実際にスケールする | DBOS](https://www.dbos.dev/blog/postgres-listen-notify-scalability)
- [Claude Opus 5がGitHub Copilotで利用可能に](https://github.blog/changelog/2026-07-24-claude-opus-5-is-now-available-in-github-copilot)
- [Claude Opus 5がGitHub Copilotで利用可能に](https://github.blog/changelog/2026-07-23-copilot-cloud-agent-for-linear-is-now-generally-available)
- [Claude Opus 5がGitHub Copilotで利用可能に](https://github.blog/changelog/2026-07-17-repository-level-github-copilot-usage-metrics-generally-available)