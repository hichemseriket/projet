import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IonicModule} from "@ionic/angular";
import {AccountComponent} from "../../components/user-system/account/account.component";
import {AuthGuard} from "../../guards/auth.guard";
import {UserProfilComponent} from "./user-profil.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageContentModule} from "../../components/page-content/page-content.module";
import {ProfilUserComponent} from "../../components/user-system/profil-user/profil-user.component";

const routes: Routes = [
  { path: '', component: UserProfilComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [UserProfilComponent, ProfilUserComponent, AccountComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        PageContentModule,
        ReactiveFormsModule,
        IonicModule,
        FontAwesomeModule,
    ],
  exports: [UserProfilComponent]
})

export class UserProfilModule {}
