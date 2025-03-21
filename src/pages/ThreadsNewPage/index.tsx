import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { createThread } from "./utils/api";
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
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">新規スレッド作成</h1>

        <form action={formAction}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              スレッドタイトル
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="スレッドのタイトルを入力"
              required
            />
            {state.error && (
              <p className="mt-2 text-sm text-red-600">{state.error}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" onClick={handleCancel} variant="outline">
              キャンセル
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "作成中..." : "スレッドを作成"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThreadsNewPage;
