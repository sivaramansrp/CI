import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { WizardComponent } from '@libs/shared/data-access-user/src';

import { DatosEmpresaComponent } from './components/datos-empresa/datos-empresa.component';
import { DatosdelasolicitudComponent } from './components/datos-del/datos-de-la-solicitud.component';
import { PagoDeDerechoComponent } from './components/pagodederechos/pago-de-derecho.component';
import { TercerosrelacionadosComponent } from './components/terceros relacionados/terceros-relacionados.component';
import { TramitesAsociadosComponent } from './components/tramitesasociados/tramites-asociados.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PermisoSanitarioDispositivosMedicosComponent } from './pages/permiso-sanitario-dispositivos-medicos/permiso-sanitario-dispositivos-medicos.component';

import { PermisoSanitarioDispositivosMedicosRoutingModule } from './permiso-sanitario-dispositivos-medicos-routing.module';
import { PermisoSanitarioDispositivosMedicosService } from './services/permiso-sanitario-dispositivos-medicos.service';

import { ToastrService } from 'ngx-toastr';

@NgModule({
    declarations: [
      PasoUnoComponent,
      PasoDosComponent,
      PasoTresComponent,
      PermisoSanitarioDispositivosMedicosComponent,
    ],
  imports: [
    CommonModule,
    PermisoSanitarioDispositivosMedicosRoutingModule,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    DatosEmpresaComponent,
    CommonModule,
    PagoDeDerechoComponent,
    TramitesAsociadosComponent,
    TercerosrelacionadosComponent,
    DatosdelasolicitudComponent,
    FirmaElectronicaComponent,
    InputFechaComponent,
    SolicitanteComponent,
    TituloComponent,
    WizardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ToastrService,PermisoSanitarioDispositivosMedicosService],
})
export class PermisoSanitarioDispositivosMedicosModule { }
