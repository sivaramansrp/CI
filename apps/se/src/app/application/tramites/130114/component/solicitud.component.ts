import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetosDelLaMarcaciaComponent } from '../../130102/component/datos-de-la-mercacia/datos-de-la-mercacia.component';
import { CriterioDeDictComponent } from '../../130102/component/criterio-de-dict/criterio-de-dict.component';
import { DetosDelTramiteComponent} from '../../../shared/components/detos-de-tramite/detos-del-tramite.component';
import { RepresentacionComponent } from '../../130102/component/representacion/representacion.component';
@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule,DetosDelLaMarcaciaComponent,DetosDelTramiteComponent,CriterioDeDictComponent,RepresentacionComponent],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.css',
})
export class SolicitudComponent {}
