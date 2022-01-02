import {useNavigation} from '@react-navigation/native';
import React from 'react';
import IconRightButton from '../components/IconRightButton';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

export default function MyProfileScreen() {
  const {user} = useUserContext();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
      headerRight: () => (
        <IconRightButton
          name="settings"
          onPress={() => navigation.push('Setting')}
        />
      ),
    });
  }, [navigation, user]);

  return <Profile userId={user.id} />;
}
