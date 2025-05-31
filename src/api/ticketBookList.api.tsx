import httpApi, {IResponse} from './http.api';
import {IReviewRating} from './premium.api';

export type ITicketBook = {
  id: number;
  user_id: number;
  musical_title: string;
  series: string;
  viewed_date: string; // ISO 형식의 날짜 문자열
  location: string;
  seat: string;
  actors: string[];
  has_review: boolean;
  ticket_image_url: string;
  rating?: IReviewRating;
};

export const getTicketBookList = async (dateRange: string) => {
  const {data} = await httpApi.get<IResponse<ITicketBook[]>>(
    `/api/v1/ticket/list`,
    {
      params: {dateRange},
    },
  );

  return data.data;
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
