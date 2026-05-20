import { PROJECT_SECTIONS } from '../data/projects';
import ProjectSection from './ProjectSection';
import SectionStickyBar from './SectionStickyBar';

const Projects = () => (
  <section id="projects" className="bg-stone-50">
    <SectionStickyBar />
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-12 text-3xl font-extrabold text-brand-deep">Projects</h2>
      {PROJECT_SECTIONS.map(s => <ProjectSection key={s.slug} section={s} />)}
    </div>
  </section>
);

export default Projects;
