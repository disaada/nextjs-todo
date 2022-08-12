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
  const { mutate } = useMutation(props.fn, {
    onSuccess: () => {
      props.onHide()
      if (props.queryname !== "activity-group") {
        queryClient.invalidateQueries([props.queryname])
      }
    }
  })

  return (
    <Modal
      centered
      data-cy="modal-delete"
      {...props}
    >
      <Modal.Body>
        <ModalContainer>
          <div>
            <Image src='/icon/modal-delete-icon.svg' width={100} height={100} alt="" data-cy="modal-delete-icon" />
          </div>
          <div className='modal-desc' data-cy="modal-delete-title">
            Apakah anda yakin menghapus {props.type} <b>&quot;{props.title}&quot;</b>?
          </div>
          <div className="modal-button">
            <Button
              onClick={() => {
                props?.setbutton && props.setbutton('batal')
                props.onHide()
              }}
              data-cy="modal-delete-cancel-button"
              cancel
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                props?.setbutton && props.setbutton('hapus')
                mutate(props.id)
              }}
              data-cy="modal-delete-confirm-button"
              delete
            >
              Hapus
            </Button>
          </div>
        </ModalContainer>
      </Modal.Body>
    </Modal>
  )
}

export default DialogDelete