import { useEffect, useState } from "react";
import { Thread, ApiError } from "./types";

export const useFetchThreads = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTheads = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://railway.bulletinboard.techtrain.dev/threads",
        );

        const data = await response.json();

        if (!response.ok) {
          const apiError = data as ApiError;
          throw new Error(`${apiError.ErrorMessageJP} (${apiError.ErrorCode})`);
        }
        setThreads(data as Thread[]);
      } catch (error) {
        console.error("APIエラーが発生しました", error);
        setError(
          error instanceof Error ? error : new Error("エラーが発生しました"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheads();
  }, []);

  return { threads, isLoading, error };
};
