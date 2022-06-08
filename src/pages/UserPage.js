import React, { useEffect, useState } from 'react';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

function UserPage() {
  const [postLists, setPostList] = useState([]);
  const plantsCollectionRef = collection(db, 'Plants');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(plantsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  return (
    <div>
      {postLists.map((post) => {
        return <div>{post.name}</div>;
      })}
    </div>
  );
}

export default UserPage;
