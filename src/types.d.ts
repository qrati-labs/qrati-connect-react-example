import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type QratiConnectAttributes = DetailedHTMLProps<
    HTMLAttributes<HTMLElement> & {
        'organization-id'?: string;
        theme?: 'light' | 'dark';
        router?: 'memory' | 'hash';
        uid?: string;
        fname?: string;
        lname?: string;
    },
    HTMLElement
>;

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            'qrati-connect': QratiConnectAttributes;
        }
    }
}
