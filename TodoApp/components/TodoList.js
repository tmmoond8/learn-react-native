import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import TodoItem from './TodoItem';

export default function TodoList({todos, onToggle, onRemove}) {
  return (
    <FlatList
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          id={item.id}
          text={item.text}
          done={item.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
});
