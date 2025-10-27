import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { BusquedaFolioComponent } from './pages/busqueda-folio/busqueda-folio.component';
import { CancelacionDeSolicitudComponent } from './components/cancelacion-de-solicitud/cancelacion-de-solicitud.component';
import { CommonModule } from '@angular/common';
import { DesistimientoDePermisoRoutingModule } from './desistimiento-de-permiso-routing.module';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';
import { NgModule } from '@angular/core';
import { NotificacionesComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    IntroPermisoComponent,
    PasoTresComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CancelacionDeSolicitudComponent,
    BusquedaFolioComponent
  ],
  imports: [
    CommonModule,
    DesistimientoDePermisoRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    SharedModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    CrosslistComponent,
    InputCheckComponent,
    AlertComponent,
    InputFechaComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    SolicitanteComponent,
    TercerosComponent,
    CatalogoSelectComponent,
    TableComponent,
    InputRadioComponent,
    ToastrModule.forRoot(),
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  providers: [
    ToastrService
  ]
})
export class DesistimientoDePermisoModule { }
