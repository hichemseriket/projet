import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from "@ionic/angular";
import {SearchBarComponent} from './search-bar.component';

@NgModule({
  declarations: [
      SearchBarComponent
  ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule
    ],
    exports: [
        SearchBarComponent
    ]
})
export class SearchBarModule { }
