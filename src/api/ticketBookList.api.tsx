import httpApi from './http.api';

export type ITicketBookListFilter = 'NULL' | 'WEEK' | 'MONTH' | 'YEAR';

export const getTicketBookList = (dateRange: ITicketBookListFilter) => {
  return httpApi.get(`/api/v1/ticket/list`, {
    params: {dateRange},
  });
};

export const createTicket = (
  musical_id: number,
  user_id: number,
  viewed_date: string,
  show_time: string,
  seat: string,
  actors: {id: number; name: string; actor_image_url: string}[],
  ticket_image_url: string,
) => {
  const requestBody = {
    musical_id,
    user_id,
    viewed_date,
    show_time,
    seat,
    actors,
    ticket_image_url,
  };
  return httpApi.post(`/api/v1/ticket`, requestBody);
};
