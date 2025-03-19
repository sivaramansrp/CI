import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesistimientoDePermisoRoutingModule } from './desistimiento-de-permiso-routing.module';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SelectCatalogosComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CancelacionDeSolicitusComponent } from './components/cancelacion-de-solicitus/cancelacion-de-solicitus.component';
import { BusquedaFolioComponent } from './pages/busqueda-folio/busqueda-folio.component';

@NgModule({
  declarations: [
    IntroPermisoComponent,
    PasoTresComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CancelacionDeSolicitusComponent,
    BusquedaFolioComponent
  ],
  imports: [
    CommonModule,
    DesistimientoDePermisoRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    CrosslistComponent,
    InputCheckComponent,
    SelectCatalogosComponent,
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
    TablaDinamicaComponent
  ],
  providers: [
    ToastrService
  ]
})
export class DesistimientoDePermisoModule { }
