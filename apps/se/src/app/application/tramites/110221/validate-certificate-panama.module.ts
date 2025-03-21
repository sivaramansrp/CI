import { AgregarTransporteComponent, CatalogosService } from '@ng-mf/data-access-user';
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
import { forwardRef, NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import { RouterModule } from '@angular/router';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { ValidateCertificatePanamaRoutingModule } from './validate-certificate-panama-routing.module';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { CertificadoOrigenComponent } from './components/certificado-origen/certificado-origen.component';
import { SolicitudPageComponent } from './pages/solicitud-page/solicitud-page.component';
import { TercerosComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DatosCertificadoComponent } from './components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';

@NgModule({
  declarations: [
    SolicitudPageComponent,
    CertificadoOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    PasoUnoComponent,
    PasoDosComponent
  ],
  imports: [
    forwardRef(() => TercerosComponent),
    forwardRef(() =>AgregarTransporteComponent),
    forwardRef(() =>AlertComponent),
    forwardRef(() => AnexarDocumentosComponent),
    forwardRef(() => BtnContinuarComponent),
    forwardRef(() => CatalogoSelectComponent),
    CommonModule,
    forwardRef(() => CrosslistComponent),
    forwardRef(() => FirmaElectronicaComponent),
    forwardRef(() => InputCheckComponent),
    forwardRef(() => InputFechaComponent),
    forwardRef(() => InputHoraComponent),
    forwardRef(() => NavComponent),
    ReactiveFormsModule,
    forwardRef(() => RepresentanteFiscalComponent),
    RouterModule,
    forwardRef(() => SelectCatalogosComponent),
    forwardRef(() => SelectPaisesComponent),
    ValidateCertificatePanamaRoutingModule,
    SharedModule,
    forwardRef(() => SolicitanteComponent),
    forwardRef(() => TituloComponent),
    forwardRef(() => WizardComponent),
    ToastrModule.forRoot()
  ],
  exports: [
    PasoUnoComponent
  ],
  providers: [
    ToastrService,
    CatalogosService
  ]
})
export class ValidateCertificatePanamaModule {}
