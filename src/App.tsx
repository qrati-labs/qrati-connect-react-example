import { useEffect, useRef } from 'react';

import './App.css';
import { EXAMPLE_ORG_ID, QRATI_SCRIPT_URL } from './config';

function App() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = QRATI_SCRIPT_URL;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div className='app'>
            <header className='hero'>
                <h1>Qrati Connect — React Example</h1>
                <p>
                    A fully embeddable event discovery widget powered by{' '}
                    <a href='https://qrati.com' target='_blank' rel='noopener noreferrer'>
                        Qrati
                    </a>
                    . Drop it into any React application with a single component.
                </p>
            </header>
            <main className='content' ref={containerRef}>
                <qrati-connect organization-id={EXAMPLE_ORG_ID} theme='light' router='hash' />
            </main>
            <footer className='footer'>
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
    );
}

export default App;
