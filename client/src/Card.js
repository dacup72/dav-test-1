import React from 'react';
import { Card } from 'react-bootstrap';

const OfferCard = ({ id, name, description, expiration, terms, imageURL, handleModalOpen, views }) => {
  return (
    <Card className="card-container" onClick={() => handleModalOpen({ id, name, description, terms, imageURL, views })}>
      <Card.Img variant="top" className="card-image" src={imageURL} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
        <Card.Text>Views: {views}</Card.Text>
      </Card.Body>
      <Card.Footer >
        <small className="text-muted">{expiration}</small>
      </Card.Footer>
    </Card>
  )
}

export default OfferCard;