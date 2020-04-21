import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {PageContentModule} from "../../components/page-content/page-content.module";
import {NotAuthGuard} from "../../guards/no-auth.guard";

import { InitPasswordPage } from './init-password.page';

const routes: Routes = [
  {
    path: '',
    component: InitPasswordPage,
    canActivate: [NotAuthGuard]
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
  declarations: [InitPasswordPage]
})
export class InitPasswordPageModule {}
