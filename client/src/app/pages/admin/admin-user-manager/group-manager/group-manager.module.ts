import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroupManagerPage } from './group-manager.page';
import {PageContentModule} from "../../../../components/page-content/page-content.module";

const routes: Routes = [
  {
    path: '',
    component: GroupManagerPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PageContentModule,
        ReactiveFormsModule
    ],
  declarations: [GroupManagerPage]
})
export class GroupManagerPageModule {}
