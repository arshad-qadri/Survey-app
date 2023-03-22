import React from "react";
import { Form } from "react-bootstrap";

const Selector = ({ placeholder, options, onChange, label, value, className, name, disabled, validationMsg }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
    <Form.Select aria-label="Default select example" disabled={disabled}  className={className}  onChange={onChange} value={value} name={name} >
      <option value={""}>{placeholder}</option>
      {options && options?.length > 0 ? (
        options.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.value}
          </option>
        ))
      ) : (
        <option>Not found</option>
      )}
      {/* <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option> */}
    </Form.Select>
    {validationMsg &&<div className="text-danger" >{validationMsg}</div>}
      </Form.Group>
  );
};

export default Selector;
