/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Layout, Nav as Section, Button, CardTodo, Dialog } from "components";
import Image from "next/image";
import { getActivityDetail, createTodo, updateActivity, updateTodo } from "api/todo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from "next/router";
import { Form, Dropdown, Image as BootImage } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import styled from 'styled-components'
import _ from 'lodash'

const Div = styled.div`
  display: flex;
  align-items: center;
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
      />

      <Dropdown.Menu show={props.sortShow} data-cy="sort-parent">
        <Dropdown.Item onClick={() => handleSort('new')} data-cy="sort-latest">
          <Image
            src="/icon/sort-newest.svg"
            width={24}
            height={24}
            alt=""

          />
          Terbaru
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('old')} data-cy="sort-oldest">
          <Image
            src="/icon/sort-oldest.svg"
            width={24}
            height={24}
            alt=""

          />
          Terlama
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('az')} data-cy="sort-az">
          <Image
            src="/icon/sort-az.svg"
            width={24}
            height={24}
            alt=""

          />
          A-Z
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('za')} data-cy="sort-za">
          <Image
            src="/icon/sort-za.svg"
            width={24}
            height={24}
            alt=""

          />
          Z-A
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handleSort('unfinished')} data-cy="sort-unfinished">
          <Image
            src="/icon/sort-unfinished.svg"
            width={24}
            height={24}
            alt=""

          />
          Belum Selesai
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
            <FontAwesomeIcon icon={faAngleLeft} data-cy="todo-back-button" />
          </Link>
          <span data-cy="todo-title" >
            {!editTitle && (<span onClick={() => setEditTitle(!editTitle)}>{data?.data?.title}</span>)}
            {editTitle && (<Form.Control className='inline-input' value={title} onChange={(evt) => setTitle(evt.target.value)} />)}
          </span>
          <FontAwesomeIcon icon={faPencilAlt} onClick={() => {
            handleChangeTitle()
            setEditTitle(!editTitle)
            }} data-cy="todo-title-edit-button" />
        </Div>
        <div>
          <Sort sortShow={sortShow} setSortShow={setSortShow} setSortby={setSortby} />
          <Button onClick={() => setModalShow(true)} data-cy="todo-add-button">tambah</Button>
        </div>
      </Section>
      <section>
        {sortedData?.length <= 0 && (
          <Image
            src="/icon/todo-empty-state.svg"
            width={300}
            height={300}
            layout="responsive"
            alt=""
            style={{ maxWidth: '100px' }}
            data-cy="todo-empty-state"
          />
        )}
        <Form>
          {sortedData?.length > 0
            && [...sortedData]?.map((v, idx) => (
              <CardTodo data={v} key={v + idx} handleEdit={handleEdit} handleCheck={onEdit} data-cy={"todo-item-"+idx} />
            ))}
        </Form>
      </section>
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
