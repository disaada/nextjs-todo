import React from 'react'
import { Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';

const InputText = (props) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <Form.Group>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control {...field} />
        </Form.Group>
      )}
    />
  )
}

export default InputText