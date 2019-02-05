import React from 'react';
import { Modal } from 'react-bootstrap';

const CardModal = ({ name, description, image, terms, showModal, handleModalClose }) => {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={handleModalClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
    </Modal>
  )
}

export default CardModal;