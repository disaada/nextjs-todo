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
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type} List Item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <InputText control={control} name="title" label="NAMA LIST ITEM" />
          <InputSelect control={control} name="priority" label="PRIORITY" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit((data) => {
            reset()
            props.onSubmit(props.defaultvalues.id, data)
          })}
          disabled={!watch('title')}>Simpan</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Dialog