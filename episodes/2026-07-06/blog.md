<!--
---
title: "Tech News Radio — 2026-07-06"
subtitle: "Baiduの「無制限OCR」、人間の忘却に似たメモリ管理で数十ページの文書を一括処理 / ダートマス大学の講義で新しいAIチューターが0.71〜1.30S..."
date: "2026-07-06"
vol: 97
topics:
  - AI
  - LLM
  - Data
  - Science
  - Cloud
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-07-06

*📖 約12分で読めます ｜ 🏷️ AI, LLM, Data, Science, Cloud*

---

## 📌 今日のハイライト
- 🤖 **Baiduの「無制限OCR」、人間の忘却に似たメモリ管理で数十ページの文書を一括処理** — BaiduのOCRが数十ページを一括処理できる技術を開発
- 🤖 **ダートマス大学の講義で新しいAIチューターが0.71〜1.30SDの効果量を達成** — AIチューターがDartmouth大学で大きな学習効果を実証
- 🤖 **AgentCore Memoryにおけるメタデータを用いた構造化メモリフィルタリング** — AgentCore Memoryでメタデータを使った構造的なメモリ管理が可能に
- 🤖 **AIに外部脳を持たせて1ヶ月運用した全記録** — AIの記憶をObsidianで自作した1ヶ月の実録
- ☁️ **Colab EnterpriseでSQLセルが正式提供開始** — Colab EnterpriseでSQLセルが正式提供開始
- 🤖 **Gemini 2.5 ProとGemini 3 Flashの廃止予定** — GitHub CopilotでGeminiモデルが7月末に廃止

---

## 🤖 Baiduの「無制限OCR」、人間の忘却に似たメモリ管理で数十ページの文書を一括処理
`AI` `LLM` `Data`

<details>
<summary>📄 原題: Baidu&#x27;s &quot;Unlimited OCR&quot; processes dozens of document pages in one pass by treating memory like human forgetting</summary>
</details>

> **一言で**: BaiduのOCRが数十ページを一括処理できる技術を開発

- Baiduの「Unlimited OCR」は数十ページを一度に処理できる
- 従来システムの上限は約10ページ程度だった
- 人間の忘却に着想を得た注意機構（アテンション）でメモリ使用量を一定に保つ
- 主要なOCRベンチマークで現在トップの成績を記録

💡 **なぜ重要か**
OCR（光学文字認識）技術は、紙の書類や画像からテキストを抽出する基盤技術です。従来のAIベースのOCRはページ数が増えるとメモリ消費が急増し、処理できる量に限界がありました。Baiduはこの制約を、人間の記憶の「忘却」を模した注意機構の改良で克服しました。大量の文書を扱う企業や行政のデジタル化需要が高まる中、この技術的突破は実用上の意義が大きいです。 メモリ効率の高いOCR技術が普及すれば、大量の紙文書を扱う金融・法務・医療などの分野でデジタル化が加速します。また、この「忘却型」の注意機構は他のAIモデルにも応用できる可能性があり、長文処理全般の効率改善につながると見られています。

🎯 **今日のアクション**
文書処理パイプラインを構築・運用しているエンジニアは、Baiduのこの手法を注視し、自社のOCRや長文処理モデルの置き換え候補として評価を始めるとよいでしょう。ベンチマーク結果の詳細が公開され次第、実際のユースケースで検証することをお勧めします。

🔗 [原文を読む](https://the-decoder.com/baidus-unlimited-ocr-processes-dozens-of-document-pages-in-one-pass-by-treating-memory-like-human-forgetting/)

---

## 🤖 ダートマス大学の講義で新しいAIチューターが0.71〜1.30SDの効果量を達成
`AI` `LLM` `Science`

> ⚠️ **注意**: この記事は情報源が限られているため、内容の正確性を保証できません。必要に応じて一次情報もご確認ください。

<details>
<summary>📄 原題: New AI tutor achieves 0.71-1.30 SD effect size in Dartmouth course [pdf]</summary>
</details>

> **一言で**: AIチューターがDartmouth大学で大きな学習効果を実証

- 新しいAIチューターが0.71〜1.30 SD（標準偏差）という高い学習効果を達成
- Dartmouth大学の実際のコースで効果を検証した点が注目される
- 1.0 SDを超える効果量は、教育介入としては非常に大きな水準とされる

💡 **なぜ重要か**
教育分野でのAI活用は注目されていますが、実際の大学授業での効果を定量的に示した研究はまだ少ないです。標準偏差（SD）を使った効果量の測定は、教育心理学で広く使われる客観的な指標です。今回のDartmouthでの実証は、AIチューターの有効性を示す具体的なデータとして意義があります。 AIチューターの学習効果が科学的に裏付けられると、大学や企業研修での導入が加速する可能性があります。個別最適化された学習支援が普及すれば、教育コストの削減や学習格差の縮小にもつながると見られています。

🎯 **今日のアクション**
教育系プロダクトを開発するエンジニアやリーダーは、この研究の詳細（PDFが公開されている模様）を確認し、AIチューター設計の参考にすることを検討してみてください。

🔗 [原文を読む](https://intextbooks.science.uu.nl/workshop2026/files/itb26_s1s2.pdf)

---

## 🤖 AgentCore Memoryにおけるメタデータを用いた構造化メモリフィルタリング
`AI` `Cloud`

<details>
<summary>📄 原題: Structured memory filtering with metadata in AgentCore Memory</summary>
</details>

> **一言で**: AgentCore Memoryでメタデータを使った構造的なメモリ管理が可能に

- AgentCore Memoryはメタデータを使ってメモリの設定・取り込み・検索を制御できる
- マルチエージェントやマルチテナント構成など、企業向けユースケースにも対応
- メタデータフィルタリングにより、必要な情報だけを精度よく取り出せる
- 実装のベストプラクティスも紹介されており、現場への導入指針として活用できる

💡 **なぜ重要か**
AIエージェントが複数のユーザーやタスクを同時に扱う場面が増えています。そこで問題になるのが、誰のどの情報をいつ参照するかという「メモリ管理」です。メタデータを使ったフィルタリングは、この課題を構造的に解決するアプローチとして注目されています。 エンタープライズ向けAIエージェントの信頼性と安全性が高まります。特にマルチテナント環境では、テナント間のデータ混在リスクを減らせるため、業務システムへのAI導入が加速する可能性があります。

🎯 **今日のアクション**
AgentCore Memoryのメタデータ設計を早めに検討し、テナントやエージェントの識別子をメタデータとして付与する設計パターンを自社のアーキテクチャに組み込むことを検討してください。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/structured-memory-filtering-with-metadata-in-agentcore-memory/)

---

## 🤖 AIに外部脳を持たせて1ヶ月運用した全記録
`AI` `LLM` `OSS`

> **一言で**: AIの記憶をObsidianで自作した1ヶ月の実録

- セッションをまたぐとAIの記憶がリセットされる問題を自作の外部記憶で解決
- 公式メモリ機能は中身が見えず、プロジェクト別管理もできないと指摘
- Obsidianをベースに、自分でルールを決められる外部脳を構築して運用

💡 **なぜ重要か**
LLM（大規模言語モデル）はセッションをまたいで文脈を保持できません。公式のメモリ機能は存在しますが、何を記憶するかをAI任せにせざるを得ず、複数プロジェクトの使い分けも難しい状況です。この課題は、AIを日常業務に組み込もうとするエンジニアや知識労働者が広く直面しています。 AIの記憶管理を自前で設計する動きが広がれば、特定のAIサービスへの依存度が下がります。ツールをまたいで文脈を持ち運べる仕組みが普及すると、AIの使い方そのものが「会話」から「継続的な協働」へと変わっていく可能性があります。

🎯 **今日のアクション**
まず自分のAI利用で何が毎回リセットされているかを書き出してみましょう。その上で、ObsidianなどのローカルノートツールをAIの外部記憶として試験運用し、プロジェクト別に文脈を管理する仕組みを小さく始めるのが現実的です。

🔗 [原文を読む](https://zenn.dev/nobu666/articles/ai-external-brain-digest)

---

## ☁️ Colab EnterpriseでSQLセルが正式提供開始
`Cloud` `Data` `DevOps`

<details>
<summary>📄 原題: April 10, 2026</summary>
</details>

> **一言で**: Colab EnterpriseでSQLセルが正式提供開始

- Colab EnterpriseのSQLセルがGA（一般提供）に昇格
- ノートブック上でSQLクエリの記述・編集・実行が直接できる
- Pythonコードと同じ画面でデータ操作が完結する環境が整った

💡 **なぜ重要か**
Colab Enterpriseは、Google CloudのマネージドなJupyterノートブック環境です。これまでSQLを実行するには外部ツールや別画面への切り替えが必要でした。SQLセルのGA化により、データエンジニアやアナリストがノートブック内でシームレスにデータ操作できるようになります。 ノートブック環境でのSQL対応は、データ分析ワークフローの統合を加速させます。PythonとSQLを行き来する手間が減り、分析から可視化までの作業を一つの画面で完結できる流れが業界標準になっていく可能性があります。

🎯 **今日のアクション**
Colab Enterpriseを利用中のチームは、SQLセルの公式ドキュメントを確認し、既存のデータ分析ワークフローへの組み込みを検討してみてください。特にBigQueryなどのデータソースとの連携方法を早めに把握しておくと良いでしょう。

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_10_2026)

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_06_2026)

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_03_2026)

---

## 🤖 Gemini 2.5 ProとGemini 3 Flashの廃止予定
`AI` `DevOps` `LLM`

<details>
<summary>📄 原題: Upcoming deprecation of Gemini 2.5 Pro and Gemini 3 Flash</summary>
</details>

> **一言で**: GitHub CopilotでGeminiモデルが7月末に廃止

- Gemini 2.5 ProとGemini 3 Flashが7月31日に廃止予定
- 対象はCopilot Chat、インライン編集、エージェントモード、コード補完など全機能
- GitHub Copilotで利用できるAIモデルの選択肢が変わる可能性あり

💡 **なぜ重要か**
GitHub CopilotはOpenAIモデルだけでなく、GoogleのGeminiシリーズも選択肢として提供してきました。複数のAIモデルを使い分けられる点がCopilotの強みの一つでしたが、今回の廃止はそのラインナップ見直しを意味します。AIモデルの世代交代が速い現在、開発ツールも対応モデルを頻繁に更新する必要があり、こうした廃止アナウンスは今後も続くと見られています。 AIコーディング支援ツールでは、利用できるモデルが定期的に入れ替わる運用が当たり前になりつつあります。エンジニアは特定モデルへの依存を避け、複数モデルを柔軟に切り替えられるワークフローを整える必要が出てきます。また、モデル廃止のたびに出力品質や挙動が変わるリスクへの備えも重要になるでしょう。

🎯 **今日のアクション**
7月31日までに、Gemini 2.5 ProやGemini 3 Flashを使っているチームは代替モデルへの移行計画を立てましょう。GitHub Copilotの設定でどのモデルを使っているか確認し、廃止後も業務が止まらないよう事前に切り替えテストを行うことをお勧めします。

🔗 [原文を読む](https://github.blog/changelog/2026-07-02-upcoming-deprecation-of-gemini-2-5-pro-and-gemini-3-flash)

---

## 📝 まとめ

これら3つのニュースに共通するのは、**AIシステムにおける「記憶・情報管理」の高度化**というテーマです。BaiduのOCR技術が人間の忘却メカニズムを模倣してメモリを効率的に管理し、AgentCore Memoryがメタデータによる構造化フィルタリングを実現しているように、AIが扱う情報量の爆発的な増大に対して、いかに賢く情報を取捨選択・整理するかが業界全体の重要課題となっています。一方でDartmouthのAIチューター実証研究は、そうした情報処理能力の向上が教育という具体的な応用領域で人間に対して測定可能な効果をもたらし始めていることを示しており、技術の成熟が実社会への展開フェーズに入りつつあることを示唆しています。全体として、AIの「認知能力」——記憶・検索・文脈理解——を人間の知的活動に近づける取り組みが加速しており、単なる処理性能の向上を超えて、AIが長期的かつ構造的に知識を扱えるエージェントへと進化しようとする大きなトレンドが読み取れます。

---

## 🎯 今日の実務アクション 3 選

1. **Baiduの「無制限OCR」、人間の忘却に似たメモリ管理で数十ページの文書を一括処理**: 文書処理パイプラインを構築・運用しているエンジニアは、Baiduのこの手法を注視し、自社のOCRや長文処理モデルの置き換え候補として評価を始めるとよいでしょう。ベンチマーク結果の詳細が公開され次第、実際のユースケースで検証することをお勧めします。
2. **ダートマス大学の講義で新しいAIチューターが0.71〜1.30SDの効果量を達成**: 教育系プロダクトを開発するエンジニアやリーダーは、この研究の詳細（PDFが公開されている模様）を確認し、AIチューター設計の参考にすることを検討してみてください。
3. **AgentCore Memoryにおけるメタデータを用いた構造化メモリフィルタリング**: AgentCore Memoryのメタデータ設計を早めに検討し、テナントやエージェントの識別子をメタデータとして付与する設計パターンを自社のアーキテクチャに組み込むことを検討してください。

---

## 🔗 出典一覧
- [Baiduの「無制限OCR」、人間の忘却に似たメモリ管理で数十ページの文書を一括処理](https://the-decoder.com/baidus-unlimited-ocr-processes-dozens-of-document-pages-in-one-pass-by-treating-memory-like-human-forgetting/)
- [ダートマス大学の講義で新しいAIチューターが0.71〜1.30SDの効果量を達成](https://intextbooks.science.uu.nl/workshop2026/files/itb26_s1s2.pdf)
- [AgentCore Memoryにおけるメタデータを用いた構造化メモリフィルタリング](https://aws.amazon.com/blogs/machine-learning/structured-memory-filtering-with-metadata-in-agentcore-memory/)
- [AIに外部脳を持たせて1ヶ月運用した全記録](https://zenn.dev/nobu666/articles/ai-external-brain-digest)
- [Colab EnterpriseでSQLセルが正式提供開始](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_10_2026)
- [Colab EnterpriseでSQLセルが正式提供開始](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_06_2026)
- [Colab EnterpriseでSQLセルが正式提供開始](https://docs.cloud.google.com/vertex-ai/docs/release-notes#April_03_2026)
- [Gemini 2.5 ProとGemini 3 Flashの廃止予定](https://github.blog/changelog/2026-07-02-upcoming-deprecation-of-gemini-2-5-pro-and-gemini-3-flash)