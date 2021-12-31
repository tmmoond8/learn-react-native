import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createAt: firestore.FieldValue.serverTimestamp(),
  });
}

export async function getPosts() {
  const snapshots = await postsCollection.get();
  const posts = snapshots.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}
