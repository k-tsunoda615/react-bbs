import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useActionState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { createThread } from "./utils/createThreadApi";
import { ThreadFormState } from "./types/Thread";

export const ThreadsNewPage: FC = () => {
  //useNavigateフックを使用して、ページ間の移動を行うための関数を取得
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState<
    // state: フォームの現在の状態（成功/エラー情報）
    // formAction: フォーム要素のaction属性に設定する関数
    // isPending: 送信処理中かどうかを示すブール値
    ThreadFormState,
    FormData
  >(
    async (_prevState, formData) => {
      // フォーム送信時の処理
      const title = formData.get("title") as string;

      if (!title || title.trim() === "") {
        return { success: false, error: "タイトルを入力してください" };
      }

      try {
        await createThread(title);
        // 成功したらリダイレクト（この後の処理は実行されない）
        navigate("/threads");
        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "スレッドの作成に失敗しました";
        return { success: false, error: errorMessage };
      }
    },
    { success: false }, // 初期状態
  );

  const handleCancel = () => {
    navigate("/threads");
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all">
        <div className="bg-slate-700 dark:bg-slate-800 p-5">
          <h1 className="text-xl font-semibold text-white">新規スレッド作成</h1>
          <p className="text-slate-300 text-sm mt-1">
            コミュニティに新しい話題を提供しましょう
          </p>
        </div>

        <div className="p-6">
          <form action={formAction}>
            {state.error && (
              <div className="mb-6 bg-red-50/70 dark:bg-red-900/20 border-l-3 border-red-400 p-3 rounded-sm">
                <div className="flex items-start">
                  <svg
                    className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.error}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                スレッドタイトル
              </label>
              <div className="relative">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="スレッドのタイトルを入力"
                  required
                  className="pl-10 pr-4 py-2.5 w-full border-gray-200 dark:border-gray-700 focus:ring-slate-500 focus:border-slate-500 rounded-md shadow-sm transition-all"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                例）池袋の"もうやんカレー"めっちゃよき！
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-8">
              <Link to="/threads">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="px-4 py-2 rounded-md transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  キャンセル
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-md shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:hover:bg-slate-700"
              >
                {isPending ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    作成中...
                  </span>
                ) : (
                  "スレッドを作成"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThreadsNewPage;
