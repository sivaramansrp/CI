import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { TerritorioNacionalSolicitudeRoutingModule } from './territorio-nacional-solicitude-routing.module';

import {
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { FormsModule } from '@angular/forms';
import { TerritorioNacionalSolicitudeComponent } from './pages/territorio-nacional-solicitude/territorio-nacional-solicitude.component';

import { DatosTerritorioComponent } from './pages/datos-territorio.component/datos-territorio.component';
import { PropietarioComponent } from '../../shared/components/propietario/propietario.component';
import { PagoDeDerechosEntradaComponent } from '../../shared/components/pago-de-derechos-entrada/pago-de-derechos-entrada.component';
import { TercerosRelacionadosProcedenciaComponent } from '../../shared/components/terceros-relacionados-procedencia/terceros-relacionados-procedencia.component';
import { TercerosProcedenciaService } from '../../shared/services/terceros-procedencia.service';
import { PagoDeDerechosEntradaService } from '../../shared/services/pago-de-derechos-entrada.service';


@NgModule({
  declarations: [
    TerritorioNacionalSolicitudeComponent,
    DatosTerritorioComponent,
  ],
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    CommonModule,
    FormsModule,
    TerritorioNacionalSolicitudeRoutingModule,
    PropietarioComponent,
    PagoDeDerechosEntradaComponent,
    TercerosRelacionadosProcedenciaComponent
  ],
  providers: [PagoDeDerechosEntradaService,TercerosProcedenciaService],
})
export class TerritorioNacionalSolicitudeModule {}
