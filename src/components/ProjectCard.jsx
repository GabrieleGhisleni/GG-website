import { Star, ChevronDown } from 'lucide-react';

const StackChip = ({ children }) => (
  <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
    {children}
  </span>
);

const renderSolutionWithLinks = (solution, links) => {
  if (!links || links.length === 0) return solution;
  const parts = [];
  let cursor = solution;
  for (const [i, { label, url }] of links.entries()) {
    const idx = cursor.indexOf(label);
    if (idx === -1) continue;
    parts.push(cursor.slice(0, idx));
    parts.push(
      <a key={`${label}-${i}`} href={url} target="_blank" rel="noreferrer" className="text-brand hover:underline">
        {label}
      </a>
    );
    cursor = cursor.slice(idx + label.length);
  }
  parts.push(cursor);
  return parts;
};

const ProjectCard = ({ project }) => {
  const { slug, name, flagship, role, start, end = 'ongoing', summary, problem, solution, stack = [], links } = project;
  const visibleStack = stack.slice(0, 4);
  const hiddenStackCount = stack.length - visibleStack.length;
  const variant = flagship ? 'flagship' : 'non-flagship';

  return (
    <details
      id={`project-${slug}`}
      data-variant={variant}
      className={`group rounded-lg border border-stone-200 bg-white transition-colors hover:border-brand/40 ${
        flagship ? 'border-l-4 border-l-brand p-6' : 'p-4'
      }`}
    >
      <summary className="cursor-pointer list-none">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2">
              {flagship && <Star className="h-4 w-4 flex-none translate-y-0.5 fill-brand text-brand" aria-hidden="true" />}
              <h3 className={flagship ? 'text-xl font-semibold text-ink' : 'text-base font-medium text-ink'}>
                {name}
              </h3>
              <span className="text-sm text-stone-500">·</span>
              <span className="text-sm text-stone-600">{role}</span>
              <span className="text-sm text-stone-500">·</span>
              <span className="text-sm text-stone-500">
                {start} – {end}
              </span>
            </div>
            <p className="mt-2 text-sm text-stone-700">{summary}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {visibleStack.map(s => <StackChip key={s}>{s}</StackChip>)}
              {hiddenStackCount > 0 && <StackChip>+{hiddenStackCount}</StackChip>}
            </div>
          </div>
          <ChevronDown
            className="h-5 w-5 flex-none translate-y-1 text-stone-400 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </div>
      </summary>

      <div className="mt-5 border-t border-stone-100 pt-5 text-sm leading-relaxed text-stone-700">
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Problem</div>
          <p>{problem}</p>
        </div>
        <div className="mb-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">Solution</div>
          <p>{renderSolutionWithLinks(solution, links)}</p>
        </div>
        {hiddenStackCount > 0 && (
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">More stack</div>
            <div className="flex flex-wrap gap-1.5">
              {stack.slice(4).map(s => <StackChip key={s}>{s}</StackChip>)}
            </div>
          </div>
        )}
      </div>
    </details>
  );
};

export default ProjectCard;
