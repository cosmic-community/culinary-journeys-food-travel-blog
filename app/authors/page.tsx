import { getAllAuthors } from '@/lib/cosmic';
import { Author } from '@/types';
import AuthorCard from '@/components/AuthorCard';

export const metadata = {
  title: 'Authors - Culinary Journeys',
  description: 'Meet the passionate food writers behind our culinary stories.',
};

export const revalidate = 60;

export default async function AuthorsPage() {
  const authors = await getAllAuthors() as Author[];

  if (!authors || authors.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Authors</h1>
        <p className="text-xl text-gray-600">No authors available yet.</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Authors</h1>
        <p className="text-xl text-gray-600">
          Meet the passionate food writers bringing you stories from around the world
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
}