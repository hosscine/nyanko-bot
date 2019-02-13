# nyanko-bot
にゃんこ大戦争の通知ボット

## デプロイ方法

1. https://api.slack.com/apps で新しいappを作成します。
2. 作成したappのOAuth & Permissionsを開いてOAuth Access Tokenを取得します。
3. appの通知を送るslackチャンネルのURLからChannel IDを取得します。
4. .envファイルを作成し，.env.sample.txtを参考にOAuth Access TokenとChannel IDを入力します。
5. node上で実行します。
```
node i
node index.js
```
6. たまに .\assets\js\delete-slack-message.js を実行すると容量の節約になります。
