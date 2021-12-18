import React from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = React.createContext({
  logs: [],
  onCreate: () => console.log('not initialzed'),
});

export default LogContext;

export function LogContextProvider({children}) {
  const [logs, setLogs] = React.useState([
    {
      id: 'abcsds',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds2',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsd3',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds4',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds5',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsd6s',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds7',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds8',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds9',
      title: 'a 1',
      body: 'aaa',
      date: '2021-01-01',
    },
    {
      id: 'abcsds10',
      title: 'a 10',
      body: 'aaa',
      date: '2021-01-01',
    },
  ]);
  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };
  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}
export const useLogContext = () => React.useContext(LogContext);
