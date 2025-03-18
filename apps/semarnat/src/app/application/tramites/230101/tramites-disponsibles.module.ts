import { AgregarTransporteComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { NavComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PagoDeDerechoComponent } from './components/pago-de-derecho/pago-de-derecho.component';
import { TramitesDisponiblesRoutingModule } from './tramites-disponibles-routing.module';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';
import { SolicitudDatosComponent } from './shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPantallasService } from './services/solicitud-pantallas.service';
import { MediodetransporteService } from './services/medio-de-transporte.service';


@NgModule({
  declarations: [
    SolicitudPageComponent,
    SolicitudComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PagoDeDerechoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TramitesDisponiblesRoutingModule,
    RouterModule,
    NavComponent,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
    ReactiveFormsModule,
    AlertComponent,
    FirmaElectronicaComponent,
    SelectCatalogosComponent,
    SolicitanteComponent,
    AnexarDocumentosComponent,
    InputCheckComponent,
    InputHoraComponent,
    InputFechaComponent,
    CrosslistComponent,
    AgregarTransporteComponent,
    RepresentanteFiscalComponent,
    SelectPaisesComponent,
    CatalogoSelectComponent,
    SolicitudDatosComponent,
    ToastrModule.forRoot()
  ],
  providers:[ToastrService, SolicitudPantallasService, MediodetransporteService],
  exports: [],
})
export class TramitesDisponiblesModule {}
