import React from 'react';
import { Modal, Badge } from 'react-bootstrap';
import Moment from 'react-moment';

const CardModal = ({ name, description, image, terms, expiration, showModal, handleModalClose, retailerGroup, views }) => {
  return (
    <Modal size="lg" show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <hr />
      <img src={image} alt={name} className="card-image" />
      <Modal.Body>
        <h5>Details: </h5>
        <p>{description}</p>
        <h5>Terms: </h5>
        <p>{terms}</p>
        <h5>Available Retailers: </h5>
        <ul>
          {retailerGroup ? retailerGroup.split(",").map(retailer => (
            <li key={retailer}>{retailer}</li>
          )) : 
            <li>No Retailer Information Available</li>
          }
        </ul>
      </Modal.Body>
      <Modal.Footer variant="secondary" class="modal-footer">
        <h4><Badge variant="secondary">Views: {views + 1}</Badge></h4>
        <span><h4>Expiration Date: </h4><Moment date={expiration} /></span>
      </Modal.Footer>
    </Modal>
  )
}

export default CardModal;