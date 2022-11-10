import { render, screen } from '@testing-library/react';
import { MySocialNetworkApp } from './App';

test('renders learn react link', () => {
  render({MySocialNetworkApp})
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

