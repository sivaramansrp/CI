import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTareasTramite } from '../../../core/models/shared/consulta.model';
import { URL_PRUEBA } from '../../constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'lib-tareas-tramite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareasTramite.component.html',
  styleUrl: './tareasTramite.component.css',
})
export class TareasTramiteComponent implements OnInit {
  /**
       * Lista de documentos cargados.
       */
      documentosCargados: TablaTareasTramite[] = [];
      readonly url: string = URL_PRUEBA;
    
      ngOnInit(): void {
        this.documentosCargados = [
          {
            id: 1,
            nombreTarea: 'Revisión de documentos',
            nombreUsuarioAsignado: 'Juan Pérez',
            claveUsuarioAsignado: 'JP123',
            fechaAsignacion: '2025-03-01',
            fechaAtencion: '2025-03-02'
          },
          {
            id: 2,
            nombreTarea: 'Validación de datos',
            nombreUsuarioAsignado: 'María López',
            claveUsuarioAsignado: 'ML456',
            fechaAsignacion: '2025-03-03',
            fechaAtencion: '2025-03-04'
          },
          {
            id: 3,
            nombreTarea: 'Autorización de trámite',
            nombreUsuarioAsignado: 'Carlos Sánchez',
            claveUsuarioAsignado: 'CS789',
            fechaAsignacion: '2025-03-05',
            fechaAtencion: '2025-03-06'
          },
          {
            id: 4,
            nombreTarea: 'Generación de dictamen',
            nombreUsuarioAsignado: 'Ana Gómez',
            claveUsuarioAsignado: 'AG321',
            fechaAsignacion: '2025-03-07',
            fechaAtencion: '2025-03-08'
          },
          {
            id: 5,
            nombreTarea: 'Entrega de resultados',
            nombreUsuarioAsignado: 'Luis Fernández',
            claveUsuarioAsignado: 'LF654',
            fechaAsignacion: '2025-03-09',
            fechaAtencion: '2025-03-10'
          }
        ];
      }
}
