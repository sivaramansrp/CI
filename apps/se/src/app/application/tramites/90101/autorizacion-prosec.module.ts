
import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { AutorizacionProsecRoutingModule } from './autorizacion-prosec-routing.module';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DomiciliosDePlantasComponent } from './components/domicilios-de-plantas/domicilios-de-plantas.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { NgModule } from '@angular/core';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoCuatroComponent } from './pages/paso-cuatro/paso-cuatro.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { ProductorIndirectoComponent } from './components/productor-indirecto/productor-indirecto.component';
import { ProsecComponent } from './pages/prosec/prosec.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SectoresYMercanciasComponent } from './components/sectores-y-mercancias/sectores-y-mercancias.component';
import { SharedModule } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

@NgModule({
  declarations: [
    ProsecComponent,
    PasoUnoComponent,
    DomiciliosDePlantasComponent,
    SectoresYMercanciasComponent,
    ProductorIndirectoComponent,
    PasoDosComponent,
    PasoTresComponent,
    PasoCuatroComponent
  ],
  imports: [
    CommonModule,
    AutorizacionProsecRoutingModule,
    WizardComponent,
    TituloComponent,
    SharedModule,
    ReactiveFormsModule,
    BtnContinuarComponent,
    RouterModule,
    SolicitanteComponent,
    AlertComponent,
    CatalogoSelectComponent,
    TableComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent
  ]
})
export class AutorizacionProsecModule { }
