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
import { TercerosRelacionadosProcedenciaComponent } from '../../shared/components/terceros-relacionados-procedencia/terceros-relacionados-procedencia.component';



import { DatosGeneralesComponent } from '../../shared/components/datos-generales/datos-generales.component';
import { PasoDosComponent } from './components/paso-dos/paso-dos.component';
import { PasoTresComponent } from './components/paso-tres/paso-tres.component';
import { TercerosProcedenciaService } from '../../shared/services/terceros-procedencia.service';

import { PagoDeDerechosEntradaService } from '../../shared/services/pago-de-derechos-entrada.service';

import { PagoDeDerechosEntradaComponent } from '../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';


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
    TercerosRelacionadosProcedenciaComponent,
    DatosGeneralesComponent,
    PagoDeDerechosEntradaComponent
  ],
  providers: [provideHttpClient(), ToastrService,PagoDeDerechosEntradaService,TercerosProcedenciaService,InicioSesionService,SubirDocumentoService ],
})
export class EntradaHumanaModule { }
