import {
  AlertComponent,
  CatalogosService,
  TramiteFolioService,
} from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { EndosoGarantiaRoutingModule } from './endoso-garantia-routing.module';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PaginaDosAcusesYResolucionesDetallesComponent } from './pages/pagina-dos-acuses-y-resoluciones-detalles/pagina-dos-acuses-y-resoluciones-detalles.component';
import { PaginaUnoAcusesYResolucionesBusquedaComponent } from './pages/pagina-uno-acuses-y-resoluciones-busqueda/pagina-uno-acuses-y-resoluciones-busqueda.component';
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
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [],
  imports: [
    FirmaElectronicaComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    WizardComponent,
    EndosoGarantiaRoutingModule,
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
    PaginaDosAcusesYResolucionesDetallesComponent,
    PaginaUnoAcusesYResolucionesBusquedaComponent,
    PasoUnoComponent,
    SolicitudPageComponent,
    PasoDosComponent,
    PasoTresComponent,
  ],
  exports: [],
  providers: [
    ToastrService,
    // RetiradaDeLaAutorizacionDeDonacionesService,
    CatalogosService,
    TramiteFolioService,
  ],
})
export class EndosoGarantiaModule {}
