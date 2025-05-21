import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { CancelacionesRoutingModule } from './cancelaciones-routing.module';

import {
  AlertComponent,
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { provideHttpClient } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';


import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';

import { SolicitantePageComponent } from './pages/solicitante-page/solicitante-page.component';
import { RouterModule } from '@angular/router';
import { DatosEmpresaComponent } from './components/datos-empresa/datos-empresa.component';


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
    DatosEmpresaComponent
  ],
  exports: [],
  providers: [ToastrService]
})


export class CancelacionesModule {}
