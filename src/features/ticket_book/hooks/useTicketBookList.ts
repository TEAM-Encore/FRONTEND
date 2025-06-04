import {
  getTicketBookList,
  ITicketBookListFilter,
} from '@/api/ticketBookList.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function useTicketBookList(dateRange: ITicketBookListFilter = 'NULL') {
  const {data: ticketBookList, refetch} = useSuspenseQuery({
    queryKey: ['ticketBookList', dateRange],
    queryFn: () => getTicketBookList(dateRange),
  });

  return {ticketBookList, refetch};
}

export default useTicketBookList;
