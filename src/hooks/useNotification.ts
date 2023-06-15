import fetcher from '@/server/fetcher';
import useSWR from 'swr';


const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notification/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;