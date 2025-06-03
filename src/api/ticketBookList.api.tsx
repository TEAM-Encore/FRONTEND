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

export type ITicketBookListFilter = 'NULL' | 'WEEK' | 'MONTH' | 'YEAR';

export type CreateTicketParams = {
  musical_id: number;
  user_id: number;
  viewed_date: string;
  show_time: string;
  seat: string;
  actor_ids: number[];
  ticket_image_url: string;
};

export const getTicketBookList = async (dateRange: ITicketBookListFilter) => {
  const {data} = await httpApi.get<IResponse<ITicketBook[]>>(
    `/api/v1/ticket/list`,
    {
      params: {dateRange},
    },
  );

  return data.data;
};

export const createTicket = async (params: CreateTicketParams) => {
  const {...body} = params;

  const {data} = await httpApi.post<IResponse<ITicketBook>>(
    `/api/v1/ticket`,
    body,
  );

  return data.data;
};
