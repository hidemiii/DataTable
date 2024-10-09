import { render, screen } from '@testing-library/react';
import App from './App';
import './App.css'; // This should be in App.js


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
