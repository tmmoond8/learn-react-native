import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {getPosts} from '../libs/posts';
import {getUser} from '../libs/users';
import {getImageUrl} from '../libs/utils';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

export default function Profile({userId}) {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState(null);

  const renderItem = React.useMemo(() => {
    return ({item}) => <PostGridItem post={item} />;
  }, []);

  React.useEffect(() => {
    getUser(userId).then(setUser);
    getPosts({userId}).then(setPosts);
  }, [userId]);
  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }
  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar
            source={{
              uri: getImageUrl(user.photoURL),
            }}
            size={128}
          />
          <Text style={styles.userName}>{user.displayName}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  spinner: {flex: 1, justifyContent: 'center'},
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  userName: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
});
