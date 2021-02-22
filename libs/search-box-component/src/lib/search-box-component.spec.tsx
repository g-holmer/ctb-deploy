import React from 'react';
import { render } from '@testing-library/react';

import SearchBoxComponent from './search-box-component';

describe('SearchBoxComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SearchBoxComponent />);
    expect(baseElement).toBeTruthy();
  });
});
