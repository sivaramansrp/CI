import { CommonModule } from '@angular/common';

import { BtnContinuarComponent, TituloComponent, WizardComponent } from '@ng-mf/data-access-user';

import { SolicitanteComponent } from './components/solicitante/solicitante.component';


import { ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { InicioSesionService } from '@libs/shared/data-access-user/src/core/services/shared/inicio-sesion/inicio-sesion.service';
import { SubirDocumentoService } from '@libs/shared/data-access-user/src/core/services/shared/subir-documento/subir-documento.service';

import { EntradaHumanaRoutingModule } from './entrada-humana-routing.module';

import { Datos260402Component } from './pages/datos-260402/datos-260402.component';
import { EntradaHumanaComponent } from './pages/entrada-humana/entrada-humana.component';
import { TercerosRelacionados260402Component } from '../../shared/components/terceros-relacionados-260402/terceros-relacionados-260402.component';



import { DatosGeneralesComponent } from '../../shared/components/datos-generales/datos-generales.component';
import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { Terceros260402Service } from '../../shared/services/terceros-260402.service';

import { PagoDeDerechos260402Service } from '../../shared/services/pago-de-derechos-260402.service';

import { PagoDeDerechos260402Component } from '../../shared/components/pago-de-derechos-260402/pago-de-derechos-260402.component';


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
    TercerosRelacionados260402Component,
    DatosGeneralesComponent,
    PagoDeDerechos260402Component
  ],
  providers: [provideHttpClient(), ToastrService,PagoDeDerechos260402Service,Terceros260402Service,InicioSesionService,SubirDocumentoService ],
})
export class EntradaHumanaModule { }
