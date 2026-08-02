export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  live?: string;
  github?: string;
  featured?: boolean;
  images: ProjectImage[];
};
