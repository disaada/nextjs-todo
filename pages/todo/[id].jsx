/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Layout, Nav as Section, Button, CardTodo, Dialog } from "components";
import Image from "next/image";
import { getActivityDetail, createTodo, updateActivity, updateTodo } from "api/todo";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from "next/router";
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import styled from 'styled-components'

const Div = styled.div`
  display: flex;
  align-items: center;
`

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [modalShow, setModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false)
  const [defaultValue, setDefaultValue] = useState({})
  const { data, isSuccess } = useQuery(['activity'], () => getActivityDetail(id), { enabled: router.isReady })
  const onSuccess = () => {
    setModalShow(false)
    setEditModalShow(false)
    setDefaultValue({})
    queryClient.invalidateQueries(['activity'])
  }
  const { mutate } = useMutation(createTodo, { onSuccess })
  const { mutate: mutateEdit } = useMutation(updateTodo, { onSuccess })
  const onSubmit = data => mutate({ activity_group_id: id, ...data });
  const onEdit = (id, data) => mutateEdit({ id, params: data });
  const handleChangeTitle = () => {
    if (editTitle && (title !== data?.data?.title)) updateActivity(id, { title })
    setEditTitle(!editTitle)
  }
  const handleEdit = (id) => {
    const find = data?.data?.todo_items?.find(v => v.id === id) || null
    if (find) {
      setDefaultValue(find)
      setEditModalShow(true)
    }
  }

  useEffect(() => {
    isSuccess && setTitle(data?.data?.title)
  }, [])

  return (
    <Layout>
      <Section>
        <Div>
          <Link href="/">
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
          <span>
            {!editTitle && data?.data?.title}
            {editTitle && (<Form.Control className='inline-input' value={title} onChange={(evt) => setTitle(evt.target.value)} />)}
          </span>
          <FontAwesomeIcon icon={faPencilAlt} onClick={handleChangeTitle} />
        </Div>
        <Button onClick={() => setModalShow(true)}>tambah</Button>
      </Section>
      <section>
        {data?.data?.todo_items?.length <= 0 && (
          <Image
            src="/icon/todo-empty-state.svg"
            width={300}
            height={300}
            layout="responsive"
            alt=""
            style={{ maxWidth: '100px' }}
          />
        )}
        <Form>
          {data?.data?.todo_items?.length > 0
            && data?.data?.todo_items?.map((v, idx) => (
              <CardTodo data={v} key={v + idx} handleEdit={handleEdit} handleCheck={onEdit} />
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
