import { useState, useEffect } from "react";
import {
  Post,
  ThreadPostsResponse,
  ErrorResponse,
  UseThreadPostsResult,
} from "../../../types/Post";

export const useThreadPosts = (threadId: string): UseThreadPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPosts = async (currentOffset: number) => {
    try {
      setLoading(true);
      const url = `https://railway.bulletinboard.techtrain.dev/threads/${threadId}/posts${currentOffset > 0 ? `?offset=${currentOffset}` : ""}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData: ErrorResponse = await response.json();
        throw errorData;
      }

      const data: ThreadPostsResponse = await response.json();

      if (data.posts.length < 10) {
        setHasMore(false);
      }

      if (currentOffset === 0) {
        setPosts(data.posts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      }

      setError(null);
    } catch (err) {
      if ((err as ErrorResponse).ErrorCode) {
        setError(err as ErrorResponse);
      } else {
        setError({
          ErrorCode: 500,
          ErrorMessageJP: "予期せぬエラーが発生しました。",
          ErrorMessageEN: "Unexpected error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setOffset(0);
    setHasMore(true);
    fetchPosts(0);
  }, [threadId]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const newOffset = offset + 10;
      setOffset(newOffset);
      fetchPosts(newOffset);
    }
  };

  return { posts, loading, error, hasMore, loadMore };
};

export default useThreadPosts;
