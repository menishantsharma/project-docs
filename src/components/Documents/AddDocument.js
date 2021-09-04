import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addDocument } from "../../store";

const AddDocument = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [isFormValid, setFormValid] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.title !== "" && formData.body !== "") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [formData.title, formData.body]);

  const inputChangeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const { title, body } = formData;
    setLoading(true);
    dispatch(addDocument(title, body));
    setTimeout(() => {
      setLoading(false);
      history.push("/dashboard");
    }, 5000);
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <form onSubmit={formSubmitHandler}>
          <label htmlFor="title">Title</label>
          <input
            value={formData.title}
            onChange={inputChangeHandler}
            type="title"
            id="title"
            name="title"
          />

          <textarea
            name="body"
            id="body"
            value={formData.body}
            onChange={inputChangeHandler}
            cols="30"
            rows="10"
            placeholder="Write something here..."
          ></textarea>

          <button type="submit" disabled={!isFormValid}>
            Add
          </button>
        </form>
      )}
    </>
  );
};

export default AddDocument;
