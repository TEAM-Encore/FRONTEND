import httpApi from './http.api';

export const postTicketReview = (ticket_id: number, requestData: any) => {
  return httpApi.post(`/api/v1/review/${ticket_id}`, requestData);
};

export const getTicketReview = (review_id: number) => {
  return httpApi.get(`/api/v1/review/${review_id}`);
};
