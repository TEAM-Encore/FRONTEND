import httpApi from './http.api';

export const getTicketBookList = (dateRange: string) => {
  return httpApi.get(`/api/v1/ticket/list`, {
    params: {dateRange},
  });
};
