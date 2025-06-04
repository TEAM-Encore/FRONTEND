import {ITicketBook} from '@/api/ticketBookList.api';
import {useQueryClient} from '@tanstack/react-query';

function useTicket(ticketId: number) {
  const queryClient = useQueryClient();

  const queries =
    queryClient.getQueriesData<ITicketBook[]>({queryKey: ['ticketBookList']}) ??
    [];

  const tickets = queries.flatMap(([_, tickets]) => tickets ?? []);

  const ticket = tickets.find(t => t.id === ticketId);

  return ticket;
}

export default useTicket;
