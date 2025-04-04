import { BodyTablaTareasTramite, HeaderTablaTareasTramite } from '../../../core/models/shared/consulta-generica.model';
import { CONSULTA_TAREASTRAMITE } from '../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-tareas-tramite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareasTramite.component.html',
  styleUrl: './tareasTramite.component.css',
})
export class TareasTramiteComponent {
  /**
       * Implementación para la tabla de documentos de requerimientos.
       *
       */
      readonly encabezadoTablaTareasTramite : HeaderTablaTareasTramite[] = CONSULTA_TAREASTRAMITE.encabezadoTablaTareasTramite;  
      readonly datosTablaTareasTramite: BodyTablaTareasTramite[] = CONSULTA_TAREASTRAMITE.datosTablaTareasTramite;                
}