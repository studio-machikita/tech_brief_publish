<!--
---
title: "Tech News Radio — 2026-11-11"
subtitle: "Anthropic、ClaudeをプラグインやスプレッドシートやホワイトボードなどのフルワークスペースへMeeting notesも近日追加 / FinE..."
date: "2026-11-11"
vol: 224
topics:
  - AI
  - LLM
  - Business
  - Data
  - Web
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-11-11

*📖 約17分で読めます ｜ 🏷️ AI, LLM, Business, Data, Web*

---

## 📌 今日のハイライト
- 🤖 **Anthropic、ClaudeをプラグインやスプレッドシートやホワイトボードなどのフルワークスペースへMeeting notesも近日追加** — Claudeが仕事用の統合ワークスペースへ進化
- 🤖 **FinEvolveKG:金融ナレッジグラフ構築のための、制御可能かつ帰属可能なプロンプト進化** — 金融向けKG構築のプロンプトを制御して進化させる
- 🤖 **OpenAI、ChatGPTを企業ディレクトリ化 顧客対応するAIエージェントを搭載** — ChatGPTが企業向けの案内所に変わります
- 🤖 **GitHub CopilotでGemini 4 Carbonが利用可能に** — Gemini 4 CarbonがGitHub Copilotで一般提供へ
- 🤖 **エージェント評価プレイブック:Amazon Bedrock AgentCore Evaluationsの組み込み評価、DeepEval、AutoEvalを活用する** — AIエージェントの評価を3種類の評価器で整理
- 🤖 **コアウィーブ、業績見通しを上方修正 減速懸念が和らぐ** — CoreWeaveが好決算で通期予想を上方修正

---

## 🤖 Anthropic、ClaudeをプラグインやスプレッドシートやホワイトボードなどのフルワークスペースへMeeting notesも近日追加
`AI` `LLM` `Business`

<details>
<summary>📄 原題: Anthropic turns Claude into a full workspace with Plugins, spreadsheets, whiteboards, and soon Meeting notes</summary>
</details>

> **一言で**: Claudeが仕事用の統合ワークスペースへ進化

- Claudeに表計算（Sheets）とホワイトボードを追加
- Adobe、Atlassianなどのアプリを Claude 内に埋め込める
- 会議に参加してメモを取る Claude Meetings が近日登場
- 複数のアプリを1か所に集める作業基盤を目指す動き

💡 **なぜ重要か**
これまでのAIチャットは、質問して答えをもらう道具が中心でした。仕事では文書、表、図、会議と、ツールを行き来する手間がかかります。Anthropicは、その作業をClaudeの中にまとめようとしています。パートナー企業のアプリを画面内に直接組み込める仕組み（Interactive Connectors）を用意し、他社サービスも巻き込んでチーム向けの中心的な場所になろうとしているようです。AI各社が「チャットから仕事の基盤へ」と競う流れの一つと見られています。 AIが個別のアプリを呼び出す補助役から、アプリが集まる入口そのものに変わる可能性があります。そうなると、SaaS（クラウドで提供されるソフト）各社は、AIの画面内でどう使われるかを考える必要が出てきます。一方で、利用者の作業や会議の情報が1つのAIサービスに集まるため、乗り換えにくくなる囲い込みや、情報管理の課題も大きくなりそうです。ツール間の連携の主導権をめぐる競争が、今後さらに激しくなると見られます。

🎯 **今日のアクション**
まず、自社のチームがどんな作業でツールを行き来しているか洗い出し、Claude内で完結できそうなものを小さく試すのがよいでしょう。プロダクト側の担当者は、自社アプリをAIの画面内に組み込む形での提供を検討する価値があります。会議の記録のように機密性の高い情報を扱う機能は、保存先や権限の設定、社内ルールとの整合を事前に確認してから導入してください。Claude Meetingsは近日登場とされているため、公開時に評価できるよう準備しておくと安心です。

🔗 [原文を読む](https://the-decoder.com/anthropic-turns-claude-into-a-full-workspace-with-plugins-spreadsheets-whiteboards-and-soon-meeting-notes/)

---

## 🤖 FinEvolveKG:金融ナレッジグラフ構築のための、制御可能かつ帰属可能なプロンプト進化
`AI` `LLM` `Data`

<details>
<summary>📄 原題: FinEvolveKG: Controlled and Attributable Prompt Evolution for Financial Knowledge Graph Construction</summary>
</details>

> **一言で**: 金融向けKG構築のプロンプトを制御して進化させる

- SEC 10-K（米国の年次報告書）から知識グラフを構築する研究
- リスク分析や投資調査など、用途ごとに必要な抽出内容が違う
- 共通の根拠付けや型、時間の規則は崩さず用途別に適応させたい
- 人手のペルソナ用プロンプトやファインチューニングはコストが課題
- 重みを変えないプロンプト最適化を、制御しながら進化させる手法

💡 **なぜ重要か**
金融機関は共通のSEC 10-Kから知識グラフ（KG）を作り、リスク分析、ポートフォリオ管理、投資調査に使っています。ただ、用途によって知りたい情報は違います。そのため抽出の仕方を用途に合わせて変える必要があります。一方で、根拠の付け方、型の定義、時間に関する規則は共有しておかないと、KGがばらばらになってしまいます。人手でプロンプトを書き分ける方法やファインチューニング（追加学習）は、コストが大きいという課題があります。重みを変えないプロンプト最適化は代替策になりますが、1本の大きなプロンプトを制約なしに進化させると、共有ルールまで書き換えてしまう恐れがあるそうです。FinEvolveKGは、この問題に取り組む研究と見られています。 金融に限らず、複数の部門が同じ文書から別々の目的で情報を取り出す場面は多くあります。共有ルールを守りながら用途別に適応させる考え方は、企業のデータ基盤づくりにも広がる可能性があります。また、プロンプトの変更を追跡し、どの変更が結果に影響したかを説明できる仕組みは、監査や規制対応が厳しい業界で重みを増すと見られています。LLMの運用が、モデルの追加学習よりプロンプト管理へ寄っていく流れも後押しされそうです。

🎯 **今日のアクション**
まず、自社の知識グラフやLLM抽出パイプラインで、全部門が守るべき共通ルールと、部門ごとに変えてよい部分を切り分けてみてください。次に、プロンプトの変更履歴をバージョン管理し、変更と出力品質の関係を追えるようにしておくと安心です。ファインチューニングとプロンプト最適化のコストを比べ、用途に合う方を検討するのも有効です。論文の詳細な手法や評価結果は、arXivの原文で確認することをお勧めします。

🔗 [原文を読む](https://arxiv.org/abs/2611.08643)

---

## 🤖 OpenAI、ChatGPTを企業ディレクトリ化 顧客対応するAIエージェントを搭載
`AI` `Business` `Web`

<details>
<summary>📄 原題: OpenAI turns ChatGPT into a business directory with AI agents that handle customer questions</summary>
</details>

> **一言で**: ChatGPTが企業向けの案内所に変わります

- OpenAIがChatGPTを企業向けプラットフォームとして開放
- 新しいBusiness Hubで企業が自社プロフィールを登録
- 商品データの追加と、ユーザーの反応の追跡に対応
- Business Agentsが顧客の質問にChatGPT内で直接回答
- 対象は条件を満たす米国のEC事業者

💡 **なぜ重要か**
これまでChatGPTは、ユーザーが質問して答えを得る道具でした。今回の発表で、企業がChatGPTの中に自社の情報を置き、顧客と直接やり取りできる場へと役割が広がります。検索エンジンやSNSが企業の集客の場になってきたのと同じ流れです。AIとの会話が、新しい顧客との接点になりつつあることがわかります。企業にとっては、自社の情報をAIがどう扱うかが、売上に響く時代の入り口といえます。 長期的には、ウェブ検索に頼らず、AIとの会話から商品を探して買う行動が広がる可能性があります。企業はSEO（検索エンジン最適化）に加えて、AIに自社情報を正しく読み取ってもらう工夫が必要になりそうです。商品データの整備や、AIによる接客の品質が競争力を左右するでしょう。一方で、プラットフォームを握るOpenAIへの依存が強まる点には、注意が必要です。他社のAIサービスも同様の動きを見せると見られています。

🎯 **今日のアクション**
まずは自社の商品データを、AIが扱いやすい形で整理しておきましょう。名称、価格、在庫、仕様などを一元管理しておくと、どのプラットフォームにも対応しやすくなります。エンジニアは、AIエージェント（利用者に代わって作業するAI）に任せる範囲と、人が対応する範囲の線引きを考えておくと安心です。リーダーは、ユーザーの反応データをどう活用するかの方針を、早めに決めておきましょう。現時点の対象は米国のEC事業者なので、日本での展開は続報を待つのが現実的です。

🔗 [原文を読む](https://the-decoder.com/openai-turns-chatgpt-into-a-business-directory-with-ai-agents-that-handle-customer-questions/)

---

## 🤖 GitHub CopilotでGemini 4 Carbonが利用可能に
`AI` `LLM` `DevOps`

<details>
<summary>📄 原題: Gemini 4 Carbon in GitHub Copilot</summary>
</details>

> **一言で**: Gemini 4 CarbonがGitHub Copilotで一般提供へ

- Googleの最新モデルGemini 4 Carbonが一般提供に
- 対象はGitHub Copilot
- 複雑なコーディングやエージェント型の作業が得意
- 推論を使うタスクにも対応
- 安全なコード生成に力を入れているそうです

💡 **なぜ重要か**
GitHub Copilotは、複数のAIモデルから選んで使える方向へ進んでいます。今回、Googleの最新モデルが加わりました。開発者は作業内容に合わせて、モデルを選べる幅が広がります。AIが自律的に作業を進める「エージェント」型の利用が増えるなかで、複雑な課題に強いモデルへの需要は高まっています。生成コードの安全性も、開発現場では大きな関心事です。AIが書いたコードを、そのまま本番に出して大丈夫かという不安は根強くあります。安全性を掲げたモデルが加わることは、その不安に応える動きと見られています。 開発支援ツールでは、特定の1社のモデルに頼らず、複数のモデルを使い分ける流れが強まりそうです。モデル提供各社は、性能だけでなく、安全性や得意分野でも競うことになります。開発者にとっては、タスクごとに最適なモデルを選ぶ力が、これまで以上に大切になります。長い目で見ると、モデルの選び方そのものが、開発の生産性を左右する要素になっていくでしょう。

🎯 **今日のアクション**
まず、GitHub CopilotでGemini 4 Carbonを選べるか確認しましょう。次に、既存のモデルと同じ課題を解かせて、出力の質を比べてみてください。複雑な修正や、複数の手順にまたがる作業で試すと、違いが分かりやすいはずです。チームで使う場合は、安全性の面での評価も試し、コードレビューの運用ルールに反映するのがおすすめです。リーダーは、利用するモデルの選定基準を決めておくと、混乱を避けられます。

🔗 [原文を読む](https://github.blog/changelog/2026-11-10-gemini-4-carbon-in-github-copilot)

🔗 [原文を読む](https://the-decoder.com/gemini-4-carbon-arrives-just-in-time-to-feel-like-yesterdays-news-in-the-fastest-model-cycle-yet/)

---

## 🤖 エージェント評価プレイブック:Amazon Bedrock AgentCore Evaluationsの組み込み評価、DeepEval、AutoEvalを活用する
`AI` `Cloud` `LLM`

<details>
<summary>📄 原題: The agent evaluation playbook: Built-in, DeepEval, and AutoEval on Amazon Bedrock AgentCore Evaluations</summary>
</details>

> **一言で**: AIエージェントの評価を3種類の評価器で整理

- Amazon Bedrock AgentCoreの評価機能を紹介
- 組み込み評価器、DeepEval、AutoEvalの3種類を解説
- 確認したい振る舞いごとに適した評価器を選ぶ考え方
- タスク完了、話題の維持、情報漏えい、手順の抜けを確認
- 評価の粒度（どの単位で測るか）も使い分けの軸

💡 **なぜ重要か**
AIエージェントは本番に出した後、「動いているか」という一つの問いだけでは済みません。タスクを最後までやり切ったか、話題から外れていないか、データを漏らしていないか、必要な手順を飛ばしていないか。確認すべき点がいくつもあります。しかもエージェントは複数の手順を踏んで動くため、最終的な回答だけを見ても問題を見逃しがちです。こうした多面的な品質確認を体系立てて行う手法が求められており、この記事はAmazon Bedrock AgentCoreでの具体的な整理を示したものと見られています。 エージェントの評価が、開発の最後に行う確認作業から、運用を通じて続ける仕組みへ変わっていくと考えられます。評価の基盤をクラウド事業者が提供する流れが進めば、各社が評価の仕組みを自作する負担は減ります。一方で、何を良い挙動とみなすかという基準づくりは、利用する側の重要な仕事として残ります。評価の型が共通化されれば、エージェント開発の品質管理もソフトウェアのテストに近い形で標準化されていくでしょう。

🎯 **今日のアクション**
まず、自分たちのエージェントで守りたい振る舞いを書き出してください。タスクの完了、話題の維持、情報漏えいの防止、手順の遵守などです。次に、それぞれをどの評価器でどの粒度で測るかを対応づけます。最初は組み込み評価器で手軽に始め、足りない部分をDeepEvalやAutoEvalで補う進め方が現実的です。評価を一度きりにせず、修正のたびに回す習慣をつけることも大切です。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/the-agent-evaluation-playbook-built-in-deepeval-and-autoeval-on-agentcore/)

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/how-tcs-built-an-agentic-test-orchestrator-with-amazon-bedrock-agentcore/)

---

## 🤖 コアウィーブ、業績見通しを上方修正 減速懸念が和らぐ
`AI` `Cloud` `Business`

<details>
<summary>📄 原題: CoreWeave Boosts Forecast, Easing Slowdown Concerns</summary>
</details>

> **一言で**: CoreWeaveが好決算で通期予想を上方修正

- AI向け計算基盤のCoreWeaveが四半期決算で市場予想を上回る
- 通期の業績見通しも引き上げ
- 有利子負債の重さと成長鈍化への投資家の懸念が和らぐ
- 報道元はBloomberg（Brody Ford記者）

💡 **なぜ重要か**
CoreWeaveは、AIの学習や推論に使う計算資源を提供する事業者です。GPU（画像処理半導体）を中心とした設備には巨額の投資が必要で、同社は借入に大きく頼っていると見られています。そのため、成長が鈍れば負債の返済に響くのではないかという不安が、投資家の間にありました。今回の好決算と見通しの引き上げは、AI向け計算資源への需要が堅調であることを示す材料と受け止められそうです。 AI向けクラウドを専門に手がける事業者が、大手クラウドとは別の選択肢として定着していく可能性があります。一方で、設備投資と借入に頼る事業モデルには、需要の変動や金利の影響を受けやすいという弱みもあります。今後の決算で成長と負債の両立を示せるかが、業界全体の評価にもつながりそうです。

🎯 **今日のアクション**
エンジニアは、AIの学習や推論に使う計算資源の調達先を、大手クラウドだけに絞らず比較しておくとよいでしょう。価格や供給の安定性に加え、事業者の財務状況も確認したい点です。リーダーは、特定の事業者に依存しすぎない構成を検討し、供給が滞った場合の代替手段も用意しておくと安心です。

🔗 [原文を読む](https://www.bloomberg.com/news/videos/2026-11-11/coreweave-boosts-forecast-easing-slowdown-concerns-video)

🔗 [原文を読む](https://www.bloomberg.com/news/articles/2026-11-10/coreweave-boosts-annual-forecast-easing-concerns-about-slowdown)

🔗 [原文を読む](https://www.bloomberg.com/news/videos/2026-11-10/coreweave-earnings-top-estimates-boosts-annual-forecast-video)

---

## 📝 まとめ

これら3つのニュースに通底しているのは、生成AIが「汎用の対話ツール」から、特定の業務や文脈に深く組み込まれた「実務のインフラ」へと役割を移しつつあるという流れです。Claudeがスプレッドシートやホワイトボード、議事録までを抱える統合ワークスペースへ拡張し、ChatGPTが企業の案内所として顧客対応エージェントの受け皿になる動きは、AIを使う「場」そのものをプラットフォーム企業が囲い込もうとする競争の表れといえます。一方、FinEvolveKGのような研究は、金融という高い正確性と説明責任が求められる領域で、プロンプトの進化を「制御可能」かつ「帰属可能」にすることで、AIの出力を業務に耐える信頼性へ近づけようとしています。つまり、プラットフォーム側が利用シーンを広げる一方で、専門領域では透明性や統制を担保する技術が並行して求められており、AIの普及は「どこで使えるか」と「どこまで任せられるか」の両輪で進んでいると考えられます。

---

## 🎯 今日の実務アクション 3 選

1. **Anthropic、ClaudeをプラグインやスプレッドシートやホワイトボードなどのフルワークスペースへMeeting notesも近日追加**: まず、自社のチームがどんな作業でツールを行き来しているか洗い出し、Claude内で完結できそうなものを小さく試すのがよいでしょう。プロダクト側の担当者は、自社アプリをAIの画面内に組み込む形での提供を検討する価値があります。会議の記録のように機密性の高い情報を扱う機能は、保存先や権限の設定、社内ルールとの整合を事前に確認してから導入してください。Claude Meetingsは近日登場とされているため、公開時に評価できるよう準備しておくと安心です。
2. **FinEvolveKG:金融ナレッジグラフ構築のための、制御可能かつ帰属可能なプロンプト進化**: まず、自社の知識グラフやLLM抽出パイプラインで、全部門が守るべき共通ルールと、部門ごとに変えてよい部分を切り分けてみてください。次に、プロンプトの変更履歴をバージョン管理し、変更と出力品質の関係を追えるようにしておくと安心です。ファインチューニングとプロンプト最適化のコストを比べ、用途に合う方を検討するのも有効です。論文の詳細な手法や評価結果は、arXivの原文で確認することをお勧めします。
3. **OpenAI、ChatGPTを企業ディレクトリ化 顧客対応するAIエージェントを搭載**: まずは自社の商品データを、AIが扱いやすい形で整理しておきましょう。名称、価格、在庫、仕様などを一元管理しておくと、どのプラットフォームにも対応しやすくなります。エンジニアは、AIエージェント（利用者に代わって作業するAI）に任せる範囲と、人が対応する範囲の線引きを考えておくと安心です。リーダーは、ユーザーの反応データをどう活用するかの方針を、早めに決めておきましょう。現時点の対象は米国のEC事業者なので、日本での展開は続報を待つのが現実的です。

---

## 🔗 出典一覧
- [Anthropic、ClaudeをプラグインやスプレッドシートやホワイトボードなどのフルワークスペースへMeeting notesも近日追加](https://the-decoder.com/anthropic-turns-claude-into-a-full-workspace-with-plugins-spreadsheets-whiteboards-and-soon-meeting-notes/)
- [FinEvolveKG:金融ナレッジグラフ構築のための、制御可能かつ帰属可能なプロンプト進化](https://arxiv.org/abs/2611.08643)
- [OpenAI、ChatGPTを企業ディレクトリ化 顧客対応するAIエージェントを搭載](https://the-decoder.com/openai-turns-chatgpt-into-a-business-directory-with-ai-agents-that-handle-customer-questions/)
- [GitHub CopilotでGemini 4 Carbonが利用可能に](https://github.blog/changelog/2026-11-10-gemini-4-carbon-in-github-copilot)
- [GitHub CopilotでGemini 4 Carbonが利用可能に](https://the-decoder.com/gemini-4-carbon-arrives-just-in-time-to-feel-like-yesterdays-news-in-the-fastest-model-cycle-yet/)
- [エージェント評価プレイブック:Amazon Bedrock AgentCore Evaluationsの組み込み評価、DeepEval、AutoEvalを活用する](https://aws.amazon.com/blogs/machine-learning/the-agent-evaluation-playbook-built-in-deepeval-and-autoeval-on-agentcore/)
- [エージェント評価プレイブック:Amazon Bedrock AgentCore Evaluationsの組み込み評価、DeepEval、AutoEvalを活用する](https://aws.amazon.com/blogs/machine-learning/how-tcs-built-an-agentic-test-orchestrator-with-amazon-bedrock-agentcore/)
- [コアウィーブ、業績見通しを上方修正 減速懸念が和らぐ](https://www.bloomberg.com/news/videos/2026-11-11/coreweave-boosts-forecast-easing-slowdown-concerns-video)
- [コアウィーブ、業績見通しを上方修正 減速懸念が和らぐ](https://www.bloomberg.com/news/articles/2026-11-10/coreweave-boosts-annual-forecast-easing-concerns-about-slowdown)
- [コアウィーブ、業績見通しを上方修正 減速懸念が和らぐ](https://www.bloomberg.com/news/videos/2026-11-10/coreweave-earnings-top-estimates-boosts-annual-forecast-video)