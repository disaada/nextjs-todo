import React, { Fragment, memo } from 'react'
import { Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import Select, { components } from 'react-select';

const InputText = (props) => {
  const { Option, SingleValue } = components
  const option = [
    { value: 'very-high', label: 'Very High', color: '#ED4C5C' },
    { value: 'high', label: 'High', color: '#F8A541' },
    { value: 'normal', label: 'Normal', color: '#00A790' },
    { value: 'low', label: 'Low', color: '#428BC1' },
    { value: 'very-low', label: 'Very Low', color: '#8942C1' },
  ];
  return (
    <Controller
      {...props}
      render={({ field: { onChange, value, ref, ...rest } }) => (
        <Form.Group>
          <Form.Label data-cy="modal-add-priority-title">{props.label}</Form.Label>
          <div data-cy="modal-add-priority-dropdown">
          <Select
            inputRef={ref}
            value={option.find(v => v.value === value ?? 'very-high')}
            options={option}
            onChange={(val) => onChange(val.value)}
            onFocus={() => {}}
            components={{ 
              Option: (props) => <Option {...props} ><div data-cy='modal-add-priority-item'><FontAwesomeIcon icon={faCircle} color={props.data.color} /> {props.data.label}</div></Option>,
              SingleValue: (props) => <SingleValue {...props}><FontAwesomeIcon icon={faCircle} color={props.data.color} /> {props.data.label}</SingleValue>,
            }}
          />
          </div>
        </Form.Group>
      )}
    />
  )
}

export default memo(InputText)