import type { FC } from "react";

type Props = {
  id: string;
  title: string;
};

const Thread: FC<Props> = ({ title }) => (
  <div className="bg-slate-200 shadow-md rounded-md p-4 mb-4">
    <h2 className="text-xl font-bold">{title}</h2>
  </div>
);

export default Thread;
