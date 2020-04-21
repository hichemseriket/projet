import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {PageContentModule} from '../../components/page-content/page-content.module';
import {SearchBarModule} from '../../components/search/search-bar.module';
import { SearchPage } from './search.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PageContentModule,
        SearchBarModule
    ],
    declarations: [SearchPage],
    exports: [
        SearchPage
    ],
    entryComponents: []
})
export class SearchPageModule {}
