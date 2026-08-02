export type DbProject = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  live_demo_url: string | null;
  github_url: string | null;
  images: string[];
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectInput = {
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  live_demo_url?: string | null;
  github_url?: string | null;
  images: string[];
  featured: boolean;
  display_order?: number;
};
