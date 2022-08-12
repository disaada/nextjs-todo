import { Modal, Form } from 'react-bootstrap';
import { Button, InputText, InputSelect } from "components";
import { useForm } from "react-hook-form";

const Dialog = (props) => {
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: props.defaultvalues
  });

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => {
        reset()
        props.onHide()
      }}
      {...props}
      data-cy="modal-add"
    >
      <Modal.Header closeButton data-cy="modal-add-close-button">
        <Modal.Title data-cy="modal-add-title">
          {props.type} List Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputText control={control} name="title" label="NAMA LIST ITEM" placeholder="Tambahkan nama list item" />
          <InputSelect control={control} name="priority" label="PRIORITY" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit((data) => {
            reset()
            props.onSubmit(data, props.defaultvalues.id)
          })}
          disabled={!watch('title')}
          data-cy="modal-add-save-button"
        >Simpan</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Dialog