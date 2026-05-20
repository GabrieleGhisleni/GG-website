import ProjectCard from './ProjectCard';

const ProjectSection = ({ section }) => (
  <section className="mb-12">
    <h3
      id={`section-${section.slug}`}
      className="mb-4 flex items-center gap-3 font-display text-xs font-bold uppercase tracking-widest text-stone-500"
    >
      <span className="h-px flex-1 bg-stone-200" aria-hidden="true" />
      <span data-testid={`section-heading-${section.slug}`}>
        {`${section.title} (${section.projects.length})`}
      </span>
      <span className="h-px flex-1 bg-stone-200" aria-hidden="true" />
    </h3>
    <div className="space-y-4">
      {section.projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  </section>
);

export default ProjectSection;
