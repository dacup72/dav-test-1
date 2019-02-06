import React, { Component } from 'react';
import { CardDeck, Container, Card } from 'react-bootstrap';
import OfferCard from './Card';
import Nav from './Nav';
import CardModal from './CardModal';
import Helpers from './Utils/Helpers';
import API from './Utils/API';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      offerClicks: {},
      retailers: {},
      modal: {},
      showModal: false,
      appLoaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillMount() {
    API.getRetailersOffers().then(res1 => {
      API.getAllRetailers().then(res2 => {
        var cleanRetailerOfferArray = Helpers.removeRetailerDuplicates(res1.data);
        // Create one object from retailer array
        var retailIds = {};
        res2.data.map(({ id, name }) => {
          return retailIds[id] = name;
        });

        // Create object with retailer names and offer ids matched up
        var result = {}
        cleanRetailerOfferArray.forEach(bothIds => {
          if (result[bothIds.offer_id]) {
            result[bothIds.offer_id] = result[bothIds.offer_id] + `, ${retailIds[bothIds.retailer_id]}`;
          }
          else {
            result[bothIds.offer_id] = retailIds[bothIds.retailer_id];
          }
        });

        this.setState(() => ({
          retailers: result
        }));
      });
    });
  }

  handleSubmit(e, { searchInput, searchRetailer }) {
    e.preventDefault();
    if (searchRetailer === "all") {
      API.getOffersByName(searchInput).then(res => {
        const uniqueOffers = Helpers.removeOfferDuplicates(res.data);
        const result = Helpers.groupOffers(uniqueOffers);
        this.setState(() => ({ offers: result }))
      })
    }
    else {
      API.getOffersByRetailer(searchInput, searchRetailer).then(res => {
        const uniqueOffers = Helpers.removeOfferDuplicates(res.data);
        const result = Helpers.groupOffers(uniqueOffers);
        this.setState(() => ({ offers: result }));
      })
    }
  }

  handleModalOpen(content) {
    var newClick = this.state.offerClicks;
    newClick[content.id] = content.views + 1;

    this.setState(() => ({
      offerClicks: newClick,
      modal: content,
      showModal: true
    }))
  }

  handleModalClose() {
    this.setState(() => ({
      showModal: false
    }))
  }

  render() {
    return (
      <Container>
        <Nav
          handleSubmit={this.handleSubmit}
        />

        {this.state.offers.length > 0 ? this.state.offers.map((offerGroup, i) => (
          <CardDeck className="card-deck-container" key={i}>
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
                views={this.state.offerClicks[offer.id] ? this.state.offerClicks[offer.id] : 0}
                retailerGroup={this.state.retailers[offer.id]}
              />
            ))}
          </CardDeck>
        )) : (
          <Card bg="danger">
            <Card.Title className="message-card">No available offer based on this search criteria</Card.Title>
          </Card>
        )}

        <CardModal
          image={this.state.modal.imageURL}
          name={this.state.modal.name}
          description={this.state.modal.description}
          terms={this.state.modal.terms}
          expiration={this.state.modal.expiration}
          views={this.state.modal.views}
          retailerGroup={this.state.modal.retailerGroup}
          handleModalClose={this.handleModalClose}
          showModal={this.state.showModal}
        />
      </Container>
    );
  }
}

export default App;
