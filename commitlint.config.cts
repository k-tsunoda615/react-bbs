const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 100], // コミットメッセージの長さ制限
    "type-case": [2, "always", "lower-case"], // `feat`, `fix` などの `type` は小文字
    "type-empty": [2, "never"], // `type` は必須
    "subject-empty": [2, "never"], // `subject`（件名）は必須
    "subject-case": [0, "always"], // `subject` の大文字・小文字の制限なし
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "move",
        "WIP",
      ],
    ],
  },
};

module.exports = config;
