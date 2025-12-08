export enum ViewState {
  CELLULAR = 'CELLULAR',
  GENETIC = 'GENETIC',
  MYCELIAL = 'MYCELIAL',
  SYNAPTIC = 'SYNAPTIC'
}

export interface OrganismNode {
  id: string;
  label: string;
  health: number;
  activity: number;
}