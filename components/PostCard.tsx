import Link from 'next/link';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        {post.metadata?.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={225}
            />
          </div>
        )}
        
        <div className="p-6">
          {post.metadata?.categories && post.metadata.categories.length > 0 && (
            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-medium mb-3">
              {post.metadata.categories[0]?.title}
            </span>
          )}
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          {post.metadata?.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.metadata.excerpt}
            </p>
          )}
          
          {post.metadata?.author && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {post.metadata.author.metadata?.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.title}
                  className="w-6 h-6 rounded-full"
                  width={32}
                  height={32}
                />
              )}
              <span>{post.metadata.author.title}</span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}