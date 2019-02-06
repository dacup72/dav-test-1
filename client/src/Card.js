import React from 'react';
import { Card } from 'react-bootstrap';

const OfferCard = ({ id, name, description, expiration, terms, imageURL, handleModalOpen, views, retailerGroup }) => {
  return (
    <Card className="card-container" onClick={() => handleModalOpen({ id, name, description, terms, imageURL, views })}>
      <Card.Img variant="top" className="card-image" src={imageURL} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <hr />
        <Card.Text><h6>Details: </h6>{description}</Card.Text>
        <hr />
        <Card.Text><strong>Click card for more information!</strong></Card.Text>
      </Card.Body>
      
      <Card.Footer >
        <small className="text-muted">Offer Views: {views}</small>
      </Card.Footer>
    </Card>
  )
}

export default OfferCard;