import React from "react";
import { Form } from "react-bootstrap";

const InputWithLabel = ({onChange, value, id, label, type, placeholder, name, className,validationMsg}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control className={className} type={type} placeholder={placeholder} value={value} onChange={onChange} id={id} name={name} />
      {validationMsg && <div className="text-danger">{validationMsg}</div>}
    </Form.Group>
  );
};

export default InputWithLabel;
