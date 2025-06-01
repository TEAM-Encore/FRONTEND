import {ITicketBookListFilter} from '@/api/ticketBookList.api';

export const TICKET_BOOK_FILTER_LIST: Array<{
  label: string;
  value: ITicketBookListFilter;
}> = [
  {label: '전체보기', value: 'NULL'},
  {label: '최근 1주', value: 'WEEK'},
  {label: '최근 1달', value: 'MONTH'},
  {label: '최근 1년', value: 'YEAR'},
];
