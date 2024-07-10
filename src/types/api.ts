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

type PostInfo = {
  id: string;
  post: string;
};

export type PostList = {
  threadId: string;
  posts: PostInfo[];
};

export type CreatePostResponse = {
  postId: string;
  threadId: string;
  post: string;
};
