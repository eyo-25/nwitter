import { authService, dbService } from "fbase";
import React, { useState, useEffect } from "react";
import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { Nweet } from "component/Nweet";
import { NweetFactory } from "component/NweetFactory";
import { onAuthStateChanged } from "firebase/auth";

export default function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(newArray);
    });
    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });
  }, []);
  return (
    <div className="container">
      <div style={{ marginTop: 30 }}>
        <NweetFactory userObj={userObj} />
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
            attachmentUrl={nweet.attachmentUrl}
          />
        ))}
      </div>
    </div>
  );
}
