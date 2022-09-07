import { dbService } from "fbase";
import React, { useState } from "react";

export function Nweet({ nweetObj, isOwner }) {
  const [editting, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("ok?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };
  const toggleEditting = () => setEditing((prev) => !prev);
  const onEditChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  return (
    <>
      <div>
        {editting ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newNweet}
              onChange={onEditChange}
              required
              placeholder="Edit your nweet"
            />
            <input type="submit" value="Updata Nweets" />
            <button onClick={toggleEditting}>cancle</button>
          </form>
        ) : (
          <>
            <span>{nweetObj.text}</span>
            <span>{nweetObj.creatorId}</span>
            {isOwner && (
              <>
                <button onClick={toggleEditting}>Edit Nweet</button>
                <button onClick={onDeleteClick}>Delete Nweet</button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
