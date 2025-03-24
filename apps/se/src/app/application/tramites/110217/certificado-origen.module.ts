import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnexarDocumentosComponent, AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, CatalogosService, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, InputRadioComponent, RepresentanteFiscalComponent, SelectCatalogosComponent, SelectPaisesComponent, SharedModule, TituloComponent, WizardComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';

@NgModule({
  declarations: [
        PasoUnoComponent,
       PasoDosComponent,
       SolicitantePageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    WizardComponent,
    ReactiveFormsModule,
    FormsModule,
    TituloComponent,
    BtnContinuarComponent,
    FirmaElectronicaComponent,
    AlertComponent,
    AnexarDocumentosComponent,
    SelectCatalogosComponent,
    InputFechaComponent,
    InputCheckComponent,
    InputHoraComponent,
    CrosslistComponent,
    SelectPaisesComponent,
    RepresentanteFiscalComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    SolicitanteComponent,
   
  ],
  exports: [PasoUnoComponent],
  providers: [CatalogosService, ToastrService],
})
export class CertificadoOrigenModule{


}