import React, { useState, memo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap';
import { deleteTodo } from 'api/todo'
import { DeleteDialog } from 'components'

const Container = styled.article`
    background-color: var(--secondary-color);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;

    span {
      margin: 0 20px;
    }

    .card-nav {
      display: flex;
    }
`

const CardTodo = ({ data, handleEdit, handleCheck }) => {
  const [modalDelete, setModalDelete] = useState(false)
  const option = [
    { value: 'very-high', label: 'Very High', color: '#ED4C5C' },
    { value: 'high', label: 'High', color: '#F8A541' },
    { value: 'normal', label: 'Normal', color: '#00A790' },
    { value: 'low', label: 'Low', color: '#428BC1' },
    { value: 'very-low', label: 'Very Low', color: '#8942C1' },
  ];

  return (
    <Container>
      <div className='card-title'>
        <Form.Check
          id={data.id}
          name={data.id}
          type='checkbox'
          style={{ display: 'inline', marginRight: 20 }}
          onClick={() => handleCheck(data.id, { is_active: data.is_active === 1 ? 0 : 1 })}
          checked={data?.is_active === 0}
          data-cy="todo-item-checkbox"
        />
        <FontAwesomeIcon icon={faCircle} color={(option.find(v => v.value === data.priority))?.color} data-cy="todo-item-priority-indicator" />
        <span style={{ textDecoration: data.is_active === 1 ? 'none' : 'line-through' }} data-cy="todo-item-title">{data?.title}</span>
        <FontAwesomeIcon icon={faPencilAlt} onClick={() => handleEdit(data.id)} data-cy="todo-item-edit-button" />
      </div>
      <div className='card-nav'>
        <span><FontAwesomeIcon icon={faTrashAlt} onClick={() => setModalDelete(true)} data-cy="todo-item-delete-button" /></span>
      </div>
      <DeleteDialog
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        title={data.title}
        id={data.id}
        type="item"
        fn={deleteTodo}
        queryname="activity"
      />
    </Container>
  )
}

export default memo(CardTodo)