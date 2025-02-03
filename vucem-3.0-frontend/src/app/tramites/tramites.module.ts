import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from './110101/pages/datos/datos.component';
import { PantallasComponent } from './110101/pages/pantallas/pantallas.component';



@NgModule({
  declarations: [  
    DatosComponent, PantallasComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ]
})
export class ViewsModule { }
