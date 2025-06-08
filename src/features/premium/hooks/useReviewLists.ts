import {useSuspenseQuery} from '@tanstack/react-query';
import {getSafeTicketReviewList} from '@/api/review.api';
import {IReviewParams} from '@/api/review.api';

// function useReviewLists(tag?: string) {
//   const {data: reviewLists} = useSuspenseQuery({
//     queryKey: ['reviewLists', tag],
//     queryFn: ({queryKey}) => {
//       const [, tag] = queryKey;
//       return getTicketReviewList(100, 'createdat', undefined, tag, undefined);
//     },
//   });

//   return {reviewLists};
// }

function useReviewLists(tag?: string) {
  const params: IReviewParams = {
    size: 100,
    sort: 'createdat',
    tag: tag,
  };

  const {data: reviewLists} = useSuspenseQuery({
    queryKey: ['reviewLists', params],
    queryFn: () => getSafeTicketReviewList(params),
  });

  return {reviewLists};
}

export default useReviewLists;
