import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CatalogosService, CrosslistComponent,FirmaElectronicaComponent, InputRadioComponent, SolicitanteComponent, TableComponent, TituloComponent, TramiteFolioService, WizardComponent } from '@ng-mf/data-access-user';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ConcluirRelacionComponent } from './components/concluir-relacion/concluir-relacion.component';
import { ConcluirRelacionRoutingModule } from './concluir-relacion-routing.module';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ConcluirRelacionRoutingModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    WizardComponent,
    FirmaElectronicaComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    TituloComponent,
    CatalogoSelectComponent,
    TableComponent,
    InputRadioComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    PasoUnoComponent,
    SolicitudPageComponent,
    ConcluirRelacionComponent,
    
],
exports:[],
providers: [
  ToastrService,
  CatalogosService,
  TramiteFolioService
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConcluirRelacionModule { }
