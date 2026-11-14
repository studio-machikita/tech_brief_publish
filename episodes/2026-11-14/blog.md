<!--
---
title: "Tech News Radio — 2026-11-14"
subtitle: "Amazon SageMaker Canvasで実現するGSカルテックスの本番MLOps(第1回) / ChatGPTウォレットを発表 / GitHub ..."
date: "2026-11-14"
vol: 227
topics:
  - Cloud
  - AI
  - DevOps
  - Business
  - Security
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-11-14

*📖 約16分で読めます ｜ 🏷️ Cloud, AI, DevOps, Business, Security*

---

## 📌 今日のハイライト
- ☁️ **Amazon SageMaker Canvasで実現するGSカルテックスの本番MLOps(第1回)** — ノーコードAIを本番運用に直結させたGS Caltex
- 🤖 **ChatGPTウォレットを発表** — ChatGPTのAIが承認つきで買い物を代行
- 🤖 **GitHub CopilotでGemini 4 Hydrogenが利用可能に** — Gemini 4 HydrogenがCopilotで一般提供に
- 🤖 **NVIDIA NeMo Switchyardで、Amazon Bedrock上のコーディングエージェントのリクエストを最適なモデルにルーティング** — コーディングAIの依頼を最適なモデルへ振り分ける
- 🤖 **Shield、技術者がレガシーポータル業務をOpenAIに引き継ぐのを支援** — ShieldがOpenAIで旧システムの作業を自動化
- ☁️ **JupyterLabのブラウザ側ログがCloud Loggingに集約** — JupyterLabのブラウザ側ログがCloud Loggingに集約

---

## ☁️ Amazon SageMaker Canvasで実現するGSカルテックスの本番MLOps(第1回)
`Cloud` `AI` `DevOps`

<details>
<summary>📄 原題: Production MLOps at GS Caltex with Amazon SageMaker Canvas, part 1</summary>
</details>

> **一言で**: ノーコードAIを本番運用に直結させたGS Caltex

- GS CaltexがSageMaker CanvasとSageMaker Pipelinesを接続
- プロセスエンジニアのノーコードモデルを本番で稼働
- 検証済みの前処理フローとモデルをMLエンジニアが再利用
- デプロイ期間は約1週間から数時間に短縮
- バッチ推論を30分ごとに実行

💡 **なぜ重要か**
現場のプロセスエンジニアは、コードを書かずにAIモデルを作れるノーコードツールを使えます。しかし、作ったモデルを本番で動かす段階で、MLエンジニアによる作り直しが必要になる例が少なくありません。この引き継ぎが、現場発のAI活用を遅らせる壁になっています。今回のGS Caltexの事例は、Amazon SageMaker Canvasで作ったモデルをAmazon SageMaker Pipelinesにつなぎ、この壁を下げる試みです。現場の知見と本番運用の仕組みを橋渡しする、MLOps（機械学習の開発から運用までを回す仕組み）の実例として注目できます。 ノーコードツールで作ったモデルを、そのまま本番の運用基盤に乗せる流れが広がると見られます。業務を熟知した現場担当者がモデルを作り、MLエンジニアが運用品質を担保する分業が定着していくでしょう。その結果、AIの導入速度は上がり、MLエンジニアは作り直しではなく、基盤の整備や改善に時間を使えるようになります。一方で、現場が作ったモデルの品質をどう検証し、誰が責任を持つかというガバナンス（統制）の設計が、今後の課題になりそうです。

🎯 **今日のアクション**
まず、自社で現場の担当者が作ったモデルが、本番に出るまでの手順と所要時間を洗い出してみてください。引き継ぎで作り直しが発生しているなら、前処理フローやモデルを再利用できる形にそろえる価値があります。次に、現場とMLエンジニアの役割分担を決め、検証済みの成果物だけを本番に流す仕組みを小さな案件で試すのがおすすめです。リーダーは、デプロイ期間の短縮を成果指標に置くと、改善の効果を測りやすくなります。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/production-mlops-at-gs-caltex-with-amazon-sagemaker-canvas-part-1/)

---

## 🤖 ChatGPTウォレットを発表
`AI` `Business` `Security`

<details>
<summary>📄 原題: Introducing ChatGPT Wallet</summary>
</details>

> **一言で**: ChatGPTのAIが承認つきで買い物を代行

- OpenAIがChatGPT Walletを発表
- ChatGPT Work、Codex、dotsのエージェントが購入を実行
- 購入時はユーザーの承認が必要
- 既存のカード保護の仕組みをそのまま利用
- 安全にAIが決済まで進める仕組み

💡 **なぜ重要か**
AIエージェントは、調べ物や作業の代行まで進んできました。次の課題は、お金が動く操作を任せることです。購入には誤操作や不正利用のリスクがあり、利用者の同意が欠かせません。ChatGPT Walletは、ユーザーの承認とカードの既存保護を組み合わせて、安全に決済まで任せられる形を目指すものと見られます。 AIが決済まで担うことで、調査から購入までが一続きの流れになりそうです。ECサイトや決済事業者は、人間の画面操作だけでなく、AIエージェントからの購入を前提に設計を見直す必要が出てくるでしょう。一方で、責任の所在や不正対策のルール作りも、業界全体の課題になりそうです。

🎯 **今日のアクション**
エンジニアは、自社サービスがAIエージェント経由の購入を受け入れられるか、早めに点検するとよいでしょう。承認画面の設計や、操作ログの残し方も確認したい点です。リーダーは、AIに決済を任せる範囲と上限額を、社内ルールとして先に決めておくことをおすすめします。

🔗 [原文を読む](https://openai.com/index/introducing-chatgpt-wallet)

🔗 [原文を読む](https://openai.com/index/introducing-businesses-chatgpt)

🔗 [原文を読む](https://techcrunch.com/2026/11/13/chatgpts-new-wallet-lets-ai-agents-shop-and-check-out-for-you/)

---

## 🤖 GitHub CopilotでGemini 4 Hydrogenが利用可能に
`AI` `LLM` `DevOps`

<details>
<summary>📄 原題: Gemini 4 Hydrogen in GitHub Copilot</summary>
</details>

> **一言で**: Gemini 4 HydrogenがCopilotで一般提供に

- GoogleのFlash系最新モデル、Gemini 4 Hydrogenが登場
- GitHub Copilotで一般提供（GA）を開始
- 高速で効率的なエージェント型コーディングが狙い
- ツール利用や複数ステップの作業にも対応
- 指示への追従性が改善されたとのこと

💡 **なぜ重要か**
AIによるコーディング支援は、コード補完から、自分で作業を進める「エージェント型」へ移りつつあります。この流れでは、応答の速さと実行コストの低さが重要になります。Flash系は、軽くて速いことを特徴とするGoogleのモデル群です。そのため、GitHub Copilotで選べるモデルが増えることは、開発者にとって使い分けの幅が広がることを意味します。GitHub CopilotがOpenAIやAnthropicなど複数社のモデルを選べる場になっている点も、背景にあります。 Copilotのように、複数社のモデルから選べる開発環境が広がると、モデル間の競争が強まります。開発者は用途に応じて、速さ重視か精度重視かを選べるようになります。その結果、高性能な大型モデルと、軽くて速いモデルを使い分ける運用が、開発現場で当たり前になる可能性があります。エージェント型の開発が広がれば、コードを書く作業は減り、AIに指示を出して結果を確認する作業が増えていくと見られます。

🎯 **今日のアクション**
まず、自分のチームでGemini 4 Hydrogenを試し、既存のモデルと比べてみましょう。比べる項目は、応答の速さ、指示の守られ方、複数ステップの作業の安定性です。次に、定型的な修正やテスト作成など、速さが活きる作業から使ってみるのがおすすめです。リーダーは、モデルの使い分けルールやコストの目安を早めに決めておくと、導入後の混乱を減らせます。なお、利用できるプランや設定はGitHubの公式ドキュメントで確認してください。

🔗 [原文を読む](https://github.blog/changelog/2026-11-13-gemini-4-hydrogen-in-github-copilot)

---

## 🤖 NVIDIA NeMo Switchyardで、Amazon Bedrock上のコーディングエージェントのリクエストを最適なモデルにルーティング
`AI` `LLM` `Cloud`

<details>
<summary>📄 原題: Route coding agent requests to the right model on Amazon Bedrock with NVIDIA NeMo Switchyard</summary>
</details>

> **一言で**: コーディングAIの依頼を最適なモデルへ振り分ける

- 指標は1トークンの単価ではなく、課題1件あたりのコスト
- AWS CDKで、LiteLLMとNVIDIA NeMo Switchyardをデプロイ
- 実行基盤はAmazon Bedrock
- ルーティングしたモデル群と単一モデルのコストを比較

💡 **なぜ重要か**
コーディングエージェントは、複数のタスクに分けて作業を進めます。そのため、トークン単価が安くても、失敗ややり直しが多ければ、課題を解決するまでの総コストは膨らみます。そこで、1件の課題を解決するまでにいくらかかったかを見る考え方が重要になります。簡単な依頼には軽いモデルを、難しい依頼には高性能なモデルを選べば、コストと品質の両立を狙えます。この記事は、その仕組みをAmazon Bedrock上で試す手順を示しているようです。 AIエージェントの利用が広がると、モデルを1つに固定する運用は、コストの面で見直されていくと見られます。依頼ごとにモデルを振り分けるルーティングは、AI基盤の標準的な構成要素になる可能性があります。また、モデルの比較や評価でも、トークン単価や性能スコアだけでなく、課題解決あたりのコストを見る流れが強まりそうです。

🎯 **今日のアクション**
まず、自社のコーディングエージェントで、課題1件あたりのコストを測ってみましょう。次に、単一モデルの運用と、ルーティングを入れた運用を比べます。AWS CDKでLiteLLMとNVIDIA NeMo Switchyardを試せるそうなので、小さな検証環境から始めるのがおすすめです。結果を見て、どの種類の依頼をどのモデルに任せるか、方針を決めるとよいでしょう。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/route-coding-agent-requests-to-the-right-model-on-amazon-bedrock-with-nvidia-nemo-switchyard/)

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/migrate-to-amazon-bedrock-managed-knowledge-base-with-your-coding-agent/)

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/openai-codex-on-amazon-bedrock/)

---

## 🤖 Shield、技術者がレガシーポータル業務をOpenAIに引き継ぐのを支援
`AI` `Business` `Startup`

<details>
<summary>📄 原題: Shield helps technicians hand off legacy portal work with OpenAI</summary>
</details>

> **一言で**: ShieldがOpenAIで旧システムの作業を自動化

- ShieldがOpenAIを使い、ITの現場作業を支援
- 対象は古いポータル（管理画面）での引き継ぎ作業
- Forgeというエージェントがシステム内を自動で操作
- 技術者は判断が必要な問題に集中できる

💡 **なぜ重要か**
企業のIT現場には、古い管理ポータルがまだ多く残っています。画面を開いて情報を探し、手で操作する作業は、技術者の時間を大きく奪います。こうした古いシステムは、APIなどの連携手段が整っていないことも多く、自動化が難しいとされてきました。Shieldの取り組みは、AIエージェントが人のように画面を操作する形で、この壁を越えようとするものと見られています。単純な操作はAIに任せ、人は判断が必要な仕事に集中する。この役割分担が現場で動き始めたことが、記事の注目点です。 古いシステムを無理に作り替えなくても、AIエージェントを間に挟んで業務を自動化できる道が広がる可能性があります。レガシーシステム（古い基盤）の延命と効率化が進めば、移行コストを抑えられるでしょう。一方で、技術者の仕事は「手を動かす作業」から「AIの結果を確認し、判断する仕事」へ移っていくと考えられます。同様のエージェント活用は、IT運用の分野で広がっていきそうです。

🎯 **今日のアクション**
まず、自社の運用で繰り返し発生している画面操作を洗い出し、自動化の候補を絞りましょう。次に、AIに任せる範囲と、人が判断する範囲を分けて決めておくことが大切です。エージェントが操作する際の権限は最小限にし、操作の記録を残す仕組みも用意してください。最初は影響の小さい作業で試し、結果を確認しながら対象を広げていくのが安全です。

🔗 [原文を読む](https://openai.com/business/customer-stories/shield)

---

## ☁️ JupyterLabのブラウザ側ログがCloud Loggingに集約
`Cloud` `DevOps` `Data`

<details>
<summary>📄 原題: September 18, 2026</summary>
</details>

> **一言で**: JupyterLabのブラウザ側ログがCloud Loggingに集約

- Agent Platform Workbench v2の新リリース(20260918-2230-rc0)
- JupyterLabがクライアント側ログをインスタンスのバックエンドへ転送
- 対象はコンソールエラーや未捕捉の例外など4種類
- 未処理のPromise拒否と失敗したネットワークリクエストも含む
- ログはCloud Loggingに表示され、デバッグが楽になる

💡 **なぜ重要か**
ブラウザ上で動くJupyterLabは、画面の不具合やエラーがユーザーの手元のブラウザにしか残らないことが多く、原因調査に手間がかかっていました。今回の更新で、そうしたクライアント側のログがサーバー側のログ基盤（Cloud Logging）に集まるようになります。どの環境で何が起きたかを、運用側が後から追いやすくなります。なお、今回のリリースは上流の依存パッケージの更新も含んでいます。 ノートブック環境でも、ブラウザ側の問題をサーバー側と同じ場所で監視する流れが広がると見られます。フロントエンドとバックエンドのログを一元管理できれば、障害対応や問い合わせ調査の時間を短くできます。データサイエンス基盤の運用でも、オブザーバビリティ（可観測性）を重視する動きが続きそうです。

🎯 **今日のアクション**
Workbenchを使っているチームは、まず新しいリリースが自分の環境に適用されているか確認してください。そのうえで、Cloud Loggingでクライアント側のエラーを検索・集計する方法を試してみましょう。アラートやログベースの指標に組み込めば、ユーザーからの報告を待たずに不具合へ気づけます。ログに機密情報が含まれないかや、保存期間と閲覧権限の設定も見直しておくと安心です。

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#September_18_2026)

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#September_14_2026)

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#September_13_2026)

---

## 📝 まとめ

これら3つのニュースに共通しているのは、AIが「試して眺める存在」から「実業務や日常の行動に深く組み込まれる実行主体」へと役割を変えつつある点です。GSカルテックスの事例では、ノーコードのAIツールが実験にとどまらず本番運用(MLOps)に直結する段階に入り、ChatGPTウォレットではAIが承認つきとはいえユーザーに代わって購買という実際の取引を担い、GitHub CopilotへのGemini 4 Hydrogenの提供は開発現場の日常的なワークフローに最先端モデルが直接組み込まれる流れを示しています。また、モデルの選択肢が増えるCopilotの動きや、専門家以外にもAI活用の門戸を開くノーコード化からは、AIの利用基盤が特定ベンダーや専門人材に閉じず、より民主化・多様化していることもうかがえます。一方で、決済の承認フローに見られるように、AIの自律性が高まるほど人間による確認やガバナンスを設計に組み込むことが重要になっており、業界は「どれだけ賢いか」から「どれだけ安全かつ確実に運用できるか」へと競争軸を移しつつあるといえるでしょう。

---

## 🎯 今日の実務アクション 3 選

1. **Amazon SageMaker Canvasで実現するGSカルテックスの本番MLOps(第1回)**: まず、自社で現場の担当者が作ったモデルが、本番に出るまでの手順と所要時間を洗い出してみてください。引き継ぎで作り直しが発生しているなら、前処理フローやモデルを再利用できる形にそろえる価値があります。次に、現場とMLエンジニアの役割分担を決め、検証済みの成果物だけを本番に流す仕組みを小さな案件で試すのがおすすめです。リーダーは、デプロイ期間の短縮を成果指標に置くと、改善の効果を測りやすくなります。
2. **ChatGPTウォレットを発表**: エンジニアは、自社サービスがAIエージェント経由の購入を受け入れられるか、早めに点検するとよいでしょう。承認画面の設計や、操作ログの残し方も確認したい点です。リーダーは、AIに決済を任せる範囲と上限額を、社内ルールとして先に決めておくことをおすすめします。
3. **GitHub CopilotでGemini 4 Hydrogenが利用可能に**: まず、自分のチームでGemini 4 Hydrogenを試し、既存のモデルと比べてみましょう。比べる項目は、応答の速さ、指示の守られ方、複数ステップの作業の安定性です。次に、定型的な修正やテスト作成など、速さが活きる作業から使ってみるのがおすすめです。リーダーは、モデルの使い分けルールやコストの目安を早めに決めておくと、導入後の混乱を減らせます。なお、利用できるプランや設定はGitHubの公式ドキュメントで確認してください。

---

## 🔗 出典一覧
- [Amazon SageMaker Canvasで実現するGSカルテックスの本番MLOps(第1回)](https://aws.amazon.com/blogs/machine-learning/production-mlops-at-gs-caltex-with-amazon-sagemaker-canvas-part-1/)
- [ChatGPTウォレットを発表](https://openai.com/index/introducing-chatgpt-wallet)
- [ChatGPTウォレットを発表](https://openai.com/index/introducing-businesses-chatgpt)
- [ChatGPTウォレットを発表](https://techcrunch.com/2026/11/13/chatgpts-new-wallet-lets-ai-agents-shop-and-check-out-for-you/)
- [GitHub CopilotでGemini 4 Hydrogenが利用可能に](https://github.blog/changelog/2026-11-13-gemini-4-hydrogen-in-github-copilot)
- [NVIDIA NeMo Switchyardで、Amazon Bedrock上のコーディングエージェントのリクエストを最適なモデルにルーティング](https://aws.amazon.com/blogs/machine-learning/route-coding-agent-requests-to-the-right-model-on-amazon-bedrock-with-nvidia-nemo-switchyard/)
- [NVIDIA NeMo Switchyardで、Amazon Bedrock上のコーディングエージェントのリクエストを最適なモデルにルーティング](https://aws.amazon.com/blogs/machine-learning/migrate-to-amazon-bedrock-managed-knowledge-base-with-your-coding-agent/)
- [NVIDIA NeMo Switchyardで、Amazon Bedrock上のコーディングエージェントのリクエストを最適なモデルにルーティング](https://aws.amazon.com/blogs/machine-learning/openai-codex-on-amazon-bedrock/)
- [Shield、技術者がレガシーポータル業務をOpenAIに引き継ぐのを支援](https://openai.com/business/customer-stories/shield)
- [JupyterLabのブラウザ側ログがCloud Loggingに集約](https://docs.cloud.google.com/vertex-ai/docs/release-notes#September_18_2026)
- [JupyterLabのブラウザ側ログがCloud Loggingに集約](https://docs.cloud.google.com/vertex-ai/docs/release-notes#September_14_2026)
- [JupyterLabのブラウザ側ログがCloud Loggingに集約](https://docs.cloud.google.com/vertex-ai/docs/release-notes#September_13_2026)