/**
 * Footer Component
 * App footer with links, badges, and social icons
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Globe, AlertCircle } from 'lucide-react';
import { ROUTES } from '@/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {/* Links Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.GAME}
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Play Game
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.LEADERBOARD}
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/farmer-game"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://explorer.stacks.co/?chain=testnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  Stacks Explorer
                </a>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/farmer-game"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://stacks.co"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-lg hover:bg-primary hover:text-white transition-colors shadow-sm"
                aria-label="Website"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Testnet Warning Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-warning-light border border-warning rounded-lg">
            <AlertCircle size={16} className="text-warning flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-gray-800">
              <strong>Testnet Only:</strong> This app uses Stacks Testnet. No real funds required.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            © {currentYear} Farmer Game. Built on Stacks Blockchain.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
