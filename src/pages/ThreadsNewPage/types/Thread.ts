export type Thread = {
  id: string;
  title: string;
};

export type CreateThreadResponse = Thread;

export type ThreadFormState = {
  success: boolean;
  error?: string;
};
