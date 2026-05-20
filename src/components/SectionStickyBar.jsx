import { useEffect, useState } from 'react';
import { PROJECT_SECTIONS } from '../data/projects';

const SectionStickyBar = () => {
  const [current, setCurrent] = useState(PROJECT_SECTIONS[0]?.title ?? '');

  useEffect(() => {
    const headings = PROJECT_SECTIONS
      .map(s => document.getElementById(`section-${s.slug}`))
      .filter(Boolean);

    if (headings.length === 0) return;

    const titleBySlug = Object.fromEntries(PROJECT_SECTIONS.map(s => [s.slug, s.title]));

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting[0]) {
          const slug = intersecting[0].target.id.replace(/^section-/, '');
          setCurrent(titleBySlug[slug]);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    headings.forEach(h => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 z-20 h-10 bg-white/80 backdrop-blur border-b border-stone-200">
      <div className="mx-auto flex h-full max-w-5xl items-center px-6 text-sm font-medium text-stone-700">
        <span aria-hidden="true" className="mr-2 text-brand">→</span>
        {current}
      </div>
    </div>
  );
};

export default SectionStickyBar;
