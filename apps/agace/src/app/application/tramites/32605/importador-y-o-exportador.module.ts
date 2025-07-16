import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DatosComunesComponent } from './components/datos-comunes/datos-comunes.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ImportadorYOExportadorRoutingModule } from './importador-y-o-exportador-routing.module';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosComponent } from './components/terceros-relacionados/terceros-relacionados.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    SolicitudPageComponent
  ],
  imports: [
    FirmaElectronicaComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    WizardComponent,
    ImportadorYOExportadorRoutingModule,
    SharedModule,
    SolicitanteComponent,
    BtnContinuarComponent,
    InputCheckComponent,
    InputFechaComponent,
    InputHoraComponent,
    CrosslistComponent,
    ReactiveFormsModule,
    TituloComponent,
    SelectPaisesComponent,
    AnexarDocumentosComponent,
    AlertComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    TablaDinamicaComponent,
    ToastrModule.forRoot(),
    PasoUnoComponent,
    TercerosRelacionadosComponent,
    DatosComunesComponent
  ],
  exports: [],
  providers: [
    ToastrService,
    CatalogosService,
    TramiteFolioService,
  ],
})
export class ImportadorYOExportadorModule {}
