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

export const PAGE_SIZE = 3;

export async function getPosts() {
  const snapshots = await postsCollection
    .orderBy('createAt', 'desc')
    .limit(PAGE_SIZE)
    .get();
  const posts = snapshots.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export async function getOlderPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  const snapshot = await postsCollection
    .orderBy('createAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE)
    .get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}
