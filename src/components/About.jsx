import SocialLinks from './SocialLinks';

const About = () => (
  <section id="about" className="flex min-h-screen items-center bg-white px-6 py-24">
    <div className="mx-auto max-w-3xl text-ink">
      <h2 className="mb-8 text-3xl font-extrabold text-brand-deep">About me</h2>

      <div className="space-y-5 text-base leading-relaxed text-stone-700">
        <img
          src={`${import.meta.env.BASE_URL}assets/images/photo1.jpg`}
          alt="Gabriele Ghisleni"
          className="mb-6 h-64 w-full rounded-lg object-cover shadow-md sm:float-left sm:mb-3 sm:mr-6 sm:h-auto sm:w-40"
          style={{ aspectRatio: '2/3', objectPosition: '50% 20%' }}
        />
        <p>
          Data Science master's, with a Philosophy degree before it. The mix surprised people more
          than it surprised me: Philosophy taught me to question how a problem is framed before
          reaching for a tool, and Data Science gave me the tools to actually ship the answer. I've
          always cared more about the problem than about the tech stack, which is probably why I
          ended up at the intersection of language, data, and systems, and why most of what I find
          interesting starts from a question rather than from a framework.
        </p>
        <p>
          I work at SpazioDati on the AI layer powering company intelligence, credit, and
          procurement products: production LLM agents, retrieval pipelines, an agent hub, a
          graph-based catalog-search agent, OCR/VLM benchmarks on Italian management reports. I
          co-own the team's Langfuse + LiteLLM stack that fronts all our LLM traffic, and keep a
          running log of what I'm learning and building on the side.
        </p>
        <p>
          Outside of work I built and maintain a full booking platform for Sofia Riggi's coaching
          practice (
          <a
            href="https://liveyourownlife.it"
            target="_blank"
            rel="noreferrer"
            className="text-brand hover:underline"
          >
            LiveYourOwnLife
          </a>
          ), handling scheduling, Stripe payments, and capacity-limited sessions end to end.
        </p>
      </div>

      <div className="mt-10 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          When the laptop closes
        </p>
        <p className="text-base text-stone-600">
          Table tennis 🏓 &nbsp;·&nbsp; Hiking ⛰️ &nbsp;·&nbsp; Climbing 🧗🏼 &nbsp;·&nbsp; Salsa 💃🏼
        </p>
      </div>

      <div className="mt-10">
        <SocialLinks variant="inline" />
      </div>
    </div>
  </section>
);

export default About;
