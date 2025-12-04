import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Culinary Journeys
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/posts" className="text-gray-700 hover:text-primary font-medium">
              Stories
            </Link>
            <Link href="/authors" className="text-gray-700 hover:text-primary font-medium">
              Authors
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary font-medium">
              Categories
            </Link>
          </nav>

          {/* Mobile menu button - simplified for this version */}
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}