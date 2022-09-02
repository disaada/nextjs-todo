/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import { DeleteDialog, SuccessDeleteModal } from 'components'
import { deleteActivity } from 'api/todo'
import { useQueryClient } from '@tanstack/react-query'

const Container = styled.article`
    background-color: var(--secondary-color);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    width: 235px;
    height: 235px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .card-title {
      flex: 1;
      cursor: pointer;
      font-size: 18px;
    }

    .card-nav {
      display: flex;
      justify-content: space-between;
      color: var(--tertiary-text-color);
      font-size: 14px;
    }

    &:hover {
      box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.3);
    }
`

const Card = ({ data }) => {
  const [modalDelete, setModalDelete] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [button, setButton] = useState('')
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!modalDelete && button === 'hapus') {
      setSuccessModal(true)
    }
  }, [modalDelete, button])

  return (
    <Container data-cy="activity-item">
      <Link href={`/todo/${data.id}`}>
        <div className='card-title' data-cy="activity-item-title">{data?.title}</div>
      </Link>
      <div className='card-nav'>
        <span data-cy="activity-item-date">{dayjs(data?.created_at).format('DD MMMM YYYY')}</span>
        <span>
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => setModalDelete(true)}
            data-cy="activity-item-delete-button"
            className='fa-icon'
          />
        </span>
      </div>
      <DeleteDialog
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        title={data.title}
        id={data.id}
        type="activity"
        fn={deleteActivity}
        setbutton={setButton}
      />
      <SuccessDeleteModal
        show={successModal}
        onHide={() => {
          successModal && queryClient.invalidateQueries(["activity-group"])
          setSuccessModal(false)
        }}
      />
    </Container>
  )
}

export default Card