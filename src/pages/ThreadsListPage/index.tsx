import { FC, useState, useEffect } from "react";
import { useFetchThreads } from "./hooks/useFetchThreads";
import { Link } from "react-router-dom";
import { MessageSquare, Heart, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Skeleton } from "../../components/ui/skeleton";
import { ThreadsPagination } from "./components/ThreadsPagenation";
import { SearchFilters } from "./components/SearchFilters";
import { Thread } from "./hooks/types";

export const ThreadsListPage: FC = () => {
  const { threads, isLoading, error } = useFetchThreads();
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  // 検索、フィルタリング、ソートを適用
  useEffect(() => {
    let result = [...threads];

    // 検索クエリでフィルタリング
    if (searchQuery) {
      result = result.filter((thread) =>
        thread.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // カテゴリーでフィルタリング
    if (selectedCategory !== "all") {
      result = result.filter((thread) => thread.category === selectedCategory);
    }

    // タグでフィルタリング
    if (selectedTags.length > 0) {
      result = result.filter((thread) =>
        selectedTags.some((tag) => thread.tags?.includes(tag)),
      );
    }

    // ソート
    result.sort((a, b) => {
      switch (selectedSort) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "likes":
          return (b.likes || 0) - (a.likes || 0);
        case "comments":
          return (b.comments?.length || 0) - (a.comments?.length || 0);
        default:
          return 0;
      }
    });

    setFilteredThreads(result);
    setCurrentPage(1); // フィルタリングやソートが変更されたら最初のページに戻る
  }, [threads, searchQuery, selectedCategory, selectedSort, selectedTags]);

  // ページネーション計算
  const totalPages = Math.ceil(filteredThreads.length / threadsPerPage);
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = filteredThreads.slice(
    indexOfFirstThread,
    indexOfLastThread,
  );

  // ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sortBy: string) => {
    setSelectedSort(sortBy);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

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
        <CardContent className="p-0">
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

          {!isLoading && !error && (
            <>
              {/* 検索UIの実装 */}
              <SearchFilters
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
                onTagSelect={handleTagSelect}
                selectedCategory={selectedCategory}
                selectedSort={selectedSort}
                searchQuery={searchQuery}
                selectedTags={selectedTags}
              />

              {filteredThreads.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    {threads.length === 0
                      ? "スレッドがありません"
                      : "検索条件に一致するスレッドがありません"}
                  </AlertDescription>
                </Alert>
              ) : (
                <>
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
                                  src={
                                    thread.imageUrl ||
                                    "https://placehold.co/96x96"
                                  }
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
                                  {thread.tags?.map((tag) => (
                                    <button
                                      key={tag}
                                      className="border border-primary/10 text-primary text-xs px-2 py-1 rounded hover:border-primary/50 transition-colors inline-flex items-center hover:text-primary"
                                    >
                                      #{tag}
                                    </button>
                                  ))}
                                </div>

                                {/* 3行目: 日付、投稿数、いいね数 */}
                                <div className="flex items-center justify-between flex-wrap text-xs sm:text-sm text-muted-foreground">
                                  <time>
                                    {new Date(
                                      thread.createdAt,
                                    ).toLocaleDateString("ja-JP")}
                                  </time>
                                  <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1 hover:text-primary hover:scale-105 transition-all group">
                                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 group-hover:fill-yellow-300" />
                                      <span>
                                        {thread.comments?.length || 0}件
                                      </span>
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-primary hover:scale-105 transition-all group">
                                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 group-hover:fill-red-300" />
                                      <span>{thread.likes || 0}</span>
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
                  {filteredThreads.length > 0 && (
                    <ThreadsPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default ThreadsListPage;
