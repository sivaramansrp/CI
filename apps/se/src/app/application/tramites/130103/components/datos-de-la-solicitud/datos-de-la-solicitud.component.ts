import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CriterioDeDictamenComponent } from '../criterio-de-dictamen/criterio-de-dictamen.component';
import { DatosDeLaMercanciaComponent } from '../datos-de-la-mercancia/datos-de-la-mercancia.component';
import { DatosDelTramiteRealizerComponent } from '../datos-del-tramite-realizer/datos-del-tramite-realizer.component';
import { PaisProcedenciaComponent } from '../pais-procedencia/pais-procedencia.component';
import { PartidasDeLaMercanciaComponent } from '../partidas-de-la-mercancia/partidas-de-la-mercancia.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';
import { UsoEspecificoDeLaMercanciaComponent } from '../uso-especifico-de-la-mercancia/uso-especifico-de-la-mercancia.component';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    DatosDelTramiteRealizerComponent,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent,
    UsoEspecificoDeLaMercanciaComponent,
    CriterioDeDictamenComponent,
    PaisProcedenciaComponent,
    RepresentacionFederalComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent {}
