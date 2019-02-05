import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { CardDeck } from 'react-bootstrap';
import OfferCard from './Card';
import Nav from './Nav';
import CardModal from './CardModal';


const removeArrayDuplicates = arr => {
  const unique = [];
  arr.map(x => unique.filter(a => a.description == x.description && a.name == x.name && a.terms == x.terms).length > 0
    ? null
    : unique.push(x)
  );
  return unique;
};

const groupOffers = arr => {
  let result = [];
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.length === 3) {
      result.push(newArr);
      newArr = [];
    }
    else if (i === arr.length - 1) {
      newArr.push(arr[i]);
      result.push(newArr);
    }
    else {
      newArr.push(arr[i]);
    }
  }
  return result;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      modal: {},
      showModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleSubmit(e, { searchInput, searchRetailer }) {
    e.preventDefault();
    if (searchRetailer === "all") {
      axios.get(`/api/offerByName?q=${searchInput}`).then(res => {
        const uniqueOffers = removeArrayDuplicates(res.data);
        const result = groupOffers(uniqueOffers);
        this.setState(() => ({ offers: result }))
      })
    }
    else {
      axios.get(`/api/getOffersByRetailer?q=${searchInput}&r=${searchRetailer}`).then(res => {
        const uniqueOffers = removeArrayDuplicates(res.data);
        const result = groupOffers(uniqueOffers);
        this.setState(() => ({ offers: result }));
      })
    }
  }

  handleModalOpen(content) {
    this.setState(() => ({
      modal: content,
      showModal: true
    }))
  }

  handleModalClose() {
    this.setState(() => ({
      showModal: false
    }))
  }

  renderModal() {
    return (
      <CardModal
        image={this.state.modal.imageURL}
        name={this.state.modal.name}
        description={this.state.modal.description}
        terms={this.state.modal.terms}
        handleModalClose={this.handleModalClose}
        showModal={this.state.showModal}
      />
    )
  }

  render() {
    return (
      <Fragment>
        <Nav
          handleSubmit={this.handleSubmit}
        />
        {this.state.offers.map(offerGroup => (
          <CardDeck className="card-deck-container">
            {offerGroup.map(offer => (
              <OfferCard
                key={offer.id}
                id={offer.id}
                name={offer.name}
                description={offer.description}
                expiration={offer.expiration}
                terms={offer.terms}
                imageURL={offer.image_url}
                handleModalOpen={this.handleModalOpen}
              />
            ))}
          </CardDeck>
        ))}
        {this.state.showModal ? this.renderModal() : null}
      </Fragment>
    );
  }
}

export default App;
