import { CUSTOM_ELEMENTS_SCHEMA, forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionFranjaFronterizaRoutingModule } from './Donación-Franja-Fronteriza-routing.module';
import { AnexarDocumentosComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { TipodeAvisoComponent } from './components/aviso/tipode-aviso.component';
import { MercanciaComponent } from './components/mercancia/mercancia.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { Tramite11101Store } from './estados/tramite11101.store';
@NgModule({
     declarations: [SolicitantePageComponent, PasoUnoComponent, PasoDosComponent, PasoTresComponent],

     imports: [
          MercanciaComponent,
          FirmaElectronicaComponent,
          TipodeAvisoComponent,
          TituloComponent,
          BtnContinuarComponent,
          SolicitanteComponent,
          CommonModule,
          DonacionFranjaFronterizaRoutingModule,
          WizardComponent,
          AnexarDocumentosComponent,
     ],
     exports: [],
     providers: [Tramite11101Store],
     schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonacionFranjaFronterizaModule { }