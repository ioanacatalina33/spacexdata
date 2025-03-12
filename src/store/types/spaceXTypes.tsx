export interface Ship {
  id: string;
  name: string;
  model: string;
  type: string;
  yearBuild: string;
}

export interface Launch {
  id: string;
  name: string;
  dateUtc?: string;
  rocketId?: string;
  details: string;
  success: boolean;
  ships: Ship[];
}

export interface Rocket {
  id: string;
  name: string;
  type: string;
  costPerLaunch: number;
  successRatePct: number;
  active: boolean;
}
