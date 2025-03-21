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

#### **Vercel の設定**

- `main` ブランチが更新されると、Vercel にデプロイされる
- デプロイされたアプリは以下のドメインで確認可能:
  **[https://react-bbs.vercel.app/](https://react-bbs.vercel.app/)**

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
