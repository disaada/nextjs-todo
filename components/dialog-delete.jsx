import { Modal } from 'react-bootstrap';
import styled from 'styled-components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from "components";
import Image from 'next/image';

const ModalContainer = styled.div`
  padding: 20px;
  text-align: center;

  .modal-desc {
    margin: 20px 0;
  }

  .modal-button button {
    margin: 0 10px;
  }
`

const DialogDelete = (props) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(props.fn, { onSuccess: () => {
    props.onHide()
    queryClient.invalidateQueries([props.queryname])
  } })

  return (
  <Modal
    aria-labelledby="contained-modal-title-vcenter"
    centered
    {...props}
  >
    <Modal.Body>
      <ModalContainer>
        <div>
          <Image src='/icon/modal-delete-icon.svg' width={100} height={100} alt="" />
        </div>
        <div className='modal-desc'>
          Apakah anda yakin menghapus {props.type} <b>&quot;{props.title}&quot;</b>?
        </div>
        <div className="modal-button">
          <Button onClick={props.onHide}>Batal</Button>
          <Button onClick={() => mutate(props.id)}>Hapus</Button>
        </div>
      </ModalContainer>
    </Modal.Body>
  </Modal>
)}

export default DialogDelete