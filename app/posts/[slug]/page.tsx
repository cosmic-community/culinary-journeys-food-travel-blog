// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic';
import { Post } from '@/types';
import { MarkdownRenderer } from '@/lib/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts() as Post[];
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug) as Post;
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} - Culinary Journeys`,
    description: post.metadata?.excerpt || post.title,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug) as Post;

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Hero Image */}
      {post.metadata?.featured_image && (
        <div className="w-full h-[500px] bg-gray-900">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1600&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          {post.metadata?.categories && post.metadata.categories.length > 0 && (
            <div className="mb-4 flex gap-2">
              {post.metadata.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-5xl font-bold mb-6">{post.title}</h1>

          {/* Author Info */}
          {post.metadata?.author && (
            <div className="flex items-center gap-4 mb-8 pb-8 border-b">
              {post.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <Link
                  href={`/authors/${post.metadata.author.slug}`}
                  className="font-medium text-lg hover:text-primary"
                >
                  {post.metadata.author.title}
                </Link>
                <p className="text-gray-600 text-sm">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          {post.metadata?.content && (
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={post.metadata.content} />
            </div>
          )}

          {/* Author Bio at Bottom */}
          {post.metadata?.author && post.metadata.author.metadata?.bio && (
            <div className="mt-12 pt-8 border-t bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">About the Author</h3>
              <div className="flex gap-4">
                {post.metadata.author.metadata.profile_photo && (
                  <img
                    src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                    alt={post.metadata.author.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div className="flex-1">
                  <Link
                    href={`/authors/${post.metadata.author.slug}`}
                    className="font-bold text-lg hover:text-primary"
                  >
                    {post.metadata.author.title}
                  </Link>
                  <p className="text-gray-700 mt-2">{post.metadata.author.metadata.bio}</p>
                  {(post.metadata.author.metadata.instagram || post.metadata.author.metadata.twitter) && (
                    <div className="flex gap-4 mt-3">
                      {post.metadata.author.metadata.instagram && (
                        <a
                          href={`https://instagram.com/${post.metadata.author.metadata.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary"
                        >
                          Instagram
                        </a>
                      )}
                      {post.metadata.author.metadata.twitter && (
                        <a
                          href={`https://twitter.com/${post.metadata.author.metadata.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary"
                        >
                          Twitter
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}