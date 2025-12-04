import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow border-2 border-transparent group-hover:border-primary">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        
        {category.metadata?.description && (
          <p className="text-gray-600">
            {category.metadata.description}
          </p>
        )}
        
        <div className="mt-4 text-primary font-medium">
          Explore →
        </div>
      </div>
    </Link>
  );
}