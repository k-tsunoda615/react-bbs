/**
 * 新しいスレッドを作成するAPI関数
 * @param {string} title - スレッドのタイトル
 * @returns {Promise<Object>} - 作成されたスレッドの情報
 */
import { Thread } from "../types/Thread";

export const createThread = async (title: string): Promise<Thread> => {
  try {
    const response = await fetch(
      "https://railway.bulletinboard.techtrain.dev/threads",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "スレッドの作成に失敗しました");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "ネットワーク接続に問題があります。インターネット接続を確認してください。",
      );
    }
    throw error;
  }
};
