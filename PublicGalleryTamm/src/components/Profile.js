import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {getPosts, getNewerPosts, getOlderPosts, PAGE_SIZE} from '../libs/posts';
import {getUser} from '../libs/users';
import {getImageUrl} from '../libs/utils';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';

export default function Profile({userId}) {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState(null);

  const [noMorePost, setNoMorePost] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost, userId);

    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const handleRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }
    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id, userId);
    setRefreshing(false);
    if (newerPosts.length === 0) {
      return;
    }
    setPosts(newerPosts.concat(posts));
  };

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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
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
  bottomSpinner: {
    height: 128,
  },
});
