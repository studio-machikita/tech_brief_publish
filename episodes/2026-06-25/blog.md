<!--
---
title: "Tech News Radio — 2026-06-25"
subtitle: "Gemini 3.5 Flashにコンピューター操作機能を導入 / 熱湯より熱い45℃冷却：AIの巨大マシンを冷やす画期的技術 / RubyLLM"
date: "2026-06-25"
vol: 86
topics:
  - AI
  - LLM
  - Cloud
  - Hardware
  - OSS
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-06-25

*📖 約11分で読めます ｜ 🏷️ AI, LLM, Cloud, Hardware, OSS*

---

## 📌 今日のハイライト
- 🤖 **Gemini 3.5 Flashにコンピューター操作機能を導入** — Gemini 3.5 FlashにPC操作機能が追加
- 🤖 **熱湯より熱い45℃冷却：AIの巨大マシンを冷やす画期的技術** — 45°C液冷でAIデータセンターの冷却を刷新
- 🤖 **RubyLLM** — 主要AIプロバイダーを統合するRubyフレームワーク
- 🔧 **クアルコム、モジュラーを買収へ** — QualcommがModularを約39億ドルで買収へ
- 🤖 **Krea 2 技術レポート** — Krea社が画像生成モデル「Krea 2」の技術レポートを公開
- ☁️ **Bunny DNSを無料化します** — Bunny DNSがクエリ課金を完全廃止し無料化

---

## 🤖 Gemini 3.5 Flashにコンピューター操作機能を導入
`AI` `LLM` `Cloud`

<details>
<summary>📄 原題: Introducing computer use in Gemini 3.5 Flash</summary>
</details>

> **一言で**: Gemini 3.5 FlashにPC操作機能が追加

- Google が Gemini 3.5 Flash モデルに「computer use」機能を導入
- AIがPC画面を認識し、操作を自律的に実行できる機能と見られる
- 軽量・高速な Flash モデルへの搭載で、コスト効率の高い自動化が期待される

💡 **なぜ重要か**
AIがブラウザやデスクトップを直接操作する「computer use」機能は、Anthropic の Claude が先行して注目を集めました。Google が同様の機能を Gemini 3.5 Flash という軽量モデルに搭載することで、より低コストでの業務自動化が現実的になりつつあります。 AIによるPC操作の自動化が普及すると、RPAツールや従来の業務自動化ソフトウェアの市場が大きく変わる可能性があります。また、軽量モデルでの実現はエッジ環境への展開も視野に入れており、自動化の適用範囲がさらに広がると見られます。

🎯 **今日のアクション**
Gemini 3.5 Flash の computer use API の仕様や利用条件を確認し、社内の反復作業や定型業務への適用可能性を早期に評価することをお勧めします。セキュリティリスク（AIによる意図しない操作など）の検討も並行して行うべきです。

🔗 [原文を読む](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-computer-use-gemini-3-5-flash/)

---

## 🤖 熱湯より熱い45℃冷却：AIの巨大マシンを冷やす画期的技術
`AI` `Hardware` `Cloud`

<details>
<summary>📄 原題: Hotter Than a Hot Tub: The 45°C Breakthrough to Cool AI’s Biggest Machines</summary>
</details>

> **一言で**: 45°C液冷でAIデータセンターの冷却を刷新

- NVIDIAが45°Cという高温の冷却水を使う液冷技術のブレークスルーを発表
- 従来より高い温度設定により、冷却システムの効率が大幅に向上する見込み
- AI工場（大規模AIインフラ）向けに設計された冷却アプローチ
- エネルギー消費の削減につながる可能性があると見られている

💡 **なぜ重要か**
生成AIの普及でデータセンターの消費電力は急増しており、冷却コストとエネルギー効率が業界全体の課題になっています。従来の液冷は低温の冷却水を使うのが一般的でしたが、高温冷却水を使えるなら冷却設備の設計が大きく変わります。NVIDIAのRubinなど次世代GPUは発熱量がさらに増えるため、冷却技術の革新は急務です。 45°Cという高温冷却水が実用化されれば、データセンターの冷却インフラの設計思想が根本から変わる可能性があります。冷却設備のコスト削減や省エネが進み、AI投資の経済性が改善されるでしょう。大手クラウド事業者やコロケーション（共用データセンター）事業者にとっても、設備刷新の判断材料になると見られます。

🎯 **今日のアクション**
データセンターの設計や調達に関わるエンジニア・インフラリーダーは、NVIDIAの液冷仕様を早めに確認し、次世代GPU導入時の冷却設計に反映できるか検討しておくことをお勧めします。

🔗 [原文を読む](https://blogs.nvidia.com/blog/liquid-cooling-ai-factories/)

---

## 🤖 RubyLLM
`AI` `LLM` `OSS`

> **一言で**: 主要AIプロバイダーを統合するRubyフレームワーク

- RubyLLMは主要なAIプロバイダーをまとめて扱えるRuby向けフレームワーク
- チャット・画像生成・埋め込み（Embeddings）・ツール連携など多機能を搭載
- Railsとの統合や非同期処理、エージェント型ワークフローにも対応
- 音声文字起こし（Audio Transcription）やモデルレジストリ機能も含む

💡 **なぜ重要か**
AIアプリ開発ではOpenAIやAnthropicなど複数プロバイダーのAPIを個別に扱う手間が課題でした。RubyコミュニティにはPythonのLangChainに相当する統合ライブラリが不足しており、RubyLLMはその空白を埋める存在として注目されています。 RubyやRailsを使うエンジニアがAI機能を既存アプリへ素早く組み込めるようになります。特にRails資産を持つスタートアップや中小企業にとって、AIプロバイダーの乗り換えコストが下がる効果が期待できます。

🎯 **今日のアクション**
RubyベースのプロジェクトにAI機能を追加したいエンジニアは、まず公式ドキュメントの「Getting Started」を確認し、自社で使うプロバイダーへの対応状況をModel Registryで検証するのが第一歩です。

🔗 [原文を読む](https://rubyllm.com/)

---

## 🔧 クアルコム、モジュラーを買収へ
`Hardware` `Startup` `Business`

<details>
<summary>📄 原題: Qualcomm to Acquire Modular</summary>
</details>

> **一言で**: QualcommがModularを約39億ドルで買収へ

- 買収額は約39億ドル（株式交換）で、Modularの評価額を2倍以上に引き上げ
- Modularは異なるチップ向けにコードを書き直さずに動くソフトを開発できる技術を持つ
- Qualcommはこの買収でソフトウェアの移植性（ポータビリティ）を強化する狙いとみられる

💡 **なぜ重要か**
チップの多様化が進む中、同じコードを複数のアーキテクチャで動かすことへの需要が高まっています。特にAI処理向けチップが乱立する昨今、開発者がチップごとにコードを書き直す手間は大きな課題です。Modularはその問題を解消する技術を持つスタートアップで、Qualcommにとって戦略的な価値があると見られています。 チップメーカーがソフトウェア抽象化レイヤーを自社で持つ動きが加速する可能性があります。開発者はチップを意識せずにコードを書ける環境が広がり、特定ベンダーへの依存度が下がるかもしれません。一方でQualcommがこの技術を囲い込む方向に進めば、逆にエコシステムが分断されるリスクもあります。

🎯 **今日のアクション**
Modularの技術スタックや対応チップの範囲を調査し、自社プロダクトのマルチチップ対応戦略に活かせるか検討してみてください。また、今後Qualcommがこの技術をどう製品に組み込むか動向を注視することをお勧めします。

🔗 [原文を読む](https://www.reuters.com/business/qualcomm-buy-ai-startup-modular-2026-06-24/)

🔗 [原文を読む](https://www.theinformation.com/briefings/qualcomm-acquire-startup-modular-nearly-4-billion)

---

## 🤖 Krea 2 技術レポート
`AI` `LLM` `Startup`

<details>
<summary>📄 原題: Krea 2 Technical Report</summary>
</details>

> **一言で**: Krea社が画像生成モデル「Krea 2」の技術レポートを公開

- Krea社が自社画像生成モデルの技術的詳細をまとめたレポートを公開
- Krea 2は同社のImage Generator・Video Generator等のサービス基盤となるモデルと見られる
- オープンウェイト（重みを公開）の大規模モデルとして開発されたと見られる

💡 **なぜ重要か**
画像生成AIの競争が激化する中、Kreaは独自モデルの技術情報を公開することで、開発者コミュニティへの透明性を示そうとしています。オープンウェイトモデルの公開は、研究者や開発者が自由に活用できる点で注目されます。 大手に限らず中規模のAIスタートアップが独自の基盤モデルを開発・公開する流れが加速すると考えられます。技術レポートの公開は、モデルの信頼性評価や再現研究を促し、画像生成AI全体の底上げにつながる可能性があります。

🎯 **今日のアクション**
Krea 2の技術レポート全文を確認し、モデルのアーキテクチャや学習手法を把握しておくと良いでしょう。自社サービスへの画像生成AI組み込みを検討している場合は、KreaのAPIプランも合わせて確認することをお勧めします。

🔗 [原文を読む](https://www.krea.ai/blog/krea-2-technical-report)

---

## ☁️ Bunny DNSを無料化します
`Cloud` `Web` `DevOps`

<details>
<summary>📄 原題: We’re making Bunny DNS free</summary>
</details>

> **一言で**: Bunny DNSがクエリ課金を完全廃止し無料化

- Bunny DNSのDNSクエリ料金を完全撤廃
- リクエスト数に応じた課金もクエリ上限も廃止
- トラフィック増加に伴うDNSコストの悩みが解消

💡 **なぜ重要か**
DNS（ドメイン名解決サービス）はWebサービスの基盤インフラです。多くのDNSプロバイダーはクエリ数に応じた従量課金を採用しており、トラフィックが増えるほどコストが膨らむ構造でした。Bunny DNSはこの課金モデルを根本から見直し、クエリ料金をゼロにしました。 DNSのコストがゼロになることで、スタートアップや個人開発者がインフラコストを気にせずスケールできる環境が整います。他のDNSプロバイダーにも価格競争の圧力がかかり、業界全体の料金体系が見直されるきっかけになる可能性があります。

🎯 **今日のアクション**
現在利用中のDNSプロバイダーのコストを見直し、Bunny DNSへの移行が費用削減につながるか検討してみましょう。特にトラフィックが多いサービスを運営しているチームは試算する価値があります。

🔗 [原文を読む](https://bunny.net/blog/were-making-bunny-dns-free/)

---

## 📝 まとめ

これら3つのニュースに共通するのは、AIの「実用化・社会実装」がいよいよ本格的な段階に入ったという潮流です。Gemini 3.5 FlashへのPC操作機能の追加は、AIがチャットの域を超えて実際の業務フローに直接介入するエージェント化の加速を示しており、RubyLLMのような複数プロバイダーを統合する開発フレームワークの登場も、AIを日常的なソフトウェア開発に組み込むインフラ整備が進んでいることを裏付けています。一方で、45℃液冷技術というハードウェア側のニュースは、こうしたAI活用の拡大が膨大な電力・冷却コストという物理的制約に直面していることを示しており、ソフトウェアの進化と並行してインフラ基盤の革新も不可欠であることを浮き彫りにしています。つまり業界全体として、AIの能力拡張と普及を支えるために、アプリケーション層・開発者ツール層・物理インフラ層という複数のレイヤーが同時並行で急速に進化しているという構造的な転換期にあると言えるでしょう。

---

## 🎯 今日の実務アクション 3 選

1. **Gemini 3.5 Flashにコンピューター操作機能を導入**: Gemini 3.5 Flash の computer use API の仕様や利用条件を確認し、社内の反復作業や定型業務への適用可能性を早期に評価することをお勧めします。セキュリティリスク（AIによる意図しない操作など）の検討も並行して行うべきです。
2. **熱湯より熱い45℃冷却：AIの巨大マシンを冷やす画期的技術**: データセンターの設計や調達に関わるエンジニア・インフラリーダーは、NVIDIAの液冷仕様を早めに確認し、次世代GPU導入時の冷却設計に反映できるか検討しておくことをお勧めします。
3. **RubyLLM**: RubyベースのプロジェクトにAI機能を追加したいエンジニアは、まず公式ドキュメントの「Getting Started」を確認し、自社で使うプロバイダーへの対応状況をModel Registryで検証するのが第一歩です。

---

## 🔗 出典一覧
- [Gemini 3.5 Flashにコンピューター操作機能を導入](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-computer-use-gemini-3-5-flash/)
- [熱湯より熱い45℃冷却：AIの巨大マシンを冷やす画期的技術](https://blogs.nvidia.com/blog/liquid-cooling-ai-factories/)
- [RubyLLM](https://rubyllm.com/)
- [クアルコム、モジュラーを買収へ](https://www.reuters.com/business/qualcomm-buy-ai-startup-modular-2026-06-24/)
- [クアルコム、モジュラーを買収へ](https://www.theinformation.com/briefings/qualcomm-acquire-startup-modular-nearly-4-billion)
- [Krea 2 技術レポート](https://www.krea.ai/blog/krea-2-technical-report)
- [Bunny DNSを無料化します](https://bunny.net/blog/were-making-bunny-dns-free/)