import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Projects from '../components/Projects';
import { PROJECT_SECTIONS } from '../data/projects';

beforeAll(() => {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.IntersectionObserver = IO;
});

describe('Projects', () => {
  it('renders every section heading with its count', () => {
    render(<Projects />);
    for (const s of PROJECT_SECTIONS) {
      const node = screen.getByText(new RegExp(`${s.title}.*\\(${s.projects.length}\\)`));
      expect(node).toBeInTheDocument();
    }
  });

  it('renders every project name', () => {
    render(<Projects />);
    const allProjects = PROJECT_SECTIONS.flatMap(s => s.projects);
    for (const p of allProjects) {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    }
  });
});
