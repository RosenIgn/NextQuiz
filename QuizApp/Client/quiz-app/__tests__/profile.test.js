import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../app/profile/page.js'; 

describe('Profile Page', () => {

    test('renders without crashing', () => {
        render(<Page />);
      });
      
  test('renders profile page without crashing', () => {
    render(<Page />);
    expect(screen.getByText('Account Settings')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Username')).toBeTruthy();
    expect(screen.getByText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Edit/i })).toBeTruthy();
  });
});
