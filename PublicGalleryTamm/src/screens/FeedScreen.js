import React from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import PostCard from '../components/PostCard';
import {getOlderPosts, PAGE_SIZE, getPosts} from '../libs/posts';

export default function FeedScreen() {
  const [posts, setPosts] = React.useState(null);
  const [noMorePost, setNoMorePost] = React.useState(false);
  React.useEffect(() => {
    // 컴포넌트가 처음 마운트 될 때 포스트 목록을 조회한 후 posts 상태 얻기
    getPosts().then(setPosts);
  }, []);

  const handleLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }
    const lastPost = posts[posts.length - 1];
    const olderPosts = await getOlderPosts(lastPost.id);
    if (olderPosts.length < PAGE_SIZE) {
      setNoMorePost(true);
    }
    setPosts(posts.concat(olderPosts));
  };

  const renderItem = React.useMemo(
    () =>
      ({item}) =>
        <PostCard {...item} />,
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
