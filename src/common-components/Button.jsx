import React from "react";
import { Button } from "react-bootstrap";

const Buttons = ({ text, className, type, id, onClick, variant }) => {
  return (
    <Button
      variant={variant}
      type={type}
      id={id}
      className={className}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default Buttons;
