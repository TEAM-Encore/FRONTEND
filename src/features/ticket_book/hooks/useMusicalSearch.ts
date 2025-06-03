import {getMusicalSearch} from '@/api/search.api';
import {useQuery} from '@tanstack/react-query';

function useMusicalSearch(keyword: string) {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['musicalSearch', keyword],
    queryFn: () => getMusicalSearch(keyword),
    enabled: false,
  });

  const result = data ?? [];

  return {result, isLoading, refetch};
}

export default useMusicalSearch;
