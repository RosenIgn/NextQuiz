import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../app/register/page.js';
import fetchMock from 'jest-fetch-mock';

describe('Register Page', () => {

  beforeAll(() => {
    fetchMock.enableMocks();
  });
  
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  
  test('renders without crashing', () => {
    render(<Page />);
  });
  
  test('renders register form correctly', () => {
    render(<Page />);
    expect(screen.getByRole('heading', { name: /Register/i })).toBeTruthy();
    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Register/i })).toBeTruthy();
  });

  test('submits form correctly on valid data', async () => {
    render(<Page />);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'john_doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'strongpassword' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'strongpassword' } });

    fetchMock.mockOnce(JSON.stringify({ success: true }));

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/');
    });
  });
});