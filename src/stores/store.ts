import { atom } from "jotai";

import type { ThreadInfo } from "~/types/api";

export const threadsAtom = atom<ThreadInfo[]>([]);

export const addThreadsAtom = atom(null, (get, set, threads: ThreadInfo[]) => {
  const current = get(threadsAtom);
  set(threadsAtom, Array.from(new Set([...threads, ...current])));
});

export const getThreadsAtom = atom(
  (get) => {
    return get(threadsAtom);
  },
  async (get, set) => {
    const current = get(threadsAtom);
    if (current.length > 0) return;

    const threads: ThreadInfo[] = [];
    for (let i = 0; ; i += 10) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/threads?offset=${i.toString()}`);
      if (!res.ok) break;

      const json = (await res.json()) as ThreadInfo[];
      threads.push(...json);
      if (json.length < 10) break;

      set(threadsAtom, threads);
    }
  }
);
