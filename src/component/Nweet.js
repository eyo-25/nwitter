import { dbService, storageService } from "fbase";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
  const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <>
      <div className="nweet">
        {editting ? (
          <>
            {isOwner && (
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input
                  type="text"
                  value={newNweet}
                  onChange={onEditChange}
                  required
                  placeholder="Edit your nweet"
                  className="formInput"
                />
                <input
                  type="submit"
                  value="Updata Nweets"
                  className="formBtn"
                />
                <button onClick={toggleEditting} className="formBtn">
                  cancle
                </button>
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
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
