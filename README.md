# Culinary Journeys - Food Travel Blog

![App Preview](https://imgix.cosmicjs.com/8108dd00-d161-11f0-b20e-1d251587b0cd-photo-1599974579688-8dbdd335c77f-1764887715400.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive food travel blog built with Next.js 16 and powered by Cosmic CMS. Discover authentic culinary experiences from around the world through immersive stories, stunning photography, and passionate food writers.

## Features

- 📝 **Rich Content Display** - Full markdown support with beautiful typography and image optimization
- 🏷️ **Category Filtering** - Browse posts by Street Food, Regional Cuisine, or Food Markets
- ✍️ **Author Profiles** - Detailed author pages with bios, social links, and their published stories
- 🎨 **Modern Design** - Magazine-style layout with responsive grid system and card-based UI
- 🖼️ **Image Optimization** - Automatic imgix processing for fast-loading, high-quality images
- 🔍 **SEO Ready** - Proper meta tags, Open Graph, and structured data for search engines
- 📱 **Fully Responsive** - Seamless experience across desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Server-side rendering with Next.js 16 for optimal load times

## ## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69320c2a3584465d0a2f7e57&clone_repository=69320da83584465d0a2f7e7c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a food travel blog with posts, authors with bios, and categories"

### Code Generation Prompt

> Based on the content model I created for "Create a food travel blog with posts, authors with bios, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Cosmic CMS
- **Language**: TypeScript
- **Deployment**: Vercel-ready
- **Icons**: Heroicons
- **Markdown**: react-markdown

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your food travel blog bucket

### Installation

1. Clone this repository or copy the files to your project directory

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts with Authors and Categories

```typescript
import { cosmic } from '@/lib/cosmic'

const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects
```

### Getting a Single Post by Slug

```typescript
const response = await cosmic.objects.findOne({
  type: 'posts',
  slug: 'your-post-slug'
}).depth(1)

const post = response.object
```

### Filtering Posts by Category

```typescript
const response = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.categories': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types from your Cosmic bucket:

### Posts
- Title, excerpt, and markdown content
- Featured image with automatic optimization
- Connected author (object metafield)
- Multiple categories (objects metafield)

### Authors
- Name and bio
- Profile photo
- Social media handles (Instagram, Twitter)

### Categories
- Name and description
- Used for organizing and filtering posts

All content is fetched server-side using the Cosmic SDK with the `depth` parameter to include connected objects in a single query.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
4. Deploy!

The app is optimized for Vercel with proper caching and revalidation strategies.

### Environment Variables

Make sure to set these in your deployment platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key (required for fetching content)

## Project Structure

```
app/
├── layout.tsx                 # Root layout with navigation
├── page.tsx                   # Homepage with featured posts
├── posts/
│   ├── page.tsx              # All posts grid
│   └── [slug]/
│       └── page.tsx          # Individual post page
├── authors/
│   ├── page.tsx              # All authors grid
│   └── [slug]/
│       └── page.tsx          # Author profile with posts
└── categories/
    ├── page.tsx              # All categories grid
    └── [slug]/
        └── page.tsx          # Category page with filtered posts

components/
├── PostCard.tsx              # Post preview card
├── AuthorCard.tsx            # Author profile card
├── CategoryCard.tsx          # Category card
├── Header.tsx                # Site header with navigation
├── Footer.tsx                # Site footer
└── CosmicBadge.tsx          # "Built with Cosmic" badge

lib/
├── cosmic.ts                 # Cosmic SDK client
└── markdown.tsx              # Markdown rendering utilities

types.ts                      # TypeScript interfaces
```

## Customization

### Styling

The application uses Tailwind CSS with a warm, food-inspired color palette. Customize colors in `tailwind.config.js` and global styles in `app/globals.css`.

### Content Types

To modify content structure, update your Cosmic bucket's object types and adjust the TypeScript interfaces in `types.ts`.

### Layout

The homepage features a hero section with the latest post and a grid of recent articles. Customize layouts in the respective page components.

## License

MIT

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) - The Headless CMS for modern applications

<!-- README_END -->