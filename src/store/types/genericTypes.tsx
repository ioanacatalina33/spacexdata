export enum StatusTypes {
  LAUNCH = 'Launch',
  ROCKET = 'Rocket',
}

export type Status = {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
};

export type Statuses = {
  [key in StatusTypes]?: Status;
};
