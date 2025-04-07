import { CommonModule } from '@angular/common';

import {
  BtnContinuarComponent,
  TituloComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { FloraFaunaComponent } from './pages/flora-fauna/flora-fauna.component';
import { FloraFaunaRoutingModule } from './flora-fauna-routing.module';
import { NgModule } from '@angular/core';

import { Datos250101Component } from './pages/datos-250101/datos-250101.component';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';

@NgModule({
  declarations: [FloraFaunaComponent,Datos250101Component],
  imports: [
    CommonModule,
    FloraFaunaRoutingModule,
    WizardComponent,
    TituloComponent,
    BtnContinuarComponent,
  ],
  providers: [
    provideHttpClient(),
    ToastrService,
    InicioSesionService,
    SubirDocumentoService,
  ],
})
export class FloraFaunaModule {}
