export type Post = {
  id: string;
  post: string;
};

export type ThreadPostsResponse = {
  threadId: string;
  posts: Post[];
};

export type ErrorResponse = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

export type UseThreadPostsResult = {
  posts: Post[];
  loading: boolean;
  error: ErrorResponse | null;
  hasMore: boolean;
  loadMore: () => void;
};
