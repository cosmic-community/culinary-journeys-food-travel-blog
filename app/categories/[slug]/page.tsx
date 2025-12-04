// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic';
import { Category, Post } from '@/types';
import PostCard from '@/components/PostCard';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getAllCategories() as Category[];
  
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug) as Category;
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: `${category.title} - Culinary Journeys`,
    description: category.metadata?.description || `Posts in ${category.title}`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug) as Category;

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id) as Post[];

  // Sort posts by creation date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  return (
    <div className="container-custom py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">{category.metadata.description}</p>
        )}
        <p className="text-gray-500 mt-4">{sortedPosts.length} posts</p>
      </div>

      {sortedPosts.length === 0 ? (
        <p className="text-gray-600">No posts in this category yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}