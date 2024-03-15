import React, { useState } from "react";

export default function ContactForm({ state, setState, onSubmit }) {
  const textAreaHandleChange = (event) => {
    setState({ ...state, message: event.target.value });
  };

  const userNameHandle = (event) => {
    setState({ ...state, name: event.target.value });
  };

  const emailHandler = (event) => {
    setState({ ...state, email: event.target.value });
  };

  const contactFormData = [
    {
      className: "input_half",
      htmlFor: "user_name",
      label: "Nombre",
      inputType: "text",
      inputName: "user_name",
      required: true,
      placeholder: "Tu nombre*",
      onChange: userNameHandle,
      textarea: false,
      stateName: "name",
    },
    {
      className: "input",
      htmlFor: "user_mail",
      label: "Email",
      inputType: "email",
      inputName: "user_mail",
      required: true,
      placeholder: "Tu mail*",
      onChange: emailHandler,
      textarea: false,
      stateName: "email",
    },
    {
      className: "input_textarea",
      htmlFor: "message",
      label: "Mensaje",
      inputType: "text",
      inputName: "message",
      required: true,
      placeholder: "Tu mensaje*",
      onChange: textAreaHandleChange,
      textarea: true,
      stateName: "message",
    },
  ];

  return (
    <form className="contact-form" autoComplete="off" onSubmit={onSubmit}>
      {contactFormData.map((data) => (
        <InputForm
          key={`input-form-${data.label}`}
          inputStyle={data.className}
          htmlFor={data.htmlFor}
          label={data.label}
          inputType={data.inputType}
          inputName={data.inputName}
          required={data.required}
          placeholder={data.placeholder}
          onChange={data.onChange}
          textarea={data.textarea}
          state={state}
          stateName={data.stateName}
        />
      ))}
    </form>
  );
}

function InputForm({
  inputStyle,
  htmlFor,
  label,
  inputType,
  inputName,
  required,
  placeholder,
  onChange,
  textarea,
  state,
  stateName,
}) {
  const [isActive, setActive] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [isLabel, setLabel] = useState(true);

  return (
    <div
      key={`input-form-${label}`}
      className={inputStyle}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {textarea ? (
        <div className="input-container">
          <label htmlFor={htmlFor}>
            <span
              className={`selected-input-label-textarea ${
                !isLabel ? "able" : "disabled"
              } primary ${
                isActive || isFocus ? "selected-input-active" : null
              } }`}
            >
              {label}
            </span>
            <span
              className={`inputLabel ${isLabel ? "able" : "disabled"} ${
                isActive || isFocus ? "primary text-active" : null
              }`}
            >
              {placeholder}
            </span>
          </label>
          <div className="textarea-container">
            <textarea
              id={htmlFor}
              className={isActive || isFocus ? "textarea-active" : null}
              type={inputType}
              name={inputName}
              required={required}
              onChange={(e) => onChange(e)}
              onFocus={() => {
                setFocus(true), setLabel(false);
              }}
              onBlur={() => {
                state[stateName] === "" && setLabel(true), setFocus(false);
              }}
            />
          </div>
        </div>
      ) : (
        <div className="input-container">
          <label htmlFor={htmlFor}>
            <span
              className={`selected-input-label ${
                !isLabel ? "able" : "disabled"
              } primary ${
                isActive || isFocus ? "selected-input-active" : null
              } }`}
            >
              {label}
            </span>
            <span
              className={`inputLabel ${isLabel ? "able" : "disabled"} ${
                isActive || isFocus ? "primary text-active" : null
              }`}
            >
              {placeholder}
            </span>
          </label>
          <input
            className={isActive || isFocus ? "text-active" : null}
            id={htmlFor}
            type={inputType}
            name={inputName}
            required={required}
            onChange={(e) => onChange(e)}
            onFocus={() => {
              setFocus(true), setLabel(false);
            }}
            onBlur={() => {
              state[stateName] === "" && setLabel(true), setFocus(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
