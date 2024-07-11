import { useAtom } from "jotai";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite";
import { useRoute } from "wouter";

import Layout from "~/components/layout";
import { getThreadsAtom } from "~/stores/store";
import { fetcher } from "~/utils/fetcher";

import { CreatePost } from "./createPost";

import type { FC } from "react";
import type { PostList } from "~/types/api";

const Thread: FC = () => {
  const [match, params] = useRoute("/threads/:threadId");
  const [threads, initial] = useAtom(getThreadsAtom);

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

  useEffect(() => {
    void initial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match) return <div>404, Not Found</div>;
  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mt-10 mb-6">
        {threads.find((thread) => thread.id === params.threadId)?.title ?? "スレッド投稿一覧"}
      </h1>
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
        {data && !isReachingEnd && (
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
