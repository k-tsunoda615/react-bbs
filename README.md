# reactで掲示板アプリを作る

## 🎯 環境セットアップ概要

- **パッケージマネージャー:** Yarn 4.6.0
- **Node.js:** v22.14.0 (Volta管理)
- **開発環境:** Vite 6.2.0, React 19, TypeScript 5.7
- **コード品質:** ESLint 9.21.0, Prettier 3.5.2, Husky 9.1.7, lint-staged 15.4.3
- **スタイル:** TailwindCSS
- **コミット規則:** Commitizen, Conventional Commits
- **パッケージバージョン管理:** Volta
- **CI/CD:** GitHub Actions, Vercel

---

## 🛠 環境構築手順

### 1. プロジェクト初期化

```sh
yarn create vite . --template react-ts
git init
```

### 2. Voltaによるバージョン管理設定

```json
{
  "volta": {
    "node": "22.14.0",
    "yarn": "4.6.0"
  }
}
```

### 3. 依存パッケージのインストール

```sh
# React & TypeScript
yarn add react@latest react-dom@latest
yarn add -D typescript@latest @types/react@latest @types/react-dom@latest

# Vite & ESLint
yarn add -D vite @vitejs/plugin-react eslint prettier \
  eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-unused-imports \
  eslint-plugin-simple-import-sort

# TailwindCSS
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```

### 4. コミット関連の設定

```sh
# Commitizen & Conventional Commits
yarn add -D commitizen cz-customizable
yarn add -D @commitlint/cli @commitlint/config-conventional

# Husky & lint-staged
yarn add -D husky lint-staged
yarn husky install
```

### 5. lint-staged設定

```json
{
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx,cjs}": "eslint --fix",
    "**/*.{css,scss,sass,ts,tsx,js,jsx,json,yml,yaml,md,html,json5}": "prettier --write"
  }
}
```

### 6. スクリプト設定

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "prepare": "husky install"
  }
}
```

### 7. GitHub Actions & Vercel デプロイ

#### `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 22.14.0
          cache: "yarn"
      - run: yarn install
      - run: yarn build
```

#### **Vercel の設定**

- `main` ブランチが更新されると、自動で Vercel にデプロイされる
- デプロイされたアプリは以下のドメインで確認可能:
  **[https://react-bbs.vercel.app/](https://react-bbs.vercel.app/)**

## 🚀 コミットの流れ（Conventional Commits & Commitizen）

本プロジェクトでは **Commitizen** を使用し、**Conventional Commits** に準拠したコミットメッセージを作成します。

---

### ✅ **コミットの流れ**

#### 1. 変更をステージング

```sh
git add .
```

#### 2. コミットメッセージを作成（Commitizenを使用）

```sh
git commit
```

※ vimに入らないようにすると良い

```sh
git commit --no-edit
```

### 3. コミットメッセージの選択

```sh
? コミットの種類（型）を選択してください:
  docs:     📝 ドキュメンテーションの追加/更新
```

### 4. コミットメッセージの入力

```sh
? コミットメッセージを入力してください:
  readmeの更新
? 変更内容の詳細があれば書いてください:（enterでスキップ）
```

**生成されるコミットメッセージの例：**

```sh
###--------------------------------------------------------###
docs: readmeの更新
###--------------------------------------------------------###
```

### 5. コミットを確定

```sh
? 上記のコミットを続行してもよろしいですか?(Y/n)
  Yes
```
