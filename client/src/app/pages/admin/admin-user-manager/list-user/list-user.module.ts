import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {PageContentModule} from "../../../../components/page-content/page-content.module";

import { ListUserPage } from './list-user.page';

const routes: Routes = [
  {
    path: '',
    component: ListUserPage
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
  declarations: [ListUserPage]
})
export class ListUserPageModule {}
