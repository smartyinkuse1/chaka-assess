import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { AngularMaterialModule } from './angular-material.module';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    LoaderComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    LoaderComponent,
    AngularMaterialModule,
    CardComponent
  ]
})
export class SharedModule { }
