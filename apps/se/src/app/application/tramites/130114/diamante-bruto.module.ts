import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, SolicitanteComponent, TablaDinamicaComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PageComponent } from './pages/page/page.component';
import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { DiamanteBrutoRoutingModule } from './diamante-bruto-routing.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SolicitudComponent } from './component/solicitud.component';
import { RepresentacionComponent } from '../../shared/components/representacion/representacion.component';
import { PaisProcendenciaComponent } from '../../shared/components/pais-procendencia/pais-procendencia.component';
import { DetosDelTramiteComponent } from '../../shared/components/detos-de-tramite/detos-del-tramite.component';
import { DetosDelLaMarcaciaComponent } from '../130102/component/datos-de-la-mercacia/datos-de-la-mercacia.component';
import { CriterioDeDictComponent } from '../130102/component/criterio-de-dict/criterio-de-dict.component';



@NgModule({
  declarations: [PageComponent, PasoUnoComponent],
  imports: [
    CommonModule, 
    DiamanteBrutoRoutingModule,
    WizardComponent,
    SolicitanteComponent,
    TituloComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    BtnContinuarComponent,
    TablaDinamicaComponent,
    PasoDosComponent,
    PasoTresComponent,
    AlertComponent,
    SolicitudComponent,
    // CriterioDeDictComponent,
    // DetosDelLaMarcaciaComponent,
    // DetosDelTramiteComponent,
    // PaisProcendenciaComponent,
    // RepresentacionComponent,
    ToastrModule.forRoot()
  ],
  providers: [
    ToastrService
  ]
})
export class DiamanteBrutoModule {}
