import useSWR from "swr";
import fetcher from "@/server/fetcher";

export default function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
