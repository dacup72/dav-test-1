import React, { Component } from 'react';
import axios from 'axios';
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
        <ul>
        {this.state.offers.map(offer => (
          <li key={offer.id}>{offer.name}</li>
        ))}
      </ul>
      </div>
    );
  }
}

export default App;
