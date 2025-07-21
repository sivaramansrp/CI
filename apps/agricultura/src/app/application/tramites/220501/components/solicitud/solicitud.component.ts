import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Subject, map, takeUntil } from 'rxjs';
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
import { Solicitud220501Store } from '../../estados/tramites220501.store';
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
export class SolicitudComponent implements OnDestroy {
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
   * Bandera que indica si la solicitud está en modo solo lectura.
   * @type {boolean}
   */
  esSolicitud: boolean = false;

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
    private solicitud220501Store: Solicitud220501Store
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          this.esSolicitud = seccionState.create;
          if(seccionState.readonly || seccionState.update){
             this.inicializarEstadoFormulario();
          }
        })
      )
      .subscribe();

    this.crearFormulario();
    this.cargarDatosIniciales();
  }

  /**
   * Método para inicializar el estado del formulario.
   * Si `formularioDeshabilitado` es `true`, deshabilita el formulario,
   * de lo contrario, lo habilita.
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.form?.disable();
    } else if (!this.formularioDeshabilitado) {
      this.form?.enable();
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
   * Método para manejar el evento de selección de transporte.
   * @param value Valor booleano que indica si se debe mostrar la sección.
   */
  onTransporteSeleccionado(value: boolean): void {
    this.mostrarSeccion = value;
    this.solicitud220501Store.setMostrarSeccion(value);
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
