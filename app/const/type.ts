export interface ProcessBabyBase {
  id: string;
  event: string;
  date: string,
  status: string;
  description: string;
  image: string;
  linkvideo: string
}

export enum TableItemList {
  mom = 0,
  baby,
  other
}