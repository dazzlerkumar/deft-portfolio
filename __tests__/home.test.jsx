import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Page', () => {
  it('Home', () => {
    render(<Home />);

    //const heading = screen.getByRole('heading', { level: 1 })
    const name = screen.getByText(/Deepak Kumar/i);

    expect(name).toBeInTheDocument();
  });
});
