import React from 'react';
import {addDays} from 'date-fns';
import {v4 as uuidv4} from 'uuid';

const LogContext = React.createContext({
  logs: [],
  onCreate: () => console.log('not initialzed'),
  onModify: () => console.log('not initialzed'),
  onRemove: () => console.log('not initialzed'),
});

export default LogContext;

export function LogContextProvider({children}) {
  const today = new Date();
  const [logs, setLogs] = React.useState(
    Array.from({length: 10}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Log ${index}`,
      date: addDays(today, -1 * (index + 1)).toISOString(),
    })),
  );
  const onCreate = ({title, body, date}) => {
    const log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = modified => {
    // logs 배열을 순회해 id가 일치하면 log를 교체하고 그렇지 않으면 유지
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  const onRemove = id => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
}
export const useLogContext = () => React.useContext(LogContext);
