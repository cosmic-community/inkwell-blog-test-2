# Inkwell Blog

![Inkwell Blog](https://imgix.cosmicjs.com/5ec09580-0bbd-11f1-9563-f7cc37f51ae9-photo-1555066931-4365d14bab8c-1771304337926.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, server-rendered blog platform built with Next.js 16 and [Cosmic](https://www.cosmicjs.com). Inkwell delivers a beautiful reading experience with rich markdown content, author profiles, category browsing, and responsive design — all powered by your Cosmic CMS content.

## Features

- 📝 **Rich Blog Posts** — Full markdown rendering with beautiful typography
- ✍️ **Author Profiles** — Dedicated pages with bio, avatar, and authored posts
- 🏷️ **Category Navigation** — Browse and filter posts by category
- ⚡ **Server-Side Rendering** — Lightning-fast page loads with Next.js 16 App Router
- 📱 **Fully Responsive** — Beautiful on every device from mobile to desktop
- 🖼️ **Optimized Images** — Automatic imgix optimization for all media
- 🔍 **SEO Optimized** — Server-rendered pages with proper meta tags
- 🎨 **Modern UI** — Clean editorial design with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=6993f50927b81270d523aebd&clone_repository=6993f71127b81270d523aedb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for 'Create a content model for a blog with posts, authors, and categories', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown support

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0+)
- A [Cosmic](https://www.cosmicjs.com) account with a bucket containing Posts, Authors, and Categories

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd inkwell-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start development server
bun dev
```

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

// Fetch all posts with author and category data
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single post by slug
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types:

| Type | Slug | Fields |
|------|------|--------|
| 📝 Posts | `posts` | title, content (markdown), featured_image, author (object), category (object) |
| ✍️ Authors | `authors` | name, bio, avatar (file) |
| 🏷️ Categories | `categories` | name, description |

Content relationships are resolved using the `depth(1)` parameter, which populates connected author and category data directly within post responses.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->