# COVID-MGR

## COVID-MGRの目的

当ページをご閲覧いただきありがとうございます。

このアプリケーションは私自身がcovid-19にかかった際に利用したホテル療養を体験中に、
実際に行われているホテル療養の問診システムに不満を感じ、webサービスとしてこの不満を解消しようと考えたことがきっかけで開発しました。

ホテル療養における過ごし方の参考資料や療養の実体験と運営されていた医療従事者の方々の取材など、
多くの方々の協力を元にこのアプリケーションは成り立っているので感謝しています。
ご協力くださった皆様、本当にありがとうございます。

## COVID-MGRについて

上記通りアプリケーションの目的としてはホテル療養での問診システムの改善、効率を上げることです。
毎度定時に問診記入シートに記入し据置電話を使った報告をこのアプリケーション一つで担うことができます。
実際に使われている問診シートに改善を加え、状況に応じて必要な入力項目が出てくる仕様となっております。
また医療従事者への取材を元に、問診や患者様の一覧を見た際に一目でどの患者様に対応すればいいかがわかるよう、
最新の問診の結果から患者様の状態をレベル別で着色して判断できる状態確認機能を施しました。

## 使用技術
![My Skills](https://skillicons.dev/icons?i=ruby,rails,mysql,ts,react,materialui,docker,aws)
### フロントエンド
* React(17.0.2)
* React hooks
* TypeScript(4.5.5)
* MaterialUI(v4)
### バックエンド
* Ruby on Rails(6.1.4.4)
* Ruby (3.0.3)
### DB
* MySQL(8.0)
### 開発環境、インフラ
* Docker
* Docker-compose
* Github Actions
* AWS(ECS(EC2), ECR, Route53, S3, CloudFront, RDS)
* terraform(バックエンドの構成に使用)

## 機能紹介
### 患者様プロフィール機能 

患者様の緊急連絡先や個人情報を入力、管理する機能。
患者様は自身のマイページから入力、編集ページにて情報の入力ができます。
医療従事者は患者様の詳細ページから一目で確認することができます。

### 問診入力機能 

メインとなる問診の入力機能です。
定時計測する体温と酸素飽和度の入力以外の項目はyes/noでの応答できる簡易的なアンケートベースの問診にしております。
また質問外の症状について記入したい場合は別途で回答フォームが出てきます。
患者様方それぞれのの必要な入力フォームが出るので無駄な記入がなく良いユーザー体験ができると思います。

### 問診閲覧機能

患者様は自身の、医療従事者は患者様一覧から選択した患者様の問診の一覧と詳細を確認することができます。
閲覧の際には詳細な情報を確認しなくても一目で現在の患者様の状態がわかるようにしています。

### 患者様閲覧機能

医療従事者のみが扱える機能です。
療養中の患者様を一覧で確認でき、その際には最新の問診を元に患者様方それぞれの状態が一目でわかるので、
対応が必要な患者様が瞬時に判断できます。

### レスポンシブ対応

患者様方は携帯電話での利用がメインになると考えられるのでレスポンシブ対応を行わせていただきました。

## テスト、静的コード解析
* RSpec,FactoryBot
  * 単体テスト
  * APIテスト
* Rubocop
どちらもGithub Actionsによりpush時に自動実行

## 機能一覧

* 認証機能
  * 新規登録, ログイン
    対象 (医療従事者、患者様)

* 患者様情報機能
  * 新規情報作成
  * 情報編集
    対象 (患者様)
  * 情報詳細
    対象 (医療従事者、患者様)

* 問診機能
  * 問診投稿
  * 問診投稿内容確認
    対象 (患者様)
  * 問診一覧
  * 問診詳細
    対象 (医療従事者、患者様)

* 患者様管理機能
  * 患者様一覧
  * 患者様詳細
    対象 (医療従事者)

* 全ページのレスポンシブ対応
* 全一覧のページネーション
* 全ページのローディングページ

* 直接アプリケーションに関係しない機能
  * このアプリケーションのGithubのソースコードへ遷移
  * 私へのお問い合わせ機能(メール)

## ER図

## サイトマップ

## インフラ構成図
