import SocialLinks from './SocialLinks';
import { SOCIALS } from '../data/socials';
import { Code2 } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-stone-200 bg-stone-50 py-6">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
      <span className="text-sm text-stone-500">© 2026 Ghisleni Gabriele</span>
      <div className="flex items-center gap-6 text-stone-600">
        <SocialLinks variant="footer" />
        <a
          href={SOCIALS.source}
          target="_blank"
          rel="noreferrer"
          aria-label="Source on GitHub"
          className="inline-flex items-center gap-1.5 text-sm hover:text-brand"
        >
          <Code2 className="h-4 w-4" aria-hidden="true" />
          Source
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
