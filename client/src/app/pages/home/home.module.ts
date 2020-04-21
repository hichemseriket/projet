import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MapCompModule} from '../../components/map/map-comp.module';
import {PageContentModule} from '../../components/page-content/page-content.module';
import {SearchBarModule} from '../../components/search/search-bar.module';
import {SearchBarComponent} from '../../components/search/search-bar.component';
import {SearchPageModule} from '../search/search.module';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        PageContentModule,
        MapCompModule,
        SearchBarModule
    ],
    exports: [

    ],
    declarations: [
        HomePage
    ]
})
export class HomePageModule {}
