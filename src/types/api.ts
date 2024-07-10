export type APIError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

export type ThreadInfo = {
  id: string;
  title: string;
};

export type CreateThreadResponse = {
  id: string;
  title: string;
};
