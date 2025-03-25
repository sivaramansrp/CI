import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetiradaDeLaAutorizacionDeDonacioneRoutingModule } from './retirada-de-la-autorizacion-de-donacione-routing.module';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { AlertComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
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
import { ToastrService } from 'ngx-toastr';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import {SubirDocumentoService} from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';
@NgModule({
  declarations: [
    SolicitantePageComponent,
    PasoUnoComponent,
    PasoTresComponent,
    SolicitanteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RetiradaDeLaAutorizacionDeDonacioneRoutingModule ,
    RouterModule,
    WizardComponent,
    forwardRef(() => TituloComponent),
    forwardRef(() => BtnContinuarComponent),
    ReactiveFormsModule,
    forwardRef(() => AlertComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => SelectCatalogosComponent),
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
  exports: [
    PasoUnoComponent,
    PasoTresComponent,
    BtnContinuarComponent,
  ],
  providers: [ToastrService, CatalogosService, InicioSesionService, SubirDocumentoService],
})
export class TransportistaTerrestreModule {}
