import { useEffect, useRef, useState } from 'react';

import './App.css';
import { EXAMPLE_ORG_ID, QRATI_SCRIPT_URL } from './config';

const GITHUB_ORG = 'qrati-labs';
const REPO = 'qrati-connect-angular-example';


function App() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const repoUrl = `https://github.com/${GITHUB_ORG}/${REPO}`;
    const vscodeUrl = `https://vscode.dev/github/${GITHUB_ORG}/${REPO}`;
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = import.meta.env.VITE_CDN_URL || QRATI_SCRIPT_URL;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className="app">
    <button
        className="theme-toggle"
        onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
    <div className="page-shell">
        <div className="page-frame">
            <header className="hero">
            <p className="hero-kicker">Qrati Connect Demo</p>
            <h1>
                <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a>
                Connect inside an React host site
            </h1>
            <p className="hero-copy">
                This example shows how to drop
                <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">Qrati</a>
                Connect into an Angular application with a host-controlled theme, clean link-outs, and a
                polished wrapper around the widget.
            </p>

            <div className="action-pills" aria-label="Example links">
                <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2。64c0 0 .84-.27 2。75 １。０２c。79-.２２ １。６５-.３３ ２。５-.３３s１。７１。１１ ２。５。３３c１。９１-１。２９ ２。７５-１。０２ ２。７５-１。０２c。５５ １。３５。２ ２。３９。１ ２。６４c。６５。７１ １。０３ １。６ １。０３ ２。７１c0 3。82-2。34 4。66-4。57 4。9₁c。36。3₁ 。69 。9₂ 。69 ₁．85V₂₁c0 。27 。₁₆ 。59 。67 。5C₁₉．₁₄₂₀．₁₆₂₂₁₆．₄₂₂₂₁₂A₁₀₁₀₀₀₀₁₂₂"
                    />
                </svg>
                    <span>View on GitHub</span>
                </a>
                <a href={vscodeUrl} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                    fill="currentColor"
                    d="M10.863 13.919a.8.8 0 0 1-.644.025a.8.8 0 0 1-.279-.183L4.816 9.063l-2.232 1.703a.54.54 0 0 1-.691-.031l-.716-.655a.546.546 0 0 1 0-.805L3.112 7.5L1.177 5.725a.546.546 0 0 1 0-.805l.716-.655a.54.54 0 0 1 .691-.031l2.232 1.703L9.94 1.239a.805.805 0 0 1 .923-.159l2.677 1.295c.281.136.46.422.46.736V8h-3.248V4.534L6.864 7.5l3.888 2.966V8H14v3.889c0 .314-.179.6-.46.736z"
                    />
                </svg>
                <span>Open in VS Code</span>
                </a>
            </div>
            </header>

            <main className="content-shell" ref={containerRef}>
            <section className="widget-frame">
                <qrati-connect organization-id={import.meta.env.VITE_ORGANIZATION_ID || EXAMPLE_ORG_ID} theme={theme} router='hash' />
            </section>
            </main>

            <footer className="footer">
            <div className="footer-brand">
                <img
                src="https://assets.qrati.com/images/qrati-connect-logo-square.png"
                alt="Qrati Connect logo"
                />
                <div>
                <span className="footer-title"><span>Qrati</span> Connect</span>
                <p>Elevate your event experience.</p>
                </div>
            </div>

            <div className="footer-meta">
                <nav aria-label="Footer navigation">
                <a href="https://qrati.com" target="_blank" rel="noopener noreferrer">qrati.com</a>
                <a
                    href="https://www.npmjs.com/package/@qratilabs/qrati-connect"
                    target="_blank"
                    rel="noopener noreferrer"
                    >npm</a>
                <a href="https://github.com/qrati-labs" target="_blank" rel="noopener noreferrer"
                    >GitHub</a>
                <a href="https://qrati.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a>
                </nav>
                <p className="footer-note">© {currentYear} Qrati Labs. All rights reserved.</p>
            </div>
            </footer>
        </div>
    </div>
    </div>
    );

    {/* return (
        <div classNameName='app'>
            <header classNameName='hero'>
                <h1>Qrati Connect — React Example</h1>
                <p>
                    A fully embeddable event discovery widget powered by{' '}
                    <a href='https://qrati.com' target='_blank' rel='noopener noreferrer'>
                        Qrati
                    </a>
                    . Drop it into any React application with a single component.
                </p>
            </header>
            <main classNameName='content' ref={containerRef}>
                <qrati-connect organization-id={EXAMPLE_ORG_ID} theme='light' router='hash' />
            </main>
            <footer classNameName='footer'>
                <p>
                    Built with{' '}
                    <a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
                        React
                    </a>{' '}
                    &amp;{' '}
                    <a href='https://qrati.com' target='_blank' rel='noopener noreferrer'>
                        Qrati Connect
                    </a>
                </p>
            </footer>
        </div>
    ); */}
}

export default App;
