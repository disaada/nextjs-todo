/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faCircleExclamation } from '@fortawesome/free-regular-svg-icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import { DeleteDialog } from 'components'
import { deleteActivity } from 'api/todo'
import { Modal } from 'react-bootstrap';
import Image from 'next/image'

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
    }

    .card-nav {
      display: flex;
      justify-content: space-between;
    }
`

const SuccessDeleteModal = (props) => (
  <Modal
    centered
    data-cy="modal-information"
    {...props}
  >
    <Modal.Body>
      <Image
        src="/icon/modal-information-icon.svg"
        width={30}
        height={30}
        alt=""
        data-cy="modal-information-icon"
      />
      <span data-cy="modal-information-title">
      Activity berhasil dihapus
      </span>
    </Modal.Body>
  </Modal>
)

const Card = ({ data }) => {
  const [modalDelete, setModalDelete] = useState(false)
  const [successModal, setSuccessModal] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!modalDelete && count === 1) {
      setSuccessModal(true)
      setCount(0)
    }
  }, [modalDelete])

  return (
    <Container>
      <Link href={`/todo/${data.id}`}>
        <div className='card-title' data-cy="activity-item-title">{data?.title}</div>
      </Link>
      <div className='card-nav'>
        <span data-cy="activity-item-date">{dayjs(data?.created_at).format('DD MMMM YYYY')}</span>
        <span>
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => {
              setCount(1)
              setModalDelete(true)
            }}
            data-cy="activity-item-delete-button"
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
        queryname="activity-group"
      />
      <SuccessDeleteModal
        show={successModal}
        onHide={() => setSuccessModal(false)}
      />
    </Container>
  )
}

export default Card