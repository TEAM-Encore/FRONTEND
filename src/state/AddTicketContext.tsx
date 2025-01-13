import React, {createContext, useContext, useState, ReactNode} from 'react';

type SearchResult = {
  id: number;
  name: string;
  actor_image_url: string;
};

interface AddTicketData {
  musicalId: number;
  timeList: string[];
  date: string;
  time: string;
  place: string;
  seat: string;
  actors: SearchResult[];
}

interface AddTicketContextType {
  addTicketData: AddTicketData;
  updateAddTicketData: (newData: Partial<AddTicketData>) => void;
}

const AddTicketContext = createContext<AddTicketContextType | undefined>(
  undefined,
);

export const useAddTicket = () => {
  const context = useContext(AddTicketContext);
  if (!context) {
    throw new Error('useAddTicket은 AddTicketProvider 내에서 사용해야 합니다');
  }
  return context;
};

interface AddTicketProviderProps {
  children: ReactNode;
}

export const AddTicketProvider = ({children}: AddTicketProviderProps) => {
  const [addTicketData, setAddTicketData] = useState<AddTicketData>({
    musicalId: 0,
    timeList: [],
    date: '',
    time: '',
    place: '',
    seat: '',
    actors: [],
  });

  const updateAddTicketData = (newData: Partial<AddTicketData>) => {
    setAddTicketData(prev => {
      const updatedData = {...prev, ...newData};
      console.log('티켓 추가 데이터:', updatedData);
      return updatedData;
    });
  };

  return (
    <AddTicketContext.Provider value={{addTicketData, updateAddTicketData}}>
      {children}
    </AddTicketContext.Provider>
  );
};
