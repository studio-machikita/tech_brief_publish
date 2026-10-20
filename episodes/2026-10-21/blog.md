<!--
---
title: "Tech News Radio — 2026-10-21"
subtitle: "ElevenLabs、リアルタイムAI会話向けの音声対音声モデルを2種類発表 / OpenAI、Orchestra Bioを買収 / ディープシーク、最速..."
date: "2026-10-21"
vol: 204
topics:
  - AI
  - Startup
  - Business
  - Science
  - LLM
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-10-21

*📖 約16分で読めます ｜ 🏷️ AI, Startup, Business, Science, LLM*

---

## 📌 今日のハイライト
- 🤖 **ElevenLabs、リアルタイムAI会話向けの音声対音声モデルを2種類発表** — ElevenLabsが高速・高精度の音声対話モデルを公開
- 🤖 **OpenAI、Orchestra Bioを買収** — OpenAIがOrchestra Bioを買収
- 🤖 **ディープシーク、最速かつ最安のAIモデルを支える推論エンジンをオープンソース化** — DeepseekがAI推論エンジンをオープンソース化
- 🤖 **DeepSeekがファーウェイのAIチップ開発に影響、エヌビディアへの挑戦が拡大** — DeepSeekがHuaweiのAIチップ設計に関与
- 🤖 **エンタープライズ、組織、チーム向けのCopilotモデルポリシーAPI** — Copilotのモデル利用ポリシーをAPIで管理可能に
- 🤖 **KVキャッシュを超えて:AWS Trainium2上でネイティブPyTorchを用い、i14のLaplace 3B線形アテンションモデルを学習・提供する** — 固定メモリで動く3B線形注意モデルの事例

---

## 🤖 ElevenLabs、リアルタイムAI会話向けの音声対音声モデルを2種類発表
`AI` `Startup`

<details>
<summary>📄 原題: Elevenlabs releases two new speech-to-speech models designed for real-time AI conversations</summary>
</details>

> **一言で**: ElevenLabsが高速・高精度の音声対話モデルを公開

- ElevenLabsが音声から音声へ変換する新モデルを2つ発表
- 名称はEleven Realtime、リアルタイム会話向け
- 上位版v1 MaxはBig Bench Audioで正答率98.8%
- 応答時間は0.57秒と、人間の会話に近い速さ
- 同社は「Artificial Analysisの順位表に、より速く正確なモデルはない」と主張

💡 **なぜ重要か**
音声AIの対話は、これまで「音声を文字にする、文章を作る、音声に戻す」という段階的な処理が主流でした。この方式は処理が重なるため、返答が遅れがちです。speech-to-speech（音声を直接音声に変換する方式）は、段階を減らして遅延を縮められます。ただ、速さを求めると精度が落ちやすいという弱点がありました。今回のモデルは、速さと精度の両立を打ち出しています。ElevenLabsは音声合成で知られる企業で、対話向けモデルへ領域を広げています。 音声対話の遅延が人の会話に近づけば、コールセンターの自動応対、音声アシスタント、翻訳、ゲームのキャラクター会話などで、実用の幅が広がると見られます。一方で、音声AIは各社の競争が激しい分野です。性能の比較は第三者の順位表を軸に進み、速度と精度の両立が選定の基準になっていくでしょう。ただし、今回の数値は同社の発表によるものです。実際の使い勝手は、利用者の検証で明らかになっていくと思われます。

🎯 **今日のアクション**
まず、自社の音声サービスで応答の遅れが課題になっていないか、現状を測ってください。そのうえで、Eleven Realtimeを試験的に組み込み、現行方式との遅延と精度を比べるのが現実的です。発表の数値は同社の主張なので、自社の用途に近い音声データで検証しましょう。日本語での認識精度や、料金体系の確認も欠かせません。リーダーは、音声対話を新規サービスや業務効率化に使えるか、早めに検討を始めると良いでしょう。

🔗 [原文を読む](https://the-decoder.com/elevenlabs-releases-two-new-speech-to-speech-models-designed-for-real-time-ai-conversations/)

---

## 🤖 OpenAI、Orchestra Bioを買収
`AI` `Business` `Science`

<details>
<summary>📄 原題: OpenAI acquires Orchestra Bio</summary>
</details>

> **一言で**: OpenAIがOrchestra Bioを買収

- OpenAIがOrchestra Bioの買収を発表
- 狙いは創薬など生命科学の研究開発（R&D）へのAI活用
- バイオ医薬チームの創薬スピード向上を支援
- 新しい治療法の実現を後押しする構えです

💡 **なぜ重要か**
創薬は開発に長い年月と巨額の費用がかかる分野です。研究データの整理や業務の調整など、運営面の負担も大きいと言われています。今回の買収で、OpenAIはAIを使った業務支援を生命科学のR&Dに持ち込もうとしています。汎用的なAIを手がけてきた企業が、医療や創薬のような専門分野へ踏み込む動きとして注目されます。 AI企業が特定の産業に深く入り込む流れが、さらに強まりそうです。バイオ医薬の現場にAIが根づけば、研究開発の進め方や期間が変わる可能性があります。一方で、医療に関わる分野では安全性や規制への対応が欠かせません。今後は、AI企業と製薬・バイオ企業の連携や競争が活発になると見られています。

🎯 **今日のアクション**
まずは、自社の業界で研究開発や運営業務のどこにAIを使えるか洗い出してみてください。特に医療・ヘルスケア分野のエンジニアは、データ管理や規制対応の要件を早めに整理しておくと役立ちます。リーダーは、OpenAIが生命科学向けにどんなサービスを出してくるのか、今後の発表を継続して追うことをおすすめします。

🔗 [原文を読む](https://openai.com/index/openai-to-acquire-orchestra-bio)

🔗 [原文を読む](https://techcrunch.com/2026/10/20/openai-acquires-startup-orchestra-bio%e2%81%a0-to-beef-up-its-biotech-business/)

🔗 [原文を読む](https://www.theinformation.com/briefings/openai-buys-drug-development-company-orchestra-bio)

---

## 🤖 ディープシーク、最速かつ最安のAIモデルを支える推論エンジンをオープンソース化
`AI` `LLM` `OSS`

<details>
<summary>📄 原題: Deepseek open-sources the inference engine that powers its fastest and cheapest AI model</summary>
</details>

> **一言で**: DeepseekがAI推論エンジンをオープンソース化

- DeepInferをオープンソースで公開
- 高速なV4.1-Flashモデルを支える基盤
- vLLMをベースにした推論システム
- 計算コストと消費電力を抑える設計
- OpenAIやAnthropicへの価格圧力が強まる

💡 **なぜ重要か**
AIモデルは、学習よりも実際に動かす推論の段階で、長期的に大きなコストがかかります。推論の効率はサービスの価格や電力消費に直結するため、各社が最適化を競っています。Deepseekは自社の高速・低価格なモデルを支える推論エンジンを公開しました。ベースのvLLMは広く使われているオープンソースの推論基盤です。モデルだけでなく、それを安く速く動かす仕組みまで公開した点が注目されます。 推論の効率化技術が公開されると、他社や個人開発者も同様のコスト削減を狙いやすくなります。OpenAIやAnthropicなど欧米の事業者には、価格を下げる圧力がさらに強まると見られています。AI提供側の競争軸が、モデルの性能だけでなく運用コストや省エネ性能にも広がっていくでしょう。オープンソースの推論基盤が充実すれば、自社運用を選ぶ企業が増える可能性もあります。

🎯 **今日のアクション**
まず、DeepInferの公開リポジトリとドキュメントを確認し、vLLMとの違いを把握してください。自社で推論基盤を運用している場合は、既存環境と比べたコストや消費電力を小規模な検証で測るのがおすすめです。外部のAI APIを使っているリーダーは、価格競争が進む前提で契約内容や乗り換えの選択肢を見直しておくと安心です。ライセンス条件も導入前に必ず確認しましょう。

🔗 [原文を読む](https://the-decoder.com/deepseek-open-sources-the-inference-engine-that-powers-its-fastest-and-cheapest-ai-model/)

---

## 🤖 DeepSeekがファーウェイのAIチップ開発に影響、エヌビディアへの挑戦が拡大
`AI` `Hardware` `Business`

<details>
<summary>📄 原題: How DeepSeek Is Shaping Huawei’s AI Chips in a Growing Challenge to Nvidia</summary>
</details>

> **一言で**: DeepSeekがHuaweiのAIチップ設計に関与

- DeepSeekとHuaweiが、次世代AIチップの設計で緊密に協力
- 計算方法やプロセッサ間のデータ移動が設計判断の対象
- Huaweiのエンジニアが長期間DeepSeekのオフィスに常駐
- 来年以降に登場するチップに、DeepSeekの要望を反映
- Nvidia製品なしで先端AIモデルを作る道を探る動き

💡 **なぜ重要か**
これまでAI開発は、Nvidiaのチップと、そのソフトウェア環境に強く依存してきました。今回の協力は、モデルを作る側が、チップの設計段階から要望を出す形です。一般的なメーカーと顧客の打ち合わせより、はるかに踏み込んでいます。関係者によると、Huaweiのエンジニアは長期間DeepSeekのオフィスに常駐しているそうです。モデルの計算方法や、プロセッサ間のデータ移動といった中核部分まで、設計に反映されると見られています。成功すれば、中国がNvidiaの技術なしで先端AIモデルを開発する一助になる可能性があります。 AIの開発基盤がNvidia一強から、複数の陣営に分かれる可能性があります。モデルとチップを一体で最適化する流れが強まれば、ソフトウェアとハードウェアの境目はさらに曖昧になります。成果が出れば、同じ手法を取る企業が他国にも増えるかもしれません。一方で、実際の性能や量産の見通しは、今後の発表を待つ必要があります。AIインフラの選択肢が増えれば、価格や供給の面で、ユーザー企業にも影響が及ぶと考えられます。

🎯 **今日のアクション**
エンジニアは、特定のチップ1社に依存しない設計を意識するとよいでしょう。モデルの計算方法やデータ移動の効率が、ハードウェア側の設計に左右される時代になっています。性能を引き出すには、チップの特性への理解が欠かせません。リーダーは、調達先を分散できるか、他社製チップへ移行する際のコストがどれほどかを点検してください。DeepSeekとHuaweiの動向は、公式発表や信頼できる報道で継続的に追うことをおすすめします。

🔗 [原文を読む](https://www.theinformation.com/articles/deepseek-shaping-huaweis-ai-chips-growing-challenge-nvidia)

---

## 🤖 エンタープライズ、組織、チーム向けのCopilotモデルポリシーAPI
`AI` `DevOps` `Cloud`

<details>
<summary>📄 原題: Copilot model policy API for enterprise, orgs, and teams</summary>
</details>

> **一言で**: Copilotのモデル利用ポリシーをAPIで管理可能に

- Copilotのモデルポリシーを取得・更新するREST APIが登場
- GETとPATCHのエンドポイントが新たに追加
- 対象はenterprise、enterprise teams、agent apps、organizations
- 管理画面での手作業から、コードによる一括管理へ

💡 **なぜ重要か**
Copilotでは複数のAIモデルから選べるようになり、企業はどのモデルを許可するかを決める必要があります。これまでは管理画面で設定する運用が中心だったと見られます。組織が増えるほど設定の手間とばらつきが問題になります。今回のAPIは、その運用をコードで扱えるようにするものです。 AIコーディング支援の統制が、画面操作からコードによる管理へ移っていくと見られます。ポリシーをスクリプトやCI/CDに組み込めば、設定の再現性や変更履歴の管理もしやすくなります。ガバナンス（統制）を求める大企業ほど、導入の障壁が下がるでしょう。AIツールの管理を自動化する流れは、他社サービスにも広がりそうです。

🎯 **今日のアクション**
まず、自社で現在どのモデルを許可しているかを棚卸ししてください。次に、GETで現状を取得して一覧にし、組織ごとの差を確認するとよいでしょう。そのうえで、望ましい設定をコードで管理し、PATCHで反映する運用を試せます。変更は権限を限定したトークンで行い、監査しやすい形で記録しておくと安心です。

🔗 [原文を読む](https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams)

---

## 🤖 KVキャッシュを超えて:AWS Trainium2上でネイティブPyTorchを用い、i14のLaplace 3B線形アテンションモデルを学習・提供する
`AI` `LLM` `Cloud`

<details>
<summary>📄 原題: Beyond the KV cache: Training and serving i14’s Laplace 3B linear attention model on AWS Trainium2 with native PyTorch</summary>
</details>

> **一言で**: 固定メモリで動く3B線形注意モデルの事例

- i14がLaplace 3Bを開発、AWS Trainium2で学習と推論を実施
- 線形注意（linear attention）を採用したモデル
- 再帰状態は1シーケンスあたり29.5 MBで固定
- コンテキストが長くなっても状態サイズは増えない
- Transformerのキー・バリューキャッシュの肥大化を回避
- ネイティブPyTorchで実装、推論時のメモリ量を見積もりやすい

💡 **なぜ重要か**
Transformerは文脈が長くなるほど、過去の計算結果を保存するキー・バリューキャッシュ（KV cache）が増えます。長い文脈や多数の同時リクエストを扱うと、推論のメモリ消費が大きな負担になります。線形注意モデルは、過去の情報を固定サイズの再帰状態にまとめるため、この問題を避けられます。今回の事例は、そうしたモデルをAWSの独自AIチップTrainium2上で、特別な仕組みを使わずネイティブPyTorchで学習し、運用まで行ったものだと見られています。 推論コストの大半はメモリが占めるため、使用量が文脈長に左右されない設計は、容量計画やコスト見積もりを大きく簡単にします。この方式が実用になれば、Transformer一強だったモデル設計に選択肢が増えます。NVIDIA以外のアクセラレータ（AI計算用の専用チップ）で大規模モデルを動かす流れも進みそうです。ただし、精度や長文での性能はTransformerと比べて確かめる必要があります。

🎯 **今日のアクション**
まず、自社のLLM運用でKVキャッシュがどれだけメモリを使っているか、文脈長ごとに測ってみてください。長文処理や同時接続数が多い用途では、線形注意など固定状態のモデルが候補になります。あわせて、Trainium2のようなNVIDIA以外のチップをPyTorchで試し、移植のしやすさやコストを検証しておくとよいでしょう。採用前には、自社タスクで精度を必ず比較してください。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/beyond-the-kv-cache-training-and-serving-i14s-laplace-3b-linear-attention-model-on-aws-trainium2-with-native-pytorch/)

---

## 📝 まとめ

これら3つのニュースに共通するのは、AI競争の主戦場がモデルの性能そのものから、「実際に使われる場面での最適化」へと移りつつあるという点です。ElevenLabsのリアルタイム音声対話モデルは低遅延という体験面の磨き込みを、Deepseekの推論エンジンのオープンソース化は速度とコスト効率という運用面の優位を、それぞれ押し出しています。一方、OpenAIによるOrchestra Bioの買収は、汎用的なAIの提供にとどまらず、専門領域に深く入り込むことで応用先を広げようとする動きとして読み取れます。全体として、AI業界は基盤モデルの開発競争から、推論の効率化、体験の質、そして垂直領域への展開という、より実用的で差別化しやすい層へと重心を移しており、オープンソース戦略と垂直統合戦略が並走しながら市場の主導権を争う構図が浮かび上がっています。

---

## 🎯 今日の実務アクション 3 選

1. **ElevenLabs、リアルタイムAI会話向けの音声対音声モデルを2種類発表**: まず、自社の音声サービスで応答の遅れが課題になっていないか、現状を測ってください。そのうえで、Eleven Realtimeを試験的に組み込み、現行方式との遅延と精度を比べるのが現実的です。発表の数値は同社の主張なので、自社の用途に近い音声データで検証しましょう。日本語での認識精度や、料金体系の確認も欠かせません。リーダーは、音声対話を新規サービスや業務効率化に使えるか、早めに検討を始めると良いでしょう。
2. **OpenAI、Orchestra Bioを買収**: まずは、自社の業界で研究開発や運営業務のどこにAIを使えるか洗い出してみてください。特に医療・ヘルスケア分野のエンジニアは、データ管理や規制対応の要件を早めに整理しておくと役立ちます。リーダーは、OpenAIが生命科学向けにどんなサービスを出してくるのか、今後の発表を継続して追うことをおすすめします。
3. **ディープシーク、最速かつ最安のAIモデルを支える推論エンジンをオープンソース化**: まず、DeepInferの公開リポジトリとドキュメントを確認し、vLLMとの違いを把握してください。自社で推論基盤を運用している場合は、既存環境と比べたコストや消費電力を小規模な検証で測るのがおすすめです。外部のAI APIを使っているリーダーは、価格競争が進む前提で契約内容や乗り換えの選択肢を見直しておくと安心です。ライセンス条件も導入前に必ず確認しましょう。

---

## 🔗 出典一覧
- [ElevenLabs、リアルタイムAI会話向けの音声対音声モデルを2種類発表](https://the-decoder.com/elevenlabs-releases-two-new-speech-to-speech-models-designed-for-real-time-ai-conversations/)
- [OpenAI、Orchestra Bioを買収](https://openai.com/index/openai-to-acquire-orchestra-bio)
- [OpenAI、Orchestra Bioを買収](https://techcrunch.com/2026/10/20/openai-acquires-startup-orchestra-bio%e2%81%a0-to-beef-up-its-biotech-business/)
- [OpenAI、Orchestra Bioを買収](https://www.theinformation.com/briefings/openai-buys-drug-development-company-orchestra-bio)
- [ディープシーク、最速かつ最安のAIモデルを支える推論エンジンをオープンソース化](https://the-decoder.com/deepseek-open-sources-the-inference-engine-that-powers-its-fastest-and-cheapest-ai-model/)
- [DeepSeekがファーウェイのAIチップ開発に影響、エヌビディアへの挑戦が拡大](https://www.theinformation.com/articles/deepseek-shaping-huaweis-ai-chips-growing-challenge-nvidia)
- [エンタープライズ、組織、チーム向けのCopilotモデルポリシーAPI](https://github.blog/changelog/2026-10-19-copilot-model-policy-api-for-enterprise-orgs-and-teams)
- [KVキャッシュを超えて:AWS Trainium2上でネイティブPyTorchを用い、i14のLaplace 3B線形アテンションモデルを学習・提供する](https://aws.amazon.com/blogs/machine-learning/beyond-the-kv-cache-training-and-serving-i14s-laplace-3b-linear-attention-model-on-aws-trainium2-with-native-pytorch/)