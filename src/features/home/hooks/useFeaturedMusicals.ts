import {getFeaturedMusical} from '@/api/musical.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function useFeaturedMusicals() {
  const {data: featuredMusicals} = useSuspenseQuery({
    queryKey: ['featuredMusicals'],
    queryFn: getFeaturedMusical,
  });

  return {featuredMusicals};
}

export default useFeaturedMusicals;
