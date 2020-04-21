import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {PageFooterComponent} from './page-footer/page-footer.component';
import {PageHeaderComponent} from './page-header/page-header.component';
import {AdminHeaderPage} from './page-header/admin-header/admin-header.page';


@NgModule({
    declarations: [
        PageHeaderComponent,
        PageFooterComponent,
        AdminHeaderPage
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        PageHeaderComponent,
        PageFooterComponent,
        AdminHeaderPage
    ]
})
export class PageContentModule { }
