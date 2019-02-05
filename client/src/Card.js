import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import CardModal from './CardModal';

const OfferCard = ({ id, name, description, expiration, terms, imageURL, handleModalOpen }) => {
  return (
    <Card className="card-container" onClick={() => handleModalOpen({ name, description, terms, imageURL })}>
      <Card.Img variant="top" className="card-image" src={imageURL} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer >
        <small className="text-muted">{expiration}</small>
      </Card.Footer>
    </Card>
  )
}

export default OfferCard;