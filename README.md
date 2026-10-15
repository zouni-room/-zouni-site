# 雑煮 — なりきり用個人サイト

スマホ表示に対応した、白×グレー基調の静的サイトです。

## ファイル
- `index.html` — ページ本文・作品一覧
- `style.css` — デザイン
- `script.js` — スマホ目次・キャラクター検索
- `data/` — 今後、編集用データを分離するためのフォルダ（現状は空）

## GitHub Pagesで公開する（スマホでも可能）
1. GitHubアカウントを作成／ログインします。
2. GitHubで新しい **Public repository** を作成します。例：`zouni-site`
3. このZIPを解凍し、`index.html`、`style.css`、`script.js`、`README.md` と `data` フォルダをリポジトリの最上位へアップロードします。ZIPそのものをアップロードするのではなく、中身をアップロードしてください。
4. リポジトリの **Settings → Pages** を開きます。
5. **Build and deployment** の **Deploy from a branch** を選び、Branchを `main`、フォルダを `/(root)` にして **Save** します。
6. 少し待ってから同じPages画面に表示されるURLを開きます。通常は `https://ユーザー名.github.io/zouni-site/` の形式です。

GitHubの画面表記は変更される場合があります。公開が確認できるまでは、URLを他の人に配らないでください。

## 文章やキャラクターを編集する
- ページ本文・作品一覧は `index.html` を編集します。
- 色や余白は `style.css` を編集します。
- 検索や目次の動きは `script.js` を編集します。
- 文章を更新したら、ページ内の `最終更新` 表示も更新してください（`index.html` の `time id="updatedDate"` と表示文字列）。

## 公開前の確認
- 連絡先、個人情報、公開したくない会話ログが含まれていないか確認する。
- 版権作品の画像を使う場合は、公式画像の無断転載を避ける。
- GitHub Pagesは公開リポジトリ内のファイルが公開される前提で利用してください。
