import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { SanitaryPermitComponent } from './pages/sanitary-permit/sanitary-permit.component';
import { DatosEmpresaComponent } from './component/datos-empresa/datos-empresa.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RegistroComoEmpresaRoutingModule } from './mod-permiso-importacion-routing.module';




@NgModule({
  declarations: [SanitaryPermitComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    RegistroComoEmpresaRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    DatosEmpresaComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent
  ],
})
export class ModPermisoImportacionModule {}
