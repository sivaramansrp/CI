import { Catalogo } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHA_FINAL, FECHA_INICIO } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFecha } from '@ng-mf/data-access-user';
import { map, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402State, Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Solicitud } from '@ng-mf/data-access-user';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { CargarDatosIniciales } from '@ng-mf/data-access-user';


/**
 * Componente para la vista de la solicitud de la sección de "220402".
 */

@Component({
  selector: 'solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})

/**
 * Componente que representa la página de solicitud.
 */

export class SolicitudComponent{

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param solicitudService Servicio para gestionar las pantallas de solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService
  ) {
    this.crearFormulario();
  }

  /**
   * Método para crear el formulario de la solicitud.
   */
  crearFormulario(): void {
    this.FormSolicitud = this.fb.group({});
  }

  /**
   * Formulario principal de la solicitud.
   */
  FormSolicitud!: FormGroup;

  /**
   * Historial de solicitudes.
   */
  hSolicitud: string[] = [];

  /**
   * Datos de las solicitudes.
   */
  dSolicitud: Solicitud[] = [];

  /**
    * Método para buscar y cargar datos iniciales del servicio.
    */
  cargarDatosIniciales(): void {
    this.solicitudService.getData().subscribe({
      next: (data: CargarDatosIniciales) => {
        this.hSolicitud = data.hSolicitud;
        this.dSolicitud = data.dSolicitud;
      }
    });
  }

  
   
}
