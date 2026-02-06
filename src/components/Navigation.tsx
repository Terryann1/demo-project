import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300">
            🎬 Movie App
          </Link>
          <div className="space-x-6">
            <Link href="/" className="hover:text-gray-300 transition">
              All Movies
            </Link>
            <Link 
              href="/movies/add" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              + Add Movie
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
