import React from 'react';
import {View, StyleSheet} from 'react-native';
import {format} from 'date-fns';
import CalendarView from '../components/CalendarView';
import {useLogContext} from '../contexts/LogContext';
import FeedList from '../components/FeedList';

export default function CalendarScreen() {
  const {logs} = useLogContext();
  const [selectedDate, setSelectedDate] = React.useState(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const markedDates = React.useMemo(() => {
    return logs.reduce((acc, current) => {
      const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
      acc[formattedDate] = {marked: true};
      return acc;
    });
  }, [logs]);
  return (
    <View style={styles.block}>
      <CalendarView
        markedDates={markedDates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <FeedList
        logs={logs.filter(
          ({date}) => format(new Date(date), 'yyyy-MM-dd') === selectedDate,
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});
