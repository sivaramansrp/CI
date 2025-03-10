import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Datos140201Component } from './140201/pages/datos-140201.component';
import { CancelacionME140201Component } from './140201/pages/CancelacionME-140201.component';
import { Cancelaciones140201Component } from './140201/pages/cancelaciones-140201/cancelaciones-140201.component';

@NgModule({
  declarations: [
    Datos140201Component,
    CancelacionME140201Component,
    Cancelaciones140201Component,
  ],
  imports: [CommonModule],
  exports: [],
})
export class ViewsModule {}
