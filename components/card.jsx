import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import { DeleteDialog } from 'components'
import { deleteActivity } from 'api/todo'

const Container = styled.article`
    background-color: var(--secondary-color);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    width: 235px;
    height: 235px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .card-title {
      flex: 1;
    }

    .card-nav {
      display: flex;
      justify-content: space-between;
    }
`

const Card = ({ data }) => {
  const [modalDelete, setModalDelete] = useState(false)

  return (
    <Link href={`/todo/${data.id}`}>
      <Container>
        <div className='card-title'>{data?.title}</div>
        <div className='card-nav'>
          <span>{dayjs(data?.created_at).format('DD MMMM YYYY')}</span>
          <span><FontAwesomeIcon icon={faTrashAlt} /></span>
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
      </Container>
    </Link>
  )
}

export default Card