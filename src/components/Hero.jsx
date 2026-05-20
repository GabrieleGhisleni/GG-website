import { TypeAnimation } from 'react-type-animation';
import { ChevronDown } from 'lucide-react';

const scrollOneViewport = () =>
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

const Hero = () => (
  <section className="relative min-h-screen text-stone-100 overflow-hidden">
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

    {/* Content: two-column on desktop, stacked on mobile */}
    <div className="relative z-[3] flex min-h-screen flex-col items-center justify-center gap-10 px-8 md:flex-row md:justify-between md:px-24 lg:px-36">

      {/* Left: text */}
      <div className="flex flex-col items-center text-center md:items-start md:text-left font-display">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-brand/70 md:text-xs">
          Portfolio
        </p>
        <h1 className="text-3xl font-semibold leading-tight md:text-6xl lg:text-7xl">
          Gabriele<br className="hidden md:block" /> Ghisleni
        </h1>
        <div aria-label="Roles: Data Scientist, ML Engineer, AI Engineer, Full Stack, Web Developer" className="mt-3">
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
            className="text-sm text-stone-300 italic md:text-xl"
          />
        </div>
        <button
          type="button"
          onClick={scrollOneViewport}
          aria-label="Scroll to content"
          className="mt-10 grid h-10 w-10 place-items-center rounded-full border border-brand/40 text-brand/60 transition-colors motion-safe:animate-bounce hover:border-brand/70 hover:text-brand"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      {/* Right: photo — temporarily hidden */}
      {/* <div className="flex-shrink-0">
        <div className="rounded-full bg-gradient-to-br from-brand/40 to-brand-deep/25 p-[3px] shadow-[0_0_28px_rgba(63,166,230,0.2),0_0_56px_rgba(63,166,230,0.08)]">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/photo1.jpg`}
            alt="Gabriele Ghisleni"
            className="h-[10vh] w-[10vh] rounded-full object-cover md:h-48 md:w-48 lg:h-56 lg:w-56"
            style={{ objectPosition: '50% 40%' }}
          />
        </div>
      </div> */}

    </div>
  </section>
);

export default Hero;
