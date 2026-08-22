<!--
---
title: "Tech News Radio — 2026-08-23"
subtitle: "新しい研究で、人間の信念を無視する世界モデルは誤った行動を予測することが判明 / 2026年北京世界ヒューマノイドロボット競技会の様子 / RTX 509..."
date: "2026-08-23"
vol: 145
topics:
  - AI
  - Robotics
  - Science
  - Hardware
  - Startup
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-08-23

*📖 約11分で読めます ｜ 🏷️ AI, Robotics, Science, Hardware, Startup*

---

## 📌 今日のハイライト
- 🤖 **新しい研究で、人間の信念を無視する世界モデルは誤った行動を予測することが判明** — 世界モデルに人の信念を組み込むと予測精度が向上
- 🦾 **2026年北京世界ヒューマノイドロボット競技会の様子** — 北京で世界人型ロボット大会が開幕
- 🤖 **RTX 5090でFreeTokenを試してみた。35Bでは不要、120B級MoEでは話が変わる** — 巨大MoEモデルをGPU一枚で動かす新エンジン検証
- 🤖 **DeepMind出身者が設立したInherent、自社AI「チームメイト」が研究再現でAnthropicとOpenAIを上回ったと発表** — 英新興Inherent、研究再現AIで大手超えと主張
- 🤖 **Amazon Bedrock AgentCore Gatewayで AIエージェントのツールアクセスを管理する** — AIエージェントのツール利用を段階的に統制する手法
- 🤖 **AIエージェントが「スキル」から利益を得る理由と失敗する場面を解明した研究** — AIエージェントの「スキル」効果と限界を解明

---

## 🤖 新しい研究で、人間の信念を無視する世界モデルは誤った行動を予測することが判明
`AI` `Robotics` `Science`

<details>
<summary>📄 原題: World models that ignore human beliefs predict the wrong actions, new research shows</summary>
</details>

> **一言で**: 世界モデルに人の信念を組み込むと予測精度が向上

- SoraやGenieなど既存の世界モデルは物理法則のみを再現し、人の心理は無視している
- 新提案の「Mental World Modeling」は信念や意図といった心理変数を追加する枠組み
- この手法を使う小規模な言語モデルが、使わない大規模モデルより高い性能を示した
- 物理状態と心理状態が同時に変化する様子を予測することが最大の課題だそうです

💡 **なぜ重要か**
AIが動画や物理を予測する世界モデルは、ロボットや自動運転などの基盤技術として注目されています。ただ、これまでのモデルは物理現象の再現に偏り、人が何を考え、何を望んでいるかという心の動きを無視してきました。人と関わる場面を正しく予測するには、心理面のモデル化が欠かせないと見られています。 心理変数を扱う世界モデルが広がれば、人と協調するロボットや対話AIの行動予測が大きく改善する可能性があります。モデルの規模よりも設計の工夫が性能を左右するという結果は、今後のAI開発の方向性にも影響しそうです。

🎯 **今日のアクション**
AI開発者は、モデルの大規模化だけでなく、人の意図や信念を扱う設計手法にも目を向けるべきです。応用先がロボットや対話システムの場合は特に、心理モデリングの導入を検討する価値があります。

🔗 [原文を読む](https://the-decoder.com/world-models-that-ignore-human-beliefs-predict-the-wrong-actions-new-research-shows/)

---

## 🦾 2026年北京世界ヒューマノイドロボット競技会の様子
`Robotics` `Hardware`

<details>
<summary>📄 原題: Scenes From the 2026 Beijing World Humanoid Robot Games</summary>
</details>

> **一言で**: 北京で世界人型ロボット大会が開幕

- 2026年北京世界人型ロボット大会がスタート
- 世界666チームが参加
- 人型ロボット2000台以上が競技に登場

💡 **なぜ重要か**
人型ロボットの開発競争が世界規模で激化しており、中国が国家的な取り組みとして大会を主催しています。参加規模の大きさから、研究開発の裾野が急速に広がっている様子がうかがえます。 人型ロボット分野で技術力や人材が可視化され、各国の開発競争や投資の流れに影響を与えると見られています。

🎯 **今日のアクション**
エンジニアは大会の結果や採用技術の動向を追い、自社のロボティクス戦略に活かすとよさそうです。

🔗 [原文を読む](https://www.bloomberg.com/news/videos/2026-08-22/scenes-from-the-2026-beijing-world-humanoid-robot-games-video)

---

## 🤖 RTX 5090でFreeTokenを試してみた。35Bでは不要、120B級MoEでは話が変わる
`AI` `Hardware`

> **一言で**: 巨大MoEモデルをGPU一枚で動かす新エンジン検証

- RTX 5090 32GBとRAM 128GB環境でFreeToken 0.1.2を検証
- expertをRAMに置きGPUへ必要分だけキャッシュする仕組み
- 23.5GBの小型MoEではllama.cppやvLLMと差が小さい
- 120B級の大型MoEではVRAM超過時に真価を発揮する見込み
- 狙いは単純な高速化ではなくVRAM不足の解消

💡 **なぜ重要か**
近年のMoEモデルは全体サイズが巨大化し、コンシューマ向けGPUのVRAM容量を大きく超えるケースが増えています。FreeTokenは、必要なexpertだけをGPUに載せる方式で、この容量制約を回避しようとする試みだそうです。従来のvLLMやllama.cppとは異なる立ち位置を狙っている点が特徴です。 VRAM容量の壁が緩めば、個人や中小規模チームでも大型MoEモデルを試せる環境が広がると見られています。今後、同様のexpertキャッシュ方式を採用するサービングエンジンが増える可能性があります。

🎯 **今日のアクション**
自社で扱うモデルサイズとGPUのVRAM容量を照らし合わせ、収まらない場合はFreeTokenのようなexpertキャッシュ方式の検証を検討すべきです。特に120B級以上のMoEモデルを扱うチームは効果を確認する価値がありそうです。

🔗 [原文を読む](https://zenn.dev/holy_fox/articles/53b82eed45f956)

---

## 🤖 DeepMind出身者が設立したInherent、自社AI「チームメイト」が研究再現でAnthropicとOpenAIを上回ったと発表
`AI` `Science` `Startup`

<details>
<summary>📄 原題: Inherent, founded by DeepMind alumni, says its AI ‘teammate’ just outperformed Anthropic and OpenAI at replicating research</summary>
</details>

> **一言で**: 英新興Inherent、研究再現AIで大手超えと主張

- DeepMind出身者が設立したInherentがAIエージェント「Faraday」を発表
- 科学論文の再現能力でAnthropicとOpenAIを上回ったと主張
- 研究再現は科学的発見の自動化に向けた重要な一歩と見られています

💡 **なぜ重要か**
AI企業各社は研究開発を自動化するエージェント開発を競っています。論文の再現性は科学の信頼性を支える基盤で、これをAIが担えれば研究のスピードと質が大きく変わる可能性があります。 研究再現の自動化が進めば、科学研究の検証プロセスが効率化され、新薬開発や材料科学などの分野で発見サイクルが短縮されると期待されます。一方で大手AI企業と新興勢力の競争が激化しそうです。

🎯 **今日のアクション**
研究開発に関わるエンジニアは、こうしたAIエージェントの評価基準や再現性の定義を注視し、自社の研究プロセスへの応用可能性を検討すべきです。

🔗 [原文を読む](https://techcrunch.com/2026/08/22/inherent-founded-by-deepmind-alumni-says-its-ai-teammate-just-outperformed-anthropic-and-openai-at-replicating-research/)

---

## 🤖 Amazon Bedrock AgentCore Gatewayで AIエージェントのツールアクセスを管理する
`AI` `Cloud` `Security`

<details>
<summary>📄 原題: Govern AI agent tool access with Amazon Bedrock AgentCore Gateway</summary>
</details>

> **一言で**: AIエージェントのツール利用を段階的に統制する手法

- Amazon Bedrock AgentCore Gatewayでツールアクセスを統制
- Connect・Control・Catalog・Hardenの4段階モデルを提示
- インフラ統合せずに監査可能なアクセス管理を実現
- 統制上の課題が出た時だけ次の段階に進む設計思想

💡 **なぜ重要か**
AIエージェントが企業内の様々なツールやシステムにアクセスする機会が増え、権限管理や監査の仕組みが後回しになりがちです。無秩序なアクセス権限はセキュリティ事故につながるため、段階的に統制を強める設計思想が注目されています。 AIエージェント基盤の設計において、最初から複雑な統制の仕組みを作るのではなく、必要に応じて段階的に強化する考え方が広がりそうです。エンタープライズ向けAI導入の標準的な設計パターンになる可能性があります。

🎯 **今日のアクション**
AIエージェントを社内システムに接続する前に、自社に必要な統制レベルを見極め、過剰な初期投資を避けつつ段階的に権限管理を強化する計画を立てるべきです。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/govern-ai-agent-tool-access-with-amazon-bedrock-agentcore-gateway/)

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/scaling-cloud-migrations-with-agentic-ai-on-amazon-bedrock-agentcore/)

---

## 🤖 AIエージェントが「スキル」から利益を得る理由と失敗する場面を解明した研究
`AI` `LLM`

<details>
<summary>📄 原題: Study explains why AI agents benefit from &quot;skills&quot; and when they fail</summary>
</details>

> **一言で**: AIエージェントの「スキル」効果と限界を解明

- PrincetonとUCサンディエゴの研究チームがAIエージェントの「スキル」を検証
- スキルの効果は知識追加ではなく構造化された手順によるものと判明
- スキルライブラリが大きくなると適切な手順を選べなくなると指摘

💡 **なぜ重要か**
AIエージェントに定型的な「スキル」を与える手法は性能向上策として広まっていますが、その効果の仕組みは十分に解明されていませんでした。今回の研究は、スキルが単なる知識の追加ではなく作業手順の構造化によって効果を発揮する点を示した点で重要です。 スキル設計の考え方が、知識量を増やす方向から手順を整理する方向へ見直される可能性があります。またスキルの数が増えるほど選択の精度が下がるという課題は、今後のエージェント設計の大きな制約になりそうです。

🎯 **今日のアクション**
エンジニアはスキルライブラリを闇雲に増やすのではなく、少数精鋭で構造化された手順を用意する設計を心がけるべきです。またスキル選択の精度を測る評価の仕組みも合わせて検討するとよさそうです。

🔗 [原文を読む](https://the-decoder.com/study-explains-why-ai-agents-benefit-from-skills-and-when-they-fail/)

---

## 📝 まとめ

これら3つのニュースは、AIがより「実世界」に適応していく過程で直面している課題を異なる角度から映し出しています。1つ目は、AIが人間の行動を正確に予測するには、人間が持つ主観的な信念や誤解までモデル化する必要があるという、知能の「内面理解」への要求を示しています。2つ目のヒューマノイドロボット競技会は、そうした知能を物理的な身体に搭載し、実環境で動作させる「身体性」への挑戦を体現しており、3つ目のFreeTokenの検証は、巨大化するAIモデルを限られたハードウェア資源で効率的に稼働させるという、実用化に不可欠な計算基盤の最適化を扱っています。つまり全体を貫くのは、AIが実験室的な性能競争から一歩進み、人間社会や物理世界、そして現実的な計算コストの制約の中でいかに機能するかという「実装フェーズ」への移行であり、知能・身体・計算資源という三位一体の課題にどう向き合うかが今後の業界の焦点になっていくと考えられます。

---

## 🎯 今日の実務アクション 3 選

1. **新しい研究で、人間の信念を無視する世界モデルは誤った行動を予測することが判明**: AI開発者は、モデルの大規模化だけでなく、人の意図や信念を扱う設計手法にも目を向けるべきです。応用先がロボットや対話システムの場合は特に、心理モデリングの導入を検討する価値があります。
2. **2026年北京世界ヒューマノイドロボット競技会の様子**: エンジニアは大会の結果や採用技術の動向を追い、自社のロボティクス戦略に活かすとよさそうです。
3. **RTX 5090でFreeTokenを試してみた。35Bでは不要、120B級MoEでは話が変わる**: 自社で扱うモデルサイズとGPUのVRAM容量を照らし合わせ、収まらない場合はFreeTokenのようなexpertキャッシュ方式の検証を検討すべきです。特に120B級以上のMoEモデルを扱うチームは効果を確認する価値がありそうです。

---

## 🔗 出典一覧
- [新しい研究で、人間の信念を無視する世界モデルは誤った行動を予測することが判明](https://the-decoder.com/world-models-that-ignore-human-beliefs-predict-the-wrong-actions-new-research-shows/)
- [2026年北京世界ヒューマノイドロボット競技会の様子](https://www.bloomberg.com/news/videos/2026-08-22/scenes-from-the-2026-beijing-world-humanoid-robot-games-video)
- [RTX 5090でFreeTokenを試してみた。35Bでは不要、120B級MoEでは話が変わる](https://zenn.dev/holy_fox/articles/53b82eed45f956)
- [DeepMind出身者が設立したInherent、自社AI「チームメイト」が研究再現でAnthropicとOpenAIを上回ったと発表](https://techcrunch.com/2026/08/22/inherent-founded-by-deepmind-alumni-says-its-ai-teammate-just-outperformed-anthropic-and-openai-at-replicating-research/)
- [Amazon Bedrock AgentCore Gatewayで AIエージェントのツールアクセスを管理する](https://aws.amazon.com/blogs/machine-learning/govern-ai-agent-tool-access-with-amazon-bedrock-agentcore-gateway/)
- [Amazon Bedrock AgentCore Gatewayで AIエージェントのツールアクセスを管理する](https://aws.amazon.com/blogs/machine-learning/scaling-cloud-migrations-with-agentic-ai-on-amazon-bedrock-agentcore/)
- [AIエージェントが「スキル」から利益を得る理由と失敗する場面を解明した研究](https://the-decoder.com/study-explains-why-ai-agents-benefit-from-skills-and-when-they-fail/)