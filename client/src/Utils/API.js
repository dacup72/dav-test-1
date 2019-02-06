import axios from 'axios';

export default {
  getAllRetailers: function() {
    return axios.get('/api/allRetailers');
  },
  getRetailersOffers: function() {
    return axios.get('/api/allRetailersOfferIds');
  },
  getOffersByName: function(q) {
    return axios.get(`/api/offerByName?q=${q}`);
  },
  getOffersByRetailer: function(q, r) {
    return axios.get(`/api/getOffersByRetailer?q=${q}&r=${r}`);
  }
}