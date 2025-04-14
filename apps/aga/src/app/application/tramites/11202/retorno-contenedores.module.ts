import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnexarDocumentosComponent, AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, CatalogosService, CrosslistComponent, FirmaElectronicaComponent, InputCheckComponent, InputFechaComponent, InputHoraComponent, InputRadioComponent, RepresentanteFiscalComponent, SelectPaisesComponent, SharedModule, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { ContenedorComponent } from './components/contenedor/contenedor.component';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { RetornoContenedoresRoutingModule } from './retorno-contenedores-routing.module';
import  {TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
@NgModule({
  declarations: [
    SolicitanteComponent,
    ContenedorComponent,
    PasoUnoComponent,
    SolicitantePageComponent,
    PasoDosComponent,
     
  ],
  imports: [
    CommonModule,
    RetornoContenedoresRoutingModule,
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
    InputFechaComponent,
    InputCheckComponent,
    InputHoraComponent,
    CrosslistComponent,
    SelectPaisesComponent,
    RepresentanteFiscalComponent,
    CatalogoSelectComponent,
    InputRadioComponent,
    PasoTresComponent,
    
    TablaDinamicaComponent
  ],
  exports: [SolicitanteComponent, ContenedorComponent, PasoUnoComponent],
  providers: [CatalogosService, ToastrService],
})
export class RetornoContenedoresModule {}
