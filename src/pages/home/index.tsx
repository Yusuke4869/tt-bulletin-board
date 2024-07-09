import useSWR from "swr";

import { fetcher } from "~/utils/fetcher";

import Thread from "./thread";

import type { FC } from "react";
import type { ThreadInfo } from "~/types/api";

const Home: FC = () => {
  const { data } = useSWR<ThreadInfo[]>(`${import.meta.env.VITE_API_URL}/threads`, fetcher);

  return (
    <div>
      <div className="my-6">
        <h1 className="text-3xl font-bold text-center">新着スレッド</h1>
      </div>
      <div className="mx-20 md:mx-[20%] lg:mx-[25%]">
        {data?.map((thread) => <Thread id={thread.id} key={thread.id} title={thread.title} />)}
      </div>
    </div>
  );
};

export { Home };
