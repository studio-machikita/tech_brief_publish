<!--
---
title: "Tech News Radio — 2026-06-20"
subtitle: "ジョン・ジャンパー（@JohnJumperSci）がXに投稿 / プロジェクト・ヴァルハラ解説：10年の歳月を経てJDK 28に実装へ――JVM週刊 第1..."
date: "2026-06-20"
vol: 81
topics:
  - AI
  - Business
  - Science
  - OSS
  - Data
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-06-20

*📖 約13分で読めます ｜ 🏷️ AI, Business, Science, OSS, Data*

---

## 📌 今日のハイライト
- 🤖 **ジョン・ジャンパー（@JohnJumperSci）がXに投稿** — Google DeepMindからAI研究者が相次いで流出
- 📦 **プロジェクト・ヴァルハラ解説：10年の歳月を経てJDK 28に実装へ――JVM週刊 第180号** — 10年越しのProject ValhallaがJDK 28に搭載へ
- 📊 **DuckDBの内部構造：なぜDuckDBは高速なのか？** — DuckDBが高速な理由を内部構造から解説
- 🦾 **ヒュンダイ、ソフトバンクが3億2500万ドルで撤退しボストン・ダイナミクスを完全子会社化** — HyundaiがBoston Dynamicsの完全支配権を取得
- 🌐 **atprotoにはインスタンスが存在しない — overreacted** — atprotoにはインスタンスという概念が存在しない
- 🤖 **ノルウェー、小学校でのAI利用をほぼ全面禁止** — ノルウェーが小学校でのAI利用をほぼ禁止

---

## 🤖 ジョン・ジャンパー（@JohnJumperSci）がXに投稿
`AI` `Business` `Science`

<details>
<summary>📄 原題: John Jumper (@JohnJumperSci) on X</summary>
</details>

> **一言で**: Google DeepMindからAI研究者が相次いで流出

- ノーベル賞受賞者のJohn JumperがGoogle DeepMindを離れ、Anthropicへ移籍
- Gemini共同リードのNoam ShazeerはOpenAIへ、AlphaGo研究者のDavid Silverは独立
- 数ヶ月以内にGoogle DeepMindの主要AI研究者3名が相次いで離脱

💡 **なぜ重要か**
Google DeepMindはAlphaFoldやAlphaGoなど世界トップクラスのAI研究を牽引してきた組織です。しかし今回、ノーベル賞受賞者を含む看板研究者が短期間に複数離脱したことは、AI業界における人材獲得競争の激化を象徴しています。AnthropicやOpenAIといった競合が、優秀な研究者を積極的に引き抜いている構図が鮮明になっています。 トップ研究者の移籍は、各社の研究開発の方向性や成果に直接影響します。Anthropicはノーベル賞受賞者を迎えることで研究力を大幅に強化でき、OpenAIもGemini開発の中心人物を獲得しました。Google DeepMindは人材流出を食い止める施策を迫られており、AI業界全体で優秀な人材の争奪戦がさらに激化すると見られています。

🎯 **今日のアクション**
AI関連企業のリーダーは、優秀な研究者・エンジニアの定着率を高めるため、報酬だけでなく研究の自由度やビジョンの共有を見直す必要があります。エンジニア個人としては、各社の研究動向や採用状況を注視し、キャリアの選択肢を広げておくことが有益です。

🔗 [原文を読む](https://twitter.com/JohnJumperSci/status/2068001285173834106)

🔗 [原文を読む](https://the-decoder.com/google-deepmind-loses-another-top-ai-researcher-as-nobel-laureate-john-jumper-leaves-for-anthropic/)

🔗 [原文を読む](https://www.bloomberg.com/news/articles/2026-06-19/nobel-winner-john-jumper-to-leave-google-deepmind-for-anthropic)

---

## 📦 プロジェクト・ヴァルハラ解説：10年の歳月を経てJDK 28に実装へ――JVM週刊 第180号
`OSS`

<details>
<summary>📄 原題: Project Valhalla, Explained: How a Decade of Work Arrives in JDK 28 - JVM Weekly vol. 180</summary>
</details>

> **一言で**: 10年越しのProject ValhallaがJDK 28に搭載へ

- 要点1: 約10年開発が続いたProject ValhallaがJDK 28でついに実装される見通し
- 要点2: ただし状況は「少し複雑（nuanced）」とされており、単純な完成ではない模様
- 要点3: JVM Weeklyの第180号として取り上げられた注目度の高いトピック

💡 **なぜ重要か**
Project ValhallaはJava（JVM）に値型（Value Types）などの新しいデータ表現を導入するプロジェクトです。メモリ効率やパフォーマンスの改善を目的に2014年頃から開発が続いており、Javaエコシステム全体に影響する大型の言語・VM改善として長年注目されてきました。 値型の導入によりJavaアプリのメモリ使用量や処理速度が改善される可能性があります。特にデータ集約型の業務システムや高スループットが求められるサービスで恩恵が大きく、JavaやKotlinを使う開発現場の設計指針にも変化をもたらすと見られています。

🎯 **今日のアクション**
JDK 28のリリースノートやProject Valhallaの公式JEP（Java Enhancement Proposal）を確認し、値型の仕様と制約を把握しておくことを推奨します。既存コードへの影響を早めに評価しておくと移行がスムーズになるでしょう。

🔗 [原文を読む](https://www.jvm-weekly.com/p/project-valhalla-explained-how-a)

---

## 📊 DuckDBの内部構造：なぜDuckDBは高速なのか？
`Data` `OSS`

<details>
<summary>📄 原題: DuckDB Internals: Why is DuckDB Fast?</summary>
</details>

> **一言で**: DuckDBが高速な理由を内部構造から解説

- DuckDBは2019年にCWIアムステルダムの研究プロジェクトとして誕生し、今や最も普及したDBの一つ
- ノートブック、ETLパイプライン、ダッシュボード、SaaS組み込み分析など幅広い用途で採用
- iPhoneでの動作事例も挙がるほど、軽量・組み込み用途への展開が進んでいる
- 記事はDuckDBの内部アーキテクチャに踏み込み、高速性の仕組みをシリーズ形式で解説

💡 **なぜ重要か**
分析用データベース（OLAP）の世界では、これまでBigQueryやSnowflakeのようなクラウド型が主流でした。DuckDBはサーバー不要でローカル動作しながら高い分析性能を発揮するため、データエンジニアや研究者の間で急速に支持を集めています。その内部構造を解説する記事への関心は、採用が広がるにつれて自然と高まっています。 DuckDBの普及は「分析処理はクラウドで行うもの」という常識を変えつつあります。エッジやモバイル端末でも高速な分析が可能になれば、データパイプラインの設計思想そのものが見直される可能性があります。OSSとして内部構造が公開・解説されることで、次世代DBエンジンの設計にも影響を与えそうです。

🎯 **今日のアクション**
DuckDBをまだ試していないエンジニアは、まずローカル環境でPythonやSQLから触れてみましょう。既存のETLやBIツールの一部をDuckDBに置き換えられないか検討する価値があります。アーキテクチャに興味があれば、本記事シリーズを読んで列指向処理やベクトル実行エンジンの基礎を学ぶのがおすすめです。

🔗 [原文を読む](https://www.greybeam.ai/blog/duckdb-internals-part-1)

---

## 🦾 ヒュンダイ、ソフトバンクが3億2500万ドルで撤退しボストン・ダイナミクスを完全子会社化
`Robotics` `Business` `Hardware`

<details>
<summary>📄 原題: Hyundai takes full control of Boston Dynamics as SoftBank exits for $325 million - Startup Fortune</summary>
</details>

> **一言で**: HyundaiがBoston Dynamicsの完全支配権を取得

- SoftBankが保有するBoston Dynamics株をHyundaiに3億2500万ドルで売却
- これによりHyundaiがBoston Dynamicsの完全支配権を握る形に
- SoftBankはBoston Dynamicsへの関与から完全撤退

💡 **なぜ重要か**
Boston Dynamicsは二足・四足歩行ロボットで世界的に知られる企業です。かつてGoogleが買収し、その後SoftBankへ、さらにHyundaiへと渡ってきた経緯があります。Hyundaiは製造業・モビリティ分野でのロボット活用を強化しており、Boston Dynamicsの技術は自動車工場の自動化や物流への応用が期待されています。 自動車メーカーがロボティクス企業を完全傘下に収めることで、製造現場へのロボット導入が加速する可能性があります。また、SoftBankの撤退はロボティクス分野への投資戦略の見直しを示唆しており、業界全体の資金の流れにも影響を与えそうです。

🎯 **今日のアクション**
製造・物流分野のエンジニアやリーダーは、Hyundai主導のBoston Dynamics製品ロードマップの動向を注視し、自社の自動化戦略に組み込めるか検討する価値があります。

🔗 [原文を読む](https://startupfortune.com/hyundai-takes-full-control-of-boston-dynamics-as-softbank-exits-for-325-million/)

---

## 🌐 atprotoにはインスタンスが存在しない — overreacted
`Web` `OSS`

> ⚠️ **注意**: この記事は情報源が限られているため、内容の正確性を保証できません。必要に応じて一次情報もご確認ください。

<details>
<summary>📄 原題: There Are No Instances in atproto — overreacted</summary>
</details>

> **一言で**: atprotoにはインスタンスという概念が存在しない

- atproto（AT Protocol）はRSSのように、サーバーではなくデータの持ち運びを中心に設計されている
- Google ReaderとRSSの関係が引き合いに出され、特定サービスへの依存リスクが示唆されている
- 「インスタンス」という概念がないことで、分散型SNSの設計思想が従来と異なる可能性がある

💡 **なぜ重要か**
Mastodonなどの分散型SNSは「インスタンス」単位でサーバーを選ぶ設計です。一方、Blueskyが採用するatprotoは異なるアーキテクチャを持つとされ、その違いを解説する記事が注目を集めています。Google ReaderがRSSエコシステムを事実上支配し、サービス終了で多くのユーザーが困った歴史が、分散型プロトコル設計の重要性を示す教訓として語られています。 分散型ソーシャルプロトコルの設計思想が多様化すると、開発者はインスタンス前提の実装から脱却する必要が出てきます。atprotoの普及次第では、データの可搬性（ポータビリティ）を重視したアーキテクチャが業界標準の一つになる可能性があります。

🎯 **今日のアクション**
Blueskyやatprotoに関心があるエンジニアは、Mastodon型のインスタンスモデルとの違いを整理した上で、atprotoの公式仕様を読み直すことをお勧めします。

🔗 [原文を読む](https://overreacted.io/there-are-no-instances-in-atproto/)

---

## 🤖 ノルウェー、小学校でのAI利用をほぼ全面禁止
`AI` `Business`

> ⚠️ **注意**: この記事は情報源が限られているため、内容の正確性を保証できません。必要に応じて一次情報もご確認ください。

<details>
<summary>📄 原題: Norway imposes near ban on AI in elementary school</summary>
</details>

> **一言で**: ノルウェーが小学校でのAI利用をほぼ禁止

- ノルウェーが小学校段階でのAI活用をほぼ全面的に禁じる方針を打ち出した
- 子どもの学習・発達への悪影響を懸念した規制と見られている
- 欧州では教育現場へのAI導入に慎重な姿勢が広がりつつある

💡 **なぜ重要か**
生成AI（文章や画像を自動生成するAI）の普及により、世界中の教育機関がその扱いに頭を悩ませています。特に低年齢層への影響については、思考力や読み書き能力の発達を妨げるリスクが指摘されており、各国が対応を模索しています。ノルウェーの今回の動きは、そうした懸念を政策として具体化した事例と言えます。 教育分野向けのAIサービスを展開する企業にとって、欧州市場での規制リスクが高まります。一方で、年齢層や用途に応じた「段階的なAI導入モデル」の設計が業界標準として求められるようになる可能性があります。規制の動向がEdTech（教育テクノロジー）市場の方向性を左右する局面に入ったと言えるでしょう。

🎯 **今日のアクション**
教育向けAIプロダクトを開発・提供するエンジニアやリーダーは、欧州の規制動向を定期的に確認し、年齢別の利用制限や保護者・教師の監督機能を設計段階から組み込むことを検討してください。また、自社サービスが子どもの認知発達に与える影響について、社内で議論する場を設けることをお勧めします。

🔗 [原文を読む](https://www.reuters.com/technology/norway-imposes-near-ban-ai-elementary-school-2026-06-19/)

---

## 📝 まとめ

これら3つのニュースに共通して流れているのは、**技術的な「深さ」と「長期的な投資」が現代のソフトウェア競争力を左右する**という潮流である。DuckDBの高速性がベクトル化実行エンジンやカラム指向ストレージといった内部設計の徹底した最適化に由来するように、Project Valhallaもまた10年という歳月をかけてJVMの型システムを根本から再設計するという、地道かつ本質的なアプローチを取っている。一方でGoogle DeepMindからのAI研究者流出は、最先端の知見を持つ人材が市場で極めて高く評価されている現状を示しており、深い専門性そのものが希少資源として争奪戦の対象になっていることを物語る。つまり業界全体として、表層的な機能追加よりも**基盤レベルの技術的卓越性**――アーキテクチャ設計であれ、言語ランタイムであれ、人材の知的資本であれ――を誰が押さえるかが、中長期的な競争優位を決定づける局面に入っていると読み取れる。

---

## 🎯 今日の実務アクション 3 選

1. **ジョン・ジャンパー（@JohnJumperSci）がXに投稿**: AI関連企業のリーダーは、優秀な研究者・エンジニアの定着率を高めるため、報酬だけでなく研究の自由度やビジョンの共有を見直す必要があります。エンジニア個人としては、各社の研究動向や採用状況を注視し、キャリアの選択肢を広げておくことが有益です。
2. **プロジェクト・ヴァルハラ解説：10年の歳月を経てJDK 28に実装へ――JVM週刊 第180号**: JDK 28のリリースノートやProject Valhallaの公式JEP（Java Enhancement Proposal）を確認し、値型の仕様と制約を把握しておくことを推奨します。既存コードへの影響を早めに評価しておくと移行がスムーズになるでしょう。
3. **DuckDBの内部構造：なぜDuckDBは高速なのか？**: DuckDBをまだ試していないエンジニアは、まずローカル環境でPythonやSQLから触れてみましょう。既存のETLやBIツールの一部をDuckDBに置き換えられないか検討する価値があります。アーキテクチャに興味があれば、本記事シリーズを読んで列指向処理やベクトル実行エンジンの基礎を学ぶのがおすすめです。

---

## 🔗 出典一覧
- [ジョン・ジャンパー（@JohnJumperSci）がXに投稿](https://twitter.com/JohnJumperSci/status/2068001285173834106)
- [ジョン・ジャンパー（@JohnJumperSci）がXに投稿](https://the-decoder.com/google-deepmind-loses-another-top-ai-researcher-as-nobel-laureate-john-jumper-leaves-for-anthropic/)
- [ジョン・ジャンパー（@JohnJumperSci）がXに投稿](https://www.bloomberg.com/news/articles/2026-06-19/nobel-winner-john-jumper-to-leave-google-deepmind-for-anthropic)
- [プロジェクト・ヴァルハラ解説：10年の歳月を経てJDK 28に実装へ――JVM週刊 第180号](https://www.jvm-weekly.com/p/project-valhalla-explained-how-a)
- [DuckDBの内部構造：なぜDuckDBは高速なのか？](https://www.greybeam.ai/blog/duckdb-internals-part-1)
- [ヒュンダイ、ソフトバンクが3億2500万ドルで撤退しボストン・ダイナミクスを完全子会社化](https://startupfortune.com/hyundai-takes-full-control-of-boston-dynamics-as-softbank-exits-for-325-million/)
- [atprotoにはインスタンスが存在しない — overreacted](https://overreacted.io/there-are-no-instances-in-atproto/)
- [ノルウェー、小学校でのAI利用をほぼ全面禁止](https://www.reuters.com/technology/norway-imposes-near-ban-ai-elementary-school-2026-06-19/)