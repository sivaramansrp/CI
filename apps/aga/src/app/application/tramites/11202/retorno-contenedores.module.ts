import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetornoContenedoresRoutingModule } from './retorno-contenedores-routing.module';
import { SolicitanteComponent } from './components/solicitante/solicitante.component';
import { ContenedorComponent } from './components/contenedor/contenedor.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { SharedModule } from '@ng-mf/data-access-user';
import { RouterModule } from '@angular/router';
import { WizardComponent } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { InputCheckComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { InputHoraComponent } from '@ng-mf/data-access-user';
import { CrosslistComponent } from '@ng-mf/data-access-user';
import { SelectPaisesComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { RepresentanteFiscalComponent } from '@ng-mf/data-access-user';
import {
  AgregarTransporteComponent,
  CatalogosService,
} from '@ng-mf/data-access-user';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

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
    AlertComponent,
    FirmaElectronicaComponent,
    FirmaElectronicaComponent,
    PasoTresComponent,
    SelectCatalogosComponent,
    InputFechaComponent,
    InputCheckComponent,
    InputHoraComponent,
    CrosslistComponent,
    SelectPaisesComponent,
    CatalogoSelectComponent,
    RepresentanteFiscalComponent,
    FirmaElectronicaComponent,
    
    
  ],
  exports: [SolicitanteComponent, ContenedorComponent, PasoUnoComponent],
  providers: [CatalogosService, ToastrService],
})
export class RetornoContenedoresModule {}
