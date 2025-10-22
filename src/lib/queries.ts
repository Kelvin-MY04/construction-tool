import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());

export const useFetchJsonData = (url: string) => {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return { data, error, isLoading };
};
