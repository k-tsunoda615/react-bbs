import { useParams, Link } from "react-router-dom";
import { useThreadPosts } from "./hoooks/useThreadPost";
import { useActionState } from "react";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { ChevronLeft, Send } from "lucide-react";
import { Textarea } from "../../components/ui/textarea";

// 投稿フォームの状態型定義
type PostFormState = {
  success: boolean;
  error?: string;
};

export const ThreadDetailPage = () => {
  const { threadId } = useParams();
  const { posts, loading, error, hasMore, loadMore, refreshPosts } =
    useThreadPosts(threadId as string);

  //投稿を送信するためのフォームの状態管理
  const [state, formAction, isPending] = useActionState<
    PostFormState,
    FormData
  >(
    async (_prevState, formData) => {
      const post = formData.get("post") as string;

      if (!post || post.trim() === "") {
        return { success: false, error: "投稿内容を入力してください" };
      }

      try {
        const response = await fetch(
          `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ post }),
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.ErrorMessageJP || "投稿に失敗しました");
        }

        // 投稿成功後、投稿一覧を更新
        await refreshPosts();

        // フォームをリセット
        formData.set("post", "");

        return { success: true };
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "投稿中にエラーが発生しました";
        return { success: false, error: errorMessage };
      }
    },
    { success: false }, // 初期状態
  );

  if (loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <div className="animate-spin h-12 w-12 mb-4">
          <svg
            className="text-slate-700 dark:text-slate-300"
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
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-lg font-medium">
          スレッドを読み込み中...
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
          少々お待ちください
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all">
          <div className="bg-red-600 dark:bg-red-700 p-5">
            <h1 className="text-xl font-semibold text-white">
              エラーが発生しました
            </h1>
            <p className="text-red-100 text-sm mt-1">
              スレッドの読み込み中に問題が発生しました
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6 bg-red-50/70 dark:bg-red-900/20 border-l-3 border-red-400 p-4 rounded-sm">
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300">
                    {error.ErrorMessageJP}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    エラーコード: {error.ErrorCode}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <a
                href="/threads"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-md shadow-sm hover:shadow-md transition-all"
              >
                スレッド一覧に戻る
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            スレッド投稿一覧
          </h1>
          <p className="text-muted-foreground">スレッドID: {threadId}</p>
        </div>

        <Separator />
        {posts.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">
                このスレッドにはまだ投稿がありません。
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <p className="leading-relaxed">{post.post}</p>
                </CardContent>
                <CardFooter className="bg-muted/50 px-6 py-3 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    ID: {post.id}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        {hasMore && (
          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={loadMore} disabled={loading}>
              {loading ? "読み込み中..." : "もっと見る"}
            </Button>
          </div>
        )}

        {/* 投稿フォーム */}
        <Card className="mt-8">
          <CardContent className="p-6">
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

              <div className="space-y-2">
                <Textarea
                  id="post"
                  name="post"
                  placeholder="投稿内容を入力してください"
                  className="min-h-[120px] resize-y"
                  disabled={isPending}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center gap-2"
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
                      送信中...
                    </span>
                  ) : (
                    <>
                      投稿する
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button variant="outline" asChild>
            <Link to="/threads" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              スレッド一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetailPage;
