'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-primary">Eglise Siloe</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/sermons" className="text-gray-700 hover:text-primary transition-colors">
              Sermons
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-primary transition-colors">
              Événements
            </Link>
            <Link href="/donate" className="text-gray-700 hover:text-primary transition-colors">
              Donner
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/profile" className="text-gray-700 hover:text-primary">
                  Mon profil
                </Link>
                {(user.role === 'servant' || user.role === 'admin') && (
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="btn-secondary"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-primary">
                  Connexion
                </Link>
                <Link href="/register" className="btn-primary">
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary">
                Accueil
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary">
                À propos
              </Link>
              <Link href="/sermons" className="text-gray-700 hover:text-primary">
                Sermons
              </Link>
              <Link href="/events" className="text-gray-700 hover:text-primary">
                Événements
              </Link>
              <Link href="/donate" className="text-gray-700 hover:text-primary">
                Donner
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary">
                Contact
              </Link>
              
              {user ? (
                <>
                  <Link href="/profile" className="text-gray-700 hover:text-primary">
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-primary"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-primary">
                    Connexion
                  </Link>
                  <Link href="/register" className="text-primary font-semibold">
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}