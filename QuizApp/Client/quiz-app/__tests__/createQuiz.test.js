import React from 'react';
import { render, screen } from '@testing-library/react';
import Page from '../app/createQuiz/page.js';

describe('CreateQuiz Page', () => {
    test('renders without crashing', () => {
      render(<Page />);
    });
      
});