export type Thread = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: {
    id: string;
    content: string;
    createdAt: string;
    likes: number;
  }[];
  length: number;
  imageUrl: string;
};

export type ApiError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};
