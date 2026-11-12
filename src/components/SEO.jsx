import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_TITLE = 'Jayarams Bharat (jayarams-bharat) | Premier Solar EPC & Engineering Conglomerate';
const DEFAULT_DESC = "Jayarams Bharat (jayarams-bharat) is Andhra Pradesh's premier engineering enterprise delivering Turnkey Commercial Solar EPC, EV Charging Plazas, Wastewater Treatment (ETP/STP), AI CCTV Surveillance, and Government Supplies across Vijayawada, Eluru, and Andhra Pradesh.";
const DEFAULT_KEYWORDS = 'jayarams-bharat, jayarams bharat, jayarams, jayarams-bharat vijayawada, jayarams-bharat eluru, Solar EPC Vijayawada, Solar EPC Eluru, Commercial solar Andhra Pradesh, CCTV surveillance Vijayawada, Wastewater treatment Eluru, STP ETP plant contractor';

const SEO = ({
  title,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = 'https://www.jayarams.co.in/jayarams-logo-lockup.webp'
}) => {
  const location = useLocation();
  const currentUrl = canonical || `https://www.jayarams.co.in${location.pathname === '/' ? '' : location.pathname}`;
  const fullTitle = title ? `${title} | Jayarams Bharat` : DEFAULT_TITLE;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (attrName, attrVal, content) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'title', fullTitle);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Tags
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', currentUrl);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // 6. GA4 Page View Tracking on Route Change
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: fullTitle,
        page_location: currentUrl,
        page_path: location.pathname
      });
    }
  }, [fullTitle, description, keywords, currentUrl, ogImage, location.pathname]);

  return null;
};

export default SEO;

