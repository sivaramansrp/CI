import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BitacoraComponent } from './components/bitacora/bitacora.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  FirmaElectronicaComponent,
  SolicitanteComponent,
  TablaDinamicaComponent,
  TituloComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';

import { ComplementariaImmexComponent } from './components/complementaria-immex/complementaria-immex.component';
import { ModificacionComponent } from './components/modificacion/modificacion.component';
import { ModificacionSolicitudeService } from './services/modificacion-solicitude.service';
import { PasoDosComponent } from './pages/registro-modificacion-page/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/registro-modificacion-page/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/registro-modificacion-page/paso-uno/paso-uno.component';
import { RegistroModificacionPageComponent } from './pages/registro-modificacion-page/registro-modificacion-page.component';
import { RegistroModificacionRoutingModule } from './registro-modificacion.routing.module';

@NgModule({
    declarations: [
        RegistroModificacionPageComponent,
        PasoUnoComponent,
        PasoTresComponent,
        BitacoraComponent,
        
    ],
    imports: [
        TablaDinamicaComponent,
        TituloComponent,
        ComplementariaImmexComponent,
        CommonModule,
        SolicitanteComponent,
        FirmaElectronicaComponent,
        ModificacionComponent,
        PasoDosComponent,
        BtnContinuarComponent,
        FormsModule,
        WizardComponent,
        ReactiveFormsModule,
        RouterModule,
        RegistroModificacionRoutingModule,
        TituloComponent,
         AlertComponent,
          AnexarDocumentosComponent
    ],
    exports:[],
     providers: [ModificacionSolicitudeService,
        ToastrService
      ]
})
export class RegistroModificacionModule { }