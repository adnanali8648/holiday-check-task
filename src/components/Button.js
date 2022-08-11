import React from "react";
import "./Button.css";

const Button = ({ className, text, onClick, type }) => {
  return (
    <>
      <button className={`button ${className}`} type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default Button;
