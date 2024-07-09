import { Link } from "wouter";

import type { FC } from "react";

type Props = {
  id: string;
  title: string;
};

const Thread: FC<Props> = ({ id, title }) => (
  <Link href={`/threads/${id}`}>
    <div className="bg-gray-100 shadow-sm rounded p-4 mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  </Link>
);

export default Thread;
