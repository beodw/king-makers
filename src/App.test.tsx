import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';

const setup = () => render(<App />);

test('filters table on search', () => {
  setup()
  const searchInput = screen.getByLabelText('search-input')
  expect(searchInput).toBeInTheDocument();
  fireEvent.change(searchInput, {target: {value: 'jax'}})
  const tableRow = screen.getByText('Jaxspan')
  expect(tableRow).toBeInTheDocument();
});

test('filters table by date', () => {
  const dom = setup()
  const startDateInput = dom.container.querySelector('#start-date')!.firstChild?.firstChild
  expect(startDateInput).toBeInTheDocument();
  // Filter for date not in data set.
  fireEvent.change(startDateInput!, {target: {value: '10/10/2023'}})
  let tableRow = screen.getByText('No Results!')
  expect(tableRow).toBeInTheDocument();

  // Filter for date between 2017 ad 2018
  fireEvent.change(startDateInput!, {target: {value: '01/01/2017'}})
  const endDateInput = dom.container.querySelector('#end-date')!.firstChild?.firstChild
  fireEvent.change(endDateInput!, {target: {value: '12/12w/2018'}})
  tableRow = screen.getByText('Trilith')
  expect(tableRow).toBeInTheDocument();
  tableRow = screen.getByText('Blogtag')
  expect(tableRow).toBeInTheDocument();
});
