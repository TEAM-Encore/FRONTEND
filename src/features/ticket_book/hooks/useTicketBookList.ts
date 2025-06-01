import {getTicketBookList} from '@/api/ticketBookList.api';
import {useSuspenseQuery} from '@tanstack/react-query';

function useTicketBookList(dateRange?: string) {
  const {data: ticketBookList, refetch} = useSuspenseQuery({
    queryKey: ['ticketBookList'],
    queryFn: () => getTicketBookList(dateRange ?? 'NULL'),
  });

  return {ticketBookList, refetch};
}

export default useTicketBookList;
