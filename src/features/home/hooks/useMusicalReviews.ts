import {getMusicalReviews} from '@/api/musical.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function useMusicalReviews(id: number) {
  const {data, refetch} = useSuspenseQuery({
    queryKey: ['musicalReviews', id],
    queryFn: () => getMusicalReviews(id),
  });

  return {...data, refetch};
}

export default useMusicalReviews;
