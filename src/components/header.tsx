import { Link } from "wouter";

import type { FC } from "react";

const Header: FC = () => (
  <header className="flex justify-between items-center flex-col sm:flex-row bg-gray-100 drop-shadow-md pt-6 pb-5">
    <div className="sm:ml-12">
      <Link href="/">
        <h1 className="text-2xl font-bold text-center">掲示板</h1>
      </Link>
    </div>
    <div className="mt-3 ml-auto mr-4 sm:mt-0 sm:ml-0 sm:mr-12">
      <Link href="/threads/new">
        <button className="text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2">
          新規スレッド作成
        </button>
      </Link>
    </div>
  </header>
);

export default Header;
