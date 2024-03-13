import React, { useState } from "react";
import ContactForm from "../components/ContactForm";
import { sendEmail } from "../utils/send-email";
import { motion } from "framer-motion";

const initValues = { name: "", email: "", message: "" };

export default function Contact() {
  const [state, setState] = useState(initValues);
  const [buttonMessage, setButtonMassege] = useState("Enviar mensaje");

  console.log(state);

  async function onSubmit(event) {
    event.preventDefault();
    sendEmail(state, setButtonMassege);
  }

  return (
    <section>
      <motion.section
        className="contact-root"
        initial={{ clipPath: "inset(0% 0% 100% 0%)", y: "100%" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)", y: "0" }}
        exit={{ clipPath: "inset(100% 0% 0% 0%)", y: "100%" }}
        transition={{ duration: 1 }}
      >
        <div className="contact-header">
          <motion.h1 className="contact-title">Contacto</motion.h1>
          <button
            type="submit"
            onClick={(e) => onSubmit(e)}
            className="input_button"
          >
            {buttonMessage}
          </button>
        </div>

        <div className="contact-form">
          <ContactForm state={state} setState={setState} />
        </div>
      </motion.section>
    </section>
  );
}

{
  /*<div className="contact-icons-root">
        <a
          className="button-top"
          href="https://www.linkedin.com/in/cristianhuijse/"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M216 28H40a12 12 0 0 0-12 12v176a12 12 0 0 0 12 12h176a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12Zm4 188a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h176a4 4 0 0 1 4 4ZM92 112v64a4 4 0 0 1-8 0v-64a4 4 0 0 1 8 0Zm88 28v36a4 4 0 0 1-8 0v-36a24 24 0 0 0-48 0v36a4 4 0 0 1-8 0v-64a4 4 0 0 1 8 0v6.87A32 32 0 0 1 180 140ZM96 84a8 8 0 1 1-8-8a8 8 0 0 1 8 8Z"
            />
          </svg>
        </a>
        <div className="contact-social-divder" />
        <a
          className="button-bottom"
          href="https://github.com/chuijse/"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M203.94 76.16A55.73 55.73 0 0 0 199.46 30a4 4 0 0 0-3.46-2a55.78 55.78 0 0 0-46 24h-28a55.78 55.78 0 0 0-46-24a4 4 0 0 0-3.46 2a55.73 55.73 0 0 0-4.48 46.16A53.78 53.78 0 0 0 60 104v8a52.06 52.06 0 0 0 52 52h1.41A36 36 0 0 0 100 192v12H72a28 28 0 0 1-28-28a36 36 0 0 0-36-36a4 4 0 0 0 0 8a28 28 0 0 1 28 28a36 36 0 0 0 36 36h28v20a4 4 0 0 0 8 0v-40a28 28 0 0 1 56 0v40a4 4 0 0 0 8 0v-40a36 36 0 0 0-13.41-28H160a52.06 52.06 0 0 0 52-52v-8a53.78 53.78 0 0 0-8.06-27.84ZM204 112a44.05 44.05 0 0 1-44 44h-48a44.05 44.05 0 0 1-44-44v-8a45.76 45.76 0 0 1 7.71-24.89a4 4 0 0 0 .53-3.84a47.82 47.82 0 0 1 2.1-39.21a47.8 47.8 0 0 1 38.12 22.1a4 4 0 0 0 3.37 1.84h32.34a4 4 0 0 0 3.37-1.84a47.8 47.8 0 0 1 38.12-22.1a47.82 47.82 0 0 1 2.1 39.21a4 4 0 0 0 .53 3.83A45.85 45.85 0 0 1 204 104Z"
            />
          </svg>
        </a>
      </div> */
}
