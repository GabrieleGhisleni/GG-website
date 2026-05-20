import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';

const scrollOneViewport = () =>
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

const Hero = () => (
  <section className="relative h-dvh text-stone-100 overflow-hidden">
    {/* Fallback color — always paints first */}
    <div className="absolute inset-0 z-0 bg-bg-hero-fallback" />
    {/* Background image */}
    <img
      src={`${import.meta.env.BASE_URL}assets/images/upscaled_background.webp`}
      alt=""
      loading="eager"
      fetchpriority="high"
      decoding="async"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-right-top"
    />
    {/* Dark overlay for text readability */}
    <div className="pointer-events-none absolute inset-0 z-[2] bg-black/50" />
    {/* Bottom fade */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-bg-hero-fallback to-transparent" />

    {/* Content: original layout — text only, with new bouncer */}
    <div className="relative z-[3] flex h-full flex-col items-center justify-center gap-10 px-8 md:flex-row md:justify-between md:px-24 lg:px-36">

      <div className="flex flex-col items-center text-center md:items-start md:text-left font-display">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-brand/70 md:text-xs">
          Portfolio
        </p>
       <h1 className="text-3xl font-semibold leading-tight md:leading-none md:text-6xl lg:text-7xl">
  <span className="text-sky-300 md:text-brand">G</span>abriele&nbsp;
  <br className="hidden md:block" />
  <span className="text-sky-300 md:text-brand">G</span>hisleni
</h1>
        <div aria-label="Roles: Data Scientist, ML Engineer, AI Engineer, Full Stack" className="mt-3 w-full flex-col items-center flex h-6 items-center justify-center">
          <TypeAnimation
            sequence={[
                  'AI Systems Engineer', 2000,
    'Full Stack Engineer', 2000,
    'Data Scientist', 2000,
    'LLM & Agent Engineering', 2000,
        'Table tennis enthusiast 🏓', 2000,
    
    'Hiking & climbing ⛰️', 2000,
            ]}
            wrapper="span"
            cursor
            repeat={Infinity}
            aria-hidden
            className="text-sm text-stone-300 italic md:text-xl"
          />
        </div>

        {/* Bouncer: top line + chevron beneath */}
        <button
          type="button"
          onClick={scrollOneViewport}
          aria-label="Scroll to content"
          className="group mt-7 md:mt-5 flex w-full flex-col items-center"
        >
          <span className="block h-px w-full bg-gradient-to-r from-transparent via-brand/60 to-transparent transition-opacity group-hover:via-brand" />
          <ChevronDown className="mt-3 h-5 w-5 text-brand/70 transition-colors motion-safe:animate-bounce group-hover:text-brand" />
        </button>
      </div>

    </div>
  </section>
);

export default Hero;
