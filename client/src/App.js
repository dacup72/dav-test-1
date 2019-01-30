import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import './App.css';

class App extends Component {
  state = {
    offers: []
  }

  getOffers(q) {
    axios.get(`api/offers?q=${q}`).then(res => {
      console.log("RES: ", res.data);
      this.setState(() => ({ offers: res.data }))
    })
  }

  render() {
    return (
      <div>
        <button onClick={() => this.getOffers('Crystal')}>Get Offers</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Expiration</th>
            </tr>
          </thead>
          <tbody>
            {this.state.offers.map(offer => (
              <tr key={offer.id}>
                <td key={offer.id}>{offer.id}</td>
                <td key={offer.name}>{offer.name}</td>
                <td key={offer.description}>{offer.description}</td>
                <td key={offer.expiration}>{offer.expiration}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
