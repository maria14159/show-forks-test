export type ResultTypes = {
  forks: ForkTypes[];
  page: number;
};

export type ForkTypes = {
  owner: string;
  full_name: string;
  url: string;
  star_count: string;
};
