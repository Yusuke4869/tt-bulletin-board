import { useState, useEffect } from "react";
import useSWR from "swr";

import Layout from "~/components/layout";
import { fetcher } from "~/utils/fetcher";

import Pagination from "./pagination";
import Thread from "./thread";

import type { FC } from "react";
import type { ThreadInfo } from "~/types/api";

const Home: FC = () => {
  const params = new URLSearchParams(window.location.search);
  const [page, setPage] = useState<number>(Number(params.get("page")) || 1);
  const [offset, setOffset] = useState<number>(page > 1 ? (page - 1) * 10 : 0);
  const [sideLength, setSideLength] = useState<number>(window.innerWidth < 640 ? 1 : 3);

  const { data } = useSWR<ThreadInfo[]>(`${import.meta.env.VITE_API_URL}/threads?offset=${offset.toString()}`, fetcher);

  useEffect(() => {
    if (page <= 1) {
      window.history.replaceState(null, "", "/");
      setOffset(0);
    } else {
      window.history.replaceState(null, "", `/?page=${page.toString()}`);
      setOffset((page - 1) * 10);
    }
  }, [page]);

  useEffect(() => {
    const handleResize = () => {
      setSideLength(window.innerWidth < 640 ? 1 : 3);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center pt-10">新着スレッド</h1>
      <div>
        <Pagination changePage={setPage} currentPage={page} sideLength={sideLength} />
      </div>
      {data?.length && (
        <>
          <div className="mx-[5%] md:mx-[20%] lg:mx-[25%]">
            {data.map((thread) => (
              <Thread id={thread.id} key={thread.id} title={thread.title} />
            ))}
          </div>
          <div>
            <Pagination changePage={setPage} currentPage={page} sideLength={sideLength} />
          </div>
        </>
      )}
    </Layout>
  );
};

export { Home };
