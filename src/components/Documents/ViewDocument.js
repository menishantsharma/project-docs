import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { deleteDocument } from "../../store";

const getDocument = (documents, id) => {
  return documents.filter((document) => document.id === id)[0];
};

const ViewDocument = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const id = parseInt(history.location.pathname.split("/")[2]);
  const documents = useSelector((state) => state.document.documents);
  const document = getDocument(documents, id);

  const deleteDocumentHandler = (e) => {
    setLoading(true);
    dispatch(deleteDocument(e.target.id));
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  return (
    <>
      {!document && <p>No such document exist</p>}
      {document && (
        <div>
          <h2>{document.title}</h2>
          <p>{document.body}</p>
          <button onClick={deleteDocumentHandler}>Delete</button>
        </div>
      )}
    </>
  );
};

export default ViewDocument;
