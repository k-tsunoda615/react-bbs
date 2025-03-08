import { FC } from "react";
import { useFetchThreads } from "./hooks/useFetchThreads";
import { Link } from "react-router-dom";
import { MessageSquare, Heart } from "lucide-react";
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
    <div className="flex justify-center m-4">
      <div className="w-full max-w-[800px] mx-auto px-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mt-8">
            スレッド一覧
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-8">
          {isLoading && (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
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
                <Card className="hover:bg-accent/50 transition-colors py-0">
                  <Link to={`/threads/${thread.id}`} className="block">
                    <div className="sm:flex sm:gap-4 p-4">
                      {/* サムネイル画像 */}
                      <div className="w-full h-40 sm:w-24 sm:h-24 bg-muted rounded-lg shrink-0 mb-4 sm:mb-0">
                        <img
                          src="https://placehold.co/96x96"
                          alt=""
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* コンテンツ */}
                      <div className="flex-1 min-w-0">
                        {/* 1行目: タイトル */}
                        <h3 className="text-base sm:text-lg font-bold text-primary mb-2 truncate text-left">
                          {thread.title}
                        </h3>

                        {/* 2行目: タグ */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            プログラミング
                          </span>
                          <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            React
                          </span>
                        </div>

                        {/* 3行目: 日付、投稿数、いいね数 */}
                        <div className="flex items-center justify-between flex-wrap text-xs sm:text-sm text-muted-foreground">
                          <time>2024年3月20日</time>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>12件</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span>123</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>
        </CardContent>
      </div>
    </div>
  );
};

export default ThreadsListPage;
