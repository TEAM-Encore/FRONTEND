import httpApi from './http.api';

export const postTicketReview = (ticket_id: number, requestData: any) => {
  return httpApi.post(`/api/v1/review/${ticket_id}`, requestData);
};
