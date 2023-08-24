export interface ProcessBabyBase {
  id: string;
  event: string;
  status: string;
  description: string;
}

export enum TableItemList {
  mom = 0,
  baby,
  other
}