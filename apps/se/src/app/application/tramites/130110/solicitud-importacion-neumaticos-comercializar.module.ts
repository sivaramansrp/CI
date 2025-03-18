import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudImportacionNeumaticosComercializarComponent } from './pages/solicitud-importacion-neumaticos-comercializar/solicitud-importacion-neumaticos-comercializar.component';
import { SolicitudImportacionNeumaticosComercializarRoutingModule } from './solicitud-importacion-neumaticos-comercializar-routing.module';
import { DatosComponent } from './pages/datos/datos.component';
import { BtnContinuarComponent } from 'libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { WizardComponent } from 'libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { SolicitanteSolicitudComponent } from './components/solicitante-solicitud/solicitante-solicitud.component';
import { Solicitante130110Component } from './pages/solicitante/solicitante.component';


@NgModule({
  declarations: [
    SolicitudImportacionNeumaticosComercializarComponent,
    Solicitante130110Component,
    DatosComponent
    ],
  imports: [
    CommonModule,
    SolicitudImportacionNeumaticosComercializarRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    SolicitanteSolicitudComponent
    
  ]
})
export class SolicitudImportacionNeumaticosComercializarModule { }
