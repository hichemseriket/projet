import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MapCompModule} from "../../components/map/map-comp.module";
import {PageContentModule} from "../../components/page-content/page-content.module";
import { HouseSheetPage } from './house-sheet.page';
//import { MapingHouseComponent } from '../house-card/maping-house/maping-house.component';


const routes: Routes = [
  {
    path: '',
    component: HouseSheetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapCompModule,
    PageContentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HouseSheetPage]
})
export class HouseSheetPageModule {}
