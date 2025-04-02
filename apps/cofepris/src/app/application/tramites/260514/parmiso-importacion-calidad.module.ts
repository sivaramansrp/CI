import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ParmisoImportacionCalidadRoutingModule } from './parmiso-importacion-calidad-routing.module';

import { Datos260514Component } from './pages/datos-260514/datos-260514.component';
import { Pantallas260514Component } from './pages/pantallas-260514/pantallas-260514.component';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, FirmaElectronicaComponent, InicioSesionService, SolicitanteComponent, SubirDocumentoService, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { provideHttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [Datos260514Component, Pantallas260514Component,PasoDosComponent,PasoTresComponent],
  imports: [CommonModule, 
    ParmisoImportacionCalidadRoutingModule, 
    SolicitanteComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
        TituloComponent,
        AlertComponent,
        FirmaElectronicaComponent,
        WizardComponent
  ],
   providers: [
      provideHttpClient(),
      
      ToastrService,
      InicioSesionService,
      SubirDocumentoService,
     ],
})
export class ParmisoImportacionCalidadModule {}
