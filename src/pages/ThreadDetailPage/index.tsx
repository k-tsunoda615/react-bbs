import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  // CardHeader,
  // CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import { ChevronLeft } from "lucide-react";

export const ThreadDetailPage = () => {
  const { threadId } = useParams();

  // モックデータ（後でAPIから取得するデータの形式に合わせています）
  const [posts] = useState([
    {
      id: "1",
      post: "これは最初の投稿です。",
    },
    {
      id: "2",
      post: "スレッドへの返信です。長いテキストの場合はこのように表示されます。長いテキストの場合はこのように表示されます。",
    },
    {
      id: "3",
      post: "質問があります。このスレッドについて詳しく教えてください。",
    },
  ]);

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

        <div className="flex justify-center mt-6">
          <Button variant="outline" asChild>
            <Link to="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              トップページに戻る
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreadDetailPage;
