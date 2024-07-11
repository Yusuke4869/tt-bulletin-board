import { useSetAtom } from "jotai";
import { useState } from "react";
import { Link } from "wouter";

import Layout from "~/components/layout";
import { addThreadsAtom } from "~/stores/store";

import type { FC } from "react";
import type { CreateThreadResponse, APIError } from "~/types/api";

const CreateThread: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<APIError | null>(null);
  const [newThread, setNewThread] = useState<CreateThreadResponse | null>(null);
  const setThreads = useSetAtom(addThreadsAtom);

  const create = async () => {
    setError(null);
    setNewThread(null);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/threads`, {
      body: JSON.stringify({ title }),
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

    const data = (await res.json()) as CreateThreadResponse;
    setTitle("");
    setNewThread(data);
    setThreads([data]);
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center pt-10">スレッド新規作成</h1>
      <div className="mx-[5%] sm:mx-[25%] md:mx-[20%] lg:mx-[30%]">
        <div className="mt-10">
          <input
            className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded p-2`}
            name="thread-title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="スレッドタイトル"
            type="text"
            value={title}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">
              {error.ErrorMessageEN} / {error.ErrorMessageJP}
            </p>
          )}
          {newThread && (
            <div>
              <p className="text-green-500 text-sm mt-1">スレッドを作成しました: {newThread.title}</p>
              <p className="text-green-500 text-sm">
                このスレッドへは{" "}
                <Link href={`/threads/${newThread.id}`}>
                  <a className="text-blue-600 hover:underline">こちら</a>
                </Link>{" "}
                から
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-around items-center mt-8">
          <Link href="/">
            <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold rounded py-2 px-4" type="button">
              トップに戻る
            </button>
          </Link>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold rounded py-2 px-4"
            onClick={() => {
              void create();
            }}
            type="button"
          >
            スレッドを作成
          </button>
        </div>
      </div>
    </Layout>
  );
};

export { CreateThread };
