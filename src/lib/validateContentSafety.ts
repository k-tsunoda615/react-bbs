// 禁止ワードのリスト
export const FORBIDDEN_WORDS = [
  "アダルト",
  "エロ",
  "セックス",
  "暴力",
  "差別",
  "殺害",
  "麻薬",
  "違法",
];

/**
 * テキスト内に禁止ワードが含まれているかチェックする
 * @param text チェック対象のテキスト
 * @returns 禁止ワードが見つかった場合はそのワード、見つからない場合はnull
 */
export function checkForbiddenWords(text: string): string | null {
  if (!text) return null;

  const normalizedText = text.toLowerCase().replace(/\s+/g, "");

  const foundForbiddenWords = FORBIDDEN_WORDS.filter((word) =>
    normalizedText.includes(word.toLowerCase().replace(/\s+/g, "")),
  );

  // 禁止ワードが見つかった場合は最初のものを返す、見つからなければnull
  return foundForbiddenWords.length > 0 ? foundForbiddenWords[0] : null;
}

/**
 * テキストが禁止ワードを含んでいないか検証する
 * @param text 検証するテキスト
 * @returns 検証結果（成功/エラーメッセージ）
 */
export function validateContentSafety(text: string): {
  isValid: boolean;
  errorMessage?: string;
} {
  if (!text || text.trim() === "") {
    return { isValid: false, errorMessage: "テキストを入力してください" };
  }

  const forbiddenWord = checkForbiddenWords(text);

  // 禁止ワードが見つかった場合のみエラーを返す
  if (forbiddenWord) {
    return {
      isValid: false,
      errorMessage: `テキストに禁止ワード「${forbiddenWord}」が含まれています`,
    };
  }

  // 問題なければ有効と判定
  return { isValid: true };
}
