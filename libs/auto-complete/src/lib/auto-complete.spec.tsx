import React from 'react';
import { render } from '@testing-library/react';

import AutoComplete from './auto-complete';

describe('AutoComplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AutoComplete />);
    expect(baseElement).toBeTruthy();
  });
});
