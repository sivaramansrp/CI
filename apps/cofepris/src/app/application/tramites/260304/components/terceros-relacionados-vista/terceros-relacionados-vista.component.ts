import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DESTINATARIO_ENCABEZADO_DE_TABLA,
  OTROS_ENCABEZADO_DE_TABLA,
  TIPO_TABLA_DATOS,
} from '../../constants/medicamentos-contengan.enum';
import {
  Destinatario,
  Facturador,
  MENSAJE_TABLA_OBLIGATORIA,
} from '../../../../shared/models/terceros-relacionados.model';
import { Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Otros } from '../../models/medicamentos-contengan.model';
import { TIPO_ACTUALIZACION } from '../../../../shared/constantes/datos-solicitud.enum';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';

/**
 * @component TercerosRelacionadosVistaComponent
 * @description
 * Componente de solo lectura responsable de mostrar las tablas de terceros relacionados
 * (fabricantes, destinatarios finales, proveedores y facturadores).
 * Consume observables del store para renderizar los datos en la vista mediante el componente de tabla dinámica.
 * Además, permite modificar/eliminar registros seleccionados y navegar a las pantallas de edición correspondientes.
 */
@Component({
  selector: 'app-terceros-relacionados-vista',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    AlertComponent,
    TituloComponent,
  ],
  templateUrl: './terceros-relacionados-vista.component.html',
  styleUrl: './terceros-relacionados-vista.component.scss',
})
export class TercerosRelacionadosVistaComponent implements OnInit, OnDestroy {
  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   */
  public idProcedimiento!: number;

  /**
   * @property {string} infoAlert
   * Tipo de alerta visual mostrada en la interfaz.
   */
  public infoAlert = 'alert-info';

  /**
   * @property {string} MENSAJE_TABLA_OBLIGATORIA
   * Constante de mensaje para indicar que la tabla es obligatoria.
   */
  MENSAJE_TABLA_OBLIGATORIA = MENSAJE_TABLA_OBLIGATORIA;

  /**
   * @property {ConfiguracionColumna<Facturador>[]} configuracionTablaDestinatario
   * Configuración de columnas para la tabla de destinatarios.
   */
  configuracionTablaDestinatario: ConfiguracionColumna<Facturador>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;

  /**
   * @property {ConfiguracionColumna<Otros>[]} configuracionTablaOtros
   * Configuración de columnas para la tabla de "otros".
   */
  configuracionTablaOtros: ConfiguracionColumna<Otros>[] =
    OTROS_ENCABEZADO_DE_TABLA;

  /**
   * @property {TablaSeleccion} tipoSeleccionTabla
   * Tipo de selección que utiliza la tabla dinámica (por ejemplo, checkbox).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Indica si el formulario del proveedor debe estar habilitado.
   * @input habilitarProveedor - Valor booleano que habilita o deshabilita la sección del proveedor.
   */
  public habilitarProveedor = true;

  /**
   * Indica si el formulario del facturador debe estar habilitado.
   * @input habilitarFacturador - Valor booleano que habilita o deshabilita la sección del facturador.
   */
  public habilitarFacturador = true;

  /**
   * @property {Observable<Destinatario[]>} destinatarioTablaDatos$
   * Observable con los datos de la tabla de destinatarios.
   */
  destinatarioTablaDatos$!: Observable<Destinatario[]>;

  /**
   * @property {Observable<Otros[]>} otrasTablaDatos$
   * Observable con los datos de la tabla de "otros".
   */
  otrasTablaDatos$!: Observable<Otros[]>;

  /**
   * @property {Otros[]} seleccionadaOtros
   * Almacena la fila seleccionada de la tabla de "otros".
   */
  public seleccionadaOtros!: Otros[];

  /**
   * @property {Destinatario[]} seleccionadaDestinatario
   * Almacena la fila seleccionada de la tabla de destinatarios.
   */
  public seleccionadaDestinatario!: Destinatario[];

  /**
   * @property {Subject<void>} destroy$
   * Subject para cancelar suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * @property tipoTablaDatos
   * Asigna el valor de `TIPO_TABLA_DATOS` a la variable `tipoTablaDatos`.
   * `TIPO_TABLA_DATOS` es un objeto o constante que define los tipos de datos para las tablas.
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   * @param tramiteStore Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery Servicio de consulta que expone observables para leer los datos del store.
   * @param router Servicio para la navegación entre rutas.
   * @param activatedROute Información sobre la ruta actualmente activada.
   */
  constructor(
    private tramiteQuery: Tramite260304Query,
    private tramiteStore: Tramite260304Store,
    private router: Router,
    private activatedROute: ActivatedRoute
  ) {
    // No se necesita lógica de inicialización adicional
  }

  /**
   * @method ngOnInit
   * @description
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.destinatarioTablaDatos$ = this.tramiteQuery.getdestinatarioTablaDatos$;
    this.otrasTablaDatos$ = this.tramiteQuery.getOtrasTablaDatos$;
  }

  /**
   * @method navigate
   * @description
   * Navega a la ruta 'aggregar-datos-generales' con el parámetro `tipo` pasado en la URL.
   * La navegación se realiza de manera relativa a la ruta activada actual.
   * @param tipo El tipo de datos que se pasará en la URL.
   */
  navigate(tipo: string): void {
    this.router.navigate(['..', 'aggregar-datos-generales', tipo], {
      relativeTo: this.activatedROute,
    });
  }

  /**
   * @method navigateOtros
   * @description
   * Navega a la ruta 'agregar-otros' de manera relativa a la ruta activada actual.
   */
  navigateOtros(): void {
    this.router.navigate(['..', 'agregar-otros'], {
      relativeTo: this.activatedROute,
    });
  }

  /**
   * @method modificarOtros
   * @description
   * Actualiza la selección de la tabla "otros" en el store y navega a la pantalla de edición correspondiente.
   */
  modificarOtros(): void {
    this.tramiteStore.updateSeleccionadoOtrosDatos(this.seleccionadaOtros);
    this.navigateOtros();
  }

  /**
   * @method eliminarOtros
   * @description
   * Elimina la fila seleccionada de la tabla "otros" usando el store y la constante de actualización.
   */
  eliminarOtros(): void {
    this.tramiteStore.updateOtrosTablaDatos(this.seleccionadaOtros, TIPO_ACTUALIZACION.ELIMINAR);
  }

  /**
   * @method modificarDestinatario
   * @description
   * Actualiza la selección de la tabla de destinatarios en el store y navega a la pantalla de edición correspondiente.
   */
  modificarDestinatario(): void {
    this.tramiteStore.updateSeleccionadoDestinatarioDatos(this.seleccionadaDestinatario);
    this.navigate(TIPO_TABLA_DATOS.DESTINATARIO);
  }

  /**
   * @method eliminarDestinatario
   * @description
   * Elimina la fila seleccionada de la tabla de destinatarios usando el store y la constante de actualización.
   */
  eliminarDestinatario(): void {
    this.tramiteStore.updateDestinatarioTablaDatos(this.seleccionadaDestinatario, TIPO_ACTUALIZACION.ELIMINAR);
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Este método emite un valor a través del observable `destroy$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}