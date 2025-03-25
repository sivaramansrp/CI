import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetosDeLaMercanciaComponent} from '../../../shared/components/detos-de-la-mercancia/detos-de-la-mercancia.component'
import { DetosDelTramiteComponent} from '../../../shared/components/detos-de-tramite/detos-del-tramite.component';
import { PaisProcendenciaComponent } from '../../../shared/components/pais-procendencia/pais-procendencia.component';
import { RepresentacionComponent } from '../../../shared/components/representacion/representacion.component'
import { PartidasDeLaComponent } from '../../../shared/components/partidas-de-la/partidas-de-la.component';
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule,PartidasDeLaComponent,DetosDeLaMercanciaComponent,DetosDelTramiteComponent,PaisProcendenciaComponent,RepresentacionComponent],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent {}
