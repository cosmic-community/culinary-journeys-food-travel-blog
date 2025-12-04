import { getAllPosts } from '@/lib/cosmic';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const allPosts = await getAllPosts() as Post[];

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Culinary Journeys</h1>
        <p className="text-xl text-gray-600">No posts available yet. Check back soon!</p>
      </div>
    );
  }

  // Sort posts by creation date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  const featuredPost = sortedPosts[0];
  const recentPosts = sortedPosts.slice(1, 7);

  return (
    <div>
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="relative h-[600px] bg-gray-900">
          <div className="absolute inset-0">
            <img
              src={`${featuredPost.metadata?.featured_image?.imgix_url}?w=1600&h=600&fit=crop&auto=format,compress`}
              alt={featuredPost.title}
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="relative container-custom h-full flex items-center">
            <div className="max-w-3xl">
              <div className="mb-4">
                {featuredPost.metadata?.categories && featuredPost.metadata.categories.length > 0 && (
                  <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    {featuredPost.metadata.categories[0].title}
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                {featuredPost.title}
              </h1>
              {featuredPost.metadata?.excerpt && (
                <p className="text-xl text-gray-200 mb-6">
                  {featuredPost.metadata.excerpt}
                </p>
              )}
              <Link
                href={`/posts/${featuredPost.slug}`}
                className="inline-block bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Read Story
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="container-custom py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Latest Stories</h2>
          <Link
            href="/posts"
            className="text-primary hover:text-secondary font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Explore by Category</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/categories/street-food"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">🍜 Street Food</h3>
              <p className="text-gray-600">
                Authentic street food experiences from around the world
              </p>
            </Link>
            <Link
              href="/categories/regional-cuisine"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">🍽️ Regional Cuisine</h3>
              <p className="text-gray-600">
                Traditional dishes that define a region's culinary identity
              </p>
            </Link>
            <Link
              href="/categories/food-markets"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">🏪 Food Markets</h3>
              <p className="text-gray-600">
                Exploring bustling markets and their local delicacies
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}