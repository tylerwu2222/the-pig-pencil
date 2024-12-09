import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/database";

import "./NewsletterForm.css";

const possibleOptions = ["art", "code", "data", "writing"];

export default function NewsletterFormOld() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [selectedOptions, setSelectedOptions] = useState(possibleOptions); // default is all options
  const [unselectedOptions, setUnselectedOptions] = useState([]); // default is no options
  // const [updateMessage, setUpdateMessage] = useState(''); // default is no options
  const [submitText, setSubmitText] = useState("Subscribe");

  const updateFirebase = (
    databaseRef,
    childName,
    addRemove = "add",
    value = email,
  ) => {
    const childRef = databaseRef.child(childName); // select category
    if (addRemove == "add") {
      childRef
        .orderByValue()
        .equalTo(value)
        .once("value")
        .then((snapshot) => {
          // only push value if not already in node
          if (!snapshot.exists()) {
            childRef.push(value);
          }
        });
    } else if (addRemove == "remove") {
      childRef
        .orderByValue()
        .equalTo(value)
        .once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const valueKey = childSnapshot.key;
            const valueRef = childRef.child(valueKey);
            valueRef.remove();
          });
        });
    }
  };

  const handleInputChange = (event) => {
    setEmail(event.target.value);
    setMessage("");
    setMessageType("success");
  };

  // change submit text to unsub if no options selected
  useEffect(() => {
    if (!selectedOptions.length) {
      setSubmitText("Unsubscribe");
      // setSelectedOptions(possibleOptions);
    } else {
      setSubmitText("Subscribe");
      // setSelectedOptions();
    }
  }, [selectedOptions]);

  const handleCheckboxChange = (event) => {
    const option = event.target.value;
    const isChecked = event.target.checked;

    // add checked options
    if (isChecked) {
      setSelectedOptions((prevOptions) => [...prevOptions, option]); // add checked option to selected
      setUnselectedOptions(
        (prevOptions) =>
          prevOptions.filter((prevOption) => prevOption !== option), // remove checked option from unselected
      );
    }
    // remove checked options
    else {
      setSelectedOptions(
        (prevOptions) =>
          prevOptions.filter((prevOption) => prevOption !== option), // remove unchecked option from selected
      );
      setUnselectedOptions((prevOptions) => [...prevOptions, option]); // add unchecked option to unselected
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // (1) check if email has valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setMessage("Hmm.. you didn't enter an email 🤔");
      setMessageType("error");
      return;
    } else if (!email || !emailPattern.test(email)) {
      setMessage("That's not a valid email address 😐");
      setMessageType("error");
      return;
    }

    // (2) save/update email to Firebase Realtime Database
    const database = firebase.database();
    const emailsRef = database.ref("emails");

    // (2a) check if email is already in master for updating vs adding (only relevant for messaging)
    const masterEmailsRef = emailsRef.child("master"); // select category

    // (2b) remove all unselected options
    unselectedOptions.map((option) => {
      updateFirebase(emailsRef, option, "remove", email);
    });

    // (2c) add all selected options
    // (2c-i) if no options selected, also remove email from master (unsubscribing)
    if (selectedOptions.length == 0) {
      updateFirebase(emailsRef, "master", "remove", email);
      setMessage(
        <>
          <b>{email}</b> has been removed from the mailing list. Sorry to see
          you go 🥲
        </>,
      );
      setMessageType("success");
    }
    // (2c-ii) else, add email to selected options and master
    else {
      selectedOptions.map((option) => {
        updateFirebase(emailsRef, option, "add", email);
      });
      updateFirebase(emailsRef, "master", "add", email);
      masterEmailsRef
        .orderByValue()
        .equalTo(email)
        .once("value")
        .then((snapshot) => {
          if (snapshot.exists()) {
            selectedOptions.sort();
            setMessage(
              <>
                <b>{email}</b>, your subscription has been updated to include:{" "}
                {selectedOptions.map((o) => {
                  return (
                    <>
                      <br />- {o}
                    </>
                  );
                })}
              </>,
            );
          } else {
            setMessage(
              <>
                <b>{email}</b> has been added to the mailing list 😎 You will be
                notified about the following categories:{" "}
                {selectedOptions.map((o) => {
                  return (
                    <>
                      <br />- {o}
                    </>
                  );
                })}
              </>,
            );
          }
          setMessageType("success");
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          placeholder="gimme your email >:)"
          value={email}
          onChange={handleInputChange}
        />
        <div className="newsletter-options-div">
          {possibleOptions.map((o, i) => {
            return (
              <div key={i} className="newsletter-option-div">
                <label>
                  <input
                    type="checkbox"
                    value={o}
                    checked={selectedOptions.includes(o)}
                    onChange={handleCheckboxChange}
                  />
                  {o}
                </label>
              </div>
            );
          })}
        </div>
        <button type="submit">{submitText}</button>
      </form>
      {message && (
        <div
          className={
            messageType == "success"
              ? "newsletter-message-div newsletter-success-div"
              : "newsletter-message-div newsletter-error-div"
          }
        >
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
