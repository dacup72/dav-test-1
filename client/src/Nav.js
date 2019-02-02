import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import Axios from 'axios';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: "",
      searchRetailer: "",
      retailerOptions: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.generateRetailerOptions();
  }

  handleChange(e) {
    const { name, value } = e.target;
    console.log(name, " : ", value)
    this.setState(() => ({ [name]: value }));
  }

  generateRetailerOptions() {
    Axios.get('/api/allRetailers').then(res => {
      console.log(res.data);
      this.setState(() => ({ retailerOptions: res.data }))
    });
  }

  render() {
    return (
      <Navbar className="bg-light justify-content-between">
        <Navbar.Brand>iBotta</Navbar.Brand>
        <Form inline onSubmit={(e) => this.props.handleSubmit(e, this.state.searchInput)}>
          <Form.Group controlId="selectRetailer.ControlSelect1">
            <Form.Label>Select Retailer</Form.Label>
            <Form.Control as="select" name="searchRetailer" onChange={this.handleChange}>
              <option>All Retailers</option>
              {this.state.retailerOptions.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" name="searchInput" onChange={this.handleChange} />
          <Button type="submit">Submit</Button>
        </Form>
      </Navbar>
    )
  }
}

export default Nav;