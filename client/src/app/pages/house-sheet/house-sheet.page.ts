import { Component, OnInit } from '@angular/core';
import { HouseManager } from '../../services/house-manager/house-manager';
import {IHouse} from "../../../../../core/IHouse";

@Component({
  selector: 'app-house-sheet',
  templateUrl: './house-sheet.page.html',
  styleUrls: ['./house-sheet.page.scss'],
})
export class HouseSheetPage implements OnInit {
  house: { projectManager: string;
  owner: string; other: string;
  lng: number; city: string;
  id_house: number;
  description: string;
  codePostal: string;
  type: string;
  ref: string;
  materials: string;
  street: string;
  checked: boolean;
  lat: number;
  constructionDate: number };

  constructor(private houseManag: HouseManager) { }

  ngOnInit() {
    this.getHouse(this.getHouseId());
  }

  getHouseId() {
    const url = document.location.href;
    const houseId = url.split("/")[5];
    return houseId;
  }

  getHouse(id) {
    this.houseManag.houseList.forEach(ele => {
      if (ele.id_house === id) {
        this.house = ele;
      }

    });
    console.log("house = ", this.house);
  }

  
}
