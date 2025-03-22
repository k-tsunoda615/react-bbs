import { useParams } from "react-router-dom";

export const ThreadDetailPage = () => {
  const { threadId } = useParams();
  console.log(threadId);
  return (
    <>
      {/* メタデータ */}
      <title>｜スレッド詳細</title>
      <meta name="description" content="スレッド詳細ページです" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* レイアウト */}
      <div>
        <h1>スレッド投稿一覧</h1>
        <p>スレッドID: {threadId}</p>
        <p>投稿一覧がここに表示されます。</p>
      </div>
    </>
  );
};
export default ThreadDetailPage;
