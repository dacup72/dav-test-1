import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import CardModal from './CardModal';
import './App.css';

var OfferCard = ({ id, name, description, expiration, terms, imageURL }) => {
  return (
    <Fragment>
      <Card>
        <div className="card-image-container">
          <img src={imageURL} alt={name} />
        </div>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{expiration}</small>
        </Card.Footer>
      </Card>
    </Fragment>
  )
}

export default OfferCard;