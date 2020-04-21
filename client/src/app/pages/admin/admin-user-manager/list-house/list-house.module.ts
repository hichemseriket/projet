import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListHousePage } from './list-house.page';
import {PageContentModule} from "../../../../components/page-content/page-content.module";

const routes: Routes = [
  {
    path: '',
    component: ListHousePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PageContentModule
  ],
  declarations: [ListHousePage]
})
export class ListHousePageModule {}
