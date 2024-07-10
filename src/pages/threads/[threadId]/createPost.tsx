import { useState } from "react";

import type { FC } from "react";
import type { CreatePostResponse, APIError } from "~/types/api";

type Props = {
  threadId: string;
  refresh: () => Promise<void>;
};

const CreatePost: FC<Props> = ({ threadId, refresh }) => {
  const [post, setPost] = useState<string>("");
  const [error, setError] = useState<APIError | null>(null);
  const [newPost, setNewPost] = useState<CreatePostResponse | null>(null);

  const create = async () => {
    setError(null);
    setNewPost(null);

    if (post === "") {
      setError({
        ErrorCode: 400,
        ErrorMessageJP: "投稿内容を入力してください",
        ErrorMessageEN: "Please enter a post",
      });
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/threads/${threadId}/posts`, {
      body: JSON.stringify({ post }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      const error = (await res.json()) as APIError;
      setError(error);
      return;
    }

    await refresh();
    const data = (await res.json()) as CreatePostResponse;
    setPost("");
    setNewPost(data);
  };

  return (
    <div className="my-6">
      <div>
        <textarea
          className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded p-2`}
          name="thread-title"
          onChange={(e) => {
            setPost(e.target.value);
          }}
          placeholder="投稿しよう！"
          value={post}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error.ErrorMessageEN} / {error.ErrorMessageJP}
          </p>
        )}
        {newPost && <p className="text-green-500 text-sm mt-1">投稿しました！</p>}
      </div>
      <button
        className="bg-green-600 hover:bg-green-700 text-white font-bold rounded py-2 px-4 mt-2"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={create}
        type="button"
      >
        投稿
      </button>
    </div>
  );
};

export { CreatePost };
