import { render, screen, fireEvent } from '@testing-library/react';
import { CustomNavbar } from '../components/navbar';
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();


describe('CustomNavbar', () => {
  
  test('renders without crashing', () => {
    render(<CustomNavbar />);
  });

  test('logs out when logout button is clicked', () => {
    localStorage.setItem('jwt', 'fake-jwt-token');
    render(<CustomNavbar />);

    const logoutButton = screen.getByRole('link', { name: /Logout/i });
    fireEvent.click(logoutButton);

  });
});