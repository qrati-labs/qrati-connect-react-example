import { useEffect, useState } from 'react';
import './index.css';
import QratiConnect from '@qratilabs/qrati-connect';
import { EXAMPLE_ORG_ID, GITHUB_ORG, REPO } from './config';
import CookieConsentBanner from './components/CookieConsentBanner';
import { showCookiePreferences } from './lib/cookieConsent';

const repoUrl = `https://github.com/${GITHUB_ORG}/${REPO}`;
const vscodeUrl = `https://vscode.dev/github/${GITHUB_ORG}/${REPO}`;
const npmUrl = 'https://www.npmjs.com/package/@qratilabs/qrati-connect';
const year = new Date().getFullYear();

const featureGroups = [
  ['integration-instructions', 'Embed cleanly', 'Web Component, React wrapper, classic script, Shadow DOM isolation, runtime styles, hash or memory routing, themes, and host URL allowlists.'],
  ['event', 'Run the event', 'Public event landing pages, folders, nested folders, breadcrumbs, event search, global search, sorting, status, stats, and optional maps.'],
  ['photo-library', 'Show every memory', 'Image and video galleries, grid/list/masonry layouts, single-content views, lazy loading, pagination, blurhash, captions, metadata, downloads, and PhotoSwipe.'],
  ['cloud-upload', 'Collect uploads', 'Drag-and-drop and mobile uploads, multi-file validation, progress, retry, cancel, HEIC conversion, cropping, trimming, and post-processing.'],
  ['celebration', 'Make it social', 'Keyword and facial search, image-provider search, emoji reactions, star ratings, similarity feedback, points, configurable engagement, contests, and leaderboards.'],
  ['shield-lock', 'Keep people safe', 'Login, registration, logout, password reset, terms, social or anonymous access, roles, permissions, moderation, and configurable feature gates.'],
  ['palette', 'Fit the brand', 'Logos, cover images, fonts, palettes, borders, shadows, tokens, hidden Qrati branding, responsive layouts, translations, and accessible states.'],
  ['monitor-heart', 'Operate with confidence', 'Admin dashboards, review, deep search, article/access tools, shot inspection, analytics, error reporting, and reliable loading, empty, error, and toast states.'],
] as const;

function initTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const t =
    (localStorage.getItem('qc-theme') as 'light' | 'dark') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
  document.documentElement.classList.toggle('dark', t === 'dark');
  return t;
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(initTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('qc-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('qc-theme', next);
  };

  return (
    <div className="app">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <div className="page-shell">
        <div className="page-frame">
          <header className="hero">
            <p className="hero-kicker">Embeddable React Gallery SDK</p>
            <h1>
              <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a>
              {' '}Connect inside a React host site
            </h1>
            <p className="hero-copy">
              A drop-in React component for embedding live event photo galleries with guest uploads,
              full-screen lightbox, emoji reactions, and contest leaderboards. Controlled host theme,
              clean link-outs, and zero backend configuration.
            </p>

            <div className="action-pills" aria-label="Example links">
              <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  />
                </svg>
                <span>View on GitHub</span>
              </a>
              <a href={vscodeUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M10.863 13.919a.8.8 0 0 1-.644.025a.8.8 0 0 1-.279-.183L4.816 9.063l-2.232 1.703a.54.54 0 0 1-.691-.031l-.716-.655a.546.546 0 0 1 0-.805L3.112 7.5L1.177 5.725a.546.546 0 0 1 0-.805l.716-.655a.54.54 0 0 1 .691-.031l2.232 1.703L9.94 1.239a.805.805 0 0 1 .923-.159l2.677 1.295c.281.136.46.422.46.736V8h-3.248V4.534L6.864 7.5l3.888 2.966V8H14v3.889c0 .314-.179.6-.46.736z"
                  />
                </svg>
                <span>Open in VS Code</span>
              </a>
              <a href={npmUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M1.5 0h21v24h-10.5v-19.5h-5.25v19.5h-5.25z" />
                </svg>
                <span>npm package</span>
              </a>
            </div>
          </header>

          <main className="content-shell">
            <section className="widget-frame" aria-label="Interactive React Event Gallery">
              <h2 className="sr-only">Live Event Photo Gallery Component</h2>
              <QratiConnect organizationId={EXAMPLE_ORG_ID} theme={theme} router="hash" />
            </section>

            <section className="answer-section" aria-labelledby="answer-heading">
              <div className="answer-copy">
                <span className="seo-kicker">The short answer</span>
                <h3 id="answer-heading">What does Qrati Connect add to a React site?</h3>
                <p>
                  Qrati Connect adds a complete, hosted event-media experience to a React page:
                  guests can discover galleries, upload photos and videos, search, react, rate,
                  and participate in contests while your team controls access, branding, and moderation.
                </p>
              </div>
              <div className="answer-points" aria-label="React integration benefits">
                <span>✓&nbsp;&nbsp;One component to embed</span>
                <span>✓&nbsp;&nbsp;No gallery backend to maintain</span>
                <span>✓&nbsp;&nbsp;Host-controlled theme and routing</span>
                <span>✓&nbsp;&nbsp;Feature gates stay organization-controlled</span>
              </div>
            </section>

            <section className="seo-section feature-map-section" aria-labelledby="feature-map-heading">
              <div className="seo-section-header">
                <span className="seo-kicker">Complete capability map</span>
                <h2 id="feature-map-heading">One embed. The full event experience.</h2>
                <p>
                  This React example exposes the same capability surface as the product. Turn on only
                  what your organization needs; the page stays simple for guests.
                </p>
              </div>
              <div className="feature-map-grid">
                {featureGroups.map(([icon, title, description]) => (
                  <article className="feature-map-card" key={title}>
                    <div className="feature-map-heading">
                      <span className="feature-map-icon iconify" data-icon={`material-symbols:${icon}`} aria-hidden="true" />
                      <h3>{title}</h3>
                    </div>
                    <p>{description}</p>
                  </article>
                ))}
              </div>
            </section>

            {/* SEO Features Section */}
            <section className="seo-section" aria-labelledby="features-heading">
              <div className="seo-section-header">
                <span className="seo-kicker">Event Gallery Features</span>
                <h2 id="features-heading">Why Developers Choose Qrati Connect</h2>
                <p>
                  Deliver an engaging live event photo wall and user-generated content (UGC)
                  experience embedded directly into your React application with zero backend overhead.
                </p>
              </div>

              <div className="seo-features-grid">
                <article className="seo-feature-card">
                  <span className="seo-feature-icon iconify" data-icon="material-symbols:gallery-thumbnail" aria-hidden="true" />
                  <h3>Live Event Photo Wall</h3>
                  <p>
                    Responsive masonry grid layout, blurhash loading placeholders, and full-screen
                    lightbox with keyboard navigation for stunning visual presentation.
                  </p>
                </article>

                <article className="seo-feature-card">
                  <span className="seo-feature-icon iconify" data-icon="material-symbols:photo-camera" aria-hidden="true" />
                  <h3>Guest Media Uploads</h3>
                  <p>
                    Frictionless guest uploads via QR code or direct upload with client-side image
                    compression and automatic HEIC to JPEG conversion.
                  </p>
                </article>

                <article className="seo-feature-card">
                  <span className="seo-feature-icon iconify" data-icon="material-symbols:star" aria-hidden="true" />
                  <h3>Reactions & Contests</h3>
                  <p>
                    Boost attendee engagement with interactive emoji reactions, community star ratings,
                    and real-time contest leaderboard rankings.
                  </p>
                </article>

                <article className="seo-feature-card">
                  <span className="seo-feature-icon iconify" data-icon="material-symbols:bolt" aria-hidden="true" />
                  <h3>Drop-in React SDK</h3>
                  <p>
                    Native React component with typed props, host theme synchronization (light and dark),
                    and seamless hash or memory routing.
                  </p>
                </article>
              </div>
            </section>

            {/* SEO Quickstart Section */}
            <section className="seo-section" aria-labelledby="quickstart-heading">
              <div className="seo-section-header">
                <span className="seo-kicker">Developer Integration</span>
                <h2 id="quickstart-heading">Embed in 3 Simple Steps</h2>
                <p>
                  Install the package, import the component, and pass your organization ID.
                </p>
                <p className="org-requirement">
                  <span className="iconify" data-icon="material-symbols:business" aria-hidden="true" />
                  You need an active Qrati subscription first. Create an organization in the Qrati dashboard;
                  its organization ID tells this embed which event space, settings, branding, and access rules to load.
                </p>
              </div>

              <div className="seo-quickstart-card">
                <div className="code-header">
                  <div className="code-dots">
                    <span className="code-dot"></span>
                    <span className="code-dot"></span>
                    <span className="code-dot"></span>
                  </div>
                  <span>EventGallery.tsx</span>
                </div>
                <pre>
                  <code>
                    {`// 1. Install via npm or pnpm
// npm install @qratilabs/qrati-connect

// 2. Import component in your React application
import QratiConnect from '@qratilabs/qrati-connect';

// 3. Render inside your page layout
export function EventGallery() {
  return (
    <QratiConnect
      organizationId="your-organization-id"
      theme="light" // 'light' | 'dark'
      router="hash" // 'hash' | 'memory'
    />
  );
}`}
                  </code>
                </pre>
              </div>
            </section>

            {/* SEO FAQ Section */}
            <section className="seo-section" aria-labelledby="faq-heading">
              <div className="seo-section-header">
                <span className="seo-kicker">Common Questions</span>
                <h2 id="faq-heading">Frequently Asked Questions</h2>
                <p>
                  Everything you need to know about embedding an event photo gallery in React.
                </p>
              </div>

              <div className="faq-list">
                <details className="faq-item" open>
                  <summary className="faq-question">
                    <span>How do I embed an event photo gallery in React?</span>
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">
                    Install <code style={{ color: 'var(--brand-accent)' }}>@qratilabs/qrati-connect</code> using npm or pnpm, then import <code style={{ color: 'var(--brand-accent)' }}>QratiConnect</code> and render it with your organization ID. It handles masonry layouts, responsive image loading, and lightbox interactions out of the box.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <span>Can event attendees upload photos directly through the React gallery?</span>
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">
                    Yes. When media uploads are enabled in your Qrati organization settings, attendees can upload photos and videos directly from mobile or desktop devices with client-side image compression and automatic HEIC conversion.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <span>Does the Qrati Connect React component support dark mode?</span>
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">
                    Yes. The component accepts a <code style={{ color: 'var(--brand-accent)' }}>theme</code> prop (<code style={{ color: 'var(--brand-accent)' }}>&apos;light&apos;</code> or <code style={{ color: 'var(--brand-accent)' }}>&apos;dark&apos;</code>), enabling seamless synchronization with your application&apos;s theme provider or system color preferences.
                  </div>
                </details>

                <details className="faq-item">
                  <summary className="faq-question">
                    <span>Can I run photo contests and display rankings in the React gallery?</span>
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">
                    Yes. Qrati Connect supports contest mode, star ratings, emoji reactions, and ranked leaderboards configured directly from your Qrati organization dashboard.
                  </div>
                </details>
              </div>
            </section>

            {/* Event Hosting & Integration CTA Section */}
            <section className="seo-section seo-cta-section" aria-labelledby="cta-heading">
              <div className="seo-cta-card">
                <div className="seo-cta-content">
                  <span className="seo-kicker">Host on Qrati &middot; Embed Anywhere</span>
                  <h2 id="cta-heading">
                    Host Your Event on Qrati.<br />
                    <span className="cta-highlight">Integrate the Gallery on Your Website.</span>
                  </h2>
                  <p className="seo-cta-copy">
                    Planning a conference, festival, wedding, summit, or private celebration?
                    Host your event on Qrati to capture every attendee memory with instant QR uploads,
                    built-in moderation, and live photo contests. Then drop Qrati Connect into your own
                    website so visitors and guests engage in real time directly on your domain.
                  </p>

                  <div className="seo-cta-steps" aria-label="How it works">
                    <div className="cta-step">
                      <span className="cta-step-num">1</span>
                      <div>
                        <strong>Host on Qrati</strong>
                        <p>Create your event space on Qrati with QR codes, upload permissions, and branding.</p>
                      </div>
                    </div>
                    <div className="cta-step">
                      <span className="cta-step-num">2</span>
                      <div>
                        <strong>Connect to Your Site</strong>
                        <p>Embed the React component or script tag into your existing website in minutes.</p>
                      </div>
                    </div>
                    <div className="cta-step">
                      <span className="cta-step-num">3</span>
                      <div>
                        <strong>Engage Your Community</strong>
                        <p>Watch guest photos, reactions, and contest leaderboards sync live on your domain.</p>
                      </div>
                    </div>
                  </div>

                  <div className="seo-cta-actions">
                    <a
                      href="https://qrati.com/contact-us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cta-primary"
                    >
                      <span>Contact Us</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="footer">
            <div className="footer-brand">
              <img src="https://assets.qrati.com/images/qrati-connect-logo-square.png" alt="Qrati Connect logo" referrerPolicy="no-referrer" />
              <div>
                <span className="footer-title"><span>Qrati</span> Connect</span>
                <p>Elevate your event experience.</p>
              </div>
            </div>
            <div className="footer-meta">
              <nav aria-label="Footer navigation">
                <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">qrati.com</a>
                <a href="https://www.npmjs.com/package/@qratilabs/qrati-connect" target="_blank" rel="noopener noreferrer">npm</a>
                <a href={`https://github.com/${GITHUB_ORG}`} target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://qrati.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a>
                <button
                  type="button"
                  className="footer-cookie-btn"
                  data-cc="show-preferencesModal"
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.showCookiePreferences) {
                      window.showCookiePreferences();
                    } else {
                      void showCookiePreferences();
                    }
                  }}
                >
                  Cookie Preferences
                </button>
              </nav>
              <p className="footer-note">© {year} Qrati Labs. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
      <CookieConsentBanner />
    </div>
  );
}

export default App;
