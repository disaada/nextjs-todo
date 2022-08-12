/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Layout, Nav as Section, Button, CardTodo, Dialog } from "components";
import Image from "next/image";
import { getActivityDetail, createTodo, updateActivity, updateTodo } from "api/todo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from "next/router";
import { Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import styled from 'styled-components'
import _ from 'lodash'

const Div = styled.div`
  display: flex;
  align-items: center;

  .todo-title {
    max-width: clamp(300px, 50vw, 500px);
  }

  @media screen and (max-width: 550px) {
    .todo-title {
      max-width: 100vw;
    }
  }
`

const TodoSection = styled.section`
  img {
    cursor: pointer;
  }
  
  .todo-empty-state {
    text-align: center;
  }
`

const Sort = (props) => {
  const handleSort = (type) => {
    props.setSortby(type)
    props.setSortShow(!props.sortShow)
  }

  return (
    <div>
      <Image
        src="/icon/todo-sort-button.svg"
        width={50}
        height={50}
        alt=""
        onClick={() => props.setSortShow(!props.sortShow)}
        data-cy="todo-sort-button"
        className="fa-icon"
      />

      <Dropdown.Menu show={props.sortShow} data-cy="sort-parent">
        <Dropdown.Item onClick={() => handleSort('new')} data-cy="sort-selection">
          <Image
            src="/icon/sort-newest.svg"
            width={24}
            height={24}
            alt=""
          />
          <span className='dropdown-icon'>Terbaru</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('old')} data-cy="sort-selection">
          <Image
            src="/icon/sort-oldest.svg"
            width={24}
            height={24}
            alt=""
          />
          <span className='dropdown-icon'>Terlama</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('az')} data-cy="sort-selection">
          <Image
            src="/icon/sort-az.svg"
            width={24}
            height={24}
            alt=""
          />
          <span className='dropdown-icon'>A-Z</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('za')} data-cy="sort-selection">
          <Image
            src="/icon/sort-za.svg"
            width={24}
            height={24}
            alt=""
          />
          <span className='dropdown-icon'>Z-A</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('unfinished')} data-cy="sort-selection">
          <Image
            src="/icon/sort-unfinished.svg"
            width={24}
            height={24}
            alt=""
          />
          <span className='dropdown-icon'>Belum Selesai</span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);
  const [sortby, setSortby] = useState('new');
  const [sortedData, setSortedData] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false)
  const [defaultValue, setDefaultValue] = useState({})
  const { data } = useQuery(['activity'], () => getActivityDetail(id), { enabled: router.isReady })
  const onSuccess = () => {
    setModalShow(false)
    setEditModalShow(false)
    setDefaultValue({})
    queryClient.invalidateQueries(['activity'])
  }
  const { mutate } = useMutation(createTodo, { onSuccess })
  const { mutate: mutateEdit } = useMutation(updateTodo, { onSuccess })
  const { mutate: mutateTitle } = useMutation(updateActivity, { onSuccess })
  const onSubmit = data => mutate({ activity_group_id: id, ...data });
  const onEdit = (data, id) => mutateEdit({ id, params: data });
  const handleChangeTitle = () => {
    if (title !== data?.data?.title) mutateTitle({ id, params: { title } })
  }
  const handleEdit = (id) => {
    const find = data?.data?.todo_items?.find(v => v.id === id) || null
    if (find) {
      setDefaultValue(find)
      setEditModalShow(true)
    }
  }

  useEffect(() => {
    data && setTitle(data?.data?.title)
  }, [data])

  useEffect(() => {
    let res = []

    if (sortby === 'old') res = _.sortBy(data?.data?.todo_items, ['id'])
    else if (sortby === 'az') res = _.sortBy(data?.data?.todo_items, ['title'])
    else if (sortby === 'za') res = _.sortBy(data?.data?.todo_items, ['title']).reverse()
    else if (sortby === 'unfinished') res = _.sortBy(data?.data?.todo_items, ['is_active']).reverse()
    else res = data?.data?.todo_items

    res?.length > 0 && setSortedData([...res])
  }, [data, sortby])

  return (
    <Layout>
      <Section>
        <Div>
          <Link href="/">
            <FontAwesomeIcon icon={faAngleLeft} data-cy="todo-back-button" className="nav-title fa-icon" />
          </Link>
          <span data-cy="todo-title" className='todo-title' >
            {!editTitle && (<span onClick={() => setEditTitle(!editTitle)} className="nav-title" > {data?.data?.title} </span>)}
            {editTitle
              && (
                <Form.Control
                  autoFocus
                  className='inline-input'
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                  onBlur={() => {
                    handleChangeTitle()
                    setEditTitle(!editTitle)
                  }}
                />
              )}
          </span>
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => {
              handleChangeTitle()
              setEditTitle(!editTitle)
            }}
            style={{ color: 'var(--tertiary-text-color)' }}
            data-cy="todo-title-edit-button"
            className='fa-icon'
          />
        </Div>
        <div className='nav-button'>
          {sortedData?.length > 0
            && (
              <Sort
                sortShow={sortShow}
                setSortShow={setSortShow}
                setSortby={setSortby}
              />
            )}
          <Button
            onClick={() => setModalShow(true)}
            data-cy="todo-add-button"
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />
            Tambah
          </Button>
        </div>
      </Section>
      <TodoSection>
        <div className="todo-empty-state">
          {sortedData?.length <= 0 && (
            <Image
              src="/icon/todo-empty-state.svg"
              width={500}
              height={500}
              layout="intrinsic"
              alt=""
              data-cy="todo-empty-state"
              onClick={() => setModalShow(true)}
            />
          )}
        </div>
        <Form data-cy="sort-selection">
          {sortedData?.length > 0
            && [...sortedData]?.map((v, idx) => (
              <CardTodo data={v} key={v + idx} handleEdit={handleEdit} handleCheck={onEdit} data-cy={"todo-item-" + idx} />
            ))}
        </Form>
      </TodoSection>
      {defaultValue?.id && (
        <Dialog
          show={editModalShow}
          onHide={() => {
            setEditModalShow(false)
            setDefaultValue({})
          }}
          onSubmit={onEdit}
          defaultvalues={defaultValue}
          type="Edit"
        />
      )}
      <Dialog
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={onSubmit}
        defaultvalues={{
          title: '',
          priority: 'very-high'
        }}
        type="Tambah"
      />
    </Layout>
  );
}
