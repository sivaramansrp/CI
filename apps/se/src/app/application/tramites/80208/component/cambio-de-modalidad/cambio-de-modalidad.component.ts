/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  Catalogo,
  ConsultaioQuery,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import {
  CambioDeModalidadForm,
  ConfiguracionColumna,
} from '../../modelos/cambio-de-modalidad.model';

import { TablaSeleccion } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';

import { CONFIGURACION_SERVICIO } from '../../modelos/cambio-de-modalidad.model';

import { delay, map, takeUntil, tap } from 'rxjs/operators';

import { CambioModalidad } from '../../modelos/cambio-de-modalidad.model';
import { ServicioInfo } from '../../modelos/cambio-de-modalidad.model';

import { CambioModalidadQuery } from '../../estados/tramite80208.query';
import { CambioModalidadService } from '../../service/cambio-modalidad.service';
import { CambioModalidadStore } from '../../estados/tramite80208.store';

/**
 * @Component - Decorador que define el componente Angular para el cambio de modalidad.
 *
 * @selector app-cambio-de-modalidad - Selector CSS usado para identificar este componente en las plantillas.
 * @templateUrl ./cambio-de-modalidad.component.html - Ruta al archivo de plantilla HTML del componente.
 * @styleUrls ['./cambio-de-modalidad.component.scss'] - Ruta al archivo de estilos SCSS del componente.
 * @standalone true - Indica que el componente es independiente y no requiere un módulo Angular.
 * @imports - Módulos y componentes importados para su uso en este componente.
 *   - TablaDinamicaComponent - Componente para mostrar tablas dinámicas.
 *   - ReactiveFormsModule - Módulo para formularios reactivos.
 *   - CommonModule - Módulo con directivas comunes de Angular.
 *   - CatalogoSelectComponent - Componente para selección de catálogos.
 *   - TituloComponent - Componente para mostrar títulos.
 */
@Component({
  selector: 'app-cambio-de-modalidad',
  templateUrl: './cambio-de-modalidad.component.html',
  styleUrls: ['./cambio-de-modalidad.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
})

/**
 * @class CambioDeModalidadComponent
 * @description
 * Clase que implementa la lógica para gestionar el cambio de modalidad.
 */
export class CambioDeModalidadComponent implements OnInit, OnDestroy {

  /**
   * @property tablaSeleccion - Tipo de selección de la tabla (Radio o Checkbox).
   * @description
   * Propiedad que define el tipo de selección para la tabla, utilizando la enumeración `TablaSeleccion`.
   * Por defecto, se establece como `TablaSeleccion.RADIO`, indicando que la selección será mediante botones de opción.
   * @type {TablaSeleccion}
   * @default TablaSeleccion.RADIO
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.RADIO;

  /**
   * @property configuracionTabla - Configuración de las columnas de la tabla para los servicios.
   * @description
   * Arreglo de objetos tipo `ConfiguracionColumna<ServicioInfo>` que define la estructura y configuración
   * de las columnas de la tabla que muestra los servicios. Se inicializa con la constante `CONFIGURACION_SERVICIO`.
   * @type {ConfiguracionColumna<ServicioInfo>[]}
   */
  configuracionTabla: ConfiguracionColumna<ServicioInfo>[] = CONFIGURACION_SERVICIO;

  /**
   * @property ServiciosDatos - Datos de los servicios disponibles.
   * @description
   * Arreglo de objetos tipo `ServicioInfo` que contiene la información de los servicios disponibles.
   * Cada objeto incluye propiedades como `descripcionDelServicio`, `tipoDeServicio` y `estatus`.
   * Se inicializa con un ejemplo de servicio relacionado con el blindaje de vehículos.
   * @type {ServicioInfo[]}
   */
  ServiciosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true,
    },
  ];

  /**
   * @property autorizadosDatos - Datos de los servicios autorizados.
   * @description
   * Arreglo de objetos tipo `ServicioInfo` que contiene la información de los servicios autorizados.
   * Cada objeto incluye propiedades como `descripcionDelServicio`, `tipoDeServicio` y `estatus`.
   * Se inicializa con un ejemplo de servicio relacionado con el blindaje de vehículos.
   * @type {ServicioInfo[]}
   */
  autorizadosDatos: ServicioInfo[] = [
    {
      descripcionDelServicio: 'BLINDAJE, MODIFICACION ADAPTACION DE VEHICULO AUTOMOTOR',
      tipoDeServicio: 'TANGIBLE',
      estatus: true,
    },
  ];

  /**
   * @property unsubscribe$ - Subject para manejar la desuscripción de observables.
   * @description
   * Un `Subject<void>` utilizado para emitir una señal que cancela las suscripciones a observables
   * cuando el componente es destruido, previniendo fugas de memoria.
   * @type {Subject<void>}
   */
  public unsubscribe$ = new Subject<void>();

  /**
   * @property cambioDeModalidadForm - Formulario para el cambio de modalidad.
   * @description
   * Un `FormGroup` que contiene los controles del formulario reactivo para gestionar los datos
   * relacionados con el cambio de modalidad.
   * @type {FormGroup}
   */
  cambioDeModalidadForm!: FormGroup;

  /**
   * @property serviciosImmxForm - Formulario para los servicios IMMX.
   * @description
   * Un `FormGroup` que contiene los controles del formulario reactivo para gestionar los datos
   * de los servicios IMMX.
   * @type {FormGroup}
   */
  serviciosImmxForm!: FormGroup;

  /**
   * @property cambioModalidadState - Estado actual del cambio de modalidad.
   * @description
   * Una cadena que representa el estado actual del cambio de modalidad seleccionado.
   * @type {string}
   */
  cambioModalidadState!: string;

  /**
   * @property cambioDeModalidadState - Estado del formulario de cambio de modalidad.
   * @description
   * Objeto que contiene el estado completo del formulario de cambio de modalidad, definido por
   * la interfaz `CambioDeModalidadForm`.
   * @type {CambioDeModalidadForm}
   */
  cambioDeModalidadState!: CambioDeModalidadForm;

  /**
   * @property serviciosImmxState - Estado actual de los servicios IMMX.
   * @description
   * Una cadena que representa el estado actual de los servicios IMMX.
   * @type {string}
   */
  serviciosImmxState!: string;

  /**
   * @property serviciosImmx - Lista de servicios IMMX disponibles.
   * @description
   * Un arreglo de objetos tipo `Catalogo` que contiene la lista de servicios IMMX disponibles.
   * @type {Catalogo[]}
   */
  serviciosImmx!: Catalogo[];

  /**
   * @property cambioDeModalidad - Lista de cambios de modalidad disponibles.
   * @description
   * Un arreglo de objetos tipo `CambioModalidad` que contiene la lista de opciones de cambio de modalidad.
   * @type {CambioModalidad[]}
   */
  cambioDeModalidad!: CambioModalidad[];

  /**
   * @property espectaculoServiciosImmx - Indica si se deben mostrar los servicios IMMX.
   * @description
   * Propiedad booleana que controla la visibilidad de los servicios IMMX en la interfaz.
   * Por defecto, se inicializa en `false`.
   * @type {boolean}
   * @default false
   */
  espectaculoServiciosImmx: boolean = false;

  /**
   * @property destroyNotifier$ - Subject para manejar la destrucción del componente.
   * @description
   * Un `Subject<void>` privado utilizado para emitir una señal cuando el componente es destruido,
   * facilitando la limpieza de recursos.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property seccion - Estado de la sección actual.
   * @description
   * Objeto privado que contiene el estado de la sección actual, definido por la interfaz `SeccionLibState`.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;

  /**
   * @property esFormularioSoloLectura - Indica si el formulario está en modo solo lectura.
   * 
   * @description
   * Propiedad booleana que determina si el formulario de cambio de modalidad debe ser de solo lectura.
   * Por defecto, se inicializa en `false`, permitiendo la edición del formulario.
   * 
   * @type {boolean}
   * @default false
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @constructor
   * @description Constructor del componente que inicializa los servicios y dependencias necesarias.
   * @param {FormBuilder} fb - Constructor de formularios.
   * @param {CambioModalidadService} modalidadService - Servicio para gestionar los cambios de modalidad.
   * @param {CambioModalidadQuery} cambioModalidadQuery - Consulta para obtener el estado del cambio de modalidad.
   * @param {CambioModalidadStore} cambioModalidadStore - Store para manejar el estado del cambio de modalidad.
   * @param {SeccionLibQuery} seccionQuery - Consulta para obtener el estado de la sección.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   */

  constructor(
    public fb: FormBuilder,
    public modalidadService: CambioModalidadService,
    public cambioModalidadQuery: CambioModalidadQuery,
    public cambioModalidadStore: CambioModalidadStore,
    public seccionQuery: SeccionLibQuery,
    public seccionStore: SeccionLibStore,
    public consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.cambioModalidadQuery.selectCambioModalidad$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.cambioModalidadState = seccionState.cambioModalidad;
          this.cambioDeModalidadState = seccionState.cambioDeModalidad;
          this.serviciosImmxState = seccionState.serviciosImmx;
        })
      )
      .subscribe();
    this.inicializarForm();
    this.getCargarDatos();
    this.getCambioDeModalidad();
    this.getServiciosImmx();
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    /**
     * @description
     * Suscripción a los cambios de estado del formulario de cambio de modalidad.
     * Escucha los cambios en el estado de validación del formulario y actualiza
     * el estado de validación de la sección correspondiente en el store.
     * 
     * Utiliza un delay de 10ms para asegurar que los cambios de estado se procesen
     * correctamente antes de la validación. La validación se considera exitosa si
     * el formulario completo es válido o si el control específico 'cambioDeModalidad'
     * tiene estado 'VALID'.
     */
    this.cambioDeModalidadForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          /**
           * @constant SECCION - Identificador de la sección actual.
           * @description
           * Define una constante numérica que representa el índice de la sección actual en el contexto
           * del componente, con un valor fijo de 1.
           * @type {number}
           */
          const SECCION: number = 1;
                /**
           * @constant SECCION - Identificador de la sección actual.
           * @description
           * Define una constante numérica que representa el índice de la sección actual en el contexto
           * del componente, con un valor fijo de 1.
           * @type {number}
           */
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          
          const CONTROL =
            this.cambioDeModalidadForm.get('cambioDeModalidad')?.status;
          if (this.cambioDeModalidadForm.valid || CONTROL === 'VALID') {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }

  /**
   * @method inicializarForm - Inicializa los formularios para el cambio de modalidad y servicios IMMX.
   * 
   * @description
   * Este método crea y configura dos formularios reactivos utilizando `FormBuilder` (`fb`):
   * 1. `cambioDeModalidadForm`: Un formulario con los controles `seleccionaLaModalidad`, `folio`, `ano`, `seleccionaModalidad` y `cambioDeModalidad`.
   *    - Los controles `seleccionaLaModalidad`, `folio`, `ano` y `seleccionaModalidad` se inicializan con valores del estado `cambioDeModalidadState` y están deshabilitados por defecto.
   *    - El control `cambioDeModalidad` se inicializa con el valor de `cambioModalidadState`.
   * 2. `serviciosImmxForm`: Un formulario con un único control `serviciosImmx`, inicializado con el valor de `cambioModalidadState`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  inicializarForm(): void {
    this.cambioDeModalidadForm = this.fb.group({
      seleccionaLaModalidad: [
        {
          value: this.cambioDeModalidadState?.seleccionaLaModalidad,
          disabled: true,
        },
      ],
      folio: [{ value: this.cambioDeModalidadState?.folio, disabled: true }],
      ano: [{ value: this.cambioDeModalidadState?.ano, disabled: true }],
      seleccionaModalidad: [
        {
          value: this.cambioDeModalidadState?.seleccionaModalidad,
          disabled: true,
        },
      ],
      cambioDeModalidad: [{ value: this.cambioModalidadState }],
    });

    this.serviciosImmxForm = this.fb.group({
      serviciosImmx: [{ value: this.cambioModalidadState }],
    });
  }

  /**
   * @method inicializarEstadoFormulario - Inicializa el estado del formulario de cambio de modalidad.
   * 
   * @description
   * Este método verifica si el formulario está en modo solo lectura (`esFormularioSoloLectura`).
   * Si es verdadero, llama al método `guardarDatosFormulario` para configurar el formulario en modo solo lectura.
   * De lo contrario, llama al método `inicializarForm` para inicializar el formulario en modo editable.
   * 
   * @returns {void} No retorna ningún valor.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarForm();
    }
  }

  /**
   * @method guardarDatosFormulario - Configura el estado del formulario de cambio de modalidad.
   * 
   * @description
   * Este método inicializa el formulario llamando a `inicializarForm`. Luego, verifica si el formulario
   * está en modo solo lectura (`esFormularioSoloLectura`). Si es verdadero, deshabilita el formulario
   * utilizando `disable`; de lo contrario, lo habilita con `enable`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  guardarDatosFormulario(): void {
    this.inicializarForm();
    if (this.esFormularioSoloLectura) {
      this.cambioDeModalidadForm.disable();
    } else {
      this.cambioDeModalidadForm.enable();
    }
  }

  /**
   * @method getCargarDatos - Carga datos simulados en el formulario de cambio de modalidad.
   * 
   * @description
   * Este método realiza una solicitud al `modalidadService` para obtener datos simulados mediante `getDatosSimulados`.
   * Utiliza el operador `pipe` con `takeUntil` para cancelar la suscripción cuando el sujeto `unsubscribe$` emite un valor,
   * evitando fugas de memoria. Al recibir los datos, actualiza los valores del formulario `cambioDeModalidadForm` con los datos obtenidos
   * utilizando el método `patchValue`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  getCargarDatos(): void {
    this.modalidadService
      .getDatosSimulados()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.cambioDeModalidadForm.patchValue(data);
      });
  }

  /**
   * @method getServiciosImmx - Obtiene los datos de servicios IMMX desde el servicio.
   * 
   * @description
   * Este método realiza una solicitud al `modalidadService` para obtener los datos de los servicios IMMX.
   * Al recibir la respuesta, actualiza la propiedad `serviciosImmx` con los datos obtenidos.
   * Luego, serializa los datos de `serviciosImmx` a una cadena JSON y actualiza el estado en el store
   * mediante el método `setCambioModalidad` del `cambioModalidadStore`.
   * 
   * @returns {void} No retorna ningún valor.
   */
  getServiciosImmx(): void {
    this.modalidadService.getServiciosImmx().subscribe((data) => {
      this.serviciosImmx = data.data;
      this.cambioModalidadStore.setCambioModalidad(
        JSON.stringify(this.serviciosImmx)
      );
    });
  }

  /**
   * @method getCambioDeModalidad - Obtiene los datos de cambio de modalidad desde el servicio.
   * 
   * @description
   * Este método realiza una solicitud al `modalidadService` para obtener los datos de cambio de modalidad.
   * Al recibir la respuesta, actualiza la propiedad `cambioDeModalidad` con los datos obtenidos.
   * Luego, verifica si existe un valor seleccionado en el formulario (`cambioDeModalidadForm`) y, si es así,
   * llama al método `toggleServiciosImmx` pasando el identificador seleccionado (`SELECCIONADAID`).
   * 
   * @returns {void} No retorna ningún valor.
   */
  getCambioDeModalidad(): void {
    this.modalidadService.getCambioDeModalidad().subscribe((data) => {
      this.cambioDeModalidad = data.cambioModalidad.data;
      const SELECCIONADAID =
        this.cambioDeModalidadForm.get('cambioDeModalidad')?.value;
      if (SELECCIONADAID) {
        this.toggleServiciosImmx(SELECCIONADAID);
      }
    });
  }

  /**
   * @method toggleServiciosImmx - Alterna la visibilidad de los servicios IMMX según la selección.
   * 
   * @description
   * Este método controla la visibilidad de los servicios IMMX basándose en el identificador seleccionado (`SELECCIONADAID`).
   * Si no se proporciona un identificador válido o si `cambioDeModalidad` está vacío, desactiva la visibilidad de los servicios.
   * Busca la opción seleccionada en `cambioDeModalidad` comparando el `id` con `SELECCIONADAID`. Si la descripción de la opción seleccionada
   * es 'SERVICIOS' (en mayúsculas), activa la visibilidad de los servicios. Finalmente, actualiza el estado en el store con el identificador seleccionado.
   * 
   * @param {any} SELECCIONADAID - Identificador de la opción seleccionada, usado para buscar en `cambioDeModalidad`.
   * @returns {void} No retorna ningún valor.
   */
  toggleServiciosImmx(SELECCIONADAID: any): void {
    if (!SELECCIONADAID || !this.cambioDeModalidad.length) {
      this.espectaculoServiciosImmx = false;
      return;
    }
    const OPCIONSELECCIONADA = this.cambioDeModalidad.find(
      (item) => item.id.toString() === SELECCIONADAID
    );
    this.espectaculoServiciosImmx =
      OPCIONSELECCIONADA?.descripcion?.toUpperCase() === 'SERVICIOS';
    this.cambioModalidadStore.setCambioModalidad(SELECCIONADAID);
  }

  /**
   * @method seleccionarDesplegable - Maneja la selección de un elemento en un desplegable.
   * 
   * @description
   * Este método se ejecuta cuando se selecciona un elemento en un componente desplegable. Si el evento contiene un identificador (`id`),
   * llama al método `toggleServiciosImmx` pasando el `id` convertido a cadena.
   * 
   * @param {any} event - Objeto del evento que contiene la información de la selección, incluyendo el `id` del elemento seleccionado.
   * @returns {void} No retorna ningún valor.
   */
  seleccionarDesplegable(event: any): void {
    if (event?.id) {
      this.toggleServiciosImmx(event.id.toString());
    }
  }

  /**
   * @method ngOnDestroy - Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   *
   * @description
   * Este método envía una señal al sujeto `unsubscribe$` para notificar la finalización de las suscripciones
   * y completa el sujeto para liberar recursos, evitando fugas de memoria.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
