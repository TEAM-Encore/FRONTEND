import {getPopularPremiumReviews} from '@/api/premium.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function usePopularPremiumReviews() {
  const {data: popularPremiumReviews, refetch} = useSuspenseQuery({
    queryKey: ['popularPremiumReviews'],
    queryFn: getPopularPremiumReviews,
  });

  return {popularPremiumReviews, refetch};
}

export default usePopularPremiumReviews;
