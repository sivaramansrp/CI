import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Solicitud } from '../../../../core/models/220501/sagarpa.model';
import { SolicitudPantallasService } from '../../../../core/services/220502/solicitud-pantallas.service';
import { TEXTOS } from '../../../../shared/constantes/220501/texto-enum';
import { cargarDatosIniciales, carrosDeFerrocarril, historialInspeccionFisica } from '../../../../core/models/220502/solicitud-pantallas.model';


/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'datos-de-la-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent implements OnInit {
  /**
   * Constantes de texto.
   */
  TEXTOS = TEXTOS;

  /**
   * Formulario para los datos de la solicitud.
   */
  form!: FormGroup;

  /**
   * Historial de solicitudes.
   */
  hSolicitud: string[];

  /**
   * Datos de las solicitudes.
   */
  dSolicitud: Solicitud[];

  /**
   * Rango de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * Formulario de datos de la solicitud.
   */
  datosDelaSolicitud!: FormGroup;

  /**
   * Lista de solicitudes.
   */
  solicitudes: Solicitud[] = [];

  /** Datos de vagones e historial de inspección física. */
  hCarroFerrocarril: string[];
  dCarrosDeFerrocarril: carrosDeFerrocarril[];
  hHistorialinspeccion: string[];
  dHistorialInspecciones: historialInspeccionFisica[];

  /**
   * Indica si se debe mostrar la sección.
   */
  mostrarSeccion: boolean = true;

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
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit() {
    this.cargarDatosIniciales();
  }

  /**
   * Método para crear el formulario de la solicitud.
   */
  crearFormulario(): void {
    this.form = this.fb.group({});
  }

  /**
    * Método para buscar y cargar datos iniciales del servicio.
    */
  cargarDatosIniciales(): void {
    this.solicitudService.getData().subscribe({
      next: (data: cargarDatosIniciales) => {
        this.hHistorialinspeccion = data.hHistorialinspeccion;
        this.dHistorialInspecciones = data.dHistorialInspecciones;
        this.dCarrosDeFerrocarril = data.dCarrosDeFerrocarril;
        this.hCarroFerrocarril = data.hCarroFerrocarril;
        this.hSolicitud = data.hSolicitud;
        this.dSolicitud = data.dSolicitud;
      }
    });
  }

  /**
   * Método para manejar el evento de selección de transporte.
   * @param value Valor booleano que indica si se debe mostrar la sección.
   */
  onTransporteSeleccionado(value: boolean) {
    this.mostrarSeccion = value;
  }
}
