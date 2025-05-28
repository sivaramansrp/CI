import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, forwardRef } from '@angular/core';
import { AgregarTransporteComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { DirectorGeneralComponent } from './components/director-general/director-general.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { RouterModule } from '@angular/router';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { Tramite40101Service } from './estado/tramite40101.service';
import { TransportistaTerrestreRoutingModule } from './transportista-terrestre-routing.module';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { WizardComponent } from '@ng-mf/data-access-user';
@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoUnoComponent,
    PasoTresComponent,
    SolicitanteComponent,
    DirectorGeneralComponent,
    ChoferesComponent,
    VehiculosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransportistaTerrestreRoutingModule,
    RouterModule,
    WizardComponent,
    forwardRef(() => TituloComponent),
    forwardRef(() => BtnContinuarComponent),
    ReactiveFormsModule,
    forwardRef(() => AlertComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => AnexarDocumentosComponent),
    forwardRef(() => InputCheckComponent),
    forwardRef(() => InputFechaComponent),
    forwardRef(() => InputHoraComponent),
    forwardRef(() => CrosslistComponent),
    forwardRef(() => AgregarTransporteComponent),
    forwardRef(() => RepresentanteFiscalComponent),
    forwardRef(() => SelectPaisesComponent),
    forwardRef(() => CatalogoSelectComponent),
  ],
  exports: [PasoUnoComponent, PasoTresComponent, BtnContinuarComponent],
  providers: [
    ToastrService,
    CatalogosService,
    Tramite40101Service,
    InicioSesionService,
    SubirDocumentoService,
  ],
})
export class TransportistaTerrestreModule {}
