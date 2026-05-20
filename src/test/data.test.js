import { describe, it, expect } from 'vitest';
import { PROJECT_SECTIONS } from '../data/projects';

describe('PROJECT_SECTIONS', () => {
  const allProjects = PROJECT_SECTIONS.flatMap(s => s.projects);

  it('has 8 sections', () => {
    expect(PROJECT_SECTIONS).toHaveLength(8);
  });

  it('has 23 projects total', () => {
    expect(allProjects).toHaveLength(23);
  });

  it('has 11 flagship projects', () => {
    expect(allProjects.filter(p => p.flagship)).toHaveLength(11);
  });

  it('every project has every required field, non-empty', () => {
    const required = ['slug', 'name', 'flagship', 'role', 'start', 'end', 'summary', 'problem', 'solution', 'stack'];
    for (const p of allProjects) {
      for (const field of required) {
        expect(p, `field "${field}" on project "${p.name ?? p.slug}"`).toHaveProperty(field);
      }
      for (const strField of ['slug', 'name', 'role', 'start', 'end', 'summary']) {
        expect(p[strField].length, `"${strField}" on "${p.name}" is empty`).toBeGreaterThan(0);
      }
      expect(p.stack.length, `stack on "${p.name}" is empty`).toBeGreaterThan(0);
      expect(p.problem.length, `problem on "${p.name}" is empty`).toBeGreaterThan(0);
      expect(p.solution.length, `solution on "${p.name}" is empty`).toBeGreaterThan(0);
    }
  });

  it('slugs are unique', () => {
    const slugs = allProjects.map(p => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('section slugs are unique', () => {
    const slugs = PROJECT_SECTIONS.map(s => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('object is deeply frozen', () => {
    expect(Object.isFrozen(PROJECT_SECTIONS)).toBe(true);
    expect(Object.isFrozen(PROJECT_SECTIONS[0])).toBe(true);
    expect(Object.isFrozen(PROJECT_SECTIONS[0].projects[0])).toBe(true);
    expect(Object.isFrozen(PROJECT_SECTIONS[0].projects[0].stack)).toBe(true);
  });
});
