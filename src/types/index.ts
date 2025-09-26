// Repo entry from repos.json
export type RepoItem = {
  id: string;
  name: string;
  url: string;
  tags?: string[];
};

// Profile structure (simplified)
export type Profile = {
  name: string;
  titles: string[];
  education: {
    school: string;
    degree: string;
    gpa?: string;
    start: string;
    end: string | null;
    location?: string;
  }[];
  skills: Record<string, string[]>;
  experience: {
    company: string;
    role: string;
    location?: string;
    start: string;
    end: string | null;
    bullets: string[];
  }[];
  links: Record<string, string>;
  faqs?: { q: string; a: string }[];
};
