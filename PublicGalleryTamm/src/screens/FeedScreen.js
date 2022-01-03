import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import PostCard from '../components/PostCard';
import {usePosts} from '../libs/posts';

export default function FeedScreen() {
  const {posts, noMorePost, refreshing, handleRefresh, handleLoadMore} =
    usePosts();
  const postsReady = posts !== null;

  React.useEffect(() => {
    if (postsReady) {
      SplashScreen.hide();
    }
  }, [postsReady]);

  const renderItem = React.useMemo(
    () =>
      ({item}) =>
        item ? <PostCard {...item} /> : null,
    [],
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.75}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={21} color="#6200ee" />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={handleRefresh} refreshing={refreshing} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});
