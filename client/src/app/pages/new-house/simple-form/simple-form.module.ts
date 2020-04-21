import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {MapCompModule} from "../../../components/map/map-comp.module";
import {NewHousePageModule} from "../new-house.module";

import { NewHousePage } from './../new-house.page';
import {PageContentModule} from "../../../components/page-content/page-content.module";
import {SimpleFormComponent} from "./../simple-form/simple-form.component";


const routes: Routes = [
  {
    path: '',
    component: SimpleFormComponent,
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
    MapCompModule,
    NewHousePageModule
  ],
  declarations: [NewHousePage]
})
export class SimpleFormModule {}
