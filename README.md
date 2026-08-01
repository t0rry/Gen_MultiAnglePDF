# マルチアングル画像PDFジェネレータ

CGソフトで作成したモデルを複数の角度から撮影した画像をPDFに配置するツールです。

## 機能

- ✨ ドラッグ&ドロップで画像を選択
- 🎨 複数のレイアウトパターンに対応
  - 2枚: 横並び
  - 4枚: 2x2グリッド、横並び
  - 8枚: 2x4グリッド、横並び2段
- 📄 PDF / PNG 形式で出力
- 🏷️ タイトルと日付をオプションで追加
- 📐 16:9 アスペクト比で自動生成
- 🎯 リアルタイムプレビュー

## セットアップ

### 必須要件
- Node.js 16 以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

### ビルド

```bash
npm run build
```

`dist` フォルダに本番用のファイルが生成されます。

## 使い方

1. 画像を選択（2枚、4枚、8枚）
2. レイアウトを選択
3. タイトルと日付を入力（オプション）
4. 出力形式を選択（PDF / PNG）
5. ダウンロードボタンをクリック

## GitHub Pages へのデプロイ

### 1. GitHub上でリポジトリを作成

ユーザー名が `username` の場合、リポジトリを `username.github.io` として作成してください。

### 2. ローカルからプッシュ

```bash
git remote add origin https://github.com/username/username.github.io.git
npm run build
git add -A
git commit -m "Initial commit"
git push -u origin main
```

### 3. アクセス

`https://username.github.io` でアクセスできます。

## ライセンス

このプロジェクトは **MIT License** の下で公開されています。

詳細は [LICENSE](./LICENSE) ファイルを参照してください。

### 使用ライブラリのライセンス

このプロジェクトは以下のオープンソースライブラリを使用しています：

- React (MIT)
- React-DOM (MIT)
- Vite (MIT)
- pdf-lib (Apache 2.0)

詳細は [ATTRIBUTION.md](./ATTRIBUTION.md) を参照してください。
