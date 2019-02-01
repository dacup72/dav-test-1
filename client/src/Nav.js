import React, { Component } from 'react';
import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

class Nav extends Component {
  state = {
    searchInput: ""
  }

  handleChange(e) {
    var input = e.target.value
    this.setState(() => ({
      searchInput: input
    }))
  }

  render() {
    return (
      <Navbar className="bg-light justify-content-between">
        <Navbar.Brand>iBotta</Navbar.Brand>
        <Form inline onSubmit={(e) => this.props.handleSubmit(e, this.state.searchInput)}>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => this.handleChange(e)} />
          <Button type="submit">Submit</Button>
        </Form>
      </Navbar>
    )
  }
}

export default Nav;