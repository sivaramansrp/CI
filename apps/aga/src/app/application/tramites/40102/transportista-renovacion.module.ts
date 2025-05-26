import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportistaTerrestreRoutingModule } from './transportista-renovacion-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ChoferesComponent } from './components/choferes/choferes.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { SharedModule } from '@ng-mf/data-access-user';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import {
  AgregarTransporteComponent,
  CatalogosService,
} from '@ng-mf/data-access-user';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { DirectorGeneralComponent } from './components/director-general/director-general.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { Tramite40102Service } from './estados/tramite40102.service';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import {SubirDocumentoService} from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoUnoComponent,
    VehiculosComponent,
    PasoTresComponent,
    DirectorGeneralComponent,
    SolicitanteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TransportistaTerrestreRoutingModule ,
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
    ChoferesComponent,
  ],
  exports: [
    PasoUnoComponent,
    PasoTresComponent,
    BtnContinuarComponent,
  ],
  providers: [ToastrService, CatalogosService, Tramite40102Service, InicioSesionService, SubirDocumentoService],
})
export class TransportistaRenovacionModule {}
