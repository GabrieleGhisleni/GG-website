import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import App from '../App';

beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.IntersectionObserver = IO;
});

describe('<App/> smoke test', () => {
  it('renders the hero name and the about section', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Gabriele\s+Ghisleni/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /About me/i })).toBeInTheDocument();
  });
});
