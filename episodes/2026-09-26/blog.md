<!--
---
title: "Tech News Radio — 2026-09-26"
subtitle: "Amazon EKSでEFAとDeepEPを活用したMoE強化学習のスケーリング、スループット40%向上 / Amazon SageMaker Hyper..."
date: "2026-09-26"
vol: 179
topics:
  - AI
  - Cloud
  - DevOps
  - Security
  - Business
author: "Studio Machikita"
---
-->
# 🎧 Tech News Radio — 2026-09-26

*📖 約12分で読めます ｜ 🏷️ AI, Cloud, DevOps, Security, Business*

---

## 📌 今日のハイライト
- 🤖 **Amazon EKSでEFAとDeepEPを活用したMoE強化学習のスケーリング、スループット40%向上** — EKSでMoE強化学習を高速化、処理量40%向上
- 🤖 **Amazon SageMaker HyperPodでSkyRLを使ったマルチモーダルRLトレーニングを高速化** — SkyRLとSageMaker HyperPodで視覚言語モデルを強化学習
- 🤖 **初心者向けGitHub Copilotアプリ：キャンバスでカスタムワークフローを構築する方法** — GitHub Copilotでキャンバス型UIを作る入門解説
- 🤖 **Copilotの自動修正機能がAgentic AutofixでCopilot Memoryを使用可能に** — GitHubのagentic autofixがCopilot Memoryに対応
- 🤖 **Google DeepMindの研究者がまた退社、「超知能AIを近く開発するのは本質的に無責任」と発言** — DeepMind研究者、AI開発の速さに抗議し退社
- 🤖 **AIは新卒者に大打撃を与えるはずだった。だが今のところ、失業率データはそれを裏付けていない。** — AIによる新卒採用打撃、統計上は未確認

---

## 🤖 Amazon EKSでEFAとDeepEPを活用したMoE強化学習のスケーリング、スループット40%向上
`AI` `Cloud`

<details>
<summary>📄 原題: Scaling MoE reinforcement learning on Amazon EKS with EFA and DeepEP with 40% more throughput</summary>
</details>

> **一言で**: EKSでMoE強化学習を高速化、処理量40%向上

- Amazon EKS上でMoE（専門家混合）モデルの強化学習を大規模に実行する構成を紹介
- EFA（高速ネットワーク通信機能）とDeepEPを組み合わせて通信のボトルネックを解消
- Amazon S3も含めたアーキテクチャで、RLHFやGRPOの学習を効率化
- 強化学習のロールアウト処理の合計スループットが40%向上したと報告

💡 **なぜ重要か**
MoEモデルは専門家ネットワーク間でのデータ交換が多く、大規模なRLHF（人間のフィードバックによる強化学習）やGRPO訓練では通信性能がボトルネックになりやすいです。クラウド上で大規模GPUクラスタを扱う際、ネットワーク帯域や遅延の改善が学習全体の効率を左右します。 大規模言語モデルの学習コストと時間を左右する基盤技術として、クラウド上のネットワーク最適化がますます重視されるようになりそうです。EKSのようなKubernetes基盤とEFAのような専用ネットワーク技術を組み合わせる設計は、他のクラウド事業者や大規模AI企業にも波及すると見られています。

🎯 **今日のアクション**
MoEモデルの強化学習をクラウドで運用するエンジニアは、EFAやDeepEPのようなネットワーク最適化技術の導入を検討すべきです。既存のEKS環境でのボトルネックを計測し、通信効率化から着手するとよさそうです。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/scaling-moe-reinforcement-learning-on-amazon-eks-with-efa-and-deepep-with-40-more-throughput/)

---

## 🤖 Amazon SageMaker HyperPodでSkyRLを使ったマルチモーダルRLトレーニングを高速化
`AI` `Cloud`

<details>
<summary>📄 原題: Accelerate multimodal RL training with SkyRL on Amazon SageMaker HyperPod</summary>
</details>

> **一言で**: SkyRLとSageMaker HyperPodで視覚言語モデルを強化学習

- SkyRL（OSSの強化学習フレームワーク）をSageMaker HyperPodで動かす手順を解説
- Qwen3-VL-8Bという視覚言語モデルをGRPO手法で追加学習
- コンテナ構築からRayクラスタ起動、ジョブ監視までを一貫して紹介
- 学習済みLoRAアダプタを推論用にホストする方法も掲載

💡 **なぜ重要か**
画像や動画も扱えるマルチモーダルAIモデルは、学習後の性能調整が難しく、大規模な計算基盤が必要です。SkyRLのようなOSSの強化学習フレームワークとSageMaker HyperPodのようなクラウド基盤を組み合わせることで、企業が自前で大規模GPUクラスタを持たなくても、最新のモデル調整手法を試せるようになってきています。 強化学習による後段学習（ポストトレーニング）が、大規模言語モデルだけでなく視覚言語モデルにも広がる流れを後押しします。クラウド上で再現可能な学習パイプラインが整うことで、研究段階の手法がより早く実運用に取り込まれるようになりそうです。

🎯 **今日のアクション**
自社のマルチモーダルAI活用を検討中なら、SkyRLとHyperPodの構成をまず小規模に試し、GRPOによる性能改善効果を検証すると良いでしょう。

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/accelerate-multimodal-rl-training-with-skyrl-on-amazon-sagemaker-hyperpod/)

🔗 [原文を読む](https://aws.amazon.com/blogs/machine-learning/multi-region-training-with-amazon-sagemaker-hyperpod-and-qumulo/)

---

## 🤖 初心者向けGitHub Copilotアプリ：キャンバスでカスタムワークフローを構築する方法
`AI` `DevOps`

<details>
<summary>📄 原題: GitHub Copilot app for Beginners: How to build custom workflows with canvases</summary>
</details>

> **一言で**: GitHub Copilotでキャンバス型UIを作る入門解説

- 平易な英語で欲しいUIを説明するとエージェントが構築
- 生成した画面はその場で使いながら更新できる
- ツールに合わせる手間を減らし作業時間を増やす狙い
- 初心者向けにワークフロー構築の手順を紹介

💡 **なぜ重要か**
開発者がツールの使い方を覚える時間を減らし、本来の作業に集中できるようにする流れがGitHub Copilotにも広がっています。自然言語での指示だけでUIを組み立てられる点が特徴です。 自然言語からUIを生成する手法が一般化すれば、非エンジニアも簡単な業務ツールを自作できるようになりそうです。開発者の役割も単純なUI実装からより高度な設計や検証へと移っていくと見られています。

🎯 **今日のアクション**
まずは簡単なキャンバスを作って挙動を試し、自分のチームの定型作業にどう応用できるか検討するとよいでしょう。

🔗 [原文を読む](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-how-to-build-custom-workflows-with-canvases/)

🔗 [原文を読む](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-using-the-diff-terminal-and-browser/)

🔗 [原文を読む](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-run-several-agents-at-once/)

---

## 🤖 Copilotの自動修正機能がAgentic AutofixでCopilot Memoryを使用可能に
`AI` `Security` `DevOps`

<details>
<summary>📄 原題: Agentic autofix now uses Copilot Memory</summary>
</details>

> **一言で**: GitHubのagentic autofixがCopilot Memoryに対応

- agentic autofixがCopilot Memoryを使えるようになった
- 対象はCopilot Memoryを有効にしている顧客のみ
- セキュリティアラート解決に役立つ過去の記憶を参照する仕組み

💡 **なぜ重要か**
セキュリティアラートの自動修正には文脈理解が欠かせず、過去のやり取りを記憶として活用する発想は自然な進化と言えます。 AIエージェントが記憶を持って継続的に学習する仕組みは、セキュリティ対応以外の開発支援機能にも広がる可能性があります。

🎯 **今日のアクション**
Copilot Memoryを有効化した上で、agentic autofixの提案精度がどう変わるか実際に検証してみることをおすすめします。

🔗 [原文を読む](https://github.blog/changelog/2026-09-25-agentic-autofix-now-uses-copilot-memory)

---

## 🤖 Google DeepMindの研究者がまた退社、「超知能AIを近く開発するのは本質的に無責任」と発言
`AI` `Business`

<details>
<summary>📄 原題: Another Google Deepmind researcher quits, says building superintelligent AI soon is &quot;inherently irresponsible&quot;</summary>
</details>

> **一言で**: DeepMind研究者、AI開発の速さに抗議し退社

- Robert O'Callahan氏がGoogle DeepMindを退社
- 理由はAIの「変化の速度が速すぎる」こと
- チップ設計ツールでAIの高速化・低コスト化に貢献したが正当化できないと発言
- 同様の懸念を持つ同僚は多いが声を上げる人は少ないと指摘

💡 **なぜ重要か**
超知能AIの開発競争が加速する中、研究者自身が安全性への懸念を表明する動きが増えています。内部からの警鐘は開発の透明性やガバナンスを考える上で重要な材料です。 AI企業内部での倫理的懸念が表面化すれば、開発速度への社会的な監視や規制論議が強まる可能性があります。優秀な研究者の流出が業界の技術力にも影響しかねません。

🎯 **今日のアクション**
AI開発に携わるエンジニアやリーダーは、安全性評価や社内での意見表明の仕組みを整えることが求められます。

🔗 [原文を読む](https://the-decoder.com/another-google-deepmind-researcher-quits-says-building-superintelligent-ai-soon-is-inherently-irresponsible/)

---

## 🤖 AIは新卒者に大打撃を与えるはずだった。だが今のところ、失業率データはそれを裏付けていない。
`AI` `Business`

<details>
<summary>📄 原題: AI was supposed to hit new grads hard. So far, unemployment data says otherwise.</summary>
</details>

> **一言で**: AIによる新卒採用打撃、統計上は未確認

- 新卒の雇用がAIで大きく減るとの予測、現時点で裏付けなし
- 「広範な代替や採用削減の証拠はない」と指摘されている
- 失業統計データは事前の懸念ほど深刻な状況を示していない

💡 **なぜ重要か**
生成AIの普及で新卒エンジニアなど若手人材の仕事がAIに奪われるという懸念が広がっていました。特にコーディングやカスタマーサポートなど、入門レベルの業務がAIで自動化されやすいとされ、就職市場への影響が注目されていました。 AIによる雇用への影響は予測より緩やかに進む可能性があり、企業の採用戦略や人材育成方針の見直しにも時間的余裕が生まれそうです。ただし今後データが変化する可能性もあり、楽観視は禁物と見られています。

🎯 **今日のアクション**
企業は最新の雇用統計を継続的に注視し、AI活用と人材採用のバランスを短期的な予測だけで判断しないことが重要です。新卒者側もAIを使いこなすスキルを身につけつつ、市場動向を冷静に見極める姿勢が求められます。

🔗 [原文を読む](https://arstechnica.com/ai/2026/09/ai-was-supposed-to-hit-new-grads-hard-so-far-unemployment-data-says-otherwise/)

---

## 📝 まとめ

これら3つのニュースに共通するのは、AI開発の重心が「モデルを作ること」から「モデルを効率的に鍛え、実際に使えるものへ落とし込むこと」へと移りつつあるという流れです。前者2つはMoEやマルチモーダルといった大規模かつ複雑なモデルを、EFA・DeepEP・SkyRLといった専用技術やクラウド基盤の組み合わせでいかに高速かつ低コストに強化学習させるかという、インフラとアルゴリズムの共進化を示しています。一方でGitHub Copilotのキャンバス型ワークフロー構築は、そうした高度なAI技術を専門家でなくても直感的に使いこなせるようにするという、開発体験の民主化を象徴しています。つまり業界全体として、AIの「学習効率の最大化」と「利用のハードルを下げること」という両輪が並行して進化しており、強力なモデルを支える裏側のインフラ技術と、それを誰もが扱えるようにする表側のUX改善が、AI活用の裾野を広げる鍵になっていると言えるでしょう。

---

## 🎯 今日の実務アクション 3 選

1. **Amazon EKSでEFAとDeepEPを活用したMoE強化学習のスケーリング、スループット40%向上**: MoEモデルの強化学習をクラウドで運用するエンジニアは、EFAやDeepEPのようなネットワーク最適化技術の導入を検討すべきです。既存のEKS環境でのボトルネックを計測し、通信効率化から着手するとよさそうです。
2. **Amazon SageMaker HyperPodでSkyRLを使ったマルチモーダルRLトレーニングを高速化**: 自社のマルチモーダルAI活用を検討中なら、SkyRLとHyperPodの構成をまず小規模に試し、GRPOによる性能改善効果を検証すると良いでしょう。
3. **初心者向けGitHub Copilotアプリ：キャンバスでカスタムワークフローを構築する方法**: まずは簡単なキャンバスを作って挙動を試し、自分のチームの定型作業にどう応用できるか検討するとよいでしょう。

---

## 🔗 出典一覧
- [Amazon EKSでEFAとDeepEPを活用したMoE強化学習のスケーリング、スループット40%向上](https://aws.amazon.com/blogs/machine-learning/scaling-moe-reinforcement-learning-on-amazon-eks-with-efa-and-deepep-with-40-more-throughput/)
- [Amazon SageMaker HyperPodでSkyRLを使ったマルチモーダルRLトレーニングを高速化](https://aws.amazon.com/blogs/machine-learning/accelerate-multimodal-rl-training-with-skyrl-on-amazon-sagemaker-hyperpod/)
- [Amazon SageMaker HyperPodでSkyRLを使ったマルチモーダルRLトレーニングを高速化](https://aws.amazon.com/blogs/machine-learning/multi-region-training-with-amazon-sagemaker-hyperpod-and-qumulo/)
- [初心者向けGitHub Copilotアプリ：キャンバスでカスタムワークフローを構築する方法](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-how-to-build-custom-workflows-with-canvases/)
- [初心者向けGitHub Copilotアプリ：キャンバスでカスタムワークフローを構築する方法](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-using-the-diff-terminal-and-browser/)
- [初心者向けGitHub Copilotアプリ：キャンバスでカスタムワークフローを構築する方法](https://github.blog/ai-and-ml/github-copilot/github-copilot-app-for-beginners-run-several-agents-at-once/)
- [Copilotの自動修正機能がAgentic AutofixでCopilot Memoryを使用可能に](https://github.blog/changelog/2026-09-25-agentic-autofix-now-uses-copilot-memory)
- [Google DeepMindの研究者がまた退社、「超知能AIを近く開発するのは本質的に無責任」と発言](https://the-decoder.com/another-google-deepmind-researcher-quits-says-building-superintelligent-ai-soon-is-inherently-irresponsible/)
- [AIは新卒者に大打撃を与えるはずだった。だが今のところ、失業率データはそれを裏付けていない。](https://arstechnica.com/ai/2026/09/ai-was-supposed-to-hit-new-grads-hard-so-far-unemployment-data-says-otherwise/)