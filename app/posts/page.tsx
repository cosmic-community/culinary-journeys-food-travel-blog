import { getAllPosts } from '@/lib/cosmic';
import { Post } from '@/types';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: 'All Posts - Culinary Journeys',
  description: 'Browse all food travel stories and culinary adventures from around the world.',
};

export const revalidate = 60;

export default async function PostsPage() {
  const allPosts = await getAllPosts() as Post[];

  if (!allPosts || allPosts.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">All Posts</h1>
        <p className="text-xl text-gray-600">No posts available yet.</p>
      </div>
    );
  }

  // Sort posts by creation date (newest first)
  const sortedPosts = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container-custom py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">All Stories</h1>
        <p className="text-xl text-gray-600">
          Explore {sortedPosts.length} culinary adventures from around the world
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}