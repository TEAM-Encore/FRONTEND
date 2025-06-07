import {useSuspenseQuery} from '@tanstack/react-query';
import {getSafeTicketReviewList} from '@/api/review.api';

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
  const {data: reviewLists} = useSuspenseQuery({
    queryKey: ['reviewLists', tag],
    queryFn: () =>
      getSafeTicketReviewList(100, 'createdat', undefined, tag, undefined),
  });

  return {reviewLists};
}

export default useReviewLists;
