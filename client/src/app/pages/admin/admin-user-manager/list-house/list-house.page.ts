import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { HouseManager } from '../../../../services/house-manager/house-manager';
import { from } from 'rxjs';
import Swal from "sweetalert2";
import {ApiModel} from "../../../../models/api.model";
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-house',
  templateUrl: './list-house.page.html',
  styleUrls: ['./list-house.page.scss'],
})
export class ListHousePage implements OnInit {
  houses: any[];

  constructor(private apiService: ApiService, private houseManag: HouseManager, private router : Router) { }

  ngOnInit(): void {
    this.getHouses();
  }

  getHouses(): void {
    this.houses = this.houseManag.houseList;
    console.log(this.houses);
  }

  async onAccept(ref: string, data: number) {
    const content = {
      ref
    };
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    this.apiService.postApi('guest', 'addHouse', content).then((res: ApiModel) => {
      if (res.success) {

        Toast.fire('Maison ajoutée !', '', 'success');
        this.houses.splice(data, 1);
      } else {
        Toast.fire('Oups !', 'Une erreur est survenue', 'error');
      }
    });
  }

  onRefuse(data: number) {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire('Maison refusée !', '', "success");
    this.houses.splice(data, 1);
  }

  onAcceptSelection() {
    for (let house of this.houses) {
      if (house.checked === true) {
        house.active = false;
      }
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire('Maisons ajoutées !', '', 'success');
  }

  onRefuseSelection() {
    for (let house of this.houses) {
      if (house.checked === true) {
        house.active = false;
      }
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire('Maisons refusées !', '', "success");
  }

  onSelectAll() {
    for (let house of this.houses) {
      if (house.checked === false) {
        house.checked = true;
      }
    }
  }

  onRouterLink(link) {
    this.router.navigate([link]);
  }
}
