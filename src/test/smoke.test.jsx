import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import App from '../App';
import { PROJECT_SECTIONS } from '../data/projects';

beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.IntersectionObserver = IO;
});

describe('<App/> smoke test', () => {
  it('renders the name, all sections, and all 20 projects', () => {
    render(<App />);
    expect(screen.getByText('Gabriele Ghisleni')).toBeInTheDocument();

    for (const s of PROJECT_SECTIONS) {
      expect(
        screen.getByText(new RegExp(`^${s.title}.*\\(${s.projects.length}\\)`)),
      ).toBeInTheDocument();
    }

    const allProjects = PROJECT_SECTIONS.flatMap((s) => s.projects);
    expect(allProjects).toHaveLength(20);
    for (const p of allProjects) {
      expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
    }
  });
});
