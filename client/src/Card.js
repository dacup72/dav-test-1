import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const OfferCard = ({ id, name, description, expiration, terms, imageURL, handleModalOpen, views, retailerGroup }) => {
  return (
    <Card className="card-container" onClick={() => handleModalOpen({ id, name, description, terms, imageURL, views, retailerGroup, expiration })}>
      <Card.Img variant="top" className="card-image" src={imageURL} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <hr />
        <strong>Details: </strong>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer >
        <h5><Badge variant="secondary">Offer Views: {views}</Badge></h5>
        <Card.Text>Click card for more information!</Card.Text>
      </Card.Footer>
    </Card>
  )
}

export default OfferCard;