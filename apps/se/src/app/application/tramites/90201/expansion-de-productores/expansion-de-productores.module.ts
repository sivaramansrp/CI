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
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CatalogosService } from 'libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { FirmarSolicitudPasoDosComponent } from '../components/firmar-solicitud-paso-dos/firmar-solicitud-paso-dos.component';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src/tramites/components/anexar-documentos/anexar-documentos.component';



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
    FirmarSolicitudPasoDosComponent,
    AnexarDocumentosComponent,
    ToastrModule.forRoot()
  ],
  exports: [],
  providers: [
    ToastrService,
    CatalogosService
  ]
})

/**
 * Este módulo se utiliza para configurar los componentes del módulo 90201.
 * Importar los componentes del módulo.
 */
export class ExpansionDeProductoresModule { }
