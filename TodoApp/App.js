/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';

export default function App() {
  const today = Date.now();

  const [todos, setTodos] = React.useState([
    {id: '1tulaasdrg', text: '작업환경 설정', done: true},
    {id: 'mc9av4c8c', text: '리액트 네이티브 기초 공부', done: false},
    {id: '835t2avu98', text: '투두리스트 만들어보기', done: false},
  ]);

  const handleInsert = text => {
    const todo = {
      id: (Math.random() * 123).toString(32).split('.')[1], //
      text,
      done: false,
    };
    setTodos([...todos, todo]);
    return todo;
  };

  const handleToggle = id => {
    setTodos(
      todos.map(todo =>
        id === todo.id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo,
      ),
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          behavior={Platform.select({ios: 'padding', android: undefined})}
          style={styles.avoid}>
          <DateHead today={today} />
          {todos.length > 0 ? (
            <TodoList todos={todos} onToggle={handleToggle} />
          ) : (
            <Empty />
          )}
          <AddTodo onInsert={handleInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});
