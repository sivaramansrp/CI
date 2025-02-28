import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { DatosDelTramiteComponent } from './components/datos-del-tramite/datos-del-tramite.component';
import { ImportadorExportadorRoutingModule } from './importador-exportador-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, CatalogoSelectComponent, CrosslistComponent, InputRadioComponent, SolicitanteComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent} from '@ng-mf/data-access-user';
import { WizardComponent} from '@ng-mf/data-access-user';

import { BrowserModule } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ImportadorExportadorRoutingModule,
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
    ReactiveFormsModule ,
    AnexarDocumentosComponent,
    PasoUnoComponent,
    SolicitudPageComponent,
    PasoTresComponent,
    DatosDelTramiteComponent,
    PasoDosComponent,    
    
],
exports:[],
providers: [
  ToastrService
],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImportadorExportadorModule {}
