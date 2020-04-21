import {IMedia} from "./IMedia";
import {IParcelle} from "./IParcelle";
import {IHistoire} from "./IHistoire";

export interface IHouseList {
  rows: any[];
  idHouse: number;
  nom: string;
  type: string;
  description: string;
  accepte: boolean;
  miseAJour: boolean;
  idMedia: number;
  idParcelle: IParcelle[];
  idHistoire: IHistoire;
}
