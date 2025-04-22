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
import { Tramite260304Query } from '../../estados/tramite260304Query.query';

/**
 * @component TercerosRelacionadosVistaComponent
 * @description Componente de solo lectura que muestra las tablas de terceros relacionados
 * (fabricantes, destinatarios finales, proveedores y facturadores).
 * Consume observables del store para renderizar los datos en la vista mediante el componente
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
   *
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
   * Configuración de columnas para la tabla de facturadores.
   */
  configuracionTablaDestinatario: ConfiguracionColumna<Facturador>[] =
    DESTINATARIO_ENCABEZADO_DE_TABLA;

  /**
   * @property {ConfiguracionColumna<Facturador>[]} configuracionTablaDestinatario
   * Configuración de columnas para la tabla de facturadores.
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
   * @property {Destinatario[]}destinatarioTablaDatos
   * Datos de la tabla de fabricantes.
   */
  destinatarioTablaDatos$!: Observable<Destinatario[]>;

  /**
   * @property {Facturador[]} facturadorTablaDatos
   * Datos de la tabla de Otros.
   */
  otrasTablaDatos$!: Observable<Otros[]>;

  /**
   * @property {Subject<void>} destroy$
   * Subject para cancelar suscripciones y evitar fugas de memoria.
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Asigna el valor de `TIPO_TABLA_DATOS` a la variable `tipoTablaDatos`.
   * `TIPO_TABLA_DATOS` es un objeto o constante que define los tipos de datos para las tablas.
   */
  tipoTablaDatos = TIPO_TABLA_DATOS;

  /**
   * @constructor
   * Inyecta los servicios necesarios para consultar y actualizar el estado del trámite.
   *
   * @param tramiteStore - Store que gestiona el estado de los datos del trámite.
   * @param tramiteQuery - Servicio de consulta que expone observables para leer los datos del store.
   */
  constructor(
    private tramiteQuery: Tramite260304Query,
    private router: Router,
    private activatedROute: ActivatedRoute
  ) {
    // No se necesita lógica de inicialización adicional
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.destinatarioTablaDatos$ = this.tramiteQuery.getdestinatarioTablaDatos$;
    this.otrasTablaDatos$ = this.tramiteQuery.getOtrasTablaDatos$;
  }

  /**
   * Navega a la ruta 'aggregar-datos-generales' con el parámetro `tipo` pasado en la URL.
   * La navegación se realiza de manera relativa a la ruta activada actual.
   *
   * @param tipo - El tipo de datos que se pasará en la URL.
   */
  navigate(tipo: string): void {
    this.router.navigate(['..', 'aggregar-datos-generales', tipo], {
      relativeTo: this.activatedROute,
    });
  }

  /**
   * Navega a la ruta 'agregar-otros' de manera relativa a la ruta activada actual.
   */
  navigateOtros(): void {
    this.router.navigate(['..', 'agregar-otros'], {
      relativeTo: this.activatedROute,
    });
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
