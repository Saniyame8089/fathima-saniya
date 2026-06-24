import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  Moon,
  Sun,
  Menu,
  X,
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Send,
  ArrowRight,
  Globe,
  Layers,
  Wrench,
  Bug,
  Users,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import saniyaPhoto from "@/assets/saniya-profile.jpg";
import mobifixImg from "@/assets/projects/mobifix.png";
import coorgHolidaysImg from "@/assets/projects/coorg-holidays.png";
import boomyImg from "@/assets/projects/boomy.png";
import coorgGreenViewImg from "@/assets/projects/coorg-green-view.png";
import coorgDreamLandImg from "@/assets/projects/coorg-dream-land.png";
import futurbrixImg from "@/assets/projects/futurbrix.png";
import spicesHutImg from "@/assets/projects/spices-hut.png";
import hiqImg from "@/assets/projects/hiq.png";
import justStayHomeImg from "@/assets/projects/just-stay-home.png";
import mistyRiverImg from "@/assets/projects/misty-river.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fathima Saniya M E — Web Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Fathima Saniya M E — Web Developer specializing in WordPress, Wix and modern frontend. Explore projects, skills, and experience.",
      },
      { property: "og:title", content: "Fathima Saniya M E — Web Developer" },
      {
        property: "og:description",
        content:
          "Passionate Web Developer creating modern, responsive, and user-friendly digital experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

const TYPING_PHRASES = [
  "Web Developer",
  "WordPress Developer",
  "Frontend Developer",
  "Wix Specialist",
];

function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefers =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers ?? true;
    setDark(isDark);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function useTyping(phrases: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = phrases[i % phrases.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del && text === current) {
        setTimeout(() => setDel(true), 1400);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setI((v) => v + 1);
        return;
      }
      setText(del ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, phrases]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Portfolio() {
  const { dark, toggle } = useTheme();
  const typing = useTyping(TYPING_PHRASES);
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("home");
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(n.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster richColors position="top-right" />
      <Nav active={active} dark={dark} toggle={toggle} open={navOpen} setOpen={setNavOpen} />
      <Hero typing={typing} />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

/* ----------------------------- NAV ----------------------------- */
function Nav({
  active,
  dark,
  toggle,
  open,
  setOpen,
}: {
  active: string;
  dark: boolean;
  toggle: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-2" : "pt-3 sm:pt-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-2.5 backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "shadow-elegant border-border/60 bg-background/75"
              : "shadow-card"
          }`}
        >
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-display text-lg font-bold"
          >
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow ring-1 ring-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <span className="font-display text-base font-bold tracking-tight">S</span>
              <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-background" />
            </span>
            <span className="flex items-baseline leading-none">
              <span className="text-gradient tracking-tight">Saniya</span>
              <span className="text-muted-foreground/80 font-mono text-sm">.dev</span>
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 rounded-full border border-border/40 bg-background/40 px-1.5 py-1 backdrop-blur lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                  active === n.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === n.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-gradient-rose-gold shadow-glow animate-scale-in" />
                )}
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-border/50 bg-background/50 transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#contact"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-gradient-rose-gold px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow ring-1 ring-primary/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-elegant md:inline-flex"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
              <Sparkles size={14} className="relative" />
              <span className="relative">Hire Me</span>
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border/50 bg-background/50 transition hover:border-primary/40 hover:text-primary lg:hidden"
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-border/40 bg-background/75 p-3 shadow-elegant backdrop-blur-xl animate-fade-in lg:hidden">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                  active === n.id
                    ? "bg-gradient-rose-gold text-primary-foreground shadow-glow"
                    : "hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-rose-gold px-3 py-2 text-sm font-semibold text-primary-foreground shadow-glow"
            >
              <Sparkles size={14} /> Hire Me
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero({ typing }: { typing: string }) {
  const stack = ["WordPress", "Wix", "React", "JavaScript", "HTML/CSS", "PHP"];
  return (
    <section
      id="home"
      className="bg-hero relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--color-foreground)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-foreground)_6%,transparent)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      <FloatingBlobs />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 md:grid-cols-[1.1fr_1fr]">
        <div className="reveal">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for freelance &amp; full-time roles
          </div>
          <p className="mb-3 font-mono text-sm text-muted-foreground">
            <span className="text-accent">$</span> whoami
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-[3.75rem]">
            <span className="block text-foreground/80">Hi, I'm</span>
            <span className="text-gradient">Fathima Saniya</span>
            <span className="block text-foreground">M E.</span>
          </h1>
          <p className="mt-5 flex flex-wrap items-baseline gap-2 font-mono text-base text-muted-foreground sm:text-lg">
            <span className="text-primary">{">"}</span>
            <span className="text-foreground">I build </span>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary caret">
              {typing}
            </span>
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Crafting <span className="text-foreground">modern, responsive</span> and
            user-friendly digital experiences with WordPress, Wix and modern frontend
            technologies — turning ideas into pixel-perfect websites.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur transition hover:border-primary hover:text-primary"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-rose-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:translate-y-[-2px]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/60 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary hover:text-primary"
            >
              View Projects{" "}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-5 text-muted-foreground">
            <span className="font-mono text-xs uppercase tracking-widest">Find me</span>
            <span className="h-px flex-1 max-w-12 bg-border" />
            <a
              href="https://github.com/Saniyame8089"
              target="_blank"
              rel="noreferrer"
              className="transition hover:-translate-y-0.5 hover:text-primary"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/fathima-saniya-m-e/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:-translate-y-0.5 hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:saniyamefathima@gmail.com"
              className="transition hover:-translate-y-0.5 hover:text-primary"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-md">
          <div className="absolute -inset-10 rounded-[3rem] bg-gradient-primary opacity-30 blur-3xl" />
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-accent opacity-20 blur-2xl" />
          <div className="relative animate-float">
            {/* Decorative orbit rings */}
            <div className="absolute -inset-6 rounded-full border border-dashed border-primary/30" />
            <div className="absolute -inset-12 rounded-full border border-dashed border-accent/20" />

            <div className="relative rounded-[2rem] bg-gradient-rose-gold p-[2px] shadow-glow">
              <div className="overflow-hidden rounded-[1.85rem] bg-card">
                <img
                  src={saniyaPhoto}
                  alt="Fathima Saniya M E — Web Developer"
                  width={1254}
                  height={1254}
                  className="aspect-square w-full object-cover"
                />
              </div>
            </div>

            {/* Top-left badge: years */}
            <div className="glass absolute -left-4 top-8 rounded-2xl px-4 py-3 shadow-card sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                  <Sparkles size={16} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold leading-none">14+</p>
                  <p className="text-[10px] text-muted-foreground">Websites built</p>
                </div>
              </div>
            </div>


            {/* Bottom-right badge: specialty */}
            <div className="glass absolute -bottom-4 right-2 rounded-2xl px-4 py-3 shadow-card sm:right-6">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Specialty
              </p>
              <p className="font-display text-sm font-bold text-gradient">
                WordPress · Wix · React
              </p>
            </div>

            {/* Floating dot accents */}
            <span className="absolute -left-10 bottom-20 h-3 w-3 animate-pulse rounded-full bg-accent shadow-glow" />
            <span className="absolute right-10 -top-6 h-2 w-2 animate-pulse rounded-full bg-primary" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition hover:text-primary md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <span className="grid h-9 w-5 place-items-start rounded-full border border-border p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-primary" />
        </span>
      </a>
    </section>
  );
}

function FloatingBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute top-32 right-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
    </>
  );
}

/* ----------------------------- ABOUT ----------------------------- */
const EDUCATION = [
  {
    degree: "Bachelor of Engineering (B.E.) — Information Science",
    school: "Yenepoya Institute of Technology, Moodbidri, Mangalore",
    period: "2021 – 2025",
  },
  {
    degree: "Pre-University Course (PCMB)",
    school: "St. Michael's P.U. College, Madikeri",
    period: "2019 – 2021",
  },
  {
    degree: "SSLC",
    school: "St. Michael's High School, Madikeri",
    period: "2018 – 2019",
  },
];

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="reveal mx-auto mb-14 max-w-2xl text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="About Me" title="Designing solutions, not just visuals" />
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="reveal lg:col-span-3">
            <div className="glass rounded-2xl p-8 shadow-card">
              <p className="text-base leading-relaxed text-foreground/90">
                I am a passionate Web Developer with experience in designing and developing
                modern, responsive, and user-friendly websites. I specialize in{" "}
                <span className="font-semibold text-primary">WordPress, Wix, Shopify</span>, and
                front-end web solutions, with hands-on experience working on multiple real-time
                projects.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                I enjoy transforming ideas into creative digital experiences by focusing on clean
                design, functionality, and user experience. I am always eager to learn new
                technologies, improve my skills, and build impactful web solutions.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <Stat value="14+" label="Projects" />
                <Stat value="4+" label="Certifications" />
                <Stat value="100%" label="Dedication" />
              </div>
            </div>
          </div>
          <div className="reveal lg:col-span-2">
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
              <GraduationCap className="text-primary" size={20} /> Education
            </h3>
            <ol className="relative space-y-5 border-l-2 border-border pl-5">
              {EDUCATION.map((e) => (
                <li key={e.degree} className="relative">
                  <span className="absolute -left-[27px] top-3 h-3 w-3 rounded-full bg-gradient-primary shadow-glow" />
                  <div className="rounded-xl border border-border/40 bg-card/60 p-4 shadow-card backdrop-blur transition hover:border-primary/30 hover:shadow-glow">
                    <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary">
                      {e.period}
                    </span>
                    <p className="mt-2 font-semibold">{e.degree}</p>
                    <p className="text-sm text-muted-foreground">{e.school}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/50 p-4">
      <p className="font-display text-2xl font-bold text-gradient">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ----------------------------- EXPERIENCE ----------------------------- */
const EXPERIENCE = [
  {
    role: "Web Developer",
    company: "Techshaf",
    period: "May 2025 – May 2026",
    points: [
      "Built 14+ complete websites end-to-end",
      "Developed responsive WordPress and Wix websites",
      "Created functional and visually appealing web solutions",
      "Improved website layouts, usability, and user experience",
    ],
  },
];

const CERTS = [
  {
    title: "Certified Python Course",
    org: "Jumpwhere",
    period: "Jan 2025 – May 2025",
    desc: "Python fundamentals, data structures, OOP concepts, and automation basics.",
  },
  {
    title: "Enhancing Development & Operations using DevOps",
    org: "NSDC, Government of India",
    period: "Oct 2024",
    desc: "CI/CD workflows, Linux basics, version control, Jenkins, and cloud concepts.",
  },
  {
    title: "Data Science with Python",
    org: "Zephyr Technologies",
    period: "Nov 2023",
    desc: "Pandas, NumPy, Matplotlib, data preprocessing, visualization, ML basics.",
  },
  {
    title: "Android App Development",
    org: "Genesis",
    period: "Oct 2022",
    desc: "Built Android applications using Java and Android Studio.",
  },
];

function Experience() {
  return (
    <section id="experience" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Experience"
          title="My professional journey"
          desc="Real-world projects, internships, and certifications that shaped my craft."
        />
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="reveal">
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
              <Briefcase className="text-primary" size={20} /> Work Experience
            </h3>
            {EXPERIENCE.map((x) => (
              <div
                key={x.role}
                className="glass relative rounded-2xl p-6 shadow-card transition hover:translate-y-[-3px] hover:shadow-glow"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="font-display text-lg font-bold">{x.role}</h4>
                    <p className="text-sm text-primary">{x.company}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                    {x.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {x.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="reveal">
            <h3 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold">
              <Award className="text-accent" size={20} /> Certifications & Training
            </h3>
            <div className="space-y-4">
              {CERTS.map((c) => (
                <div
                  key={c.title}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-primary hover:translate-y-[-2px]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold leading-tight">{c.title}</p>
                      <p className="text-sm text-primary">{c.org}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                      {c.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SKILLS ----------------------------- */
const SKILL_GROUPS: { title: string; icon: React.ReactNode; items: { name: string; level: number }[] }[] = [
  {
    title: "Technical Skills",
    icon: <Code2 size={18} />,
    items: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "WordPress", level: 92 },
      { name: "Wix", level: 88 },
      { name: "Python (Basics)", level: 65 },
      { name: "Java (Basics)", level: 60 },
    ],
  },
  {
    title: "Tools & Technologies",
    icon: <Wrench size={18} />,
    items: [
      { name: "GitHub", level: 85 },
      { name: "Linux", level: 70 },
      { name: "Jenkins", level: 65 },
      { name: "AWS Basics", level: 60 },
    ],
  },
  {
    title: "Testing",
    icon: <Bug size={18} />,
    items: [
      { name: "Manual Testing", level: 80 },
      { name: "Functional Testing", level: 78 },
      { name: "UI Testing", level: 82 },
      { name: "Bug Reporting", level: 85 },
      { name: "Test Case Creation", level: 80 },
    ],
  },
  {
    title: "Soft Skills",
    icon: <Users size={18} />,
    items: [
      { name: "Communication", level: 90 },
      { name: "Teamwork", level: 92 },
      { name: "Problem Solving", level: 88 },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Skills"
          title="What I bring to the table"
          desc="A blend of frontend, CMS expertise, and a developer's mindset for quality."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((g) => (
            <div
              key={g.title}
              className="reveal glass rounded-2xl p-6 shadow-card transition hover:shadow-glow"
            >
              <div className="mb-5 flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                  {g.icon}
                </span>
                <h3 className="font-display text-lg font-bold">{g.title}</h3>
              </div>
              <div className="space-y-3">
                {g.items.map((s) => (
                  <div key={s.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-medium">{s.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{s.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-primary transition-[width] duration-1000"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SERVICES ----------------------------- */
const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: "Website Design & Development",
    desc: "Attractive, responsive, and user-friendly websites for businesses and individuals.",
  },
  {
    icon: <Layers size={22} />,
    title: "WordPress Development",
    desc: "Customized WordPress websites with modern layouts, functionality and responsive design.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Wix Website Development",
    desc: "Professional Wix websites with creative UI and smooth user experiences.",
  },
];

function Services() {
  return (
    <section id="services" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Services"
          title="Expertise services — let's check it out"
          desc="From concept to launch, I deliver websites that perform beautifully on every screen."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`reveal group relative overflow-hidden rounded-2xl border border-border p-7 shadow-card transition hover:translate-y-[-4px] hover:shadow-glow ${
                i === 1 ? "bg-gradient-primary text-primary-foreground" : "bg-card"
              }`}
            >
              <div
                className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ${
                  i === 1 ? "bg-white/20" : "bg-gradient-primary text-primary-foreground"
                }`}
              >
                {s.icon}
              </div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className={`mt-3 text-sm ${i === 1 ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                {s.desc}
              </p>
              <ArrowRight
                size={20}
                className="mt-6 transition group-hover:translate-x-1"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PROJECTS ----------------------------- */
const PROJECTS = [
  {
    name: "MobiFix DXB",
    url: "https://mobifixdxb.ae/",
    tech: ["WordPress", "PHP", "Responsive"],
    desc: "Professional service-based website with modern design, responsive pages, and user-friendly navigation.",
    image: mobifixImg,
  },
  {
    name: "The Coorg Holidays",
    url: "https://www.thecoorgholidays.in/",
    tech: ["WordPress", "Web Design"],
    desc: "Tourism website showcasing travel services with an attractive layout and smooth browsing experience.",
    image: coorgHolidaysImg,
  },
  {
    name: "Boomy AE",
    url: "https://boomy.ae/",
    tech: ["WordPress", "PHP", "UI"],
    desc: "Modern business website focusing on clean design, responsiveness, and functionality.",
    image: boomyImg,
  },
  {
    name: "Coorg Green View Homestay",
    url: "https://www.coorggreenviewhomestay.in/",
    tech: ["WordPress"],
    desc: "Hospitality website displaying accommodations, services, and customer information.",
    image: coorgGreenViewImg,
  },
  {
    name: "Coorg Dream Land Stay",
    url: "https://coorgdreamlandstay.com/",
    tech: ["WordPress", "Wix"],
    desc: "Responsive homestay website with modern visuals and mobile-friendly layouts.",
    image: coorgDreamLandImg,
  },
  {
    name: "FuturBrix",
    url: "https://futurbrix.com/",
    tech: ["WordPress", "PHP", "Frontend"],
    desc: "Corporate website focusing on branding and a clean user experience.",
    image: futurbrixImg,
  },
  {
    name: "Spice Hut Coorg",
    url: "https://spiceshutcoorg.com/",
    tech: ["WordPress", "Wix"],
    desc: "Responsive business website with attractive visuals and optimized layouts.",
    image: spicesHutImg,
  },
  {
    name: "HIQ Enterprise",
    url: "https://hiqenterprise.in/",
    tech: ["WordPress", "PHP", "HTML", "CSS", "Responsive Design"],
    desc: "Developed a professional business website with a clean responsive layout, organized content structure, smooth navigation, and user-friendly interface focused on delivering a modern digital experience.",
    image: hiqImg,
  },
  {
    name: "Just Stay Home",
    url: "https://juststayhome.in/",
    tech: ["WordPress", "Wix", "Website Design", "Responsive Development"],
    desc: "Designed and developed a modern website with an attractive interface, mobile-friendly pages, smooth user experience, and optimized layouts for better accessibility across devices.",
    image: justStayHomeImg,
  },
  {
    name: "Misty River Coorg",
    url: "https://www.mistyrivercoorg.com/",
    tech: ["WordPress", "PHP", "HTML", "CSS", "Responsive Website Development"],
    desc: "Created an elegant hospitality website showcasing property details and services with beautiful layouts, responsive design, simple navigation, and customer-focused user experience.",
    image: mistyRiverImg,
  },
];

function Projects() {
  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected projects"
          desc="A glimpse of recent client work — every site built for speed, clarity, and impact."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:translate-y-[-4px] hover:border-primary hover:shadow-glow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-background/90 px-4 py-2 font-mono text-xs text-foreground shadow-card backdrop-blur-sm">
                    Visit Website
                  </div>
                </div>
                <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground opacity-0 shadow-card backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                  <ExternalLink size={16} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold transition group-hover:text-primary">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="bg-hero py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something together"
          desc="Have a project in mind or just want to say hi? My inbox is always open."
        />
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="reveal space-y-4 lg:col-span-2">
            <ContactCard
              icon={<Mail size={18} />}
              label="Email"
              value="saniyamefathima@gmail.com"
              href="mailto:saniyamefathima@gmail.com"
            />
            <ContactCard
              icon={<Phone size={18} />}
              label="Phone"
              value="+91 9380226534"
              href="tel:+919380226534"
            />
            <ContactCard
              icon={<Linkedin size={18} />}
              label="LinkedIn"
              value="fathima-saniya-m-e"
              href="https://www.linkedin.com/in/fathima-saniya-m-e/"
            />
            <ContactCard
              icon={<Github size={18} />}
              label="GitHub"
              value="Saniyame8089"
              href="https://github.com/Saniyame8089"
            />
          </div>
          <form
            onSubmit={onSubmit}
            className="reveal glass space-y-4 rounded-2xl p-6 shadow-card lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" type="email" label="Email" placeholder="you@email.com" />
            </div>
            <Field name="subject" label="Subject" placeholder="Project inquiry" />
            <div>
              <label className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell me about your project…"
                className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              disabled={sending}
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary px-5 py-3 font-semibold text-primary-foreground shadow-glow transition hover:translate-y-[-2px] disabled:opacity-70"
            >
              {sending ? "Sending…" : "Send Message"}
              <Send size={16} className="transition group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-card transition hover:translate-y-[-2px] hover:border-primary hover:shadow-glow"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-medium group-hover:text-primary">{value}</p>
      </div>
    </a>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Fathima Saniya M E. Crafted with care.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/Saniyame8089" target="_blank" rel="noreferrer" className="hover:text-primary">
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/fathima-saniya-m-e/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary"
          >
            <Linkedin size={16} />
          </a>
          <a href="mailto:saniyamefathima@gmail.com" className="hover:text-primary">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
