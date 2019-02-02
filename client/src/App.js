import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { CardColumns } from 'react-bootstrap';
import './App.css';
import OfferCard from './Card';
import Nav from './Nav';

const removeArrayDuplicates = arr => {
  return arr.map(e => e["id"])
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e])
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { offers: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e, { searchInput, searchRetailer }) {
    e.preventDefault();
    if(searchRetailer === "all") {
      axios.get(`/api/offerByName?q=${searchInput}`).then(res => {
        this.setState(() => ({ offers: res.data }))
      })
    } 
    else {
      axios.get(`/api/getOffersByRetailer?q=${searchInput}&r=${searchRetailer}`).then(res => {
        const uniqueOffers = removeArrayDuplicates(res.data);
        this.setState(() => ({ offers: uniqueOffers }));
      })
    }
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
