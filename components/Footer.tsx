import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Culinary Journeys</h3>
            <p className="text-gray-400">
              Discovering authentic culinary experiences from around the world through
              immersive stories and stunning photography.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/posts" className="text-gray-400 hover:text-white">
                  All Stories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-gray-400 hover:text-white">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/street-food" className="text-gray-400 hover:text-white">
                  Street Food
                </Link>
              </li>
              <li>
                <Link href="/categories/regional-cuisine" className="text-gray-400 hover:text-white">
                  Regional Cuisine
                </Link>
              </li>
              <li>
                <Link href="/categories/food-markets" className="text-gray-400 hover:text-white">
                  Food Markets
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Culinary Journeys. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}