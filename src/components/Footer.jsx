import React from 'react';

/**
 * Mega Footer Component
 * Apple-style responsive footer with multiple sections and links
 * Fully accessible with semantic HTML and ARIA labels
 *
 * Features:
 * - 5-column grid on desktop (responsive)
 * - Stacked on mobile and tablet
 * - Semantic footer structure with contentinfo role
 * - All links have proper ARIA labels
 * - Keyboard navigable with focus management
 */

// Footer sections and links data
const footerSections = [
  {
    title: 'Shop and Learn',
    id: 'shop-learn',
    links: [
      { label: 'Mac', href: '#' },
      { label: 'iPad', href: '#' },
      { label: 'iPhone', href: '#' },
      { label: 'Watch', href: '#' },
      { label: 'AirPods', href: '#' },
      { label: 'TV & Home', href: '#' },
      { label: 'AirTag', href: '#' },
      { label: 'Accessories', href: '#' },
    ],
  },
  {
    title: 'Services',
    id: 'services',
    links: [
      { label: 'Apple Music', href: '#' },
      { label: 'Apple TV+', href: '#' },
      { label: 'Apple Fitness+', href: '#' },
      { label: 'Apple News+', href: '#' },
      { label: 'Apple Arcade', href: '#' },
      { label: 'Apple Card', href: '#' },
      { label: 'Apple One', href: '#' },
      { label: 'Apple Pay', href: '#' },
    ],
  },
  {
    title: 'Account',
    id: 'account',
    links: [
      { label: 'Manage Your Apple ID', href: '#' },
      { label: 'Apple Account Settings', href: '#' },
      { label: 'iCloud.com', href: '#' },
      { label: 'Mac Settings', href: '#' },
      { label: 'iOS Settings', href: '#' },
      { label: 'Sign Out', href: '#' },
    ],
  },
  {
    title: 'Apple Store',
    id: 'store',
    links: [
      { label: 'Find a Store', href: '#' },
      { label: 'Shop Online', href: '#' },
      { label: 'Today at Apple', href: '#' },
      { label: 'Apple Trade In', href: '#' },
      { label: 'Order Status', href: '#' },
      { label: 'Shopping Help', href: '#' },
    ],
  },
  {
    title: 'For Business',
    id: 'business',
    links: [
      { label: 'Apple & Business', href: '#' },
      { label: 'Shop for Business', href: '#' },
      { label: 'Mac in Business', href: '#' },
      { label: 'Partnerships', href: '#' },
    ],
  },
  {
    title: 'About Apple',
    id: 'about',
    links: [
      { label: 'About Apple', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Newsroom', href: '#' },
      { label: 'Press Releases', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'Contact Apple', href: '#' },
    ],
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-black text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer Content */}
      <div className="screen-max-width px-5 sm:px-10 py-12">
        {/* Shopping Options Banner */}
        <div className="border-b border-gray-800 pb-8 mb-8">
          <div className="text-xs text-gray-400 space-y-2">
            <p>
              More ways to shop:{' '}
              <a
                href="#"
                className="text-blue-500 hover:underline transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                aria-label="Find an Apple Store near you"
              >
                Find an Apple Store
              </a>
              {' '}or{' '}
              <a
                href="#"
                className="text-blue-500 hover:underline transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                aria-label="Find other authorized retailers"
              >
                other retailers
              </a>
              {' '}near you.
            </p>
            <p>
              Or call{' '}
              <a
                href="tel:+1-800-040-1966"
                className="text-blue-500 hover:underline transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                aria-label="Call Apple support at 1-800-040-1966"
              >
                1-800-040-1966
              </a>
            </p>
          </div>
        </div>

        {/* Footer Links Grid */}
        <nav
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-8 border-b border-gray-800"
          role="navigation"
          aria-label="Footer navigation"
        >
          {footerSections.map((section) => (
            <div key={section.id} className="flex flex-col">
              <h3 className="text-sm font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-2 flex flex-col">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-gray-400 hover:text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
                      aria-label={`${link.label} in ${section.title}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Footer */}
        <div className="py-8 space-y-4">
          {/* Legal and Language */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-800">
            <div className="flex flex-wrap items-center gap-4">
              <p className="text-xs text-gray-400">
                More ways to shop: {' '}
                <a
                  href="#"
                  className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                  aria-label="Visit the Apple online store"
                >
                  Apple Store Online
                </a>
              </p>
            </div>
            <button
              className="text-xs text-gray-400 hover:text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-2 py-1"
              aria-label="Change language and region settings"
            >
              United States (English)
            </button>
          </div>

          {/* Copyright and Legal Links */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-400">
            <p>
              Copyright © {currentYear} Apple Inc. All rights reserved.
            </p>
            <nav
              className="flex flex-wrap gap-4"
              role="navigation"
              aria-label="Legal and policies"
            >
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Use', href: '#' },
                { label: 'Sales and Refunds', href: '#' },
                { label: 'Legal', href: '#' },
                { label: 'Site Map', href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1"
                  aria-label={item.label}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Cookie Notice */}
          <p className="text-xs text-gray-500 leading-relaxed">
            By using this website, you agree that Apple and its partners may store and access cookies on your device for personalization, analytics, and other purposes as described in the{' '}
            <a
              href="#"
              className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              aria-label="View cookie policy"
            >
              Cookie Policy
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
