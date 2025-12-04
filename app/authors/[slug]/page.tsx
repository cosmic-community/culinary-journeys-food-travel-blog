// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic';
import { Author, Post } from '@/types';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const authors = await getAllAuthors() as Author[];
  
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug) as Author;
  
  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }
  
  return {
    title: `${author.title} - Culinary Journeys`,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug) as Author;

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id) as Post[];

  // Sort posts by creation date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container-custom py-16">
      {/* Author Profile */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{author.title}</h1>
            {author.metadata?.bio && (
              <p className="text-lg text-gray-700 mb-4">{author.metadata.bio}</p>
            )}
            {(author.metadata?.instagram || author.metadata?.twitter) && (
              <div className="flex gap-4">
                {author.metadata.instagram && (
                  <a
                    href={`https://instagram.com/${author.metadata.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary font-medium"
                  >
                    Instagram →
                  </a>
                )}
                {author.metadata.twitter && (
                  <a
                    href={`https://twitter.com/${author.metadata.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary font-medium"
                  >
                    Twitter →
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author's Posts */}
      <div>
        <h2 className="text-3xl font-bold mb-8">
          Stories by {author.title} ({sortedPosts.length})
        </h2>

        {sortedPosts.length === 0 ? (
          <p className="text-gray-600">No posts published yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}