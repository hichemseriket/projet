import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InactiveUserPage } from './inactive-user.page';
import {PageContentModule} from "../../../../components/page-content/page-content.module";

const routes: Routes = [
  {
    path: '',
    component: InactiveUserPage
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
  declarations: [InactiveUserPage]
})
export class InactiveUserPageModule {}
