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
          I'm an AI / ML Engineer at SpazioDati (ION Group), where I design and build multi-agent
          systems and production LLM infrastructure: agentic workflows, RAG pipelines, document
          intelligence, inference serving. Recent work spans a catalog-aware text-to-SQL agent over
          our internal tables, the centralised multi-agent hub now deployed across our live
          products, the company-wide LLM gateway in front of all internal AI traffic, and
          self-hosted model serving on GPU.
        </p>
        <p>
          I like owning it end-to-end: the prompt, the retrieval, the GPU, the API on top, the
          observability underneath. My fullstack background helps here, i'm comfortable from the
          database up to the app backend, not only the model in between.
        </p>
        <p>
          Off-hours I solo-build and operate the platform powering{' '}
          <a
            href="https://liveyourownlife.it"
            target="_blank"
            rel="noreferrer"
            className="text-brand hover:underline"
          >
            LiveYourOwnLife
          </a>
          , a small e-commerce and coaching business: digital product sales, paid live-event
          ticketing, Stripe webhooks for payment-to-access provisioning, an operator console.
          Deployed on AWS Lambda.
        </p>
        <p>
          M.Sc. Data Science (Trento), B.Sc. Philosophy (Pavia). The mix surprised people more than
          it surprised me: Philosophy taught me to question how a problem is framed before reaching
          for a tool; Data Science gave me the tools to actually ship the answer. Italian native,
          English C1, Spanish intermediate.
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
