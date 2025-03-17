import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DatosDelTramiteRealizarComponent } from '../datos-del-tramite-realizar/datos-del-tramite-realizar.component';

import { DatosDeLaMercanciaComponent } from '../datos-de-la-mercancia/datos-de-la-mercancia.component';
import { PartidasDeLaMercanciaComponent } from '../partidas-de-la-mercancia/partidas-de-la-mercancia.component';

import { PaisesDeDestinoComponent } from '../paises-de-destino/paises-de-destino.component';
import { RepresentacionFederalComponent } from '../representacion-federal/representacion-federal.component';

@Component({
  selector: 'app-datos-dela-solicitud',
  standalone: true,
  imports: [CommonModule,
    DatosDelTramiteRealizarComponent,
    DatosDeLaMercanciaComponent,
    PartidasDeLaMercanciaComponent,
    PaisesDeDestinoComponent,
    RepresentacionFederalComponent],
  templateUrl: './datos-dela-solicitud.component.html',
  styleUrl: './datos-dela-solicitud.component.scss',
})
export class DatosDelaSolicitudComponent {}
