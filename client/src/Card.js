import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';

var Test = ({ id, name, description, expiration, terms, imageURL }) => {
  return (
    <Fragment>
      <Card>
        <Card.Img variant="top" src={imageURL} />
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

export default Test;