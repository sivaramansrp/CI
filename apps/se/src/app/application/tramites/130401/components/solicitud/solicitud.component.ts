import { ARANCELARIA_TABLA_ENCABEZADOS, PRODUCTO_OPCION_RADIO, SOLICITUD_OPCION_RADIO, SOLICITUD_TABLA_ENCABEZADOS } from '../../constants/modificacion-descripcion.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, InputRadioComponent, TablaDinamicaComponent, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { DatosArancelaria, SolicitudTablaDatos } from '../../models/modificacion-descripcion.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tramite130401State, Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { CommonModule } from '@angular/common';
import { ModificacionDescripcionService } from '../../services/modificacion-descripcion.service';
import { Subject } from 'rxjs';
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar la solicitud del trámite 130401.
 * 
 * Este componente muestra los datos de la solicitud, las partidas y las fracciones arancelarias.
 * También permite inicializar el formulario de solicitud y cargar los datos desde el servicio.
 */
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
  standalone: true,
  imports: [CommonModule, TituloComponent, FormsModule, ReactiveFormsModule, InputRadioComponent, TablaDinamicaComponent],
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite130401State;

  /**
   * Formulario reactivo para capturar los datos de la solicitud.
   * 
   * Este formulario incluye campos como el número de folio, solicitud, régimen, entre otros.
   */
  solicitudFormulario!: FormGroup;

  /**
   * Opciones de radio para el tipo de solicitud.
   * 
   * Estas opciones se muestran en el formulario para seleccionar el tipo de solicitud.
   */
  solicitudOpcionRadio = SOLICITUD_OPCION_RADIO;

  /**
   * Opciones de radio para el tipo de producto.
   * 
   * Estas opciones se muestran en el formulario para seleccionar el tipo de producto.
   */
  productoOpcionRadio = PRODUCTO_OPCION_RADIO;

  /**
   * Configuración de las columnas de la tabla de partidas.
   * 
   * Define los encabezados y claves para mostrar los datos de las partidas.
   */
  public solicitudTablaEncabezados: ConfiguracionColumna<SolicitudTablaDatos>[] = SOLICITUD_TABLA_ENCABEZADOS;

  /**
   * Datos de la tabla de partidas.
   * 
   * Contiene las partidas obtenidas desde el servicio.
   */
  solicitudTablaDatos: SolicitudTablaDatos[] = [];

  /**
   * Configuración de las columnas de la tabla de fracciones arancelarias.
   * 
   * Define los encabezados y claves para mostrar los datos de las fracciones arancelarias.
   */
  public arancelariaTablaEncabezados: ConfiguracionColumna<DatosArancelaria>[] = ARANCELARIA_TABLA_ENCABEZADOS;

  /**
   * Datos de la tabla de fracciones arancelarias.
   * 
   * Contiene las fracciones arancelarias obtenidas desde el servicio.
   */
  arancelariaTablaDatos: DatosArancelaria[] = [];

  /**
   * Constructor del componente.
   * 
   * @param {Tramite130401Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite130401Query} tramiteQuery - Query para obtener el estado del trámite.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   * @param {ModificacionDescripcionService} modificacionDescripcionService - Servicio para obtener datos relacionados con la solicitud.
   */
  constructor(
    public store: Tramite130401Store,
    public tramiteQuery: Tramite130401Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private modificacionDescripcionService: ModificacionDescripcionService,
  ) {
    // Constructor del componente
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite, inicializa el formulario y
   * carga los datos de partidas, fracciones arancelarias y solicitud.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.inicializarFormulario();
    this.cargarPartidas();
    this.cargararancelaria();
    if (!this.tramiteState?.datosSolicitud?.numeroFolioTramiteOriginal) {
      this.cargarSolicitud();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar los datos de la solicitud.
   */
  inicializarFormulario(): void {
    this.solicitudFormulario = this.fb.group({
      numeroFolioTramiteOriginal: [{ value: this.tramiteState?.datosSolicitud?.numeroFolioTramiteOriginal, disabled: true }, []],
      solicitud: [{ value: this.tramiteState?.datosSolicitud?.solicitud, disabled: true }, []],
      regimen: [{ value: this.tramiteState?.datosSolicitud?.regimen, disabled: true }, []],
      clasificacionRegimen: [{ value: this.tramiteState?.datosSolicitud?.clasificacionRegimen, disabled: true }, []],
      condicionMercancia: [{ value: this.tramiteState?.datosSolicitud?.condicionMercancia, disabled: true }, []],
      mercanciaDescripcion: [{ value: this.tramiteState?.datosSolicitud?.mercanciaDescripcion, disabled: true }, []],
      fraccionArancelaria: [{ value: this.tramiteState?.datosSolicitud?.fraccionArancelaria, disabled: true }, []],
      unidadMedidaComercial: [{ value: this.tramiteState?.datosSolicitud?.unidadMedidaComercial, disabled: true }, []],
      unidadesAutorizadas: [{ value: this.tramiteState?.datosSolicitud?.unidadesAutorizadas, disabled: true }, []],
      importeFacturaAutorizadoUSD: [{ value: this.tramiteState?.datosSolicitud?.importeFacturaAutorizadoUSD, disabled: true }, []],
    });
  }

  /**
   * Carga las partidas desde el servicio y las almacena en la tabla de partidas.
   */
  cargarPartidas(): void {
    this.modificacionDescripcionService.obtenerPartidas()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.solicitudTablaDatos = respuesta.datos;
      });
  }

  /**
   * Carga las fracciones arancelarias desde el servicio y las almacena en la tabla de fracciones arancelarias.
   */
  cargararancelaria(): void {
    this.modificacionDescripcionService.obtenerarancelaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.arancelariaTablaDatos = respuesta.datos;
      });
  }

  /**
   * Carga los datos de la solicitud desde el servicio y los almacena en el store.
   */
  cargarSolicitud(): void {
    this.modificacionDescripcionService.obtenerSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(respuesta => {
        this.store.setSolicitud(respuesta.datos);
        this.inicializarFormulario();
      });
  }

  /**
   * Verifica si un campo del formulario es válido.
   * 
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} `true` si el campo es válido, de lo contrario `false`.
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método completa el `Subject` `destroyNotifier$` para cancelar todas las suscripciones activas
   * y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}