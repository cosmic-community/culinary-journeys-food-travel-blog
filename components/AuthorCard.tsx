import Link from 'next/link';
import { Author } from '@/types';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/authors/${author.slug}`} className="group">
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          {author.metadata?.profile_photo && (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-16 h-16 rounded-full object-cover"
              width={80}
              height={80}
            />
          )}
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {author.title}
            </h3>
            
            {author.metadata?.bio && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {author.metadata.bio}
              </p>
            )}
            
            {(author.metadata?.instagram || author.metadata?.twitter) && (
              <div className="flex gap-3 text-sm">
                {author.metadata.instagram && (
                  <span className="text-primary">Instagram</span>
                )}
                {author.metadata.twitter && (
                  <span className="text-primary">Twitter</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}