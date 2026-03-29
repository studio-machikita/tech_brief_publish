<!--
---
title: "Tech News Radio — 2026-03-27"
subtitle: "データを完全に自分で管理できるチャット。 / OpenTelemetryプロファイルがパブリックアルファ版に突入 / GitHub - russellro..."
date: "2026-03-27"
vol: 4
topics:
  - OSS
  - Web
  - DevOps
  - Cloud
  - Data
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-03-27

*📖 約11分で読めます ｜ 🏷️ OSS, Web, DevOps, Cloud, Data*

---

## 📌 今日のハイライト
- 📦 **データを完全に自分で管理できるチャット。** — AT Protocolベースのオープンソースチャット基盤「Colibri」
- 📦 **OpenTelemetryプロファイルがパブリックアルファ版に突入** — OpenTelemetryのプロファイリング機能がパブリックアルファに到達
- 📦 **GitHub - russellromney/turbolite: S3からの50ms未満のコールドクエリを実現するSQLite VFS（ページレベルの圧縮・暗号化対応）** — S3からSQLiteをサブ50msで読み出すVFS実装
- 🔬 **テーブルからどれだけの精度を引き出せるか？** — テーブル参照で数値精度をどこまで高められるか
- 🔒 **LiteLLMマルウェア攻撃への私の分刻みの対応記録** — LiteLLMマルウェア攻撃をエンジニアがリアルタイムで封じ込めた
- 🔧 **RaspberryPiでFireWireを使用する** — Raspberry PiでFireWireデバイスを動かす試み

---

## 📦 データを完全に自分で管理できるチャット。
`OSS` `Web`

<details>
<summary>📄 原題: Chats where you truly own your data.</summary>
</details>

> **一言で**: AT Protocolベースのオープンソースチャット基盤「Colibri」

- 要点1: ColibriはAT Protocol（分散型SNSの基盤技術）を使ったオープンソースのチャットプラットフォーム
- 要点2: 大小さまざまなコミュニティ向けに設計されており、データの完全な所有権をユーザに保証
- 要点3: ソースコードはGitHubで公開済み。関連プロジェクト「Leaflet.pub」も展開中

💡 **なぜ重要か**
中央集権型のチャットサービスではプラットフォーム側がデータを管理するため、ユーザはデータの移行や削除を自由に行えません。AT Protocol（Blueskyが開発した分散型プロトコル）を使うことで、データの主権をユーザ自身が持てる仕組みを実現しようとする動きが広がっています。Colibriはその流れに乗ったチャット特化の実装例です。 AT Protocolを軸にしたコミュニケーションツールが増えると、特定企業に依存しない分散型インターネットの実用化が加速します。チャット領域でもデータポータビリティ（データを持ち運べる自由）が標準的な要件になる可能性があります。

🎯 **今日のアクション**
分散型プロトコルへの関心があるエンジニアは、ColibriのGitHubリポジトリを確認し、AT Protocolの実装パターンを学ぶ出発点として活用してみてください。コミュニティ運営者は自前ホスティングの選択肢として検討する価値があります。

🔗 [原文を読む](https://colibri.social/)

---

## 📦 OpenTelemetryプロファイルがパブリックアルファ版に突入
`OSS` `DevOps` `Cloud`

<details>
<summary>📄 原題: OpenTelemetry Profiles Enters Public Alpha</summary>
</details>

> **一言で**: OpenTelemetryのプロファイリング機能がパブリックアルファに到達

- Profiling SIGが、Profilesシグナルのパブリックアルファ移行を正式発表
- トレース・メトリクス・ログに並ぶ第4の柱として、継続的プロファイリングを標準化
- 本番環境でのプロファイリング統一規格を目指し、コミュニティからのフィードバックを募集中

💡 **なぜ重要か**
OpenTelemetryはオブザーバビリティ（システム観測可能性）の業界標準として広く普及しています。これまでトレース・メトリクス・ログの3シグナルが中心でしたが、本番環境でのパフォーマンス分析に欠かせないプロファイリング（CPU使用率やメモリ消費などの詳細計測）は標準化が遅れていました。各社がバラバラなツールを使う状況を解消するため、統一仕様の策定が進められてきました。 プロファイリングがOpenTelemetryに統合されることで、オブザーバビリティのデータが一元管理できるようになります。ベンダー依存を減らし、異なるツール間でのプロファイルデータの互換性が高まるため、パフォーマンス改善の作業効率が上がると見られています。長期的にはクラウドネイティブ環境での標準的な計測手法として定着する可能性があります。

🎯 **今日のアクション**
OpenTelemetryを既に導入しているチームは、Profiles機能のアルファ版を検証環境で試し、フィードバックをコミュニティに提供するのが有益です。新規導入を検討しているチームは、4シグナル対応を見据えた設計を今から意識しておくとよいでしょう。

🔗 [原文を読む](https://opentelemetry.io/blog/2026/profiles-alpha/)

---

## 📦 GitHub - russellromney/turbolite: S3からの50ms未満のコールドクエリを実現するSQLite VFS（ページレベルの圧縮・暗号化対応）
`OSS` `Cloud` `Data`

<details>
<summary>📄 原題: GitHub - russellromney/turbolite: SQLite VFS with sub-50ms cold queries from S3 + page-level compression and encryption</summary>
</details>

> **一言で**: S3からSQLiteをサブ50msで読み出すVFS実装

- turboliteはSQLiteのVFS（仮想ファイルシステム）層をS3向けに実装したOSSライブラリ
- コールドクエリ（キャッシュなし初回読み出し）でも50ms未満のレイテンシ（遅延）を実現
- ページ単位の圧縮と暗号化をサポートし、ストレージ効率とセキュリティを両立
- S3上のSQLiteファイルをそのまま活用できるため、サーバーレス構成との親和性が高い

💡 **なぜ重要か**
SQLiteはシンプルで軽量なため広く使われていますが、S3などのオブジェクトストレージ上で直接クエリを実行するには遅延が課題でした。サーバーレスやエッジコンピューティングの普及で、データベースをオブジェクトストレージに置きたいニーズが高まっており、turboliteはその解決策の一つです。 S3をバックエンドにしたSQLiteの実用化が進むと、RDSなどのマネージドDBを使わずに済むユースケースが増えます。インフラコストの削減やアーキテクチャの簡素化につながる可能性があり、特にリードヘビーな小〜中規模アプリへの影響は大きいと見られています。

🎯 **今日のアクション**
サーバーレス構成やエッジ環境でSQLiteを使っているチームは、turboliteのベンチマークを自社ワークロードで検証してみる価値があります。特にコールドスタート時の遅延が問題になっているケースでは、導入効果を測定してみてください。

🔗 [原文を読む](https://github.com/russellromney/turbolite)

---

## 🔬 テーブルからどれだけの精度を引き出せるか？
`Science` `Data`

<details>
<summary>📄 原題: How much precision can you squeeze out of a table?</summary>
</details>

> **一言で**: テーブル参照で数値精度をどこまで高められるか

- 要点1: Feynmanの言葉を引用しつつ、テーブル（表）から引き出せる数値精度の限界を探る内容
- 要点2: 数学・信号処理・確率論を専門とするサイトの記事で、精度とトレードオフの議論と見られる
- 要点3: スニペットが短く詳細は不明だが、数値計算における近似手法の考察記事だそうです

💡 **なぜ重要か**
数値計算でテーブル参照（ルックアップテーブル）を使う手法は、計算コストを下げる古典的な技術です。しかし精度の限界については見落とされがちで、改めて問い直す意義があります。 組み込みシステムやDSP（デジタル信号処理）など、リソースが限られた環境では今もテーブル参照が現役です。精度の理論的な上限を理解することは、設計判断の質を高めます。

🎯 **今日のアクション**
数値計算や信号処理を扱うエンジニアは、テーブル参照の精度限界を定量的に把握し、用途に応じた手法選択の基準を見直してみましょう。

🔗 [原文を読む](https://www.johndcook.com/blog/2026/03/26/table-precision/)

---

## 🔒 LiteLLMマルウェア攻撃への私の分刻みの対応記録
`Security` `OSS` `AI`

<details>
<summary>📄 原題: My minute-by-minute response to the LiteLLM malware attack</summary>
</details>

> **一言で**: LiteLLMマルウェア攻撃をエンジニアがリアルタイムで封じ込めた

- PyPIのLiteLLMパッケージにマルウェアが混入、エンジニアが発見し隔離申請
- 発見から対応までの一分一秒を記録した詳細なレポートを公開
- AIツールの普及で、セキュリティ専門家でなくても脅威を素早く検知できる時代に

💡 **なぜ重要か**
LiteLLMはLLM（大規模言語モデル）のAPIを統一的に扱えるOSSライブラリで、多くのAI開発者が利用しています。PyPI（Pythonの公式パッケージ配布サービス）への不正なパッケージ混入は、サプライチェーン攻撃と呼ばれる手口で、近年増加傾向にあります。今回は一般のエンジニアが自力で問題を発見し、PyPIに隔離を求めた点が注目されています。 AIツールの活用により、セキュリティの専門訓練を受けていないエンジニアでも脅威を迅速に発見・報告できるようになりつつあります。OSSのサプライチェーンセキュリティへの関心がさらに高まり、パッケージ配布基盤の監視体制強化が業界全体で求められるようになるでしょう。

🎯 **今日のアクション**
利用中のOSSパッケージのバージョンを定期的に確認し、PyPIなどの配布元からのセキュリティアラートを購読してください。また、AIツールを活用した脅威検知のワークフローを自チームに取り入れることを検討する価値があります。

🔗 [原文を読む](https://futuresearch.ai/blog/litellm-attack-transcript/)

---

## 🔧 RaspberryPiでFireWireを使用する
`Hardware` `OSS`

<details>
<summary>📄 原題: Using FireWire on a Raspberry Pi</summary>
</details>

> **一言で**: Raspberry PiでFireWireデバイスを動かす試み

- AppleがmacOS 26 TahoeでFireWire（IEEE 1394）サポートを廃止
- 古いDVカメラやHDDなどFireWire機器の代替接続先としてRaspberry Piが候補に
- Jeff Geerling氏が旧Canon GL1カメラをRaspberry Piで使う方法を模索

💡 **なぜ重要か**
FireWireはかつてビデオ編集や外付けストレージで広く使われたインターフェース規格です。Appleが長年サポートを続けてきましたが、macOS 26 Tahoeでついに廃止される見通しとなりました。古いDVカメラやA/V機器を持つユーザーにとって、接続手段の確保が急務になっています。 Macから切り捨てられたFireWire機器の受け皿として、Raspberry Piのような安価なシングルボードコンピュータが注目される可能性があります。レガシー機器の延命手段としてLinuxベースの自作環境への関心が高まるかもしれません。

🎯 **今日のアクション**
FireWire機器を業務や趣味で使っているエンジニアは、macOSへの依存を早めに見直しましょう。Raspberry PiへのFireWireカード接続や、Linux上でのドライバ対応状況を事前に調査しておくと安心です。

🔗 [原文を読む](https://www.jeffgeerling.com/blog/2026/firewire-on-a-raspberry-pi/)

---

## 📝 まとめ

これら3つのニュースに共通するのは、**インフラの透明性・可観測性・自己管理性を開発者自身の手に取り戻そうとする潮流**である。ColibriがAT Protocolを採用してデータ主権をユーザーに返そうとし、TurboliteがS3上のSQLiteを低レイテンシで直接操作できるようにする設計思想は、いずれも中央集権的なプラットフォームへの依存を減らし、シンプルで制御可能なスタックを志向している。OpenTelemetryのプロファイリング機能の成熟もまた、ブラックボックス化しがちな分散システムの内部挙動を開発者が自ら観測・診断できる基盤を整えるものであり、同じ文脈に位置づけられる。こうした動きは、クラウドネイティブ時代の反動として「自分のデータ・自分のインフラ・自分の計測」を標準化しようとするオープンソースコミュニティの意志を反映しており、巨大SaaSへのロックインを嫌う開発者層の需要が着実に技術的な具体物として結実しつつあることを示している。

---

## 🎯 今日の実務アクション 3 選

1. **データを完全に自分で管理できるチャット。**: 分散型プロトコルへの関心があるエンジニアは、ColibriのGitHubリポジトリを確認し、AT Protocolの実装パターンを学ぶ出発点として活用してみてください。コミュニティ運営者は自前ホスティングの選択肢として検討する価値があります。
2. **OpenTelemetryプロファイルがパブリックアルファ版に突入**: OpenTelemetryを既に導入しているチームは、Profiles機能のアルファ版を検証環境で試し、フィードバックをコミュニティに提供するのが有益です。新規導入を検討しているチームは、4シグナル対応を見据えた設計を今から意識しておくとよいでしょう。
3. **GitHub - russellromney/turbolite: S3からの50ms未満のコールドクエリを実現するSQLite VFS（ページレベルの圧縮・暗号化対応）**: サーバーレス構成やエッジ環境でSQLiteを使っているチームは、turboliteのベンチマークを自社ワークロードで検証してみる価値があります。特にコールドスタート時の遅延が問題になっているケースでは、導入効果を測定してみてください。

---

## 🔗 出典一覧
- [データを完全に自分で管理できるチャット。](https://colibri.social/)
- [OpenTelemetryプロファイルがパブリックアルファ版に突入](https://opentelemetry.io/blog/2026/profiles-alpha/)
- [GitHub - russellromney/turbolite: S3からの50ms未満のコールドクエリを実現するSQLite VFS（ページレベルの圧縮・暗号化対応）](https://github.com/russellromney/turbolite)
- [テーブルからどれだけの精度を引き出せるか？](https://www.johndcook.com/blog/2026/03/26/table-precision/)
- [LiteLLMマルウェア攻撃への私の分刻みの対応記録](https://futuresearch.ai/blog/litellm-attack-transcript/)
- [RaspberryPiでFireWireを使用する](https://www.jeffgeerling.com/blog/2026/firewire-on-a-raspberry-pi/)