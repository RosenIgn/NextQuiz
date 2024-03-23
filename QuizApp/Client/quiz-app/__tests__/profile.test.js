import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../app/profile/page.js'; // Assuming your profile page component is named ProfilePage

describe('Profile Page', () => {

    test('renders without crashing', () => {
        render(<Page />);
      });
      
  test('renders profile page without crashing', () => {
    render(<Page />);
    // Check if a specific element or text is present to ensure the page has rendered
    expect(screen.getByText('Account Settings')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Username')).toBeTruthy();
    expect(screen.getByText('Password')).toBeTruthy();
    expect(screen.getByRole('button', { name: /Edit/i })).toBeTruthy();
  });
});
