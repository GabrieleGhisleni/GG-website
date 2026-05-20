import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialLinks from '../components/SocialLinks';
import { SOCIALS } from '../data/socials';

describe('<SocialLinks/>', () => {
  it('renders github, linkedin, email and CV links', () => {
    render(<SocialLinks />);
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', SOCIALS.github);
    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', SOCIALS.linkedin);
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', SOCIALS.email);
    expect(screen.getByRole('link', { name: /cv|resume/i })).toHaveAttribute('href', SOCIALS.cv);
  });
});
