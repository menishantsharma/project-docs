import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDocument } from "../../store";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(10);
  const dispatch = useDispatch();
  const docs = useSelector((state) => state.document.documents);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setDocuments(docs);
  }, [docs]);

  console.log(documents);

  const deleteDocumentHandler = (e) => {
    setLoading(true);
    dispatch(deleteDocument(e.target.id));
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  // Get current documents
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(documents.length / documentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div>
          {currentDocuments.map(({ id, title, body }) => (
            <div key={id}>
              <h3>{title}</h3>
              <Link to={`/documents/${id}`}>View</Link>
              <button id={id} onClick={deleteDocumentHandler}>
                Delete
              </button>
            </div>
          ))}

          {documents.length === 0 && <p>No document found</p>}
          <ul>
            {pageNumbers.map((number) => (
              <span key={number}>
                <button onClick={() => paginate(number)}>{number}</button>
              </span>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Documents;
