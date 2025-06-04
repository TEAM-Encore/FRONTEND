import {IActorSearch} from '@/api/search.api';
import {create} from 'zustand';

type State = {
  musical: {
    id: number;
    title: string;
    location: string;
  } | null;
  viewedDate: string;
  showTime: string;
  seats: string[];
  actors: IActorSearch[];
  ticketImageUrl: string | null;
};

type Actions = {
  setMusical: (by: {id: number; title: string; location: string}) => void;
  setViewedDate: (date: string) => void;
  setShowTime: (time: string) => void;
  setSeats: (seats: string[]) => void;
  addActor: (actor: IActorSearch) => void;
  removeActor: (actor: IActorSearch) => void;
  setTicketImageUrl: (url: string) => void;
  clearTicketImageUrl: () => void;

  clear: () => void;
};

const initialState: State = {
  musical: null,
  viewedDate: '',
  showTime: '',
  seats: Array.from({length: 3}, () => ''),
  actors: [],
  ticketImageUrl: null,
};

const useAddTicketStore = create<State & Actions>()((set, get) => ({
  ...initialState,

  setMusical: by => set(state => ({...state, musical: by})),
  setViewedDate: date => set(state => ({...state, viewedDate: date})),
  setShowTime: time => set(state => ({...state, showTime: time})),
  setSeats: seats => set(state => ({...state, seats})),
  addActor: actor => {
    const prev = get().actors;
    const updated = prev.some(a => a.id === actor.id) ? prev : [...prev, actor];

    set(state => ({...state, actors: updated}));
  },
  removeActor: actor =>
    set(state => ({
      ...state,
      actors: state.actors.filter(a => a.id !== actor.id),
    })),
  setTicketImageUrl: url => set(state => ({...state, ticketImageUrl: url})),
  clearTicketImageUrl: () => set(state => ({...state, ticketImageUrl: null})),

  clear: () => set(initialState),
}));

export default useAddTicketStore;
