import Image from 'next/image'
import { Modal } from 'react-bootstrap';

const SuccessDeleteModal = (props) => {
  return (
  <Modal
    centered
    data-cy="modal-information"
    aria-labelledby="succes-delete-modal"
    id="succes-delete-modal"
    {...props}
  >
    <Modal.Body className="modal-success-delete">
      <Image
        src="/icon/modal-information-icon.svg"
        width={30}
        height={30}
        alt=""
        data-cy="modal-information-icon"
      />
      <span data-cy="modal-information-title" className='dropdown-icon'>
        Activity berhasil dihapus
      </span>
    </Modal.Body>
  </Modal>
)}

export default SuccessDeleteModal