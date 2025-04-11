import {
  AlertComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CatalogoSelectComponent,
  FirmaElectronicaComponent,
  SharedModule,
  SolicitanteComponent,
  TablaDinamicaComponent,
  TableComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ContenedorDePasosComponent } from './pages/contenedor-de-pasos/contenedor-de-pasos.component';
import { EmpresasSubFabricanteComponent } from './components/empresas-submanufactureras/empresas-subfabricante.component';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SubfabricanteExtentionRoutingModule } from './subfabricante-extension-routing.module';
import { SubfabricanteService } from './servicios/servicios-subfabricante.service';

import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    ContenedorDePasosComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent
  ],
  imports: [
    AlertComponent,
    AnexarDocumentosComponent,
    BtnContinuarComponent,
    CatalogoSelectComponent,
    CommonModule,
    FirmaElectronicaComponent,
    ReactiveFormsModule,
    RouterModule,
    SubfabricanteExtentionRoutingModule,
    SharedModule,
    TituloComponent,
    WizardComponent,
    SolicitanteComponent,
    TableComponent,
    FirmaElectronicaComponent,
    TablaDinamicaComponent,
    EmpresasSubFabricanteComponent,
  ],
  providers: [SubfabricanteService, ToastrService],
})
export class SubfabricanteExtentionModule {}
