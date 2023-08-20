import { render } from '@testing-library/react';

import HomePage from './page';

describe('HomePage', () => {
  const renderHomePage = () => render((
    <HomePage />
  ));

  it('Should be visible "test"', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent('test');
  });
});
