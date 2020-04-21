import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
    { path: 'association', loadChildren: './pages/association/association.module#AssociationPageModule' },
    { path: 'application', loadChildren: './pages/application/application.module#ApplicationPageModule' },
    { path: 'map/:lat/:lng', loadChildren: './pages/map/map.module#MapPageModule'},
    { path: 'map', loadChildren: './pages/map/map.module#MapPageModule'},
    { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule'},
    { path: 'house-card/:ref', loadChildren: './pages/house-card/house-card.module#HouseCardPageModule'},
    { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule'},
    { path: 'new-house', loadChildren: './pages/new-house/new-house.module#NewHousePageModule'},
    { path: 'upload/:ref/:nbPic', loadChildren: './pages/upload/upload.module#UploadPageModule' },
    { path: 'list-user', loadChildren: './pages/admin/admin-user-manager/list-user/list-user.module#ListUserPageModule' },
    { path: 'register-request', loadChildren: './pages/admin/admin-user-manager/register-request/admin-dashboard.module#AdminDashboardPageModule'},
    { path: 'group-manager', loadChildren: './pages/admin/admin-user-manager/group-manager/group-manager.module#GroupManagerPageModule' },
    {path: 'inactive-user', loadChildren: './pages/admin/admin-user-manager/inactive-user/inactive-user.module#InactiveUserPageModule'},
    { path: 'register', loadChildren: './pages/register/register.module#RegisterFormPageModule' },
    { path: 'login', loadChildren: './pages/login-page/login-page.module#LoginPageModule' },
    { path: 'register/gcu', loadChildren: './pages/register/gcu/gcu.module#GcuPageModule' },
    { path: 'profil', loadChildren: './pages/user-profil/user-profil.module#UserProfilModule'},
    { path: 'profil/:idUser', loadChildren: './pages/user-profil/user-profil.module#UserProfilModule'},
  { path: 'init-password/:id/:keytemp', loadChildren: './pages/init-password/init-password.module#InitPasswordPageModule' },
  { path: 'confirm-mail/:id/:keytemp/:newMail', loadChildren: './pages/confirm-mail/confirm-mail.module#ConfirmMailPageModule' },
  { path: 'list-house', loadChildren: './pages/admin/admin-user-manager/list-house/list-house.module#ListHousePageModule' },
  { path: 'house-sheet/:idHouse', loadChildren: './pages/house-sheet/house-sheet.module#HouseSheetPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
