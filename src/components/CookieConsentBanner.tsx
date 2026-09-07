import { useEffect } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import {
  initGtm,
  checkConsentRequired,
  ensureCookieConsentInitialized,
  showCookiePreferences,
} from '../lib/cookieConsent';

/**
 * Production-ready Cookie Consent Banner implementing GDPR, UK PECR, and Google Consent Mode v2.
 * Directly copied & adapted from qrati-web implementation.
 */
export default function CookieConsentBanner() {
  useEffect(() => {
    let cancelled = false;

    // Initialize GTM if ID is present
    initGtm();

    // Expose helper on window for easy binding to footer links
    window.showCookiePreferences = () => {
      void showCookiePreferences();
    };

    void checkConsentRequired().then((required) => {
      if (!cancelled) {
        void ensureCookieConsentInitialized(required);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
