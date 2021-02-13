import React from 'react';
import { render } from '@testing-library/react';

import DarkThemeProvider from './dark-theme-provider';

describe('DarkThemeProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarkThemeProvider />);
    expect(baseElement).toBeTruthy();
  });
});
