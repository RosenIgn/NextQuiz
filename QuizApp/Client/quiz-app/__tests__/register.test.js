import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../app/register/page.js'; // Assuming your register page component is named Page

describe('Register Page', () => {
  test('renders register form correctly', () => {
    render(<Page />);
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('displays validation error messages correctly', async () => {
    render(<Page />);
    
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'abc' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '1234' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password' } });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByText('Username must be between 5 and 20 characters')).toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
      expect(screen.getByText('Password must be between 8 and 30 characters')).toBeInTheDocument();
      expect(screen.getByText('The password is not the same')).toBeInTheDocument();
    });
  });

  test('submits form correctly on valid data', async () => {
    render(<Page />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'john_doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'strongpassword' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'strongpassword' } });

    fireEvent.click(screen.getByText('Register'));

    // Assuming the registration is successful and the user is redirected to the login page
    await waitFor(() => {
      expect(window.location.href).toBe('/login');
    });
  });
});
