import React from "react";

import Button from "../Button";

import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

import { ToastContext } from '../ToastProvider';

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function TextArea({ text, setText }) {
  function handleOnChange(event) {
    setText(event.target.value);
  }
  return (
    <>
      <label
        htmlFor="message"
        className={styles.label}
        style={{ alignSelf: "baseline" }}
      >
        Message
      </label>
      <div className={styles.inputWrapper}>
        <textarea
          id="message"
          className={styles.messageInput}
          onChange={handleOnChange}
          value={text}
        />
      </div>
    </>
  );
}

function RadioButtons({ variant, setVariant }) {
  function handleOnChange(event) {
    setVariant(event.target.value);
  }
  return (
    <>
      <div className={styles.label}>Variant</div>
      <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
        {VARIANT_OPTIONS.map((variantOption) => (
          <label key={variantOption} htmlFor={`variant-${variantOption}`}>
            <input
              id={`variant-${variantOption}`}
              type="radio"
              name="variant"
              value={variantOption}
              checked={variant === variantOption}
              onChange={handleOnChange}
            />
            {variantOption}
          </label>
        ))}
      </div>
    </>
  );
}

function ToastPlayground() {
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const { addToast } = React.useContext(ToastContext);


  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log("mmh", message, variant);

    addToast(variant, message);
    setMessage("");
  };

  return (
    <div className={styles.wrapper} onSubmit={handleOnSubmit}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper}>
        <div className={styles.row}>
          <TextArea text={message} setText={setMessage} />
        </div>

        <div className={styles.row}>
          <RadioButtons variant={variant} setVariant={setVariant} />
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>
              Pop Toast!
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
