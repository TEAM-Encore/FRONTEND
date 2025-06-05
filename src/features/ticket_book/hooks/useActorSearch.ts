import {getActorSearch} from '@/api/search.api';
import {useQuery} from '@tanstack/react-query';

function useActorSearch(keyword: string) {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['actorSearch', keyword],
    queryFn: () => getActorSearch(keyword),
    enabled: false,
  });

  const result = data ?? [];

  return {result, isLoading, refetch};
}

export default useActorSearch;
