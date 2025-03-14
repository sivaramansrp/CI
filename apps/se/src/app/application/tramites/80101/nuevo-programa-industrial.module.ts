import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, FirmaElectronicaComponent, SharedModule, SolicitanteComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { AnexoVistaDosYTresComponent } from './component/anexo-vista-dos-y-tres/anexo-vista-dos-y-tres.component';
import { AnexoVistaUnoComponent } from './component/anexo-vista-uno/anexo-vista-uno.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NuevoProgramaIndustrialRoutingModule } from './nuevo-programa-industrial-routing.module';
import { PasoCapturarSolicitudComponent } from './pages/paso-capturar-solicitud/paso-capturar-solicitud.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoFirmarSolicitudComponent } from './pages/paso-firmar-solicitud/paso-firmar-solicitud.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoCsComponent } from './pages/paso-uno-cs/paso-uno-cs.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ 
    PasoCapturarSolicitudComponent,
    PasoDosComponent,
    PasoFirmarSolicitudComponent,
    PasoTresComponent,
    PasoUnoCsComponent,
  ],
  imports: [
    CommonModule,
    NuevoProgramaIndustrialRoutingModule,
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    FirmaElectronicaComponent,
    ReactiveFormsModule,
    SharedModule,
    SolicitanteComponent,
    TituloComponent,
    WizardComponent,
    AnexoVistaDosYTresComponent,
    AnexoVistaUnoComponent
    
  ]
})
export class NuevoProgramaIndustrialModule { }
