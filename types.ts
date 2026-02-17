// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
  status?: string;
  thumbnail?: string;
}

// Author type
export interface Author extends CosmicObject {
  metadata: {
    name: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category type
export interface Category extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
  };
}

// Post type
export interface Post extends CosmicObject {
  metadata: {
    title: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
  };
}

// Page type
export interface Page extends CosmicObject {
  metadata: {
    heading: string;
    subheading?: string;
    content?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Error helper
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}