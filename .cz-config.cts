const config = {
    types: [
      { name: 'feat:     ✨ 新機能の追加', value: 'feat' },
      { name: 'fix:      🐛 バグ修正', value: 'fix' },
      { name: 'docs:     📝 ドキュメンテーションの追加/更新', value: 'docs' },
      { name: 'style:    💄 コードのフォーマットやスタイルの変更（動作に影響なし）', value: 'style' },
      { name: 'refactor: ♻️ リファクタリング（バグ修正・機能追加なし）', value: 'refactor' },
      { name: 'perf:     🚀 パフォーマンス改善', value: 'perf' },
      { name: 'test:     ✅ テストの追加/更新', value: 'test' },
      { name: 'build:    📦 ビルド関連の変更', value: 'build' },
      { name: 'ci:       🤖 CI/CD の設定変更', value: 'ci' },
      { name: 'chore:    🔧 設定ファイルやツールの変更（ソースコード変更なし）', value: 'chore' },
      { name: 'revert:   ⏪ 変更の取り消し', value: 'revert' },
      { name: 'move:     🚚 ファイルやディレクトリの移動', value: 'move' },
      { name: 'WIP:      🚧 作業途中（通常は PR には入れない）', value: 'WIP' },
    ],
    messages: {
      type: 'コミットの種類（型）を選択してください:\n',
      subject: 'コミットメッセージを入力してください:\n',
      body: '変更内容の詳細があれば書いてください:（enterでスキップ）\n',
      confirmCommit: '上記のコミットを続行してもよろしいですか?(Y/n)\n',
    },
    skipQuestions: ['scope', 'breaking', 'footer'],
    subjectLimit: 100,
  };
  
  module.exports = config;
  