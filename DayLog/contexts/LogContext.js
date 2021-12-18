import React from 'react';
import {v4 as uuidv4} from 'uuid';

const LogContext = React.createContext({
  logs: [],
  onCreate: () => console.log('not initialzed'),
});

export default LogContext;

export function LogContextProvider({children}) {
  const [logs, setLogs] = React.useState(
    Array.from({length: 10}).map((_, index) => ({
      id: uuidv4(),
      title: `Log ${index}`,
      body: `Log ${index}`,
      date: new Date().toISOString(),
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
  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
}
export const useLogContext = () => React.useContext(LogContext);
