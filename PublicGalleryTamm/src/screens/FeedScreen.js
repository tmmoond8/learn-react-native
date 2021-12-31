import React from 'react';
import {FlatList} from 'react-native';
import PostCard from '../components/PostCard';
import {getPosts} from '../libs/posts';

export default function FeedScreen() {
  const [posts, setPosts] = React.useState(null);
  React.useEffect(() => {
    // 컴포넌트가 처음 마운트 될 때 포스트 목록을 조회한 후 posts 상태 얻기
    getPosts().then(setPosts);
  }, []);

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
    />
  );
}
