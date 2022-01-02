import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PostCard from '../components/PostCard';
import events from '../libs/events';

export default function PostScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {post} = route.params;

  // React.useEffect(() => {
  //   const handler = ({description}) => {
  //     navigation.setParams({post: {...post, description}});
  //     // console.log('aaa');
  //   };
  //   events.addListener('updatePost', handler);
  //   return () => {
  //     events.removeListener('updatePost', handler);
  //   };
  // }, [post, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createAt={post.createAt}
        id={post.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
});
