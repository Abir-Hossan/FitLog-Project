import Image from "next/image";

export function Hero() {
  return (
    <section className="hero-panel">
      <div className="max-w-2xl">
        <p className="eyebrow">WORKOUT LIBRARY</p>
        <h1 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.93] tracking-tight text-white sm:text-6xl lg:text-7xl">
          TRAIN WITH INTENT.
          <br />
          LOG EVERY SET.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-6 text-muted sm:text-base">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a href="#library" className="btn-primary mt-7 inline-flex">
          BROWSE WORKOUTS
        </a>
      </div>
      <div className="relative hidden min-h-64 items-end justify-center md:flex">
        <Image
          src="/banner.png"
          alt="Gym exercise illustration"
          width={390}
          height={320}
          priority
          className="max-h-80 w-auto object-contain"
        />
      </div>
    </section>
  );
}
