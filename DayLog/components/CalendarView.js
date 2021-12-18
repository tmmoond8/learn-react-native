import React from 'react';
import {StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default function CalendarView({
  markedDates = [],
  selectedDate,
  setSelectedDate,
}) {
  const themeColor = '#009688';
  return (
    <Calendar
      style={styles.calendar}
      markedDates={{
        ...markedDates,
        [selectedDate]: {
          selected: true,
          marked: markedDates[selectedDate]?.marked,
        },
      }}
      onDayPress={day => {
        setSelectedDate(day.dateString);
      }}
      theme={{
        selectedDayBackgroundColor: themeColor,
        arrowColor: themeColor,
        dotColor: themeColor,
        todayTextColor: themeColor,
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});
