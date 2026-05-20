import { GitFork, Link, Mail, FileDown } from 'lucide-react';
import { SOCIALS } from '../data/socials';

const items = [
  { label: 'GitHub',   href: SOCIALS.github,   Icon: GitFork },
  { label: 'LinkedIn', href: SOCIALS.linkedin, Icon: Link },
  { label: 'Email',    href: SOCIALS.email,    Icon: Mail },
  { label: 'CV',       href: SOCIALS.cv,       Icon: FileDown },
];

const SocialLinks = ({ variant = 'inline' }) => (
  <ul
    className={
      variant === 'footer'
        ? 'flex items-center gap-6'
        : 'flex flex-wrap items-center gap-4 text-sm'
    }
  >
    {items.map(({ label, href, Icon }) => (
      <li key={label}>
        <a
          href={href}
          aria-label={label}
          {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="inline-flex items-center gap-1.5 text-current hover:text-brand transition-colors"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className={variant === 'footer' ? 'sr-only' : ''}>{label}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default SocialLinks;
