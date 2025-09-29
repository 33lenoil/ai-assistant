// src/types/profile.ts
export type Profile = {
  name: string;
  headline?: string;
  titles?: string[];
  education?: Array<{
    school: string;
    degree: string;
    gpa?: string;
    start?: string;
    end?: string;
    location?: string;
  }>;
  skills?: {
    programming?: string[];
    web?: string[];
    backend?: string[];
    data?: string[];
    ai?: string[];
    tools?: string[];
  };
  experience?: Array<{
    company: string;
    role: string;
    from?: string;
    to?: string;
    location?: string;
    bullets?: string[];
  }>;
  projects?: Array<{ name: string; summary?: string }>;
  links?: { resume?: string; linkedin?: string; github?: string };
  faq?: Array<{ q: string; a: string }>;
};

export type RepoItem = {
  name: string;
  url: string;
  tags?: string[];
};
