import { useQuery } from "@tanstack/react-query";

interface IUseRequest<T> {
  staleTime?: number;
  initialData?: T;
}

export const useRequest = <T>(
  key: string[],
  request: () => Promise<T>,
  { staleTime, initialData }: IUseRequest<T>
) => {
  const result = useQuery<T | null>({
    queryKey: key,
    queryFn: request,
    staleTime,
    initialData,
  });

  return {
    data: result.data || null,
    isLoading: result.isLoading,
    refetch: result.refetch,
    isRefetching: result.isRefetching,
  };
};
