import { AcuicolaService } from '../../servicios/acuicola.service';
import { CatalogoSelectComponent} from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { EXPEDICION_FACTURA_FECHA } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechos } from '../../modelos/acuicola.model';
import { PagoDeDerechosRevision } from '../../modelos/acuicola.model';
import { PagosDeDerechosFormInt } from '../../modelos/datos-de-interfaz.model';
import { ReactiveFormsModule } from '@angular/forms';
import { SeccionLibQuery} from '@libs/shared/data-access-user/src'; 
import { SeccionLibState} from '@libs/shared/data-access-user/src'; 
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

@Component({
  selector: 'pago-de-derechos',
  standalone: true,
  imports: [
    TituloComponent,
    CatalogoSelectComponent,
    InputFechaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
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
  PagosDeDerechosState!: PagosDeDerechosFormInt;

    /**
   * @property {CatalogosSelect} banco
   * @description Información del banco seleccionado en el formulario.
   */
  banco!: CatalogosSelect;

    /**
   * @property {InputFecha} fechaInicioInput
   * @description Configuración de la fecha de inicio para la expedición de la factura.
   */
  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;

/**
 * @property {Subject<void>} unsubscribe$
 * @description Subject utilizado para manejar la desuscripción de observables y evitar fugas de memoria.
 */
  private unsubscribe$ = new Subject<void>();

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
 */
  constructor(
    private readonly fb: FormBuilder,
    private readonly acuicolaService: AcuicolaService,
    private tramiteStoreQuery: TramiteStoreQuery, 
    private tramiteStore: TramiteStore, 
    private seccionQuery: SeccionLibQuery, 
    private seccionStore: SeccionLibStore, 
    // eslint-disable-next-line no-empty-function
  ) { }

/**
 * @method ngOnInit
 * @description Inicializa el componente, suscribe a cambios en el estado del trámite y carga los datos necesarios.
 */
  ngOnInit(): void {
      /**
   * Suscripción a los cambios en el estado del trámite para obtener los datos de pago de derechos.
   */
      this.tramiteStoreQuery.selectSolicitudTramite$.pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
        this.PagosDeDerechosState = seccionState.PagosDeDerechosState;
      })
    ).subscribe();

    this.iniciarFormulario();
    this.getBancoDatos();
    this.pagoDeCargarDatos();
    this.pagoDerechosRevision();
  
    /**
 * @description Suscripción a los cambios en el estado del trámite para actualizar el formulario de pagos de derechos.
 */
    this.tramiteStoreQuery.selectSolicitudTramite$
    .pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState: { PagosDeDerechosState: PagosDeDerechosFormInt }) => {
        if (seccionState) {
          this.PagosDeDerechosState = seccionState.PagosDeDerechosState;
          this.pagosDeDerechosForm.patchValue(this.PagosDeDerechosState);
        }
      })
    ).subscribe();

    /**
 * @description Observa los cambios en el estado del formulario y actualiza el estado del trámite en la tienda Akita.
 * 
 * - Se suscribe a los cambios de estado del formulario `pagosDeDerechosForm`.
 * - Aplica un retraso de 10ms antes de ejecutar la lógica.
 * - Obtiene el estado actual del formulario y lo almacena en la tienda Akita.
 * - Finaliza la suscripción cuando `unsubscribe$` emite un valor para evitar fugas de memoria.
 */
    this.pagosDeDerechosForm.statusChanges
    .pipe(
      takeUntil(this.unsubscribe$),
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
 * - La suscripción se finaliza automáticamente cuando `unsubscribe$` emite un valor para evitar fugas de memoria.
 */
  this.seccionQuery.selectSeccionState$
    .pipe(
      takeUntil(this.unsubscribe$),
      map((seccionState) => {
        this.seccion = seccionState;
      })
    )
    .subscribe();
  }

/**
 * @method iniciarFormulario
 * @description Inicializa el formulario `pagosDeDerechosForm` con los campos requeridos.
 * 
 * - Algunos campos están deshabilitados y solo se llenan automáticamente.
 * - Se establecen validaciones obligatorias usando `Validators.required`.
 * - Incluye los campos para la revisión de pago.
 */
  iniciarFormulario(): void {
    this.pagosDeDerechosForm = this.fb.group({
      claveDeReferencia: [{ value: '', disabled: true }, Validators.required],
      cadenaDependencia: [{ value: '', disabled: true }, Validators.required],
      banco: ['', Validators.required],
      llaveDePago: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      importeDePago: [{ value: '', disabled: true }, Validators.required],
      claveDeReferenciaRevision: [{ value: '', disabled: true }, Validators.required],
      cadenaDependenciaRevision: [{ value: '', disabled: true }, Validators.required],
      bancoRevision: [{ value: '', disabled: true }, Validators.required],
      llaveDePagoRevision: [{ value: '', disabled: true }, Validators.required],
      fechaInicioRevision: [{ value: '', disabled: true }, Validators.required],
      importeDePagoRevision: [{ value: '', disabled: true }, Validators.required],
    });
  }

  /**
 * @method pagoDeCargarDatos
 * @description Obtiene y carga los datos de pago de derechos desde el servicio `acuicolaService`.
 * 
 * - Se suscribe al método `pagoDeCargarDatos()` del servicio.
 * - Los datos obtenidos son aplicados al formulario `pagosDeDerechosForm`.
 * - La suscripción se gestiona con `takeUntil(this.unsubscribe$)` para evitar fugas de memoria.
 * 
 * @see {@link AcuicolaService} para la obtención de datos.
 * @see {@link pagosDeDerechosForm} para el almacenamiento de los datos en el formulario.
 */
  pagoDeCargarDatos(): void {
    this.acuicolaService
      .pagoDeCargarDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: PagoDeDerechos) => {
        this.pagosDeDerechosForm.patchValue(data);
      })
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
    this.acuicolaService.getBancoDatos()
    .pipe(takeUntil(this.unsubscribe$))
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
 * @method pagoDerechosRevision
 * @description Obtiene y carga los datos de revisión de pago de derechos desde `acuicolaService`.
 * 
 * - Se suscribe a `getPagoDerechosRevision()` del servicio.
 * - Los datos obtenidos se asignan al formulario `pagosDeDerechosForm`.
 * - Usa `takeUntil(this.unsubscribe$)` para manejar la desuscripción y evitar fugas de memoria.
 * 
 * @see {@link AcuicolaService} para la obtención de datos de revisión de pago.
 * @see {@link pagosDeDerechosForm} para almacenar los datos en el formulario.
 */
  pagoDerechosRevision(): void {
    this.acuicolaService
      .getPagoDerechosRevision()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: PagoDeDerechosRevision) => {
        this.pagosDeDerechosForm.patchValue(data);
      })
  }

/**
 * @method ngOnDestroy
 * @description Maneja la limpieza de recursos antes de destruir el componente.
 * 
 * - Emite un valor en `unsubscribe$` y `unsubscribe$` para notificar a los observables que deben completar.
 * - Llama a `complete()` en ambos `Subject` para liberar memoria y evitar fugas de suscripciones.
 * 
 * @see {@link unsubscribe$} Subject utilizado para cancelar suscripciones activas.
 */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
