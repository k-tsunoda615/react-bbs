import { FC, useState } from "react";
import { useFetchThreads } from "./hooks/useFetchThreads";
import { Link } from "react-router-dom";
import { MessageSquare, Heart, ArrowUpDown, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Skeleton } from "../../components/ui/skeleton";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { ThreadsPagination } from "./components/ThreadsPagenation";

export const ThreadsListPage: FC = () => {
  const { threads, isLoading, error } = useFetchThreads();
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5; // 1ページあたりのスレッド数

  // ページネーション計算
  const totalPages = Math.ceil(threads.length / threadsPerPage);
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center m-4">
      <div className="w-full max-w-[800px] mx-auto px-4">
        <CardHeader className="flex flex-row items-center justify-between p-0 mb-8">
          <CardTitle className="text-2xl font-bold">スレッド一覧</CardTitle>
          <Link to="/threads/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 font-bold">
              <Plus className="h-4 w-4" />
              新規スレッド作成
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0 mt-8">
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

          {/* 検索UIの実装 */}
          <div className="space-y-4 mb-8">
            <div className="flex gap-4 sm:flex-row flex-col">
              <Input placeholder="スレッドを検索..." className="flex-1" />
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="カテゴリー" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    <SelectItem value="programming">プログラミング</SelectItem>
                    <SelectItem value="design">デザイン</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="newest">
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-3 w-3" />
                      <SelectValue placeholder="並び替え" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">新着順</SelectItem>
                    <SelectItem value="oldest">古い順</SelectItem>
                    <SelectItem value="likes">いいね数順</SelectItem>
                    <SelectItem value="comments">コメント数順</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
              >
                #プログラミング
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
              >
                #React
              </Badge>
              <Badge
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
              >
                #TypeScript
              </Badge>
            </div>
          </div>

          {/* スレッド一覧の実装 */}
          <ul className="space-y-4">
            {currentThreads.map((thread) => (
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
                          <button className="border border-primary/10 text-primary text-xs px-2 py-1 rounded hover:border-primary/50 transition-colors inline-flex items-center hover:text-primary">
                            #プログラミング
                          </button>
                          <button className="border border-primary/10 text-primary text-xs px-2 py-1 rounded hover:border-primary/50 transition-colors inline-flex items-center hover:text-primary">
                            #React
                          </button>
                        </div>

                        {/* 3行目: 日付、投稿数、いいね数 */}
                        <div className="flex items-center justify-between flex-wrap text-xs sm:text-sm text-muted-foreground">
                          <time>2024年3月20日</time>
                          <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 hover:text-primary hover:scale-105 transition-all group">
                              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 group-hover:fill-yellow-300" />
                              <span>12件</span>
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary hover:scale-105 transition-all group">
                              <Heart className="h-3 w-3 sm:h-4 sm:w-4 group-hover:fill-red-500" />
                              <span>123</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              </li>
            ))}
          </ul>

          {/* ページネーション */}
          {!isLoading && !error && threads.length > 0 && (
            <ThreadsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default ThreadsListPage;
