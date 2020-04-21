import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule} from "@angular/forms";

import { IonicModule } from '@ionic/angular';
import {PageContentModule} from "../../components/page-content/page-content.module";
import {RegisterPage} from "./register.page";

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PageContentModule
    ],
  declarations: [RegisterPage],
})
export class RegisterFormPageModule {}
