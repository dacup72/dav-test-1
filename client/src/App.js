import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { CardColumns } from 'react-bootstrap';
import './App.css';
import OfferCard from './Card';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, q) {
    e.preventDefault();
    // axios.get(`api/offers?q=${q}`).then(res => {
    //   this.setState(() => ({ offers: res.data }))
    // })
    axios.get(`api/testJoin`).then(res => {
      console.log("TEST: ", res.data)
      //this.setState(() => ({ offers: res.data }))
    })
  }

  render() {
    return (
      <Fragment>
        <Nav 
          handleSubmit={this.handleSubmit}
        />
        <CardColumns>
            {this.state.offers.map(offer => (
              <OfferCard 
                key={offer.id}
                id={offer.id}
                name={offer.name}
                description={offer.description}
                expiration={offer.expiration}
                terms={offer.terms}
                imageURL={offer.image_url}
              /> 
            ))}
        </CardColumns>
      </Fragment>
    );
  }
}

export default App;
