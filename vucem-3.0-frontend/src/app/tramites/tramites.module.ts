import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatoseDelTramiteARealizarComponentsComponent } from './shared-forms/datose-del-tramite-a-realizar.components/datose-del-tramite-a-realizar.components.component';
import { DatoseDelTramiteARealizarComponent } from './shared-forms/datose-del-tramite-a-realizar/datose-del-tramite-a-realizar.component';



@NgModule({
  declarations: [  
    DatoseDelTramiteARealizarComponentsComponent, DatoseDelTramiteARealizarComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
  ]
})
export class ViewsModule { }
