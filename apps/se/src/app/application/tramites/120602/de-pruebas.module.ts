import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { DePruebasRoutingModule } from './de-pruebas-routing.module';

import { DePruebasComponent } from './pages/de-pruebas/de-pruebas.component';

import { TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';

@NgModule({
  declarations: [DatosComponent,DePruebasComponent],
  imports: [CommonModule, 
    DePruebasRoutingModule,
    WizardComponent,
    TituloComponent,
    DatosEmpresaComponent
  ],
})
export class DePruebasModule {}
