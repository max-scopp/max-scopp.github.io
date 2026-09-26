export const links = {
  github: 'https://github.com/max-scopp',
  linkedin: 'https://www.linkedin.com/in/max-scopp/',
  email: 'mailto:me@maxscopp.de',
};

export const focusAreas = [
  'Product Thinking',
  'UX / UI Design',
  'Fullstack Development',
  'AI-Native Workflows',
  'Open Source',
];

export type Project = {
  title: string;
  description: string;
  icon: 'cube' | 'home' | 'layers';
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    title: 'Cold Crabby Slicer',
    description:
      'A modern, cross-platform 3D printing slicer with a focus on usability and performance.',
    icon: 'cube',
    tags: ['Angular', 'Rust', 'WASM', 'Three.js'],
    href: `${links.github}?tab=repositories&q=slicer`,
  },
  {
    title: 'Smart Home Ecosystem',
    description:
      'Home Assistant setup with custom integrations, automations and a clean, unified UI.',
    icon: 'home',
    tags: ['Home Assistant', 'TypeScript', 'UI/UX'],
    href: `${links.github}?tab=repositories&q=home`,
  },
  {
    title: 'Pencel',
    description:
      'A lightweight web component toolkit. Familiar syntax. No magic. No lock-in.',
    icon: 'layers',
    tags: ['Web Components', 'TypeScript', 'Build Tools'],
    href: `${links.github}?tab=repositories&q=pencel`,
  },
];

export type Step = {
  title: string;
  text: string;
  icon: 'bulb' | 'search' | 'monitor' | 'code' | 'chart';
};

export const process: Step[] = [
  { title: 'Idea', text: 'Understand the problem.', icon: 'bulb' },
  { title: 'Explore', text: 'Research, prototype, iterate with AI.', icon: 'search' },
  { title: 'Design', text: 'Turn ideas into clear, focused interfaces.', icon: 'monitor' },
  { title: 'Build', text: 'Ship with clean, maintainable code.', icon: 'code' },
  { title: 'Refine', text: 'Learn from real use and keep improving.', icon: 'chart' },
];

// Draft figures — replace with real numbers (or fetch them from the GitHub API at build time).
export const openSourceStats = [
  { label: 'Open source projects', value: '12+' },
  { label: 'Contributions', value: '200+' },
  { label: 'Experiments', value: 'Ongoing' },
  { label: 'Tools & libraries', value: 'Various' },
];
