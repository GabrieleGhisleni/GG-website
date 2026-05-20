import SocialLinks from './SocialLinks';
import { SOCIALS } from '../data/socials';

const About = () => (
  <section id="about" className="mx-auto max-w-3xl px-6 py-24 font-body text-ink">
    <h2 className="mb-8 text-center text-3xl font-extrabold text-brand-deep">About me</h2>

    <div className="space-y-5 text-lg leading-relaxed">
      <p>
        I started with a Bachelor's in Philosophy and a Master's in Data Science.
        Since then I've moved deep into AI and data engineering — designing and
        shipping production LLM agents, retrieval pipelines, and document-intelligence
        systems.
      </p>
      <p>
        Currently at SpazioDati, I architect and build the AI products powering
        company-intelligence, credit, and procurement use cases — from a
        centralized agent hub (<a href="#project-ai-wunderkammer" className="text-brand hover:underline">AI Wunderkammer</a>)
        to a graph-based catalog-search agent (<a href="#project-sentovel" className="text-brand hover:underline">Sentovel</a>)
        to OCR/VLM benchmarks on Italian management reports. I also co-own the team's
        Langfuse + LiteLLM stack that fronts all our LLM traffic, and maintain{' '}
        <a href={SOCIALS.bytebrush} target="_blank" rel="noreferrer" className="text-brand hover:underline">
          ByteBrush
        </a>
        {' '}as a public record of what I'm studying.
      </p>
      <p>
        Off-hours: a side project for a life coach (Stripe + capacity-limited
        bookings), and table tennis 🏓, hiking ⛰️, climbing 🧗🏼, salsa 💃🏼 when
        the laptop closes.
      </p>
    </div>

    <div className="mt-10 flex justify-center">
      <SocialLinks variant="inline" />
    </div>
  </section>
);

export default About;
