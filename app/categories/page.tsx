import { getAllCategories } from '@/lib/cosmic';
import { Category } from '@/types';
import CategoryCard from '@/components/CategoryCard';

export const metadata = {
  title: 'Categories - Culinary Journeys',
  description: 'Browse posts by culinary category.',
};

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await getAllCategories() as Category[];

  if (!categories || categories.length === 0) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Categories</h1>
        <p className="text-xl text-gray-600">No categories available yet.</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse by Category</h1>
        <p className="text-xl text-gray-600">
          Explore culinary stories organized by theme and cuisine type
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}