import { useEffect, useState } from "react";

import type { FC } from "react";

type Props = {
  sideLength: number;
  currentPage: number;
  changePage: (page: number) => void;
};

const Pagination: FC<Props> = ({ sideLength, currentPage, changePage }) => {
  // 表示する番号の配列
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    // 端が0以下にならないようにする
    const startDiff = Math.abs(Math.min(currentPage - sideLength - 1, 0));

    // 現在のページの前後sideLength分だけ番号を表示
    setPageNumbers([]);
    for (let i = currentPage - sideLength + startDiff; i <= currentPage + sideLength + startDiff; i++)
      setPageNumbers((prev) => [...prev, i]);
  }, [currentPage, sideLength]);

  return (
    <div className="flex justify-center items-center space-x-3 my-6">
      <button
        className={`h-10 rounded-md px-2 hover:bg-gray-200 ${currentPage === 1 ? "text-gray-300" : "text-black"}`}
        disabled={currentPage === 1}
        onClick={() => {
          changePage(currentPage - 1);
        }}
        type="button"
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          className={`w-10 h-10 rounded-md text-center hover:bg-gray-200 ${page === currentPage ? "bg-gray-300" : ""}`}
          key={page}
          onClick={() => {
            changePage(page);
          }}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className="h-10 rounded-md px-2 hover:bg-gray-200"
        onClick={() => {
          changePage(currentPage + 1);
        }}
        type="button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
