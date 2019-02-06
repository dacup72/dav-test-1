import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../Nav';

test('Calls handleSubmit with retailer input and search input when submitted', () => {
  const handleSubmit = jest.fn();
  const container = document.createElement('div');
  ReactDOM.render(<Nav handleSubmit={handleSubmit} />, container);

  const form = container.querySelector('form');
  const {searchInput, searchRetailer} = form.elements;
  searchInput.value = 'milk';
  searchRetailer.value = '3'; // This is the id for the retailer 'Target'

  form.dispatchEvent(new window.Event('submit'));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith({
    searchInput: 'milk',
    searchRetailer: '3'
  });
})