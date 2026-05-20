export const SUBJECT_SLUGS = {
  fste: "FSTE",
  "tech-and-policy": "Tech and Policy"
} as const;

export const MODULE_SLUGS = {
  "Week 1-3": "week-1-3",
  "Week 4-7": "week-4-7",
  "Week 8-12": "week-8-12",
  "Week 13": "week-13",
  "Week 14": "week-14",
  "Extra Questions": "extra-questions"
} as const;

export const TECH_POLICY_MODULES = [
  "Week 1-3",
  "Week 4-7",
  "Week 8-12",
  "Week 13",
  "Week 14",
  "Extra Questions"
] as const;

export const getSubjectFromSlug = (slug: string) => SUBJECT_SLUGS[slug as keyof typeof SUBJECT_SLUGS] ?? null;

export const getModuleFromSlug = (slug: string) => {
  const entry = Object.entries(MODULE_SLUGS).find(([, value]) => value === slug);
  return entry?.[0] ?? null;
};

export const getSubjectSlug = (subject: string) => {
  const entry = Object.entries(SUBJECT_SLUGS).find(([, value]) => value === subject);
  return entry?.[0] ?? "quiz";
};

export const getModuleSlug = (moduleTitle: string) => MODULE_SLUGS[moduleTitle as keyof typeof MODULE_SLUGS] ?? "module";
