import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { DatosComponent } from './pages/datos/datos.component';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroComoEmpresaRoutingModule } from './registro-como-empresa-routing.module';



@NgModule({
  declarations: [DatosComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    RegistroComoEmpresaRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    DatosEmpresaComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent
  ],
})
export class RegistroComoEmpresaModule {}
