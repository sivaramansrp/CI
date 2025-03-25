import { CommonModule } from '@angular/common';

import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';

import { SolicitanteComponent } from './components/solicitante/solicitante.component';

import { PasoTresComponent } from './pages/paso-tres/paso-tres.component';

import { PasoDosComponent } from './pages/paso-dos/paso-dos.component';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';


import { TercerosService } from './services/terceros.service';

import { NgModule } from '@angular/core';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';

import { EntradaHumanaRoutingModule } from './entrada-humana-routing.module';

import { Datos260402Component } from './pages/datos-260402/datos-260402.component';
import { EntradaHumanaComponent } from './pages/entrada-humana/entrada-humana.component';
import { TercerosRelacionadosComponent } from '../../shared/components/terceros-relacionados/terceros-relacionados.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';


@NgModule({
  declarations: [Datos260402Component,EntradaHumanaComponent
  ],
  imports: [
    CommonModule,
    EntradaHumanaRoutingModule,
    WizardComponent,
    TituloComponent,
    SolicitanteComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    TercerosRelacionadosComponent,
    ModalComponent
  ],
  providers: [provideHttpClient(), ToastrService,TercerosService,InicioSesionService,SubirDocumentoService ],
})
export class EntradaHumanaModule { }
