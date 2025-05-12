import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputRadioComponent, SelectCatalogosComponent, SharedModule, SolicitanteComponent, TablaDinamicaComponent, TableComponent, TercerosComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { BusquedaFolioComponent } from './pages/busqueda-folio/busqueda-folio.component';
import { CancelacionDeCertificadosComponent } from './components/cancelacion-de-certificados/cancelacion-de-certificados.component';
import { CancelacionDeCertificadosDeCupoRoutingModule } from './cancelacion-de-certificados-de-cupo-routing.module';
import { CommonModule } from '@angular/common';
import { IntroPermisoComponent } from './pages/intro-permiso/intro-permiso.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    IntroPermisoComponent,
    PasoTresComponent,
    PasoUnoComponent,
    PasoDosComponent,
    CancelacionDeCertificadosComponent,
    BusquedaFolioComponent
  ],
  imports: [
    CommonModule,
    CancelacionDeCertificadosDeCupoRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
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
    TablaDinamicaComponent,
    TituloComponent
  ]
})
export class CancelacionDeCertificadosDeCupoModule { }
