import { FC } from "react";
import { useFetchThreads } from "./hooks/useFetchThreads";
// import { Link } from "react-router-dom";

export const ThreadsListPage: FC = () => {
  const { threads, isLoading, error } = useFetchThreads();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">スレッド一覧</h1>

      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">エラー: {error.message}</p>}

      {!isLoading && !error && threads.length === 0 && (
        <p className="text-gray-500">スレッドがありません</p>
      )}

      <ul>
        {threads.map((thread) => (
          <li key={thread.id} className="mb-2">
            {/* <Link to={`/threads/${thread.id}`} className="text-blue-500 hover:underline"> */}
            {thread.title}
            {/* </Link> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadsListPage;
