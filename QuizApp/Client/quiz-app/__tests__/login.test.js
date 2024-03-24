import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Page from '../app/login/page.js'; 

describe('Login Page', () => {

    test('renders without crashing', () => {
        render(<Page />);
      });
      
  test('renders login form correctly', () => {
    render(<Page />);
    expect(screen.getByPlaceholderText('Username')).toBeTruthy();
    expect(screen.getByPlaceholderText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Login/i })).toBeTruthy();
  });

});