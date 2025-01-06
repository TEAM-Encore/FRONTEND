import httpApi from './http.api';

export const getTicketList = (dataRange: string) => {
  return httpApi.get(`/api/v1/ticket/list`, {params: {dataRange}});
};
