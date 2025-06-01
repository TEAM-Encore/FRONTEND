import {getDetailedMusical} from '@/api/musical.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function useMusicalDetail(id: number) {
  const {data: musicalDetail, refetch} = useSuspenseQuery({
    queryKey: ['musicalDetail', id],
    queryFn: () => getDetailedMusical(id),
  });

  return {musicalDetail, refetch};
}

export default useMusicalDetail;
