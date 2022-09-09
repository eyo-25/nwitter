import { dbService, storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";

export function Nweet({ nweetObj, isOwner, attachmentUrl }) {
  const [editting, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제ok?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
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
          <>
            {isOwner && (
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
            )}
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {attachmentUrl !== "" && (
              <img src={attachmentUrl} width="50px" height="50px" />
            )}
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
