import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}
