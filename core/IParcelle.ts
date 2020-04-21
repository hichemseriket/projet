import {IMedia} from "./IMedia";

export interface IParcelle {
  rows: any[];
  id: number;
  numberoRue: string;
  nomRue: string;
  codePostal: string;
  latitude: number;
  longitude: number;
  delimitation: string;
  cour: boolean;
  revetementCour: string;
  vegetation: string;
  vacant: boolean;
  notes: string;
  idMedia: number;
}
