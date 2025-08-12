import {
  AlertComponent,
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { CancelacionesRoutingModule } from './cancelaciones-routing.module';
import { CommonModule } from '@angular/common';
import { DatosEmpresaComponent } from './components/datos-empresa/datos-empresa.component';
import { NgModule } from '@angular/core';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { RouterModule } from '@angular/router';
import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { ToastrService } from 'ngx-toastr';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
@NgModule({
  declarations: [
     
  ],
  imports: [
    CommonModule,
    BtnContinuarComponent,
    CancelacionesRoutingModule,
    RouterModule,
    WizardComponent,
    PasoUnoComponent,
    AlertComponent,
    SolicitantePageComponent,
    PasoUnoComponent,
    CommonModule,
    DatosEmpresaComponent,
    FirmaElectronicaComponent,
    PasoTresComponent
   
  ],
  exports: [],
  providers: [ToastrService]
})


export class CancelacionesModule {}
