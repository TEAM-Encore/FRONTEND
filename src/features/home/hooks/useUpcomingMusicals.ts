import {getUpcomingMusical} from '@/api/musical.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function useUpcomingMusicals() {
  const {data: upcomingMusicals} = useSuspenseQuery({
    queryKey: ['upcomingMusicals'],
    queryFn: getUpcomingMusical,
  });

  return {upcomingMusicals};
}

export default useUpcomingMusicals;
