/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntecesorRoutingModule } from './antecesor-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { SolicitanteComponent, WizardComponent } from '@ng-mf/data-access-user';
import { NavComponent } from '@ng-mf/data-access-user';
import { ReprestantanteComponent } from '../components/represtantante/represtantante.component';
import { EnlaceComponent } from '../components/enlace/enlace.component';
import { PersonaComponent } from '../components/persona/persona.component';

import { AduaneroComponent } from '../components/aduanero/aduanero.component';

import { CapturarIvaeiepsComponent } from '../components/capturar-ivaeieps/capturar-ivaeieps.component';
import { AnexarRequisitosComponent } from '../components/anexar-requisitos/anexar-requisitos.component';
import { DatosPorRegimenComponent } from '../components/datos-por-regimen/datos-por-regimen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirmarSolicitudComponent } from '../pages/firmar-solicitud/firmar-solicitud.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { RequisitosComponent } from '../components/requisitos/requisitos.component';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [DatosComponent, PantallasComponent, FirmarSolicitudComponent],
  imports: [
    CommonModule,
    AntecesorRoutingModule,
    WizardComponent,
    NavComponent,
    ReprestantanteComponent,
    EnlaceComponent,
    PersonaComponent,
    SolicitanteComponent,

    NavComponent,
    AduaneroComponent,
    FormsModule,
    ReactiveFormsModule,
    CapturarIvaeiepsComponent,
    AnexarRequisitosComponent,
    DatosPorRegimenComponent,
    ReactiveFormsModule,
    FormsModule,
    FirmaElectronicaComponent,
    BtnContinuarComponent,
    RequisitosComponent,
    ToastrModule.forRoot(),
  ],
  providers: [
    ServiciosPantallaService,
    provideHttpClient(),
    ToastrService,
    BsModalService
    
  ]
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 31601.
 * Importar los componentes del módulo.
 */
export class AntecesorModule {}
