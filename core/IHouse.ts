import {IMedia} from "./IMedia";

export interface IHouse {
  rows: any[];
  id: number;
  ref: string;
  lat: number;
  lng: number;
  city: string;
  street: string;
  type: string;
  description: string;
  constructionDate: Date;
  projectManager: string; // Maître d'oeuvre
  owner: string; // Maître d'ouvrage
  materials: string; // Matériaux
  other: string; // Sources et autres info
  media: IMedia[];
}
