import React, { useState, useEffect } from "react";

import "./NewsletterForm.css";

const possibleOptions = ["art", "data", "learning", "writing"];

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [selectedOptions, setSelectedOptions] = useState(possibleOptions); // default is all options
  // const [unselectedOptions, setUnselectedOptions] = useState([]); // default is no options
  // const [updateMessage, setUpdateMessage] = useState(''); // default is no options
  const [submitText, setSubmitText] = useState("Subscribe");

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
      // setUnselectedOptions((prevOptions) =>
      //     prevOptions.filter((prevOption) => prevOption !== option) // remove checked option from unselected
      // );
    }
    // remove checked options
    else {
      setSelectedOptions(
        (prevOptions) =>
          prevOptions.filter((prevOption) => prevOption !== option), // remove unchecked option from selected
      );
      // setUnselectedOptions((prevOptions) => [...prevOptions, option]) // add unchecked option to unselected
    }
  };

  return (
    <>
      <form
        action="https://thepigpencil.us12.list-manage.com/subscribe/post"
        method="POST"
      >
        <input type="hidden" name="u" value="b3dc38c8b882fbd7e2098b52f" />
        <input type="hidden" name="id" value="d2c816db29" />
        <label htmlFor="MERGE0" style={{ marginRight: "0.3em" }}>
          Email:
        </label>
        <input
          type="email"
          placeholder="gimme your email >:)"
          autocapitalize="off"
          autocorrect="off"
          name="MERGE0"
          id="MERGE0"
          value={email}
          onChange={handleInputChange}
        ></input>
        <div className="newsletter-options-div">
          {possibleOptions.map((o, i) => {
            console.log("mailchump", i, o);
            return (
              <div key={i} className="newsletter-option-div">
                <label>
                  <input
                    type="checkbox"
                    id={"group_" + String(Math.pow(2, i))}
                    name={"group[54458][" + String(Math.pow(2, i)) + "]"}
                    value={o}
                    checked={selectedOptions.includes(o)}
                    onChange={handleCheckboxChange}
                    class="av-checkbox"
                  ></input>
                  {o}
                </label>
              </div>
            );
          })}
        </div>
        <input type="submit" name="submit" value={submitText} />
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
