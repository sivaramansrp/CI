import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EnlaceOperativoComponent } from '../enlace-operativo/enlace-operativo.component';
import { PersonasNotificacionesComponent } from '../personas-notificaciones/personas-notificaciones.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';

/**
 * @component
 * @name TercerosRelacionadosComponent
 * @description
 * Componente principal que agrupa la información relacionada con los terceros vinculados,
 * incluyendo el representante legal, el enlace operativo y las personas de notificación.
 * 
 * Este componente es de tipo `standalone`, por lo que puede ser usado sin necesidad de declarar en un módulo.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    CommonModule,
    RepresentanteLegalComponent,
    EnlaceOperativoComponent,
    PersonasNotificacionesComponent
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrls: ['./terceros-relacionados.component.scss'],
})
export class TercerosRelacionadosComponent {}
