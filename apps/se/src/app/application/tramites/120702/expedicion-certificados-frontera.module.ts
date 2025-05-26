import {
  BtnContinuarComponent,
  InicioSesionService,
  SolicitanteComponent,
  SubirDocumentoService,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ExpedicionAsignacionComponent } from './components/expedicion-asignacion/expedicion-asignacion.component';
import { ExpedicionCertificadosFronteraComponent } from './pages/expedicion-certificados-frontera/expedicion-certificados-frontera.component';
import { ExpedicionCertificadosFronteraRoutingModule } from './expedicion-certificados-frontera-routing.module';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ExpedicionCertificadosFronteraComponent,
    PasoUnoComponent,
    PasoTresComponent,
  ],
  imports: [
    CommonModule,
    BtnContinuarComponent,
    TituloComponent,
    WizardComponent,
    SolicitanteComponent,
    AlertComponent,
    ExpedicionAsignacionComponent,
    FirmaElectronicaComponent,
    ExpedicionCertificadosFronteraRoutingModule,
  ],
  providers: [
    provideHttpClient(),
    InicioSesionService,
    SubirDocumentoService,
    ToastrService,
  ],
})
export class ExpedicionCertificadosFronteraModule {}
