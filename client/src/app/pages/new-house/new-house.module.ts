import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MapCompModule} from "../../components/map/map-comp.module";

import { NewHousePage } from './new-house.page';
import {PageContentModule} from "../../components/page-content/page-content.module";
import {SimpleFormComponent} from "./simple-form/simple-form.component";
import {DetailedFormComponent} from "./detailed-form/detailed-form.component";

const routes: Routes = [
  {
    path: '',
    component: NewHousePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PageContentModule,
    ReactiveFormsModule,
    MapCompModule
  ],
  exports: [
    SimpleFormComponent
  ],
  declarations: [NewHousePage, SimpleFormComponent, DetailedFormComponent]
})
export class NewHousePageModule {}
