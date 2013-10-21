# Meteor.js で Twitter クライアントをつくってみる

[卒論](https://github.com/TanakaYutaro/StatisticsGatheringSystem "卒論GitHub")で使ったフレームワークを久しぶりに触ってみる。

そろそろ有償版とかでてんのかと思ったけど、まだここなのね（2013/10/20現在）

## 現状 v1.1
http://simple-twitter.meteor.com/

## 参考
- [Meteor.js](http://www.meteor.com/ "Meteor.js")
- [Twitter API](http://qiita.com/rev86/items/eaef78275ba295c9858b "Twitter API")
- [マークダウン記法](http://qiita.com/Qiita/items/c686397e4a0f4f11683d "MarkDonw")

## 開発環境
- OS : Mac OS X 10.8.5
- Editor : WebStorm, Vim
- Browser : Chrome

## Meteor.js 覚え書き

### 概要

- クラサバ両方 JS でコーディングできる
- リアルタイム Web アプリがつくれる
- デプロイ環境が準備されている（Heroku とかにもデプロイできるみたい）

### 関連

- JavaScript
- Node.js
- MongoDB
- リアクティブプログラミング
- Sock.JS

### コマンド

- `$ curl install.meteor.com sh--` // インストール
- `$ meteor create <project_name>` // プロジェクト作成
- `$ meteor` // プロジェクト実行
- `$ meteor add <PKG_name>` // パッケージの追加
- `$ meteor deploy [--password] <host_name>.meteor.com` // デプロイ
- `$ meteor list` // パッケージ一覧
- `$ meteor remove <PKG_name>` // パッケージ削除

