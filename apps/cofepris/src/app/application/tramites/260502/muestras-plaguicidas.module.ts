import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MuestrasPlaguicidasRoutingModule } from './muestras-plaguicidas-routing.module';
import { BtnContinuarComponent } from '@libs/shared/data-access-user/src/tramites/components/btn-continuar/btn-continuar.component';
import { AlertComponent, AnexarDocumentosComponent, FirmaElectronicaComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { DatosSolicitudComponent } from "./components/datos-solicitud/datos-solicitud.component";
import { TercerosFabricanteComponent } from "./components/terceros-fabricante/terceros-fabricante.component";
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PlaguicidasComponent } from './pages/plaguicidas/plaguicidas.component';



@NgModule({
  declarations: [
     PasoUnoComponent,
        PasoTresComponent,
        PasoDosComponent,
        PlaguicidasComponent,
  ],
  
  imports: [
    CommonModule,
    MuestrasPlaguicidasRoutingModule,
    BtnContinuarComponent,
    WizardComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    DatosSolicitudComponent,
    TercerosFabricanteComponent,
]
})
export class MuestrasPlaguicidasModule { }
