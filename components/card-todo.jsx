import React, { useState, memo, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPencilAlt, faCircle } from '@fortawesome/free-solid-svg-icons'
import { Form } from 'react-bootstrap';
import { deleteTodo } from 'api/todo'
import { DeleteDialog, SuccessDeleteModal } from 'components'
import { useQueryClient } from '@tanstack/react-query'

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

    .todo-card-icon {
      color: var(--tertiary-text-color);
    }
`

const CardTodo = ({ data, handleEdit, handleCheck }) => {
  const [modalDelete, setModalDelete] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [button, setButton] = useState('')
  const queryClient = useQueryClient()
  const option = [
    { value: 'very-high', label: 'Very High', color: '#ED4C5C' },
    { value: 'high', label: 'High', color: '#F8A541' },
    { value: 'normal', label: 'Normal', color: '#00A790' },
    { value: 'low', label: 'Low', color: '#428BC1' },
    { value: 'very-low', label: 'Very Low', color: '#8942C1' },
  ];

  useEffect(() => {
    if (!modalDelete && button === 'hapus') {
      setSuccessModal(true)
    }
  }, [modalDelete, button])

  return (
    <Container data-cy="todo-item">
      <div className='card-title'>
        <Form.Check
          id={data.id}
          name={data.id}
          type='checkbox'
          style={{ display: 'inline', marginRight: 20 }}
          onClick={() => handleCheck({ is_active: data.is_active === 1 ? 0 : 1 }, data.id)}
          checked={data?.is_active === 0}
          data-cy="todo-item-checkbox"
        />
        <FontAwesomeIcon
          icon={faCircle}
          color={(option.find(v => v.value === data.priority))?.color}
          data-cy="todo-item-priority-indicator"
        />
        <span
          style={{ 
            textDecoration: data.is_active === 1 ? 'none' : 'line-through',
            color:  data.is_active === 1 ? 'var(--primary-text-color)' : 'var(--tertiary-text-color)'
          }}
          data-cy="todo-item-title"
          className="todo-card-title">
          {data?.title}
        </span>
        <FontAwesomeIcon
          icon={faPencilAlt}
          onClick={() => handleEdit(data.id)}
          data-cy="todo-item-edit-button"
          className="todo-card-icon fa-icon"
        />
      </div>
      <div className='card-nav'>
        <span>
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => setModalDelete(true)}
            data-cy="todo-item-delete-button"
            className="todo-card-icon fa-icon"
          />
        </span>
      </div>
      <DeleteDialog
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        title={data.title}
        id={data.id}
        type="item"
        fn={deleteTodo}
        setbutton={setButton}
      />
      <SuccessDeleteModal
        show={successModal}
        onHide={() => {
          successModal && queryClient.invalidateQueries(["activity"])
          setSuccessModal(false)
        }}
      />
    </Container>
  )
}

export default memo(CardTodo)