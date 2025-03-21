import { CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
// import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

export const ThreadsNewPage = () => {
  return (
    <>
      {/* metaデータ */}
      <div>
        <title>スレッド作成</title>
        <meta name="description" content="スレッド作成" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="スレッド, 作成" />
      </div>
      {/* ページレイアウト */}
      <div className="flex justify-center m-4">
        <div className="w-full max-w-[800px] mx-auto px-4">
          <CardHeader className="flex flex-row items-center justify-between p-0 mb-8">
            <h1>
              <CardTitle className="text-2xl font-bold">スレッド作成</CardTitle>
            </h1>
          </CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-bold">タイトル</label>
              <Input id="title" placeholder="タイトル" />
            </div>
          </div>
        </div>
      </div>
      {/* いったん一覧に戻るボタンを置く */}
      <Link to="/threads" className="flex justify-center">
        <Button>一覧に戻る</Button>
      </Link>
    </>
  );
};
