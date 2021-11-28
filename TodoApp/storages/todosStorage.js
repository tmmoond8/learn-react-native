import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'todos';

const todosStorage = {
  async get() {
    try {
      const rawTodos = await AsyncStorage.getItem(key);
      if (!rawTodos) {
        throw new Error('No saved todos');
      }
      const savedTodos = JSON.parse(rawTodos);
      return savedTodos;
    } catch (e) {
      console.log('Failed to load todos');
    }
  },
  async set(todos) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(todos));
    } catch (e) {
      console.log('Failed to save todos');
    }
  },
};

export default todosStorage;
