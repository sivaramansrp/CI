import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AduanaComponent } from './components/aduana/aduana.component';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { ExportarIlustracionesRoutingModule } from './exportar-ilustraciones-routing.module';
import { ExportarIlustracionesService } from './services/exportar-ilustraciones.service';
import { ItinerarioExportacionYTransportacionComponent } from './components/itinerario-exportacion-y-transportacion/itinerario-exportacion-y-transportacion.component';
import { LugarDeDestinoComponent } from './components/lugar-de-destino/lugar-de-destino.component';
import { MotivoDeLaExportacionComponent } from './components/motivo-de-la-exportacion/motivo-de-la-exportacion.component';
import { NgModule } from '@angular/core';
import { PantallasComponent } from './pages/pantallas/pantallas.component';
import { PasoUnoComponent } from './pages/paso-uno/paso-uno.component';
import { PeriodoDeLaObraDeArteComponent } from './components/periodo-de-la-obra-de-arte/periodo-de-la-obra-de-arte.component';
import { PeriodoEnElExtranjeroComponent } from './components/periodo-en-el-extranjero/periodo-en-el-extranjero.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    PantallasComponent,
    PasoUnoComponent
  ],
  imports: [
    CommonModule,
    ExportarIlustracionesRoutingModule,
    WizardComponent,
    BtnContinuarComponent,
    SolicitanteComponent,
    TituloComponent,
    AlertComponent,
    DatosDeLaSolicitudComponent,
    PeriodoDeLaObraDeArteComponent,
    PeriodoEnElExtranjeroComponent,
    MotivoDeLaExportacionComponent,
    LugarDeDestinoComponent,
    AduanaComponent,
    ItinerarioExportacionYTransportacionComponent
  ],
  providers: [
    provideHttpClient(),
    ExportarIlustracionesService
  ],
})

export class ExportarIlustracionesModule { }
