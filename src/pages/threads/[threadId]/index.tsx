import { useState, useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { useRoute, Link } from "wouter";

import Layout from "~/components/layout";
import { fetcher } from "~/utils/fetcher";

import { CreatePost } from "./createPost";

import type { FC } from "react";
import type { ThreadInfo, PostList } from "~/types/api";

const Thread: FC = () => {
  const [match, params] = useRoute("/threads/:threadId");
  const [title, setTitle] = useState<string>("");
  const [threadOffset, setThreadOffset] = useState<number | null>(null);

  const getPost = (pageIndex: number, previousPageData: PostList[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (previousPageData && previousPageData.length === 0) return null;
    return match
      ? `${import.meta.env.VITE_API_URL}/threads/${params.threadId}/posts?offset=${(pageIndex * 10).toString()}`
      : null;
  };
  const { data, mutate, size, setSize } = useSWRInfinite<PostList>(getPost, fetcher);
  const isReachingEnd = data ? data[data.length - 1].posts.length < 10 : false;

  const refresh = async () => {
    await mutate();
  };

  /**
   * スレッド一覧を順番に取得し、指定されたスレッドのタイトルを取得する
   */
  useEffect(() => {
    if (match && title === "") {
      void (async () => {
        let found = false;
        for (let i = 0; ; i += 10) {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/threads?offset=${i.toString()}`);
          if (!res.ok) break;

          const json = (await res.json()) as ThreadInfo[];
          for (const thread of json) {
            if (thread.id !== params.threadId) continue;

            found = true;
            setTitle(thread.title);
            setThreadOffset(i / 10 + 1);
            break;
          }

          if (found) break;
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.threadId]);

  if (!match) return <div>404, Not Found</div>;
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center pt-10">{title === "" ? "スレッド投稿一覧" : title}</h1>
      {threadOffset !== null && (
        <div className="flex justify-center items-center my-4">
          <Link href={`/?page=${threadOffset.toString()}`}>
            <button
              className="text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-1"
              type="button"
            >
              スレッド一覧に戻る
            </button>
          </Link>
        </div>
      )}
      <div className="mx-[5%] md:mx-[20%] lg:mx-[25%]">
        {data?.map((page, i) => (
          <div key={i}>
            {page.posts.map((post) => (
              <div className="border-slate-400 border-solid border-[1px] rounded p-2 my-2" key={post.id}>
                <p>{post.post}</p>
              </div>
            ))}
          </div>
        ))}
        {!isReachingEnd && (
          <div className="flex justify-center items-center my-4">
            <button
              className="text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-1"
              onClick={() => {
                void setSize(size + 1);
              }}
              type="button"
            >
              さらに読み込む
            </button>
          </div>
        )}
        <CreatePost refresh={refresh} threadId={params.threadId} />
      </div>
    </Layout>
  );
};

export { Thread };
