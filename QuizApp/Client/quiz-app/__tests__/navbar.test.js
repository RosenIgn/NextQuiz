import { render, screen, fireEvent } from '@testing-library/react';
import { CustomNavbar } from '../components/navbar';
import fetchMock from 'jest-fetch-mock';


fetchMock.enableMocks();


describe('CustomNavbar', () => {

  test('logs out when logout button is clicked', () => {
    localStorage.setItem('jwt', 'fake-jwt-token');
    render(<CustomNavbar />);

    const logoutButton = screen.getByRole('link', { name: /Logout/i });
    fireEvent.click(logoutButton);

    // Here, you can assert that the logout functionality is properly triggered,
    // such as by checking if localStorage is cleared and the user is redirected.
    // This depends on the implementation of your handleLogout function.
  });
});