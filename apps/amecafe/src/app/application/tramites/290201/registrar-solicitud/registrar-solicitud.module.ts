import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudRoutingModule } from './registrar-solicitud-routing.module';
import { PasoDosComponent } from '../pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from '../pages/paso-tres/paso-tres.component';
import { SolicitudPageComponent } from '../pages/solicitud-page/solicitud-page.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src';
import { AlertComponent, AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosComponent } from '@libs/shared/data-access-user/src';


@NgModule({
  declarations: [
    PasoDosComponent,
    PasoUnoComponent,
    PasoTresComponent,
    SolicitudPageComponent,
   
  ],
  imports: [
    TituloComponent,
    BtnContinuarComponent,
    CommonModule,
    RegistrarSolicitudRoutingModule,
    WizardComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TercerosComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistrarSolicitudModule { }
