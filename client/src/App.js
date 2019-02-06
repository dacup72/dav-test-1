import React, { Component } from 'react';
import axios from 'axios';
import { CardDeck, Container } from 'react-bootstrap';
import OfferCard from './Card';
import Nav from './Nav';
import CardModal from './CardModal';


const removeOfferDuplicates = arr => {
  const unique = [];
  arr.map(x => unique.filter(a => a.description == x.description && a.name == x.name && a.terms == x.terms).length > 0
    ? null
    : unique.push(x)
  );
  return unique;
};

const removeRetailerDuplicates = arr => {
  const unique = [];
  arr.map(x => unique.filter(a => a.retailer_id == x.retailer_id && a.offer_id == x.offer_id).length > 0
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
      offerClicks: {},
      retailers: {},
      modal: {},
      showModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentWillMount() {
    axios.get('/api/allRetailersOfferIds').then(res1 => {
      axios.get('/api/allRetailers').then(res2 => {
        var cleanRetailerOfferArray = removeRetailerDuplicates(res1.data);

        // Create one object from retailer array
        var retailIds = {};
        res2.data.map(({ id, name }) => {
          retailIds[id] = name;
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
      axios.get(`/api/offerByName?q=${searchInput}`).then(res => {
        const uniqueOffers = removeOfferDuplicates(res.data);
        const result = groupOffers(uniqueOffers);
        this.setState(() => ({ offers: result }))
      })
    }
    else {
      axios.get(`/api/getOffersByRetailer?q=${searchInput}&r=${searchRetailer}`).then(res => {
        const uniqueOffers = removeOfferDuplicates(res.data);
        const result = groupOffers(uniqueOffers);
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
        {this.state.offers.map((offerGroup, i) => (
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
        ))}
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
