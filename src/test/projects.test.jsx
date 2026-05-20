import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Projects from '../components/Projects';
import { PROJECT_SECTIONS } from '../data/projects';

let capturedCallback;

beforeAll(() => {
  globalThis.IntersectionObserver = class {
    constructor(cb) { capturedCallback = cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterAll(() => {
  delete globalThis.IntersectionObserver;
});

describe('Projects', () => {
  it('renders every section heading with its count', () => {
    render(<Projects />);
    for (const s of PROJECT_SECTIONS) {
      const node = screen.getByText(new RegExp(`^${s.title}.*\\(${s.projects.length}\\)`));
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

  it('sticky bar updates when IntersectionObserver fires', () => {
    render(<Projects />);
    const secondSection = PROJECT_SECTIONS[1];
    const headingEl = document.getElementById(`section-${secondSection.slug}`);
    expect(headingEl).not.toBeNull();

    act(() => {
      capturedCallback([{
        isIntersecting: true,
        target: headingEl,
        boundingClientRect: { top: 100 },
      }]);
    });

    // The sticky bar should now show the second section's title
    expect(screen.getAllByText(secondSection.title).length).toBeGreaterThan(0);
  });
});
