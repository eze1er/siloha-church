import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold">Siloha Church</span>
            </div>
            <p className="text-gray-300 mb-4">
              Une communauté de foi dédiée à servir Dieu et à aimer notre prochain. 
              Rejoignez-nous dans notre mission de partager l'amour du Christ.
            </p>
            <div className="text-gray-300">
              <p>Dimanche: 12h00 - Culte d'adoration</p>
              <p>Mercredi: 19h00 - Intercession</p>
              <p>Vendredi: 19h00 - Intercession</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/sermons" className="text-gray-300 hover:text-white transition-colors">
                  Sermons
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-300 hover:text-white transition-colors">
                  Faire un don
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="text-gray-300 not-italic">
              <p>6-75 Deerhide Crest<br />North York, ON</p>
              <p>M9M 2Z2, CANADA</p>
              <p className="mt-2">
                <a href="tel:+33123456789" className="hover:text-white transition-colors">
                  +1 647 237 7070
                </a>
              </p>
              <p>
                <a href="mailto:info@siloha-church.org" className="hover:text-white transition-colors">
                  info@siloha-church.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Siloha Church. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}