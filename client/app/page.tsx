"use client";

import { ResumeAnalyzer } from "@/components/resume-analyzer";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Placeholder logo component
function Logo() {
  return (
    <Link href="/" aria-label="Home">
      <span className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="AI Resume Analyzer Logo"
          width={40}
          height={40}
          className="rounded-full shadow-md"
          priority
        />
        <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">
          ResumeAI
        </span>
      </span>
    </Link>
  );
}

// Navigation bar
function NavBar() {
  return (
    <nav
      className="flex items-center gap-8"
      aria-label="Main navigation"
    >
      <Link
        href="#features"
        className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
      >
        Features
      </Link>
      <Link
        href="#testimonials"
        className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
      >
        Testimonials
      </Link>
      <Link
        href="#faq"
        className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
      >
        FAQ
      </Link>
      <Link
        href="#contact"
        className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
      >
        Contact
      </Link>
    </nav>
  );
}

// Call to Action Button
function CTAButton({ children, ...props }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-sky-600 to-sky-400 text-white font-semibold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-sky-400"
      {...props}
    >
      {children}
    </button>
  );
}

// Secondary CTA
function SecondaryCTA({ children, ...props }) {
  return (
    <button
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-200 bg-white/70 dark:bg-slate-900/70 font-semibold shadow hover:bg-sky-50 dark:hover:bg-sky-900/40 transition"
      {...props}
    >
      {children}
    </button>
  );
}

// Example file downloads
function ExampleFiles() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center items-center">
      <Link
        href="/examples/sample_resume.pdf"
        download
        className="underline text-sky-600 hover:text-pink-600"
      >
       
      </Link>
      <Link
        href="/examples/sample_job_description.pdf"
        download
        className="underline text-pink-600 hover:text-sky-600"
      >
     
      </Link>
    </div>
  );
}

// Instructions component
function Instructions() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl shadow-lg p-6 mt-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
        How It Works
      </h2>
      <ol className="list-decimal list-inside text-slate-700 dark:text-slate-300 space-y-2">
        <li>Upload your resume (PDF or DOCX).</li>
        <li>Upload the job description for your target role.</li>
        <li>Click "Analyze" and get instant, AI-powered insights on your fit and readiness.</li>
        <li>Receive actionable feedback and tips to improve your chances.</li>
      </ol>
      <ExampleFiles />
    </div>
  );
}

// Testimonials section
function Testimonials() {
  const testimonials = [
    {
      name: "Sara Lee",
      title: "Product Manager",
      text: "ResumeAI helped me land my dream job! The insights were spot-on and easy to act on.",
      avatar: "/avatar.jpg",
    },
    {
      name: "David Kim",
      title: "Software Engineer",
      text: "The analysis was fast and detailed. I loved the actionable tips for my interviews.",
      avatar: "/avatar.jpg",
    },
    {
      name: "Priya Patel",
      title: "HR Specialist",
      text: "As a recruiter, I recommend ResumeAI to all candidates. It saves time and boosts confidence.",
      avatar: "/avatar.jpg",
    },
  ];
  return (
    <section
      id="testimonials"
      className="py-16 bg-gradient-to-tr from-pink-50 to-sky-50 dark:from-slate-900 dark:to-slate-800"
      aria-labelledby="testimonials-heading"
    >
      <h2
        id="testimonials-heading"
        className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10"
      >
        What Our Users Say
      </h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center max-w-sm mx-auto"
          >
            <Image
              src={t.avatar}
              alt={`Photo of ${t.name}`}
              width={130}
              height={130}
              className="rounded-full mb-4"
            />
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
              “{t.text}”
            </p>
            <span className="font-semibold text-sky-700 dark:text-sky-300">{t.name}</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">{t.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// Features section
function Features() {
  const features = [
    {
      icon: "/resource.jpg",
      title: "AI-Powered Insights",
      text: "Get instant, personalized feedback on your resume and job match.",
    },
    {
      icon: "/r.jpg",
      title: "Boost Interview Readiness",
      text: "Identify gaps and receive actionable tips to improve your chances. Spot strengths, uncover opportunities, and get practical steps to stand out in your job search.",
    },
    {
      icon: "/cloud.jpg",
      title: "Privacy First",
      text: "Your documents are processed securely and never stored.",
    },
    {
      icon: "/mobile.jpg",
      title: "Mobile Friendly",
      text: "Analyze your resume on any device, anytime.",
    },
  ];
  return (
    <section
      id="features"
      className="py-16 bg-gradient-to-br from-slate-100 to-sky-50 dark:from-slate-900 dark:to-slate-800"
      aria-labelledby="features-heading"
    >
      <h2
        id="features-heading"
        className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10"
      >
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/80 dark:bg-slate-900/70 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <Image
              src={f.icon}
              alt=""
              width={210}
              height={210}
              className="mb-4"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold mb-2 text-sky-700 dark:text-sky-300">{f.title}</h3>
            <p className="text-slate-600 dark:text-slate-300">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// FAQ section
function FAQ() {
  const faqs = [
    {
      q: "Is my data secure?",
      a: "Absolutely. Your documents are processed securely and never stored.",
    },
    {
      q: "What file formats are supported?",
      a: "We support PDF and DOCX files for resumes and job descriptions.",
    },
    {
      q: "How fast is the analysis?",
      a: "Most analyses are completed in under 30 seconds.",
    },
    {
      q: "Can I use ResumeAI on mobile?",
      a: "Yes! The site is fully responsive and works on all devices.",
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      id="faq"
      className="py-16 bg-gradient-to-tr from-sky-50 to-pink-50 dark:from-slate-900 dark:to-slate-800"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-10"
      >
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-xl shadow p-4">
            <button
              className="w-full flex justify-between items-center text-left font-semibold text-sky-700 dark:text-sky-300"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              aria-controls={`faq-${i}`}
            >
              {f.q}
              <span>{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <div
                id={`faq-${i}`}
                className="mt-2 text-slate-700 dark:text-slate-300"
              >
                {f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Contact section
function Contact() {
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-pink-50 to-sky-50 dark:from-slate-900 dark:to-slate-800"
      aria-labelledby="contact-heading"
    >
      <h2
        id="contact-heading"
        className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-8"
      >
        Get in Touch
      </h2>
      <form
        className="max-w-lg mx-auto bg-white/80 dark:bg-slate-900/80 rounded-xl shadow-lg p-8 flex flex-col gap-4"
        aria-label="Contact form"
      >
        <label className="text-slate-700 dark:text-slate-200 font-semibold" htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            className="mt-1 block w-full rounded border border-slate-300 dark:border-slate-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
            autoComplete="name"
          />
        </label>
        <label className="text-slate-700 dark:text-slate-200 font-semibold" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            className="mt-1 block w-full rounded border border-slate-300 dark:border-slate-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
            autoComplete="email"
          />
        </label>
        <label className="text-slate-700 dark:text-slate-200 font-semibold" htmlFor="message">
          Message
          <textarea
            id="message"
            rows={4}
            className="mt-1 block w-full rounded border border-slate-300 dark:border-slate-700 p-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />
        </label>
        <CTAButton type="submit">Send Message</CTAButton>
      </form>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 bg-gradient-to-tr from-sky-100 to-pink-100 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Logo />
        <div className="flex gap-4">
          <Link
            href="#features"
            className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
          >
            FAQ
          </Link>
          <Link
            href="#contact"
            className="text-slate-700 dark:text-slate-200 hover:text-sky-600 transition"
          >
            Contact
          </Link>
        </div>
        <span className="text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default function Home() {
  const [showAnalyzer, setShowAnalyzer] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-x-hidden relative">
      {/* Theme Toggle and Nav */}
      <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Logo />
          <NavBar />
         
        </div>
      </header>

      {/* Decorative gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-sky-200/30 dark:bg-sky-900/20 blur-3xl" />
        <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-pink-200/30 dark:bg-pink-900/20 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-pink-600 bg-clip-text text-transparent drop-shadow">
            AI-Powered Resume Review
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
          >
            Get immediate, AI-powered insights into your qualifications and interview readiness—just upload your resume and the job description.
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <CTAButton onClick={() => { setShowAnalyzer(true); document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span>Upload Resume</span>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2" viewBox="0 0 24 24"><path d="M12 5v14m7-7H5" /></svg>
            </CTAButton>
            <SecondaryCTA onClick={() => window.open("/examples/sample_resume.pdf", "_blank")}>
              <span>See Example</span>
            </SecondaryCTA>
          </div>
        </motion.div>
        <Instructions />
      </section>

      {/* Features */}
      <Features />

      {/* Analyzer Section */}
      <section id="analyzer" className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl max-w-3xl mx-auto p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
            Start Your Analysis
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-8">
            Drag & drop your resume and job description below, or click to select files.
          </p>
          {showAnalyzer && <ResumeAnalyzer />}
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
