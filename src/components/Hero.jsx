import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';

const scrollOneViewport = () =>
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

const Hero = () => (
  <section className="relative min-h-screen bg-bg-hero-fallback text-stone-100 overflow-hidden">
    <img
      src={`${import.meta.env.BASE_URL}assets/images/upscaled_background.webp`}
      alt=""
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
    />

    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center font-display">
      <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
        Gabriele Ghisleni
      </h1>

      <div aria-label="Roles: Data Scientist, ML Engineer, AI Engineer, Full Stack, Web Developer">
        <TypeAnimation
          sequence={[
            'Data Scientist', 2000,
            'ML Engineer', 2000,
            'AI Engineer', 2000,
            'Full Stack', 2000,
            'Web Developer', 2000,
          ]}
          wrapper="span"
          cursor
          repeat={Infinity}
          aria-hidden
          className="mt-4 text-2xl italic md:text-3xl"
        />
      </div>

      <button
        type="button"
        onClick={scrollOneViewport}
        aria-label="Scroll to content"
        className="mt-16 grid h-16 w-16 place-items-center rounded-full border-4 border-brand/50 text-brand motion-safe:animate-bounce hover:bg-brand/10"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </div>
  </section>
);

export default Hero;
