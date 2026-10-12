import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Clock, MapPin, Pause, Phone, Play } from "lucide-react";
import { clsx } from "clsx";

const UBER =
  "https://www.ubereats.com/ca/store/indian-delights-mayfield/3LF-ntIJROqJeg1mlIjdwQ";
const SKIP = "https://www.skipthedishes.com/indian-delights-mayfield-rd";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=Indian+Delights+3088+Mayfield+Rd+Unit+1+Brampton+ON+L6Z+0E3";
const IG = "https://www.instagram.com/indiandelightrestaurant/";
const TEL = "tel:+19054956567";

const SHOTS = [
  {
    src: "/food/butter-chicken.jpg",
    video: "/food/hero.mp4",
    title: "Butter chicken",
    line: "Tomato, cream, a slow simmer",
  },
  {
    src: "/food/naan.jpg",
    video: "/food/naan.mp4",
    title: "Garlic naan",
    line: "Blistered against clay",
  },
  {
    src: "/food/palak.jpg",
    video: "/food/palak.mp4",
    title: "Palak paneer",
    line: "Spinach, cream, fresh paneer",
  },
  {
    src: "/food/biryani.jpg",
    video: "/food/biryani.mp4",
    title: "Chicken biryani",
    line: "Saffron basmati, bone-in",
  },
  {
    src: "/food/bhature.jpg",
    video: "/food/bhature.mp4",
    title: "Chole bhature",
    line: "Puffed bread, chickpea masala",
  },
  {
    src: "/food/thali.jpg",
    video: "/food/thali.mp4",
    title: "The thali",
    line: "A whole table on one tray",
  },
  {
    src: "/food/lassi.jpg",
    video: "/food/lassi.mp4",
    title: "Kesar lassi",
    line: "Saffron, pistachio, cold",
  },
] as const;

const BEATS = [
  {
    src: "/food/naan.jpg",
    video: "/food/naan.mp4",
    kicker: "Movement 01",
    title: "The clay goes first.",
    body: "The tandoor is brought to 480°C before a single naan meets it. Garlic butter, charred bubbles, the smell that reaches the door on Mayfield before you do.",
  },
  {
    src: "/food/palak.jpg",
    video: "/food/palak.mp4",
    kicker: "Movement 02",
    title: "Then the pot takes its time.",
    body: "Whole spices toasted each morning. Curries held low — palak paneer with garlic, dal that stays on the heat, gravies finished with cream only at the end.",
  },
  {
    src: "/food/thali.jpg",
    video: "/food/thali.mp4",
    kicker: "Movement 03",
    title: "Plated late, still bright.",
    body: "From Amritsari kulcha to a full thali, this is the food the kitchen grew up on. Served in the heart of Brampton, well past midnight on the weekends.",
  },
] as const;

function Film({
  src,
  poster,
  label,
  className,
  active = true,
}: {
  src: string;
  poster: string;
  label?: string;
  className?: string;
  active?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!active || reduce) {
      video.pause();
      return;
    }
    void video.play().catch(() => {});
  }, [active, src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload={active ? "metadata" : "none"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

type Group = "Tandoor" | "Curries & rice" | "Thali" | "Street" | "Drinks" | "Counter";

const GROUPS: Array<Group | "All"> = [
  "All",
  "Tandoor",
  "Curries & rice",
  "Thali",
  "Street",
  "Drinks",
  "Counter",
];

const MENU: Array<{
  group: Group;
  name: string;
  price: string;
  blurb: string;
  veg: boolean;
  flag?: string;
}> = [
  {
    group: "Tandoor",
    name: "Amritsari Kulcha",
    price: "19.99",
    blurb: "Potato and paneer stuffed bread from the tandoor, with dahi, achar, butter, and chana.",
    veg: true,
  },
  {
    group: "Tandoor",
    name: "Garlic Naan",
    price: "4.99",
    blurb: "Butter-brushed, with garlic and a scatter of herbs.",
    veg: true,
  },
  {
    group: "Curries & rice",
    name: "Chicken Biryani, bone-in",
    price: "20.99",
    blurb: "Saffron basmati cooked with bone-in chicken. Listed as a buy-one offer on Skip.",
    veg: false,
    flag: "Offer",
  },
  {
    group: "Curries & rice",
    name: "Shahi Paneer",
    price: "22.99",
    blurb: "Cottage cheese in a buttered tomato-cream sauce. Skip lists this as a buy-one offer.",
    veg: true,
    flag: "Offer",
  },
  {
    group: "Curries & rice",
    name: "Veg rice bowl",
    price: "10.99",
    blurb: "Rice with one curry — shahi paneer, dal makhani, kadhi pakora, or chana masala.",
    veg: true,
  },
  {
    group: "Curries & rice",
    name: "Butter chicken rice bowl",
    price: "12.99",
    blurb: "The same bowl, finished with butter chicken.",
    veg: false,
  },
  {
    group: "Thali",
    name: "Vegetarian thali",
    price: "13.99",
    blurb: "Two veg curries, dal, rice, butter naan or tandoori roti, salad, and the chef’s dessert.",
    veg: true,
  },
  {
    group: "Thali",
    name: "Non-veg thali",
    price: "17.99",
    blurb: "Butter chicken, lamb curry, dal, rice, bread, salad, and dessert.",
    veg: false,
  },
  {
    group: "Thali",
    name: "Meal for two, veg",
    price: "50.00",
    blurb: "Dal makhani, one veg curry, three naan, matar jeera pulao, raita, dessert.",
    veg: true,
  },
  {
    group: "Thali",
    name: "Meal for four, non-veg",
    price: "76.00",
    blurb: "Dal makhani, two curries, five naan, pulao, raita, and dessert.",
    veg: false,
  },
  {
    group: "Street",
    name: "Chole bhature",
    price: "17.99",
    blurb: "Chickpeas in onion-spice masala with puffed bhature. Skip buy-one offer.",
    veg: true,
    flag: "Offer",
  },
  {
    group: "Street",
    name: "Samosa chole chaat",
    price: "12.99",
    blurb: "Samosa, chana, yogurt, mint, and tamarind.",
    veg: true,
    flag: "Offer",
  },
  {
    group: "Street",
    name: "Paneer tikka wrap",
    price: "11.99",
    blurb: "Flatbread, paneer tikka, lettuce, onion, and the house sauce.",
    veg: true,
  },
  {
    group: "Street",
    name: "Chicken tikka wrap",
    price: "12.99",
    blurb: "The same wrap with chicken tikka.",
    veg: false,
  },
  {
    group: "Drinks",
    name: "Sweet lassi",
    price: "7.99",
    blurb: "Cold, creamy yogurt. Salt lassi is the same price.",
    veg: true,
  },
  {
    group: "Drinks",
    name: "Kesar malai lassi",
    price: "8.99",
    blurb: "Saffron yogurt, cream, pistachio.",
    veg: true,
  },
  {
    group: "Drinks",
    name: "Mango shake",
    price: "7.99",
    blurb: "Mango pulp and milk. Thums Up and pops are on the cold board too.",
    veg: true,
  },
  {
    group: "Counter",
    name: "Chole bhature salad plate",
    price: "7.99",
    blurb: "In-store plate. A free lassi, mango shake, masala tea, or pop comes with it.",
    veg: true,
    flag: "Counter",
  },
  {
    group: "Counter",
    name: "Kulcha & chole",
    price: "9.99",
    blurb: "Amritsari kulcha with chole at the counter, drink included.",
    veg: true,
    flag: "Counter",
  },
  {
    group: "Counter",
    name: "Two stuffed paratha & dal",
    price: "10.00",
    blurb: "Tawa parathas with dal. Posted by the kitchen; ask if tonight’s board matches.",
    veg: true,
    flag: "Counter",
  },
  {
    group: "Counter",
    name: "Tandoori paratha",
    price: "10.00",
    blurb: "One tandoori paratha with the free drink.",
    veg: true,
    flag: "Counter",
  },
];

const HOURS = [
  { dow: 0, label: "Sunday", text: "11:00 AM – 11:45 PM", start: 11 * 60, end: 23 * 60 + 45 },
  { dow: 1, label: "Monday", text: "1:00 PM – 11:45 PM", start: 13 * 60, end: 23 * 60 + 45 },
  { dow: 2, label: "Tuesday", text: "1:00 PM – 11:45 PM", start: 13 * 60, end: 23 * 60 + 45 },
  { dow: 3, label: "Wednesday", text: "1:00 PM – 11:45 PM", start: 13 * 60, end: 23 * 60 + 45 },
  { dow: 4, label: "Thursday", text: "1:00 PM – 11:45 PM", start: 13 * 60, end: 23 * 60 + 45 },
  { dow: 5, label: "Friday", text: "1:00 PM – 1:00 AM", start: 13 * 60, end: 25 * 60 },
  { dow: 6, label: "Saturday", text: "11:00 AM – 2:00 AM", start: 11 * 60, end: 26 * 60 },
];

const QUOTES = [
  {
    quote: "A new go-to for fresh food and an authentic taste of India.",
    name: "Parvir M.",
  },
  {
    quote: "Must try their dal makhani and lamb rogan josh. Cooked by a proper chef.",
    name: "Annabelle",
  },
  {
    quote: "Reasonable prices and good serving sizes. We all loved it.",
    name: "Sandy T.",
  },
];

const TICKER = [
  "Tandoor",
  "Kulcha",
  "Dal makhani",
  "Biryani",
  "Palak paneer",
  "Lassi",
  "Bhature",
  "Late plates",
];

function clock(mins: number) {
  const m = ((mins % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const min = m % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 || 12;
  return `${h12}:${String(min).padStart(2, "0")} ${suffix}`;
}

function readToronto() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  return { dow: map[weekday] ?? 0, minutes: hour * 60 + minute };
}

function serviceNow() {
  const { dow, minutes } = readToronto();
  const yesterday = HOURS[(dow + 6) % 7];
  if (yesterday.end > 1440 && minutes < yesterday.end - 1440) {
    return {
      open: true,
      dow: yesterday.dow,
      detail: `Open now · until ${clock(yesterday.end - 1440)}`,
    };
  }
  const today = HOURS[dow];
  if (minutes >= today.start && minutes < today.end) {
    const until = today.end >= 1440 ? clock(today.end - 1440) : clock(today.end);
    return { open: true, dow: today.dow, detail: `Open now · until ${until}` };
  }
  if (minutes < today.start) {
    return { open: false, dow: today.dow, detail: `Closed · opens ${clock(today.start)}` };
  }
  const next = HOURS[(dow + 1) % 7];
  return {
    open: false,
    dow: today.dow,
    detail: `Closed · opens ${next.label} ${clock(next.start)}`,
  };
}

export function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [beat, setBeat] = useState(0);
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  const [shot, setShot] = useState(0);
  const [status, setStatus] = useState<ReturnType<typeof serviceNow> | null>(null);
  const beatRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const tick = () => setStatus(serviceNow());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      videoRef.current?.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const nodes = beatRefs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const index = Number((best.target as HTMLElement).dataset.beat);
        if (!Number.isNaN(index)) setBeat(index);
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0.25, 0.6] },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  function toggleFilm() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  const visible = MENU.filter((item) => group === "All" || item.group === group);
  const activeShot = SHOTS[shot];

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <div
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-saffron"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-4">
        <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full py-2 pr-2 pl-4 md:pl-5">
          <a href="#top" className="font-display text-lg leading-none tracking-tight md:text-xl">
            Indian Delights
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a href="#reel" className="transition-colors hover:text-ink">Reel</a>
            <a href="#story" className="transition-colors hover:text-ink">Story</a>
            <a href="#menu" className="transition-colors hover:text-ink">Menu</a>
            <a href="#visit" className="transition-colors hover:text-ink">Visit</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={TEL}
              className="hidden h-11 items-center gap-2 rounded-full px-3 text-sm text-ink sm:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              905-495-6567
            </a>
            <a
              href={UBER}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-1 rounded-full bg-ink px-4 text-sm font-medium text-paper transition-transform duration-150 ease-out active:scale-[0.96]"
            >
              Order
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="pb-28 md:pb-8">
        <section className="px-3 pt-20 md:px-6 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="frame relative h-[78svh] min-h-[540px] md:h-[calc(100svh-7rem)]">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                poster="/food/butter-chicken.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Slow push-in on a bowl of butter chicken in morning light"
              >
                <source src="/food/hero.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ivory via-ivory/15 to-transparent" />
              <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-3">
                <p className="glass rounded-full px-3 py-1.5 text-xs tracking-wide text-ink">
                  Shot 01 · Butter chicken · Mayfield
                </p>
                <button
                  type="button"
                  onClick={toggleFilm}
                  className="glass inline-flex size-11 items-center justify-center rounded-full text-ink transition-transform duration-150 active:scale-[0.96]"
                  aria-label={playing ? "Pause the film" : "Play the film"}
                >
                  {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
                </button>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-paper/40">
                <div className="meter h-full bg-saffron" />
              </div>
            </div>

            <div className="relative z-10 -mt-28 px-1 sm:-mt-36 md:-mt-44 md:px-8">
              <div className="glass rise max-w-xl rounded-3xl p-6 sm:p-8">
                <p className="text-xs tracking-widest text-muted uppercase">
                  Brampton · Est. with patience
                </p>
                <h1 className="mt-3 font-display text-5xl leading-[0.95] font-medium tracking-tight sm:text-6xl">
                  Light on the table.
                  <span className="mt-1 block italic text-saffron">Fire in the clay.</span>
                </h1>
                <p className="d1 rise mt-4 max-w-md text-base leading-relaxed text-muted">
                  Serving quality Indian food for every taste — smoky tandoor, slow curries,
                  made fresh, and kept open late on Mayfield Road.
                </p>
                <div className="d2 rise mt-6 flex flex-wrap gap-2">
                  <a
                    href={UBER}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-transform duration-150 active:scale-[0.96]"
                  >
                    Uber Eats
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                  <a
                    href={SKIP}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center rounded-full border border-line bg-paper px-5 text-sm font-medium text-ink transition-transform duration-150 active:scale-[0.96]"
                  >
                    SkipTheDishes
                  </a>
                  <a
                    href={TEL}
                    className="inline-flex h-12 items-center gap-2 rounded-full px-3 text-sm text-ink sm:hidden"
                  >
                    <Phone className="size-4" aria-hidden />
                    Call
                  </a>
                </div>
                <p className="d3 rise mt-5 inline-flex items-center gap-2 text-sm">
                  <span
                    className={clsx(
                      "size-2 rounded-full",
                      status?.open ? "bg-saffron" : "bg-line",
                    )}
                    aria-hidden
                  />
                  <span className="tabular-nums">{status?.detail ?? "Checking hours…"}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker mt-10 overflow-hidden border-y border-line py-3" aria-hidden>
          <div className="ticker-track">
            {[...TICKER, ...TICKER].map((word, i) => (
              <span key={`${word}-${i}`} className="px-4 font-display text-lg text-muted italic">
                {word}
                <span className="ml-8 text-saffron not-italic">·</span>
              </span>
            ))}
          </div>
        </div>

        <section id="reel" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="reveal flex items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">The reel</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
                Seven shots, one kitchen.
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm text-muted md:block">
              Every plate is a moving shot. Tap a frame and the stage follows.
            </p>
          </div>

          <div className="reveal mt-8 grid items-stretch gap-4 lg:grid-cols-12">
            <figure className="frame relative min-h-[320px] lg:col-span-7 lg:min-h-[520px]">
              {SHOTS.map((item, index) => (
                <Film
                  key={item.video}
                  src={item.video}
                  poster={item.src}
                  label={item.title}
                  active={index === shot}
                  className={clsx(
                    "shot absolute inset-0 h-full w-full object-cover",
                    index === shot ? "opacity-100" : "pointer-events-none opacity-0",
                  )}
                />
              ))}
              <figcaption className="glass absolute inset-x-4 bottom-4 rounded-2xl px-4 py-3">
                <p className="font-display text-2xl">{activeShot.title}</p>
                <p className="text-sm text-muted">{activeShot.line}</p>
              </figcaption>
            </figure>
            <div className="reel flex snap-x gap-3 overflow-x-auto lg:col-span-5 lg:grid lg:snap-none lg:grid-cols-2 lg:content-start lg:overflow-visible">
              {SHOTS.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setShot(index)}
                  aria-pressed={shot === index}
                  className={clsx(
                    "w-36 shrink-0 snap-start overflow-hidden rounded-2xl text-left transition-transform duration-150 active:scale-[0.96] lg:w-auto",
                    shot === index ? "ring-2 ring-saffron ring-offset-2 ring-offset-ivory" : "",
                  )}
                >
                  <Film
                    src={item.video}
                    poster={item.src}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="block px-1 pt-2 text-sm">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="mx-auto grid max-w-6xl gap-10 px-4 py-8 md:grid-cols-2 md:px-6 md:py-16">
          <div className="md:sticky md:top-28 md:h-[72vh]">
            <div className="frame relative h-72 sm:h-96 md:h-full">
              {BEATS.map((item, index) => (
                <Film
                  key={item.video}
                  src={item.video}
                  poster={item.src}
                  active={beat === index}
                  className={clsx(
                    "shot absolute inset-0 h-full w-full object-cover",
                    beat === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
                  )}
                />
              ))}
              <p className="glass absolute top-4 left-4 rounded-full px-3 py-1.5 text-xs tracking-wide">
                {BEATS[beat].kicker}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-16 md:py-10">
            <div className="reveal">
              <p className="text-xs tracking-widest text-muted uppercase">Our story</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
                Fire, spice, and a little patience.
              </h2>
            </div>
            {BEATS.map((item, index) => (
              <article
                key={item.title}
                data-beat={index}
                ref={(node) => {
                  beatRefs.current[index] = node;
                }}
                className="reveal max-w-md"
              >
                <h3 className="font-display text-3xl tracking-tight">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-widest text-muted uppercase">The board</p>
              <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
                What leaves the pass.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Delivery prices are from Skip. Counter specials are from the kitchen’s own posts
              and can change — call if you’re coming in for one.
            </p>
          </div>

          <div className="reveal mt-8 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu groups">
            {GROUPS.map((name) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={group === name}
                onClick={() => setGroup(name)}
                className={clsx(
                  "h-11 shrink-0 rounded-full px-4 text-sm transition-transform duration-150 active:scale-[0.96]",
                  group === name ? "bg-ink text-paper" : "border border-line bg-paper text-ink",
                )}
              >
                {name}
              </button>
            ))}
          </div>

          <ul className="mt-6 divide-y divide-line">
            {visible.map((item) => (
              <li key={item.name} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl tracking-tight">{item.name}</h3>
                    {item.flag ? (
                      <span className="rounded-full border border-line bg-paper px-2 py-0.5 text-xs text-saffron">
                        {item.flag}
                      </span>
                    ) : null}
                    <span className="leader hidden sm:block" />
                  </div>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">{item.blurb}</p>
                </div>
                <p className="font-display text-xl tabular-nums sm:text-right">
                  <span className="mr-2 text-xs tracking-wide text-muted uppercase">
                    {item.veg ? "Veg" : "Non-veg"}
                  </span>
                  ${item.price}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-3 md:grid-cols-3">
            {QUOTES.map((item) => (
              <figure key={item.name} className="reveal glass rounded-3xl p-6">
                <blockquote className="font-display text-2xl leading-snug tracking-tight">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted">{item.name} · Uber Eats</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">3.9 from 3,000+ ratings on Uber Eats.</p>
        </section>

        <section id="visit" className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div className="frame relative min-h-[420px]">
            <Film
              src="/food/lassi.mp4"
              poster="/food/lassi.jpg"
              label="Saffron lassi in a tall glass by a bright window"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="reveal glass rounded-3xl p-6 sm:p-8">
            <p className="text-xs tracking-widest text-muted uppercase">Find us</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">Mayfield, unit 1.</h2>
            <p className="mt-3 flex items-start gap-2 text-muted">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                3088 Mayfield Rd, Unit 1
                <br />
                Brampton, ON L6Z 0E3
              </span>
            </p>
            <p className="mt-3 flex items-center gap-2">
              <Phone className="size-4" aria-hidden />
              <a href={TEL} className="underline decoration-line underline-offset-4">
                (905) 495-6567
              </a>
            </p>
            <ul className="mt-6 space-y-2">
              {HOURS.map((row) => (
                <li
                  key={row.label}
                  className={clsx(
                    "flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-sm",
                    status?.dow === row.dow ? "bg-paper" : "",
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    {status?.dow === row.dow ? <Clock className="size-3.5 text-saffron" aria-hidden /> : null}
                    {row.label}
                  </span>
                  <span className="tabular-nums text-muted">{row.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-transform duration-150 active:scale-[0.96]"
              >
                Directions
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center rounded-full border border-line bg-paper px-5 text-sm"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-lg text-ink">Indian Delights</p>
          <p>3088 Mayfield Rd, Unit 1 · Brampton</p>
          <div className="flex gap-4">
            <a href={UBER} target="_blank" rel="noreferrer" className="hover:text-ink">Uber Eats</a>
            <a href={SKIP} target="_blank" rel="noreferrer" className="hover:text-ink">Skip</a>
            <a href={IG} target="_blank" rel="noreferrer" className="hover:text-ink">Instagram</a>
          </div>
        </div>
      </footer>

      <nav className="glass fixed inset-x-3 bottom-3 z-40 flex items-center justify-around rounded-full px-2 py-1 md:hidden">
        <a href="#reel" className="inline-flex h-12 items-center px-3 text-sm">Reel</a>
        <a href="#menu" className="inline-flex h-12 items-center px-3 text-sm">Menu</a>
        <a href="#visit" className="inline-flex h-12 items-center px-3 text-sm">Visit</a>
        <a href={UBER} target="_blank" rel="noreferrer" className="inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm text-paper">
          Order
        </a>
      </nav>
    </div>
  );
}
