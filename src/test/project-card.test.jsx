import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProjectCard from '../components/ProjectCard';

const sampleFlagship = {
  slug: 'sample',
  name: 'Sample Flagship',
  flagship: true,
  role: 'architect + core dev',
  start: 'Jan 2024',
  end: 'May 2026',
  summary: 'A sample summary sentence.',
  problem: 'A sample problem paragraph.',
  solution: 'A sample solution paragraph.',
  stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Langfuse'],
};

const sampleNonFlagship = { ...sampleFlagship, slug: 'sample-2', name: 'Sample Non Flagship', flagship: false };

describe('ProjectCard', () => {
  it('renders name, role, date and summary', () => {
    render(<ProjectCard project={sampleFlagship} />);
    expect(screen.getByText('Sample Flagship')).toBeInTheDocument();
    expect(screen.getByText(/architect \+ core dev/)).toBeInTheDocument();
    expect(screen.getByText(/Jan 2024.*May 2026/)).toBeInTheDocument();
    expect(screen.getByText('A sample summary sentence.')).toBeInTheDocument();
  });

  it('shows first 4 stack chips + +2 indicator', () => {
    render(<ProjectCard project={sampleFlagship} />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders problem and solution paragraphs (always in DOM via details)', () => {
    render(<ProjectCard project={sampleFlagship} />);
    expect(screen.getByText('A sample problem paragraph.')).toBeInTheDocument();
    expect(screen.getByText('A sample solution paragraph.')).toBeInTheDocument();
  });

  it('flagship variant carries data-variant=flagship', () => {
    const { container } = render(<ProjectCard project={sampleFlagship} />);
    expect(container.querySelector('[data-variant="flagship"]')).not.toBeNull();
  });

  it('non-flagship variant carries data-variant=non-flagship', () => {
    const { container } = render(<ProjectCard project={sampleNonFlagship} />);
    expect(container.querySelector('[data-variant="non-flagship"]')).not.toBeNull();
  });

  it('details element has id=project-<slug>', () => {
    const { container } = render(<ProjectCard project={sampleFlagship} />);
    expect(container.querySelector('#project-sample')).not.toBeNull();
  });
});
