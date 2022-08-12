import React from 'react'
import { Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';

const InputText = (props) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <Form.Group>
          <Form.Label data-cy="modal-add-name-title">{props.label}</Form.Label>
          <Form.Control {...field} {...props} data-cy="modal-add-name-input" />
        </Form.Group>
      )}
    />
  )
}

export default InputText