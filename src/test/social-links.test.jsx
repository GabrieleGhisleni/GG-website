import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialLinks from '../components/SocialLinks';
import { SOCIALS } from '../data/socials';

describe('SocialLinks', () => {
  it('inline variant: renders github, linkedin and email links', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', SOCIALS.github);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      SOCIALS.linkedin,
    );
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', SOCIALS.email);
  });

  it('inline variant: link labels are visible text (not sr-only)', () => {
    render(<SocialLinks variant="inline" />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const span = githubLink.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.className).not.toContain('sr-only');
  });

  it('footer variant: link labels are sr-only', () => {
    render(<SocialLinks variant="footer" />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    const span = githubLink.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.className).toContain('sr-only');
  });
});
