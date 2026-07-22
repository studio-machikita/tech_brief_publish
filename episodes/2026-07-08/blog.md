<!--
---
title: "Tech News Radio — 2026-07-08"
subtitle: "iFLYTEK具身オムニ技術報告書 / Microsoftがコスト削減でOpenAIとAnthropicのモデルを廃止、Copilotを低価格化 / Gi..."
date: "2026-07-08"
vol: 99
topics:
  - AI
  - Robotics
  - LLM
  - Business
  - DevOps
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-07-08

*📖 約13分で読めます ｜ 🏷️ AI, Robotics, LLM, Business, DevOps*

---

## 📌 今日のハイライト
- 🤖 **iFLYTEK具身オムニ技術報告書** — 科技訊飛が汎用ロボットエージェント向け統合AIを発表
- 🤖 **Microsoftがコスト削減でOpenAIとAnthropicのモデルを廃止、Copilotを低価格化** — MicrosoftがCopilotをOpenAI製から自社製AIモデルへ切り替え
- 🤖 **GitHub Copilotアプリ、全ユーザーに提供開始** — GitHub Copilotアプリが全プランで利用可能に
- 🤖 **Google CloudのAIエージェント機能が刷新** — Google CloudのAIエージェント機能が刷新
- 🤖 **アルバータ州政府、クロードを活用して政府システム全体のサイバーセキュリティ脆弱性を発見・修正** — アルバータ州政府がClaudeでサイバー脆弱性を自動修正
- 🤖 **CohereのTranscribe Arabicは、アラビア語の難解な文字起こし問題に対応したオープンソースモデル** — CohereがアラビアAR音声認識モデルをOSS公開

---

## 🤖 iFLYTEK具身オムニ技術報告書
`AI` `Robotics` `LLM`

<details>
<summary>📄 原題: iFLYTEK-Embodied-Omni Technical Report</summary>
</details>

> **一言で**: 科技訊飛が汎用ロボットエージェント向け統合AIを発表

- マルチモーダル指示の理解・環境予測・動作生成を一つのモデルで統合
- 従来の分割パイプラインが抱える誤差の連鎖問題を解消する設計
- 視覚・言語推論、世界モデリング、行動生成を単一アーキテクチャで実現
- 長期的な行動計画にも対応できる汎用エージェントを目指す

💡 **なぜ重要か**
ロボットや自律エージェントの開発では、視覚・言語・行動の各モジュールを別々に組み合わせる手法が主流でした。しかしこの方式では、モジュール間の受け渡しで誤差が積み重なるという課題がありました。iFLYTEK（科大訊飛）はこの問題を解決するため、すべての機能を統合した単一モデルの技術報告を公開しました。 視覚・推論・制御を一体化したモデルが普及すれば、ロボット開発のコストと複雑さが大幅に下がります。汎用エージェントの実用化が加速し、製造・物流・介護など幅広い分野への応用が現実味を帯びてきます。

🎯 **今日のアクション**
arXiv論文（2607.02542）を確認し、統合型エージェントアーキテクチャの設計思想を把握しておきましょう。自社のロボット・AI開発で分割パイプラインを採用している場合は、統合モデルへの移行コストと効果を検討する価値があります。

🔗 [原文を読む](https://arxiv.org/abs/2607.02542)

🔗 [原文を読む](https://arxiv.org/abs/2607.02770)

---

## 🤖 Microsoftがコスト削減でOpenAIとAnthropicのモデルを廃止、Copilotを低価格化
`AI` `LLM` `Business`

<details>
<summary>📄 原題: Copilot goes cheap as Microsoft phases out OpenAI and Anthropic models to cut costs</summary>
</details>

> **一言で**: MicrosoftがCopilotをOpenAI製から自社製AIモデルへ切り替え

- MicrosoftはExcelやOutlookでOpenAIとAnthropicのモデルを自社製「MAI」モデルに置き換え中
- すでに週数万件のクエリ（問い合わせ処理）がMAIモデルで動いている
- AI部門トップのMustafa Suleiman氏は外部モデルのコストを「最終的にゼロにする」と明言
- Copilotユーザーは同じ料金でも性能が下がる可能性がある

💡 **なぜ重要か**
生成AIサービスの普及に伴い、外部モデルのAPI利用コストは企業にとって大きな負担になっています。MicrosoftはOpenAIへの巨額投資を続ける一方で、自社製品に組み込むモデルは内製化してコストを抑える方向に舵を切っています。これはAI業界全体で進む「モデルの内製化・コモディティ化」の流れと一致しています。 大手テック企業が外部AIモデルへの依存を減らす動きが加速すると、OpenAIやAnthropicのビジネスモデルに直接的な打撃を与えます。また「高性能モデル＝高コスト」という前提が崩れ、企業向けAIサービスの価格競争が激化する可能性があります。一方でユーザー側は、コスト削減を優先した結果として品質低下のリスクを受け入れざるを得ない局面が増えるかもしれません。

🎯 **今日のアクション**
CopilotなどのAIツールを業務で使っているチームは、モデル変更による出力品質の変化を定期的にベンチマークで確認する仕組みを整えておくべきです。また、特定ベンダーのモデルに強く依存した設計は見直し、モデルを差し替えやすいアーキテクチャを検討する価値があります。

🔗 [原文を読む](https://the-decoder.com/copilot-goes-cheap-as-microsoft-phases-out-openai-and-anthropic-models-to-cut-costs/)

---

## 🤖 GitHub Copilotアプリ、全ユーザーに提供開始
`AI` `DevOps` `OSS`

<details>
<summary>📄 原題: GitHub Copilot app available to all</summary>
</details>

> **一言で**: GitHub Copilotアプリが全プランで利用可能に

- GitHub Copilotアプリが全プランのユーザーに開放された
- macOS・Windows・Linux の3つのOSに対応
- GitHubアカウントでサインインするだけで即利用できる
- デスクトップからエージェント駆動の開発が可能になった

💡 **なぜ重要か**
GitHub Copilotはこれまで段階的に機能を拡張してきました。今回のアプリ提供は、ブラウザやエディタ拡張に限らず、デスクトップアプリとして独立した開発体験を提供する動きです。AIを使った開発支援ツールの競争が激化する中、GitHubはより多くのユーザーへの間口を広げることで、エコシステムの拡大を図っていると見られます。 デスクトップアプリとして独立したAI開発環境が整うことで、特定のエディタに依存しない開発スタイルが広がる可能性があります。エージェント駆動という方向性は、AIが単なる補完を超えてタスクを自律的にこなす時代への移行を示しており、開発者の役割や作業フローが変わる転換点になるかもしれません。

🎯 **今日のアクション**
GitHubアカウントをお持ちであれば、今すぐCopilotアプリをダウンロードして試してみましょう。既存のエディタ拡張との使い勝手を比較し、自分のワークフローに合うか検証するのが最初のステップです。

🔗 [原文を読む](https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all)

🔗 [原文を読む](https://github.blog/changelog/2026-07-07-copilot-billing-preview-app-will-be-retired-on-august-3)

---

## 🤖 Google CloudのAIエージェント機能が刷新
`AI` `Cloud` `Data`

<details>
<summary>📄 原題: May 26, 2026</summary>
</details>

> **一言で**: Google CloudのAIエージェント機能が刷新

- Colab EnterpriseのData Science AgentがGA（一般提供）に昇格
- データ分析や機械学習タスクをノートブック内で自動化できる
- Vertex AI Extensionsは非推奨となり、2026年11月26日に廃止予定
- 移行先はAgent Platformで、サービス継続にはマイグレーションが必要

💡 **なぜ重要か**
Google Cloudは、データサイエンティストやエンジニアが日常的に使うColab Enterpriseに生成AIエージェントを組み込む方向へ舵を切っています。一方でVertex AI Extensionsという既存の拡張機能の仕組みを廃止し、Agent Platformへ一本化することで、AIエージェント基盤の整理を進めています。 クラウド上のAIエージェント基盤が統合・整理される流れは、Google Cloud以外のプラットフォームにも波及する可能性があります。開発者はベンダーごとのエージェント実行環境の違いを意識しながら設計する必要が増し、特定プラットフォームへの依存リスクの管理が重要になるでしょう。

🎯 **今日のアクション**
Vertex AI Extensionsを利用中のチームは、2026年11月26日の廃止前にAgent Platformへの移行計画を立てる必要があります。また、Colab EnterpriseユーザーはData Science Agentの公式ドキュメントを確認し、探索的データ分析の自動化に活用できるか評価することをお勧めします。

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#May_26_2026)

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#February_26_2026)

---

## 🤖 アルバータ州政府、クロードを活用して政府システム全体のサイバーセキュリティ脆弱性を発見・修正
`AI` `Security` `DevOps`

<details>
<summary>📄 原題: Government of Alberta uses Claude to find and fix cybersecurity vulnerabilities across government systems</summary>
</details>

> **一言で**: アルバータ州政府がClaudeでサイバー脆弱性を自動修正

- 2025年からClause Codeを活用し、政府システムの脆弱性を発見・修正
- OpusとSonnetの2モデルを使い分けてセキュリティ審査を実施
- アルバータ州の省庁内チームが主導する実運用事例

💡 **なぜ重要か**
政府機関のITシステムはレガシーコードが多く、セキュリティ担当者の人手不足も深刻です。AIを使った脆弱性診断は民間では広がりつつありましたが、政府機関が公式に採用した事例は珍しく、公共インフラへのAI活用の新たな先例となります。 政府機関がAIによるセキュリティ自動化を正式採用したことで、他の自治体や公共機関への導入が加速する可能性があります。また、AIコーディングツールがセキュリティ用途でも実用レベルに達したという証左となり、DevSecOps（開発・セキュリティ・運用の統合）の在り方が変わるかもしれません。

🎯 **今日のアクション**
自組織のシステム監査にAIコーディングツールを試験導入し、既存の脆弱性スキャンツールと組み合わせた効果を検証してみましょう。特にレガシーコードの多い環境では、AIによるコードレビューが費用対効果の高い選択肢になり得ます。

🔗 [原文を読む](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)

---

## 🤖 CohereのTranscribe Arabicは、アラビア語の難解な文字起こし問題に対応したオープンソースモデル
`AI` `OSS` `LLM`

<details>
<summary>📄 原題: Cohere Transcribe Arabic is an open-source model built for Arabic&#x27;s toughest transcription problems</summary>
</details>

> **一言で**: CohereがアラビアAR音声認識モデルをOSS公開

- Cohereがアラビア語特化の音声認識モデル「Transcribe Arabic」を公開
- パラメータ数は20億で、Apache 2.0ライセンスのもとHugging Faceで入手可能
- 方言・コードスイッチング・アラビア語英語混在音声でWhisperやOmniASRを上回ると主張
- アラビア語の多様な話し方に対応した点が最大の特徴

💡 **なぜ重要か**
アラビア語は方言の多様性が極めて高く、標準語と口語の差が大きい言語です。さらに会話中にアラビア語と英語を混ぜて話す「コードスイッチング」も日常的で、既存の汎用音声認識モデルが苦手とする領域でした。中東・北アフリカ地域のデジタル化が進む中、精度の高いアラビア語音声認識への需要は高まっており、今回のモデル公開はその課題に直接応えるものです。 特定言語に特化したオープンソース音声認識モデルの登場は、英語中心だったAI音声技術の裾野を広げます。今後、アラビア語以外の低資源言語でも同様のアプローチが広がれば、グローバルな音声AIの民主化が加速するでしょう。また、Apache 2.0での公開は商用利用も可能なため、中東市場向けプロダクト開発のハードルを大きく下げると見られています。

🎯 **今日のアクション**
アラビア語対応サービスを開発中のエンジニアは、Hugging FaceでTranscribe Arabicを試し、既存のWhisperと精度を比較してみましょう。また、自社プロダクトへの組み込みを検討する際は、Apache 2.0ライセンスの条件を確認した上で評価を進めることをお勧めします。

🔗 [原文を読む](https://the-decoder.com/cohere-transcribe-arabic-is-an-open-source-model-built-for-arabics-toughest-transcription-problems/)

---

## 📝 まとめ

これら3つのニュースに共通するのは、AIの「自社内製化・垂直統合」という大きな潮流である。MicrosoftがOpenAIやAnthropicの外部モデルから自社製AIへの切り替えを進めていることは、テック大手がコスト効率と技術的自律性を追求し、外部依存から脱却しようとする戦略的転換を象徴している。同時にGitHub CopilotのAIアプリを全ユーザーへ開放した動きは、AIツールをより広い層へ普及させる「AI民主化」の加速を示しており、Microsoftが開発者エコシステム全体を自社プラットフォームで囲い込む意図も読み取れる。一方、iFLYTEKの汎用ロボットエージェント向け統合AIは、AIがソフトウェアの領域を超えて物理世界へと拡張する「具身知能（Embodied AI）」の台頭を示しており、AIの応用領域が急速に多様化していることを裏付けている。総じてこれらのニュースは、AI技術が特定企業の専有物から産業インフラへと成熟しつつある段階で、各社が差別化と主導権確保を巡る競争を激化させているという業界全体の構造変化を映し出している。

---

## 🎯 今日の実務アクション 3 選

1. **iFLYTEK具身オムニ技術報告書**: arXiv論文（2607.02542）を確認し、統合型エージェントアーキテクチャの設計思想を把握しておきましょう。自社のロボット・AI開発で分割パイプラインを採用している場合は、統合モデルへの移行コストと効果を検討する価値があります。
2. **Microsoftがコスト削減でOpenAIとAnthropicのモデルを廃止、Copilotを低価格化**: CopilotなどのAIツールを業務で使っているチームは、モデル変更による出力品質の変化を定期的にベンチマークで確認する仕組みを整えておくべきです。また、特定ベンダーのモデルに強く依存した設計は見直し、モデルを差し替えやすいアーキテクチャを検討する価値があります。
3. **GitHub Copilotアプリ、全ユーザーに提供開始**: GitHubアカウントをお持ちであれば、今すぐCopilotアプリをダウンロードして試してみましょう。既存のエディタ拡張との使い勝手を比較し、自分のワークフローに合うか検証するのが最初のステップです。

---

## 🔗 出典一覧
- [iFLYTEK具身オムニ技術報告書](https://arxiv.org/abs/2607.02542)
- [iFLYTEK具身オムニ技術報告書](https://arxiv.org/abs/2607.02770)
- [Microsoftがコスト削減でOpenAIとAnthropicのモデルを廃止、Copilotを低価格化](https://the-decoder.com/copilot-goes-cheap-as-microsoft-phases-out-openai-and-anthropic-models-to-cut-costs/)
- [GitHub Copilotアプリ、全ユーザーに提供開始](https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all)
- [GitHub Copilotアプリ、全ユーザーに提供開始](https://github.blog/changelog/2026-07-07-copilot-billing-preview-app-will-be-retired-on-august-3)
- [Google CloudのAIエージェント機能が刷新](https://docs.cloud.google.com/vertex-ai/docs/release-notes#May_26_2026)
- [Google CloudのAIエージェント機能が刷新](https://docs.cloud.google.com/vertex-ai/docs/release-notes#February_26_2026)
- [アルバータ州政府、クロードを活用して政府システム全体のサイバーセキュリティ脆弱性を発見・修正](https://www.anthropic.com/news/alberta-government-claude-cybersecurity)
- [CohereのTranscribe Arabicは、アラビア語の難解な文字起こし問題に対応したオープンソースモデル](https://the-decoder.com/cohere-transcribe-arabic-is-an-open-source-model-built-for-arabics-toughest-transcription-problems/)