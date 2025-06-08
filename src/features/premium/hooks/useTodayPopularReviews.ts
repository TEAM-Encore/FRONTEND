import {useSuspenseQuery} from '@tanstack/react-query';
import {getPopularPremiumReviews} from '@/api/premium.api';

function useTodayPopularReviews() {
  const {data: todayPopularReviews} = useSuspenseQuery({
    queryKey: ['todayPopularReviews'],
    queryFn: getPopularPremiumReviews,
  });

  return {todayPopularReviews};
}

export default useTodayPopularReviews;
