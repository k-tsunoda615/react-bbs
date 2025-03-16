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

## 📚 コンポーネント設計ガイドライン

### 1. ディレクトリ構造

```
src/
├── components/          # 共通コンポーネント
│   ├── Button/         # 各コンポーネントはディレクトリで管理
│   │   ├── index.tsx   # メインコンポーネント
│   │   ├── styles.ts   # スタイル定義（必要な場合）
│   │   └── types.ts    # 型定義
│   └── Input/
├── pages/              # ページコンポーネント
│   └── ThreadsListPage/
│       ├── components/ # ページ固有のコンポーネント
│       ├── hooks/      # ページ固有のフック
│       └── index.tsx
├── features/          # 機能単位のコンポーネント
├── layouts/           # レイアウトコンポーネント
├── hooks/            # 共通カスタムフック
├── utils/            # ユーティリティ関数
└── types/            # 共通の型定義
```

### 2. コンポーネントの分類

#### Presentational Components（表示用）

- UIの表示のみを担当
- 状態管理を持たない
- プロップスを通じてデータを受け取る
- 例：`Button`, `Card`, `Input`

```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
```

#### Container Components（ロジック用）

- データの取得やロジックを担当
- 状態管理を持つ
- 子コンポーネントにデータを渡す
- 例：`ThreadsListContainer`, `ThreadFormContainer`

### 3. 命名規則

- コンポーネントファイル: `PascalCase.tsx`
- フックファイル: `use{機能名}.ts`
- ユーティリティファイル: `camelCase.ts`
- テストファイル: `{対象ファイル名}.test.tsx`

### 4. コーディング規約

- コンポーネントは関数コンポーネントとして実装
- 型定義は明示的に行う
- プロップスは必ず型定義する
- 不要なレンダリングを防ぐため、適切にメモ化を行う
- 副作用は`useEffect`内で管理

```typescript
import { FC, memo } from 'react';

type ThreadItemProps = {
  title: string;
  content: string;
};

export const ThreadItem: FC<ThreadItemProps> = memo(({ title, content }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
});

ThreadItem.displayName = 'ThreadItem';
```

### 5. ベストプラクティス

- 単一責任の原則に従う
- コンポーネントは小さく保つ
- ロジックは可能な限りカスタムフックに分離
- アクセシビリティに配慮
- パフォーマンスを考慮したコーディング
- 適切なエラーハンドリング

### 6. テスト方針

- ユニットテスト: 各コンポーネントの独立した機能テスト
- インテグレーションテスト: コンポーネント間の連携テスト
- E2Eテスト: ユーザーフローの検証

```typescript
// ThreadItem.test.tsx
import { render, screen } from '@testing-library/react';
import { ThreadItem } from './ThreadItem';

describe('ThreadItem', () => {
  it('renders title and content', () => {
    render(<ThreadItem title="Test Title" content="Test Content" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
```

---
