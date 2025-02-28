import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RenovacionesComponent } from './pages/renovaciones/renovaciones.component';
import { RenovacionesMuestrasMercanciasRoutingModule } from './renovaciones-muestras-mercancias-routing.module';
import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  FirmaElectronicaComponent,
  InputFechaComponent,
  RenovacionesMuestrasMercanciasService,
  SolicitanteComponent,
  TableComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { RegistroRenovacionesMuestrasMercanciasComponent } from './components/registro-renovaciones-muestras-mercancias/registro-renovaciones-muestras-mercancias.component';
import { PagoLCComponent } from './components/pago-lc/pago-lc.component';
import { DatosProrrogaMuestrasMercanciasComponent } from './components/datos-prorroga-muestras-mercancias/datos-prorroga-muestras-mercancias.component';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    RenovacionesComponent,
    RegistroRenovacionesMuestrasMercanciasComponent,
    PagoLCComponent,
    DatosProrrogaMuestrasMercanciasComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RenovacionesMuestrasMercanciasRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    FirmaElectronicaComponent,
    TituloComponent,
    FormsModule,
    TableComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
  ],
  exports: [
    PasoUnoComponent, 
    PasoDosComponent, 
    PasoTresComponent,
    RegistroRenovacionesMuestrasMercanciasComponent,
    PagoLCComponent,
    DatosProrrogaMuestrasMercanciasComponent,
  ],
  providers: [RenovacionesMuestrasMercanciasService],
})
export class RenovacionesMuestrasMercanciasModule {}
