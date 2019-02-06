import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import Helpers from './Utils/Helpers';
import API from './Utils/API';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchRetailer: "all",
      retailerOptions: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateRetailerOptions();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  }

  generateRetailerOptions() {
    API.getAllRetailers().then(res => {
      const uniqueRetailers = Helpers.removeArrayDuplicates(res.data);
      this.setState(() => ({ retailerOptions: uniqueRetailers }));
    });
  }

  render() {
    return (
      <Navbar className="bg-light justify-content-between main-nav">
        <Navbar.Brand className="nav-brand">iBotta Offer Display</Navbar.Brand>
        <Form inline onSubmit={(e) => this.props.handleSubmit(e, { searchInput: this.state.searchInput, searchRetailer: this.state.searchRetailer })}>
          <Form.Group controlId="selectRetailer.ControlSelect1" className="retailer-dropdown">
            <Form.Label className="offer-form-label">Select Retailer</Form.Label>
            <Form.Control as="select" name="searchRetailer" onChange={this.handleChange}>
              <option value="all">All Retailers</option>
              {this.state.retailerOptions.length && this.state.retailerOptions.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Label className="offer-form-label">Product Name</Form.Label>
          <FormControl type="text" placeholder="Product Name" className="mr-sm-2" name="searchInput" onChange={this.handleChange} />
          <Button type="submit">Search</Button>
        </Form>
      </Navbar>
    )
  }
}

export default Nav;