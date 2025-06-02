import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

import { CargarDatosIniciales } from '../../../220502/models/solicitud-pantallas.model';
import { CarrosDeFerrocarril } from '../../../220502/models/solicitud-pantallas.model';
import { CarrosDeFerrocarrilComponent } from '../../../220502/shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelTramiteARealizarComponent } from '../../../220502/shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { HistorialInspeccionFisica } from '../../../220502/models/solicitud-pantallas.model';
import { HistorialInspeccionFisicaComponent } from '../../../220502/shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { MedioTransporteComponent } from '../medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../../220502/shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { Solicitud } from '../../../220502/models/solicitud-pantallas.model'
import { SolicitudDatosComponent } from '../../../220502/shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPantallasService } from '../../../220502/services/solicitud-pantallas.service';
import { TEXTOS } from '../../constantes/texto-enum';
/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SolicitudDatosComponent, DatosDelTramiteARealizarComponent, ResponsableInspeccionEnPuntoComponent,
    MedioTransporteComponent, CarrosDeFerrocarrilComponent, HistorialInspeccionFisicaComponent
  ],
})
export class SolicitudComponent implements OnInit, OnDestroy {
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
  hSolicitud: string[] = [];

  /**
   * Datos de las solicitudes.
   */
  dSolicitud: Solicitud[] = [];

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

  /**
   * Lista de identificadores de carros de ferrocarril.
   */
  hCarroFerrocarril: string[] = [];

  /**
   * Lista de objetos que representan los carros de ferrocarril.
   */
  dCarrosDeFerrocarril: CarrosDeFerrocarril[] = [];

  /**
   * Lista de identificadores del historial de inspección.
   */
  hHistorialinspeccion: string[] = [];

  /**
   * Lista de objetos que representan el historial de inspecciones físicas.
   */
  dHistorialInspecciones: HistorialInspeccionFisica[] = [];

  /**
   * Indica si se debe mostrar la sección.
   */
  mostrarSeccion: boolean = true;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Subject para desuscribirse de los observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios.
   * @param solicitudService Servicio para gestionar las pantallas de solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private solicitudService: SolicitudPantallasService,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida que se ejecuta al iniciar el componente.
   * Llama a la función que determina cómo inicializar el formulario.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
      this.cargarDatosIniciales();
    }
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
    this.solicitudService.getData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: CargarDatosIniciales) => {
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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    this.cargarDatosIniciales();
    if (this.formularioDeshabilitado) {
      this.form.disable();
    } else if (!this.formularioDeshabilitado) {
      this.form.enable();
    }
  }

  /**
   * Método para manejar el evento de selección de transporte.
   * @param value Valor booleano que indica si se debe mostrar la sección.
   */
  onTransporteSeleccionado(value: boolean): void {
    this.mostrarSeccion = value;
  }

  /**
    * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
    * Desuscribe el componente de todos los observables.
    * @returns {void}
    */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
