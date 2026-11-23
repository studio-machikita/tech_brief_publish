<!--
---
title: "Tech News Radio — 2026-11-23"
subtitle: "Perplexity、新「Monitor API」を発表――ウェブ検索を単発の質問から常時監視へ / アント・グループ、「シンプレクシティ」に賭け、中国の..."
date: "2026-11-23"
vol: 236
topics:
  - AI
  - Web
  - Startup
  - Robotics
  - Science
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-11-23

*📖 約14分で読めます ｜ 🏷️ AI, Web, Startup, Robotics, Science*

---

## 📌 今日のハイライト
- 🤖 **Perplexity、新「Monitor API」を発表――ウェブ検索を単発の質問から常時監視へ** — Perplexityが検索を常時監視に変えるAPIを公開
- 🤖 **アント・グループ、「シンプレクシティ」に賭け、中国の人型ロボット競争で勝ち残りへ** — Ant GroupがロボットのSimplexityに1億ドル出資
- 🤖 **AIは科学者の有望な新薬候補の特定に役立つのか?** — AIは創薬の候補選びで役立つのか
- 🤖 **AIコーディングエージェント、単体テストでは高得点も、模擬職場環境では10件に1件も完遂できず** — AI開発者、模擬職場で完遂率1割未満
- 🤖 **GitHub CopilotでMAI Code 2とMAI Code 2 Flashが利用可能に** — GitHub CopilotにMicrosoft製の新コーディングモデルが登場
- ☁️ **Workbench v2でBigQueryプラグインが独立** — Workbench v2でBigQueryプラグインが独立

---

## 🤖 Perplexity、新「Monitor API」を発表――ウェブ検索を単発の質問から常時監視へ
`AI` `Web` `Startup`

<details>
<summary>📄 原題: Perplexity&#x27;s new Monitor API turns web search from a one-off query into a nonstop watchdog</summary>
</details>

> **一言で**: Perplexityが検索を常時監視に変えるAPIを公開

- Monitor APIを新たに公開
- Web検索を決まった間隔で自動実行
- 関連する変化があったときだけWebhookで通知
- 独自の判断モデルが重要でない結果を除外
- 開発者向けツールで他社との差別化を狙う

💡 **なぜ重要か**
これまでのWeb検索は、人やAIエージェントが必要なときに一度だけ問い合わせる形が中心でした。Monitor APIは、検索を定期的に回し続け、意味のある変化があったときだけ知らせる仕組みだそうです。エージェントが自分で何度も検索して差分を確かめる手間が省けます。チャットボット事業は各社のサービスが似通ってきており、Perplexityは開発者向けツールを強化して違いを出す戦略と見られています。 検索が「聞かれたら答える」ものから「変化を見つけたら知らせる」ものに広がる可能性があります。競合価格や規制、ニュースなどの継続的な監視が、エージェントの標準機能になるかもしれません。一方で、検索APIの競争は、回答の精度だけでなく、通知の質や運用のしやすさにも広がっていくと見られています。

🎯 **今日のアクション**
まず、自社のシステムに定期的なWeb確認の作業がないか洗い出してください。競合調査、障害情報の追跡、法規制のチェックなどが候補です。次に、小さな範囲でMonitor APIを試し、通知の的確さを確かめましょう。判断モデルが重要な変化を見落とさないか、不要な通知が多すぎないかを、実際の運用で見ることが大切です。Webhookを受け取る側の認証や再送への備えも、早めに設計しておくと安心です。

🔗 [原文を読む](https://the-decoder.com/perplexitys-new-monitor-api-turns-web-search-from-a-one-off-query-into-a-nonstop-watchdog/)

---

## 🤖 アント・グループ、「シンプレクシティ」に賭け、中国の人型ロボット競争で勝ち残りへ
`AI` `Robotics` `Startup`

<details>
<summary>📄 原題: Ant Group Bets on Simplexity to Thrive in China’s Humanoid Race</summary>
</details>

> **一言で**: Ant GroupがロボットのSimplexityに1億ドル出資

- 中国のフィジカルAI（現実世界で動くAI）新興Simplexity Roboticsが資金調達
- 調達額は1億ドル、主導はJack Ma氏が支援するAnt Group
- 既存の有力企業が多い中国ロボット市場への挑戦
- ヒューマノイド（人型ロボット）競争が熱を帯びている

💡 **なぜ重要か**
中国ではロボット分野への投資が急速に広がっており、特に人型ロボットは各社が開発を競っています。フィジカルAIとは、AIが画面の中だけでなく、現実の物理空間で動く機械を制御する考え方です。大手金融・テック企業のAnt Groupが新興企業に大きく賭けたことは、この市場が有望だと見られている表れです。 AIの主戦場がソフトウェアから、ロボットなど現実世界へ広がる流れが強まると見られます。大手資本が新興企業を支えることで、開発のスピードが上がり、競争がさらに激しくなりそうです。長期的には、ロボット向けのソフトウェアや開発基盤、部品を手がける周辺産業にも影響が及ぶ可能性があります。

🎯 **今日のアクション**
エンジニアは、ロボット制御やシミュレーション、センサーデータの処理など、フィジカルAIに関わる技術動向を押さえておくとよいでしょう。リーダーは、ロボットやAIの活用が自社の事業にどう関わるかを検討し、中国企業の動きも含めて市場を継続的に追うことをおすすめします。

🔗 [原文を読む](https://www.bloomberg.com/news/articles/2026-11-22/ant-group-bets-on-simplexity-to-thrive-in-china-s-humanoid-race)

---

## 🤖 AIは科学者の有望な新薬候補の特定に役立つのか?
`AI` `Science` `Data`

<details>
<summary>📄 原題: Can AI help scientists identify promising drug candidates?</summary>
</details>

> **一言で**: AIは創薬の候補選びで役立つのか

- MedChemBenchという評価ベンチマークが登場
- 分子構造を正しく読み解く力を測定
- 実験結果から筋道を立てて考える力も評価
- 創薬初期の化合物選びを担えるかを検証

💡 **なぜ重要か**
新薬の開発は、数多くの化合物から有望な候補を絞り込む作業から始まります。この初期段階には、化学者の経験と判断が欠かせません。AIモデルがこの判断をどこまで支えられるかは、これまで十分に測られてきませんでした。MedChemBenchは、分子構造の理解、実験データからの推論、化合物の選択という三つの力を測る物差しです。AIの実力を客観的に比べられるようになる点で、意味があります。 共通の物差しができると、モデルごとの得意・不得意が見えやすくなります。創薬分野向けのAI開発では、改良の方向を定めやすくなるでしょう。製薬会社やスタートアップにとっては、AIを導入するかどうかを判断する材料にもなります。ただし、ベンチマークで良い成績を取ることと、実際の研究現場で役立つことは別の話です。現場での検証を重ねていく必要があると見られています。

🎯 **今日のアクション**
エンジニアは、自社のAI活用にも専門分野に合わせた評価指標が必要かを考えてみてください。汎用的な性能だけで導入を決めるのは危険です。創薬やヘルスケア領域に関わるリーダーは、MedChemBenchのような指標を使ってモデルを比べる準備を進めておくとよいでしょう。AIの出力は、専門家が確認する前提で使うのが現実的です。

🔗 [原文を読む](https://openai.com/index/introducing-medchembench)

---

## 🤖 AIコーディングエージェント、単体テストでは高得点も、模擬職場環境では10件に1件も完遂できず
`AI` `LLM`

<details>
<summary>📄 原題: AI coding agents ace isolated tests but complete fewer than one in ten tasks in a simulated workplace</summary>
</details>

> **一言で**: AI開発者、模擬職場で完遂率1割未満

- 同僚やプロジェクトボードのある模擬職場でAIを検証
- Opus 5.5とAstraでも、完全に解けた課題は1割未満
- 単発で明確な課題は速く終わらせる
- 自律的に開発を続ける場面で、状況を見失う
- 引き継ぎ不足や雑多な日常業務が壁になる

💡 **なぜ重要か**
これまでのコーディングAIの評価は、独立した問題を1つ解く形式が中心でした。ところが実際の開発現場では、同僚とのやり取りや未完成の引き継ぎがあり、チケットを自分で管理しながら作業を進める必要があります。今回のテストは、こうした現場に近い環境でAIを動かした点に意味があります。単発テストの高得点が、実務での自律的な働きを保証しないことを示す結果です。 AIエージェントの評価基準が、単発の正答率から、長い業務を最後までやり遂げる力へ移っていくと見られます。短期的には、AIを完全に自律した開発者として任せる動きは慎重になりそうです。一方で、定型的で範囲の明確な作業は引き続き任せやすく、人間とAIの役割分担を見直す議論が進むでしょう。ベンチマークの設計そのものも、現場の複雑さを反映する方向に変わっていくはずです。

🎯 **今日のアクション**
AIには、仕様と完了条件がはっきりした独立タスクを任せるのが現実的です。チケットの粒度を細かく整え、引き継ぎ情報を文書で残す習慣も重要になります。リーダーは、ベンチマークの数字だけで導入を決めず、自社の業務に近い環境で小さく試すべきです。人間によるレビューと進捗の確認も、当面は外せません。

🔗 [原文を読む](https://the-decoder.com/ai-coding-agents-ace-isolated-tests-but-complete-fewer-than-one-in-ten-tasks-in-a-simulated-workplace/)

---

## 🤖 GitHub CopilotでMAI Code 2とMAI Code 2 Flashが利用可能に
`AI` `LLM` `DevOps`

<details>
<summary>📄 原題: MAI Code 2 and MAI Code 2 Flash in GitHub Copilot</summary>
</details>

> **一言で**: GitHub CopilotにMicrosoft製の新コーディングモデルが登場

- MAI Code 2とMAI Code 2 Flashの2モデルが登場
- Microsoft AI（MAI）の次世代コーディングモデル
- 提供先はGitHub Copilot
- 詳細はGitHub Blogで発表

💡 **なぜ重要か**
GitHub Copilotは、OpenAIやAnthropicなど複数社のモデルから選べる形に進化してきました。そこにMicrosoft自身のAI部門（MAI）が手がけるコーディング特化モデルが加わった形です。Microsoftが自社モデルの開発に力を入れていることがうかがえます。2つのモデルが同時に出たことから、用途に応じた使い分けを想定していると見られています。ただし、性能や料金などの具体的な中身は、公式の発表で確認する必要があります。 AIコーディング支援の分野では、モデルを提供する会社が増え、選択肢が広がる流れが続きそうです。Microsoftが自社モデルをCopilotに載せることで、外部モデルへの依存を減らす動きが進むかもしれません。開発者にとっては、タスクの内容に合ったモデルを選ぶ場面が増えます。モデルの比較や評価の力が、これまで以上に求められるようになるでしょう。

🎯 **今日のアクション**
まずGitHub Blogの公式発表を読み、対応プランや利用条件、提供範囲を確認してください。利用できる環境なら、普段のコード生成やレビュー、リファクタリング（コードの整理）などで既存モデルと比べてみるのがおすすめです。品質や応答速度、コストを自分のチームの基準で測っておくと、導入の判断がしやすくなります。リーダーは、組織のセキュリティ方針やデータの扱いに沿って使えるかも事前に確認しておきましょう。

🔗 [原文を読む](https://github.blog/changelog/2026-11-17-mai-code-2-and-mai-code-2-flash-in-github-copilot)

---

## ☁️ Workbench v2でBigQueryプラグインが独立
`Cloud` `Data` `DevOps`

<details>
<summary>📄 原題: October 05, 2026</summary>
</details>

> **一言で**: Workbench v2でBigQueryプラグインが独立

- Agent Platform Workbench v2の新リリース20261004.00_p0が公開
- 上流の依存パッケージを最新版に更新
- BigQueryのJupyterLabプラグインがDataprocプラグインから独立
- BigQueryプラグインは既定で有効。無効化はdisable-bigqueryキーで指定
- disable-mixerが制御するのはDataprocプラグインのみに変更

💡 **なぜ重要か**
Workbenchのインスタンスでは、JupyterLab上のプラグインをメタデータで切り替えられます。これまでBigQueryプラグインはDataprocプラグインと同じ設定の影響を受けていたと見られます。今回の変更で、それぞれを別々に管理できるようになりました。データ分析の現場では、BigQueryだけ使いたい、あるいはDataprocだけ使いたいという場面が多くあります。そのため、設定の粒度が細かくなる意味は小さくありません。 クラウド上のノートブック環境では、機能ごとに独立して有効・無効を切り替えられる設計が主流になりつつあります。今回の変更もその流れに沿ったものです。環境ごとに必要な機能だけを有効にしやすくなり、不要なプラグインを減らして運用を整理しやすくなります。一方で、設定キーの意味が変わる変更は、運用の自動化に影響しやすい点にも注意が必要です。

🎯 **今日のアクション**
まず、既存のインスタンスでdisable-mixerを使っているかを確認してください。今回の変更で、このキーはDataprocプラグインだけを制御するようになります。以前の挙動を前提にしている場合は、BigQueryプラグインの扱いが変わる可能性があります。BigQueryプラグインを無効にしたい環境では、disable-bigqueryキーを新たに設定しましょう。Terraformやスクリプトでインスタンスを作成しているチームは、メタデータの設定内容を見直しておくと安心です。

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#October_05_2026)

🔗 [原文を読む](https://docs.cloud.google.com/vertex-ai/docs/release-notes#October_04_2026)

---

## 📝 まとめ

これら3つのニュースに共通しているのは、AIが「人間の問いに答える受け身の道具」から、現実世界や継続的なプロセスに自ら関与する存在へと役割を広げつつある点です。Perplexityの Monitor APIは、検索を一度きりの質問から常時の監視へと変え、情報収集を「引き出す」行為から「届けられる」ものへと転換させようとしています。Ant GroupによるSimplexityへの出資は、AIが画面の外に出て物理的な身体を得る人型ロボット競争へ資本が向かっていることを示し、創薬における候補選びへのAI活用も、研究の最前線で人間の判断を支える実務的な役割へと踏み込んでいます。いずれも、デジタル、物理、科学という異なる領域で、AIが継続的に稼働し、実世界の成果に結びつくことを期待されている動きであり、同時にその実効性や投資の妥当性をどう見極めるかが問われる段階に入ったともいえるでしょう。

---

## 🎯 今日の実務アクション 3 選

1. **Perplexity、新「Monitor API」を発表――ウェブ検索を単発の質問から常時監視へ**: まず、自社のシステムに定期的なWeb確認の作業がないか洗い出してください。競合調査、障害情報の追跡、法規制のチェックなどが候補です。次に、小さな範囲でMonitor APIを試し、通知の的確さを確かめましょう。判断モデルが重要な変化を見落とさないか、不要な通知が多すぎないかを、実際の運用で見ることが大切です。Webhookを受け取る側の認証や再送への備えも、早めに設計しておくと安心です。
2. **アント・グループ、「シンプレクシティ」に賭け、中国の人型ロボット競争で勝ち残りへ**: エンジニアは、ロボット制御やシミュレーション、センサーデータの処理など、フィジカルAIに関わる技術動向を押さえておくとよいでしょう。リーダーは、ロボットやAIの活用が自社の事業にどう関わるかを検討し、中国企業の動きも含めて市場を継続的に追うことをおすすめします。
3. **AIは科学者の有望な新薬候補の特定に役立つのか?**: エンジニアは、自社のAI活用にも専門分野に合わせた評価指標が必要かを考えてみてください。汎用的な性能だけで導入を決めるのは危険です。創薬やヘルスケア領域に関わるリーダーは、MedChemBenchのような指標を使ってモデルを比べる準備を進めておくとよいでしょう。AIの出力は、専門家が確認する前提で使うのが現実的です。

---

## 🔗 出典一覧
- [Perplexity、新「Monitor API」を発表――ウェブ検索を単発の質問から常時監視へ](https://the-decoder.com/perplexitys-new-monitor-api-turns-web-search-from-a-one-off-query-into-a-nonstop-watchdog/)
- [アント・グループ、「シンプレクシティ」に賭け、中国の人型ロボット競争で勝ち残りへ](https://www.bloomberg.com/news/articles/2026-11-22/ant-group-bets-on-simplexity-to-thrive-in-china-s-humanoid-race)
- [AIは科学者の有望な新薬候補の特定に役立つのか?](https://openai.com/index/introducing-medchembench)
- [AIコーディングエージェント、単体テストでは高得点も、模擬職場環境では10件に1件も完遂できず](https://the-decoder.com/ai-coding-agents-ace-isolated-tests-but-complete-fewer-than-one-in-ten-tasks-in-a-simulated-workplace/)
- [GitHub CopilotでMAI Code 2とMAI Code 2 Flashが利用可能に](https://github.blog/changelog/2026-11-17-mai-code-2-and-mai-code-2-flash-in-github-copilot)
- [Workbench v2でBigQueryプラグインが独立](https://docs.cloud.google.com/vertex-ai/docs/release-notes#October_05_2026)
- [Workbench v2でBigQueryプラグインが独立](https://docs.cloud.google.com/vertex-ai/docs/release-notes#October_04_2026)