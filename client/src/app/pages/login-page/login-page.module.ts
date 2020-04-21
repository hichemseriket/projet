import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {LoginPageComponent} from "./login-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageContentModule} from "../../components/page-content/page-content.module";

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  declarations: [LoginPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        PageContentModule,
        ReactiveFormsModule,
        IonicModule,
    ],
  exports: [LoginPageComponent]
})

export class LoginPageModule { }
