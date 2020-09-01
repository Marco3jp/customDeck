# customDeck
## quick-tweet
TweetDeckのカスタムではないが、単にサイトをシェアしたい、一言ツイートしたいときにTweetDeckを開く必要がなくなるChromeExtension。

### 要求
- Chromium系ブラウザ
- [ここ](https://about.twitter.com/ja/company/brand-resources.html) から適当に アイコンを取ってきて、 `./dist/` に `icon-bitty.png` という名前で置くこと

### 使い方とか
ブラウザの拡張機能画面から開発者モードをオンにして、落としたディレクトリの `./dist` を指定する。わからない人は使わないでね。

## StyleSheet
TweetDeck(BetterTweetDeck導入済み)を"Dark"で使っている人のためのカスタムCSS。

### 見た目の修正
- Tweet入力欄のBackgroundを暗く
- 一部で使われていた暗い文字色を明るく
- ユーザー詳細のTweets, Following, Followers, Listed部分の背景を明るく

### 挙動の改善
- スレッドでつながっている動画の端が切れているのを修正

## improvementTweetDeckVideo
TweetDeckの動画表示部分を改善するためのUserScript。

### 挙動
TweetDeck固有のコントローラーから、Videoタグのピュアコントローラーに付け替える。これによって対応ブラウザでPicture-In-Pictureできるのが魅力。

## TweetDeckUsageManager
使用時間に合わせてモーダルで警告を出すUserScript。

### 挙動
- 前回TweetDeckを見てから30分(コード内で変更可能)経過しないとモーダルが出る
- デフォルトでは「ページを閉じる」か「Intentに飛ぶ」のどちらか

### 今後の予定
- 一日or24h内の時間を計測していい感じに怒ったりしたい

## forMeDeck(inactive)
TweetDeckがNewTweet部分のベータを公開していたので、その部分を改善しようとしていたもの。現在はTweetDeck側がベータを取り下ている。正直使いやすさもクオリティも高くなかったので実装されないような気がする。されたとしても今のバージョンが切られるまでメンテする予定はない。
