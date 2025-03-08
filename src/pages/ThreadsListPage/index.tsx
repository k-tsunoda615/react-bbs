import { FC } from "react";
import { useFetchThreads } from "./hooks/useFetchThreads";
import { Link } from "react-router-dom";
import { ChevronRight, MessageSquare, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Skeleton } from "../../components/ui/skeleton";

export const ThreadsListPage: FC = () => {
  const { threads, isLoading, error } = useFetchThreads();

  return (
    <div className="w-[80vw] flex justify-center mx-auto">
      <Card className="w-full max-w-[800px] mx-auto px-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">スレッド一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>エラー: {error.message}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && threads.length === 0 && (
            <Alert>
              <AlertDescription>スレッドがありません</AlertDescription>
            </Alert>
          )}

          <ul className="space-y-4">
            {threads.map((thread) => (
              <li key={thread.id}>
                <Card className="hover:bg-accent/50 transition-colors">
                  <Link to={`/threads/${thread.id}`} className="flex gap-4 p-4">
                    {/* サムネイル画像 */}
                    <div className="w-24 h-24 bg-muted rounded-lg shrink-0">
                      <img
                        src="https://placehold.co/96x96"
                        alt=""
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* コンテンツ */}
                    <div className="flex-1 min-w-0">
                      {/* 1行目: タイトル */}
                      <h3 className="text-lg font-bold text-primary mb-2 truncate text-left">
                        {thread.title}
                      </h3>

                      {/* 2行目: タグ */}
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-2">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            プログラミング
                          </span>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            React
                          </span>
                        </div>
                      </div>

                      {/* 3行目: 日付、投稿数、いいね数 */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <time>2024年3月20日</time>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>12件</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>123</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 矢印 */}
                    <div className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreadsListPage;
