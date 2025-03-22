export type Thread = {
  id: string;
  title: string;
  category?: string; // 現在のAPIにはないが、将来的に追加する
  tags?: string[]; // 現在のAPIにはないが、将来的に追加する
  createdAt?: string; // 現在のAPIにはないが、将来的に追加する
  likes?: number; // 現在のAPIにはないが、将来的に追加する
  comments?: {
    id: string;
    content: string;
    createdAt: string; // 現在のAPIにはないが、将来的に追加する
    likes: number; // 現在のAPIにはないが、将来的に追加する
  }[];
  length?: number; // 現在のAPIにはないが、将来的に追加する
  imageUrl?: string; // 現在のAPIにはないが、将来的に追加する
};

export type ApiError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

export type ThreadFormState = {
  success: boolean;
  error?: string;
};
