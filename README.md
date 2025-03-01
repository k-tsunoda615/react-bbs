# React + TypeScript + Vite

このテンプレートは、ViteでReactを使用するための最小限のセットアップを提供し、HMRといくつかのESLintルールが含まれています。

現在、2つの公式プラグインが利用可能です：

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - Fast Refreshのために[Babel](https://babeljs.io/)を使用
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - Fast RefreshのためにSWCを使用

## ESLint設定の拡張

本番用アプリケーションを開発する場合、型を考慮したリントルールを有効にすることをお勧めします：

```js
export default tseslint.config({
  extends: [
    // ...tseslint.configs.recommendedを削除し、以下に置き換え
    ...tseslint.configs.recommendedTypeChecked,
    // より厳密なルールを使用する場合は以下を使用
    ...tseslint.configs.strictTypeChecked,
    // オプションで、スタイルに関するルールを追加
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // その他のオプション...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

また、React固有のリントルールのために[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)と[eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)をインストールすることもできます：

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // react-xとreact-domプラグインを追加
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // その他のルール...
    // 推奨TypeScriptルールを有効化
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# 🚀 開発環境セットアップ

## 🎯 セットアップ概要
- **パッケージマネージャー:** Yarn
- **開発環境:** Vite, React 19, TypeScript
- **コード品質:** ESLint, Prettier, Husky, lint-staged
- **CI/CD:** GitHub Actions, Vercel
- **スタイル:** TailwindCSS 4
- **コミット規則:** Conventional Commits
- **自動ドキュメント:** `typedoc`

---

## 🛠 1. Vite + React 19 + TypeScript プロジェクト作成
```sh
yarn create vite . --template react-ts
git init
```

---

## 📦 2. 必要なパッケージをインストール
```sh
yarn add react@latest react-dom@latest
yarn add -D typescript vite @vitejs/plugin-react eslint prettier \
  eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks \
  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-unused-imports \
  eslint-plugin-simple-import-sort
```

---

## 🎨 3. TailwindCSS 4 のセットアップ
```sh
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.js`
```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📝 4. ESLint & Prettier のセットアップ

### `.eslintrc.cjs`
```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "unused-imports", "simple-import-sort"],
  rules: {
    "unused-imports/no-unused-imports": "error",
    "simple-import-sort/imports": "error",
  },
};
```

### `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all"
}
```

```sh
yarn add -D eslint prettier eslint-plugin-prettier eslint-config-prettier
```

---

## 🎭 5. Husky & lint-staged のセットアップ
```sh
yarn add -D husky lint-staged
npx husky-init && yarn
```

### `.husky/pre-commit`
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint-staged
```

### `package.json` に `lint-staged` を追加
```json
{
  "lint-staged": {
    "**/*.{ts,tsx,js,jsx}": "eslint --fix"
  }
}
```

---

## 📝 6. Conventional Commits & Commitlint
```sh
yarn add -D @commitlint/config-conventional @commitlint/cli
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

---

## 🚀 7. GitHub Actions & Vercel デプロイ

### `.github/workflows/deploy.yml`
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
          node-version: 18
          cache: 'yarn'
      - run: yarn install
      - run: yarn build
      - run: yarn test
```

**Vercel の設定**
```sh
yarn global add vercel
vercel
```

---

## 📚 8. 自動ドキュメント生成（TypeDoc）
```sh
yarn add -D typedoc
```

### `typedoc.json`
```json
{
  "entryPoints": ["src/index.tsx"],
  "out": "docs"
}
```

```sh
yarn typedoc
```

---

## ✅ 最終確認
✅ Vite + React 19 + TypeScript の動作確認  
✅ TailwindCSS の適用確認  
✅ ESLint, Prettier の動作確認  
✅ Husky & lint-staged の動作確認  
✅ Conventional Commits の適用確認  
✅ GitHub Actions での CI/CD 確認  
✅ Vercel へのデプロイ確認  
✅ TypeDoc による自動ドキュメント生成  

---

