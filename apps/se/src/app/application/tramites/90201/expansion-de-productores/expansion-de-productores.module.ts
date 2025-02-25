/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpansionDeProductoresRoutingModule } from './expansion-de-productores-routing.module';
import { DatosComponent } from '../pages/datos/datos.component';
import { PantallasComponent } from '../pages/pantallas/pantallas.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { SolicitanteComponent } from '../components/solicitante/solicitante.component';
import { SectoresYMercanciasComponent } from '../components/sectores-y-mercancias/sectores-y-mercancias.component';
import { ProductorIndirectoComponent } from '../components/productor-indirecto/productor-indirecto.component';
import { DomiciliosDePlantasComponent } from '../components/domicilios-de-plantas/domicilios-de-plantas.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { FirmarSolicitudComponent } from '../pages/firmar-solicitud/firmar-solicitud.component';
import { FirmaElectronicaComponent } from 'libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CatalogosService } from 'libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';



@NgModule({
  declarations: [ 
    DatosComponent, 
    PantallasComponent,
    FirmarSolicitudComponent
  ],
  imports: [
    CommonModule,
    ExpansionDeProductoresRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    SectoresYMercanciasComponent,
    ProductorIndirectoComponent,
    DomiciliosDePlantasComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    AlertComponent,
    TituloComponent,
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [
    ToastrService,
    CatalogosService
  ]
})
export class ExpansionDeProductoresModule { }
