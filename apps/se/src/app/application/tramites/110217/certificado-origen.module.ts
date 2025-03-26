import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnexarDocumentosComponent, AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, CatalogosService, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, InputRadioComponent, RepresentanteFiscalComponent, SelectCatalogosComponent, SelectPaisesComponent, SharedModule, TituloComponent, WizardComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { CertificadoOrigenRoutingModule } from './certificado-origen-routing.module';
import { DatosCertificadoComponent } from './components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from './components/destinatario/destinatario.component';

@NgModule({
  declarations: [
            SolicitantePageComponent,
            
  ],
  imports: [
    BtnContinuarComponent,
    CertificadoOrigenRoutingModule,
    RouterModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    DatosCertificadoComponent,
    DestinatarioComponent
   
  
   
  ],
  exports: [],
  providers: [],
})
export class CertificadoOrigenModule{


}