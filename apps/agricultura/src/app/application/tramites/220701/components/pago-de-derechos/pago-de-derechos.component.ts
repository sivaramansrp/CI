import {
  Catalogo,
  CatalogoSelectComponent,
} from '@libs/shared/data-access-user/src';
import { AcuicolaService } from '../../servicios/acuicola.service';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { EXPEDICION_FACTURA_FECHA } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Input } from '@angular/core';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { OpcionDeRadio } from '../../modelos/importacion-de-acuicultura.module';
import { PagoDeDerechos } from '../../modelos/acuicola.model';
import { PagoDeDerechosRevision } from '../../modelos/acuicola.model';
import { PagosDeDerechosFormInt } from '../../modelos/datos-de-interfaz.model';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TramiteStore } from '../../estados/tramite220701.store';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { Validators } from '@angular/forms';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { TIPO_RADIO } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
@Component({
  selector: 'pago-de-derechos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule,
    InputRadioComponent,
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})

/**
 * @class PagoDeDerechosComponent
 * @implements {OnInit, OnDestroy}
 * @description Componente para la gestión del pago de derechos.
 * Maneja el formulario de pagos y su estado.
 */
export class PagoDeDerechosComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} pagosDeDerechosForm
   * @description Formulario reactivo para el pago de derechos.
   */
  pagosDeDerechosForm!: FormGroup;

  /**
   * @property {PagosDeDerechosFormInt} PagosDeDerechosState
   * @description Estado del formulario de pago de derechos.
   */
  pagosDeDerechosState!: PagosDeDerechosFormInt;

  /**
   * @property {CatalogosSelect} banco
   * @description Información del banco seleccionado en el formulario.
   */
  banco!: CatalogosSelect;

  /**
   * Opciones de radio para la exención de pago.
   * Contiene las opciones disponibles para seleccionar si el pago está exento.
   * @type {OpcionDeRadio[]}
   */
  exentoPagoRadio: OpcionDeRadio[] = TIPO_RADIO;

  exentoPagoRevisionRadio: OpcionDeRadio[] = TIPO_RADIO;

  /**
   * Fecha seleccionada para el pago.
   * Contiene el valor actual de la fecha de pago.
   * @type {string}
   * @default ''
   */
  fechaPagoDate: string = '';

  /**
   * Valor seleccionado para la exención de pago.
   * Indica si el pago está exento o no.
   * @type {string}
   * @default 'Si'
   */
  exentoPagoValor: string = 'Si';

  /**
   * Valor seleccionado para la exención de pago.
   * Indica si el pago está exento o no.
   * @type {string}
   * @default 'Si'
   */
  exentoPagoRevisionValor: string = 'Si';

  /**
   * Catálogo de justificaciones para la exención de pago.
   * Contiene las opciones disponibles para justificar la exención de pago.
   * @type {Catalogo[]}
   */
  justificacionCatalogo: Catalogo[] = [];

  /**
   * @property {InputFecha} fechaInicioInput
   * @description Configuración de la fecha de inicio para la expedición de la factura.
   */
  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;

  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   * @type {boolean}
   */
  @Input() esFormularioSoloLectura!: boolean;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para manejar la desuscripción de observables y evitar fugas de memoria.
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @property {SeccionLibState} seccion
   * @description Estado actual de la sección en la tienda de Akita.
   */
  private seccion!: SeccionLibState;

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {AcuicolaService} acuicolaService - Servicio para manejar datos relacionados con acuicultura.
   * @param {TramiteStoreQuery} tramiteStoreQuery - Consulta de estado de la tienda Akita para trámites.
   * @param {TramiteStore} tramiteStore - Tienda Akita para manejar el estado del trámite.
   * @param {SeccionLibQuery} seccionQuery - Consulta de estado de la tienda Akita para secciones.
   * @param {SeccionLibStore} seccionStore - Tienda Akita para manejar el estado de la sección.
   * @param {ConsultaioQuery} consultaioQuery - Consulta Akita para manejar y actualizar el estado de una sección.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery,
    private tramiteStore: TramiteStore,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore,
    private consultaioQuery: ConsultaioQuery,
  ) 
  {
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.esFormularioSoloLectura = seccionState.readonly;
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

    /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

    /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.pagosDeDerechosForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.pagosDeDerechosForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

    inicializarFormulario(): void {
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.pagosDeDerechosState = seccionState.PagosDeDerechosState;
        })
      )
      .subscribe()

  /**
   * Inicializa el formulario reactivo con los campos requeridos.
   * Configura validaciones y deshabilita ciertos campos según sea necesario.
   * 
   * @method iniciarFormulario
   * @returns {void}
   */

    this.pagosDeDerechosForm = this.fb.group({
      claveDeReferencia: ['', Validators.required],
      cadenaDependencia: ['', Validators.required],
      banco: ['', Validators.required],
      llaveDePago: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      importeDePago: ['', Validators.required],
      claveDeReferenciaRevision: ['', Validators.required],
      cadenaDependenciaRevision: ['', Validators.required],
      bancoRevision: ['', Validators.required],
      llaveDePagoRevision: ['', Validators.required],
      fechaInicioRevision: ['', Validators.required],
      importeDePagoRevision: ['', Validators.required],
    });
  }
  /**
   * @method ngOnInit
   * @description Inicializa el componente, suscribe a cambios en el estado del trámite y carga los datos necesarios.
   */
  ngOnInit(): void {
    /**
     * Suscripción a los cambios en el estado del trámite para obtener los datos de pago de derechos.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.pagosDeDerechosState = seccionState.PagosDeDerechosState;
        })
      )
      .subscribe();

    this.obtenerListaJustificacion();
    this.getBancoDatos();
    this.pagoDeCargarDatos();
    this.pagoDerechosRevision();
    this.inicializarEstadoFormulario();

    /**
     * @description Suscripción a los cambios en el estado del trámite para actualizar el formulario de pagos de derechos.
     */
    this.tramiteStoreQuery.selectSolicitudTramite$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map(
          (seccionState: { PagosDeDerechosState: PagosDeDerechosFormInt }) => {
            if (seccionState) {
              this.pagosDeDerechosState = seccionState.PagosDeDerechosState;
              this.pagosDeDerechosForm.patchValue(this.pagosDeDerechosState);
            }
          }
        )
      )
      .subscribe();

    /**
     * @description Observa los cambios en el estado del formulario y actualiza el estado del trámite en la tienda Akita.
     *
     * - Se suscribe a los cambios de estado del formulario `pagosDeDerechosForm`.
     * - Aplica un retraso de 10ms antes de ejecutar la lógica.
     * - Obtiene el estado actual del formulario y lo almacena en la tienda Akita.
     * - Finaliza la suscripción cuando `destroyNotifier$` emite un valor para evitar fugas de memoria.
     */
    this.pagosDeDerechosForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap(() => {
          const ACTIVE_STATE = { ...this.pagosDeDerechosForm.value };
          this.tramiteStore.setPagoDeDerechosTramite(ACTIVE_STATE);
        })
      )
      .subscribe();

    /**
     * @description Observa el estado de la sección y actualiza la variable local `seccion`.
     *
     * - Se suscribe a `selectSeccionState$` para obtener cambios en el estado de la sección.
     * - Al recibir un nuevo estado, se asigna a la variable `seccion`.
     * - La suscripción se finaliza automáticamente cuando `destroyNotifier$` emite un valor para evitar fugas de memoria.
     */
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
  }


  /**
   * @method pagoDeCargarDatos
   * @description Obtiene y carga los datos de pago de derechos desde el servicio `acuicolaService`.
   *
   * - Se suscribe al método `pagoDeCargarDatos()` del servicio.
   * - Los datos obtenidos son aplicados al formulario `pagosDeDerechosForm`.
   * - La suscripción se gestiona con `takeUntil(this.destroyNotifier$)` para evitar fugas de memoria.
   *
   * @see {@link AcuicolaService} para la obtención de datos.
   * @see {@link pagosDeDerechosForm} para el almacenamiento de los datos en el formulario.
   */
  pagoDeCargarDatos(): void {
    this.acuicolaService
      .pagoDeCargarDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechos) => {
        this.pagosDeDerechosForm.patchValue(data);
      });
  }

  /**
   * @method getBancoDatos
   * @description Obtiene los datos del catálogo de bancos desde `acuicolaService` y los asigna a la propiedad `banco`.
   *
   * - Se suscribe a `getBancoDatos()` del servicio.
   * - Verifica que el código de respuesta sea `200` antes de procesar los datos.
   * - Crea un objeto de configuración para el catálogo de bancos.
   *
   * @see {@link AcuicolaService} para la obtención de datos bancarios.
   * @see {@link banco} para el almacenamiento de los datos del catálogo de bancos.
   */
  getBancoDatos(): void {
    this.acuicolaService
      .getBancoDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp.code === 200) {
          const RESPONSE = resp.data;
          this.banco = {
            labelNombre: 'Banco*',
            required: false,
            primerOpcion: 'Selecciona un valor',
            catalogos: RESPONSE,
          };
        }
      });
  }

  /**
   * Obtiene la lista de justificaciones desde el servicio.
   * Actualiza el catálogo de justificaciones disponibles.
   * @method obtenerListaJustificacion
   */
  private obtenerListaJustificacion(): void {
    this.acuicolaService
      .obtenerDetallesDelCatalogo('justificacion.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (data) => {
          this.justificacionCatalogo = data.data as Catalogo[];
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  /**
   * @method pagoDerechosRevision
   * @description Obtiene y carga los datos de revisión de pago de derechos desde `acuicolaService`.
   *
   * - Se suscribe a `getPagoDerechosRevision()` del servicio.
   * - Los datos obtenidos se asignan al formulario `pagosDeDerechosForm`.
   * - Usa `takeUntil(this.destroyNotifier$)` para manejar la desuscripción y evitar fugas de memoria.
   *
   * @see {@link AcuicolaService} para la obtención de datos de revisión de pago.
   * @see {@link pagosDeDerechosForm} para almacenar los datos en el formulario.
   */
  pagoDerechosRevision(): void {
    this.acuicolaService
      .getPagoDerechosRevision()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data: PagoDeDerechosRevision) => {
        this.pagosDeDerechosForm.patchValue(data);
      });
  }

  /**
   * Cambia el valor de un campo del formulario.
   * Actualiza el formulario y recrea su estructura si es necesario.
   * @method cambioValorRadio
   * @param {string} nombreControl - Nombre del campo del formulario.
   * @param {string} valor - Nuevo valor a asignar.
   */
  cambioValorRadio(nombreControl: string, valor: string): void {
    this.pagosDeDerechosForm.patchValue({
      [nombreControl]: valor,
    });
    this.exentoPagoValor = valor;
  }

  cambioValorRadioRevision(nombreControl: string, valor: string): void {
    this.pagosDeDerechosForm.patchValue({
      [nombreControl]: valor,
    });
    this.exentoPagoRevisionValor = valor;
  }

  /**
   * @method ngOnDestroy
   * @description Maneja la limpieza de recursos antes de destruir el componente.
   *
   * - Emite un valor en `destroyNotifier$` y `destroyNotifier$` para notificar a los observables que deben completar.
   * - Llama a `complete()` en ambos `Subject` para liberar memoria y evitar fugas de suscripciones.
   *
   * @see {@link destroyNotifier$} Subject utilizado para cancelar suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
