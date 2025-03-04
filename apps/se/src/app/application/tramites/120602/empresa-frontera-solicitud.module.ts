import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DatosComponent } from './pages/datos/datos.component';
import { EmpresaFronteraSolicitudRoutingModule } from './empresa-frontera-solicitud-routing.module';

import { EmpresaFronteraSolicitudComponent } from './pages/empresa-frontera-solicitud/empresa-frontera-solicitud';

import { TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';

@NgModule({
  declarations: [DatosComponent,EmpresaFronteraSolicitudComponent],
  imports: [CommonModule, 
    EmpresaFronteraSolicitudRoutingModule,
    WizardComponent,
    TituloComponent,
    DatosEmpresaComponent
  ],
})
export class EmpresaFronteraSolicitudModule {}
