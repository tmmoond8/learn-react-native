import React from 'react';
import {View, Button} from 'react-native';

function HomeScreen({navigation}) {
  return (
    <View>
      <Button
        title="Detail1 열기"
        onPress={() => navigation.navigate('Detail', {id: 1, max: 3})}
      />
      <Button
        title="Detail2 열기"
        onPress={() => navigation.navigate('Detail', {id: 2, max: 3})}
      />
      <Button
        title="Detail3 열기"
        onPress={() => navigation.navigate('Detail', {id: 3, max: 3})}
      />
    </View>
  );
}

export default HomeScreen;
