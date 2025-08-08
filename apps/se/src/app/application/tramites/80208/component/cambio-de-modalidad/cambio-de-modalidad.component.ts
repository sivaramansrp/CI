/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  Catalogo,
  ConsultaioQuery,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@ng-mf/data-access-user';

import {
  CONFIGURACION_DOMICILIOS,ConfiguracionColumna,
  ServicioInmex
} from '../../modelos/cambio-de-modalidad.model';

import { TablaSeleccion } from '@ng-mf/data-access-user';

import { TablaDinamicaComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';

import { CONFIGURACION_SERVICIO } from '../../modelos/cambio-de-modalidad.model';

import { map, takeUntil } from 'rxjs/operators';
import { ServicioInfo } from '../../modelos/cambio-de-modalidad.model';

import { CambioModalidadQuery } from '../../estados/tramite80208.query';
import { CambioModalidadService } from '../../service/cambio-modalidad.service';
import{CambioModalidadState} from '../../estados/tramite80208.store';
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
    FormsModule,
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
     * Configuración de columnas para la tabla de domicilios.
     * @property {ConfiguracionColumna<ServicioInmex>[]} configuracionTabla
     */
    configuracionTablaImmex: ConfiguracionColumna<ServicioInmex>[] =
      CONFIGURACION_DOMICILIOS;
  /**
   * @property ServiciosDatos - Datos de los servicios disponibles.
   * @description
   * Arreglo de objetos tipo `ServicioInfo` que contiene la información de los servicios disponibles.
   * Cada objeto incluye propiedades como `descripcionDelServicio`, `tipoDeServicio` y `estatus`.
   * Se inicializa con un ejemplo de servicio relacionado con el blindaje de vehículos.
   * @type {ServicioInfo[]}
   */
  ServiciosDatos: ServicioInfo[] = [
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
   * Valor predeterminado para la selección de aduanas.
   * @property {number} predeterminado
   */ 
  predeterminado= -1;

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
   * RFC de la empresa.
   * @property {string} rfcEmpresa
   */
   rfcEmpresa: string = '';

   /**
   * Número del programa IMMEX.
   * @property {string} numeroPrograma
   */
  numeroPrograma: string = '';

  /**
   * Tiempo del programa IMMEX.
   * @property {string} tiempoPrograma
   */
  tiempoPrograma: string = '';

  
   /**
     * Datos de empresas nacionales.
     * @property {ServicioInmex[]} datos
     */
    datos: ServicioInmex[] = [];

    /**
       * Empresas seleccionadas.
       * @property {ServicioInmex[]} empresasSeleccionados
       */
      empresasSeleccionados: ServicioInmex[] = [];

  /**
   * @property serviciosImmx - Lista de servicios IMMX disponibles.
   * @description
   * Un arreglo de objetos tipo `Catalogo` que contiene la lista de servicios IMMX disponibles.
   * @type {Catalogo[]}
   */
  serviciosImmx!: Catalogo[];

  domiciliosSeleccionados:ServicioInfo[] = [];

  /**
   * @property cambioDeModalidad - Lista de cambios de modalidad disponibles.
   * @description
   * Un arreglo de objetos tipo `CambioModalidad` que contiene la lista de opciones de cambio de modalidad.
   * @type {CambioModalidad[]}
   */
  cambioDeModalidad!: Catalogo[];

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

  tramiteState:CambioModalidadState= {} as CambioModalidadState;

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
    this.inicializarForm();
    this.getCargarDatos();
    this.getCambioDeModalidad();
    this.getServiciosImmx();      
    this.cambioModalidadQuery.selectCambioModalidad$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.cambioDeModalidadForm.patchValue({
            cambioDeModalidad: seccionState.cambioModalidad,

          })
          this.getCargarDatos();
          
          if (Number(seccionState.cambioModalidad) > 0) {
            this.espectaculoServiciosImmx = true;
          }

          this.serviciosImmxForm.patchValue({
            serviciosImmx: seccionState.serviciosImmx                       
          });
          this.rfcEmpresa = seccionState.rfcEmpresa;
          this.numeroPrograma = seccionState.numeroPrograma;
          this.tiempoPrograma = seccionState.tiempoPrograma;
          this.datos = seccionState.datos;
          this.ServiciosDatos = seccionState.ServiciosDatos;
          
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
          value: this.tramiteState?.seleccionaLaModalidad,
          disabled: true,
        },
      ],
      folio: [{ value: this.tramiteState?.folio, disabled: true }],
      ano: [{ value: this.tramiteState?.ano, disabled: true }],
      seleccionaModalidad: [
        {
          value: this.tramiteState?.seleccionaModalidad,
          disabled: true,
        },
      ],
      cambioDeModalidad: [{ value: this.tramiteState?.cambioModalidad, disabled: false }],
    });

    this.serviciosImmxForm = this.fb.group({
      serviciosImmx: [{ value: this.tramiteState?.serviciosImmx, disabled: false }],
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
   * Maneja los cambios en los campos de entrada y actualiza el estado correspondiente
   * en el store de ampliación de servicios.
   *
   * @param fieldName - El nombre del campo que ha cambiado.
   * @param newValue - El nuevo valor asignado al campo.
   */
  enCambioDeCampo(fieldName: string, newValue: string): void {
    switch (fieldName) {
      case 'rfcEmpresa':
        this.cambioModalidadStore.actualizarEstado({rfcEmpresa: newValue});
        break;
      case 'numeroPrograma':
        this.cambioModalidadStore.actualizarEstado({numeroPrograma: newValue});
        break;
      case 'tiempoPrograma':
        this.cambioModalidadStore.actualizarEstado({tiempoPrograma: newValue});
        break;
      default:
        break;
    }
  }

  /**
   * Agrega servicios a la ampliación.
   * @method agregarServiciosAmpliacion
   */

  agregarServiciosAmpliacion(): void {
    const DESCRIPCION_VAL = this.serviciosImmxForm.get('serviciosImmx')?.value;
  if( DESCRIPCION_VAL!=='-1') {

  const SERVICIO_SELECCIONADO = this.serviciosImmx.find(servicio => servicio.id === Number(DESCRIPCION_VAL));
   const DESCRIPCION= SERVICIO_SELECCIONADO?.descripcion || 'SERVICIO NO ENCONTRADO';

    const TIPO="tangible";
    const ESTATUS= true;
  
    const NUEVO: ServicioInfo = {
      descripcionDelServicio: DESCRIPCION,
      tipoDeServicio: TIPO,
      estatus: ESTATUS,
    };

    this.ServiciosDatos = [...this.ServiciosDatos, NUEVO];
    this.cambioModalidadStore.actualizarEstado({
      ServiciosDatos: this.ServiciosDatos});
    }

  }
  /**
   * Elimina un servicio seleccionado del grid de servicios.
   * 
   * @method eliminarServiciosGrid
   * 
   * @description
   * Este método busca el índice del primer servicio en `ServiciosDatos` que coincida con la descripción del servicio
   * del primer domicilio seleccionado (`domiciliosSeleccionados[0]?.['descripcionDelServicio']`).
   * Si se encuentra el servicio, lo elimina del arreglo `ServiciosDatos` y actualiza el estado en el store.
   * Finalmente, limpia la selección de domicilios.
   * 
   * @returns {void} No retorna ningún valor.
   */
  eliminarServiciosGrid(): void {
    const INDICE = this.ServiciosDatos.findIndex(
      (item: ServicioInfo) =>
        item.descripcionDelServicio === this.domiciliosSeleccionados[0]?.['descripcionDelServicio']
    );
  
    if (INDICE !== -1) {
      const DATOS_IMMEX_ACTUALIZADOS = [...this.ServiciosDatos];
      DATOS_IMMEX_ACTUALIZADOS.splice(INDICE, 1);
      this.ServiciosDatos = DATOS_IMMEX_ACTUALIZADOS;
      this.domiciliosSeleccionados=[];
  
        this.cambioModalidadStore.actualizarEstado({
        ServiciosDatos: this.ServiciosDatos
      });
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
    this.cambioModalidadStore.actualizarEstado({cambioModalidad:SELECCIONADAID});
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
  seleccionarDesplegable(): void {
   
       this.toggleServiciosImmx(
        this.cambioDeModalidadForm.value.cambioDeModalidad.toString());
  this.cambioModalidadStore.actualizarEstado({
        cambioModalidad: this.cambioDeModalidadForm.value.cambioDeModalidad.toString()
      });

       }
  /**
   * @method seleccionarDesplegableServicios - Maneja la selección de servicios en un desplegable.
   * 
   * @description
   * Este método se ejecuta cuando se selecciona un servicio en el formulario `serviciosImmxForm`.
   * Actualiza el estado del store `cambioModalidadStore` con el valor seleccionado de los servicios IMMX.
   * 
   * @returns {void} No retorna ningún valor.
   */

  seleccionarDesplegableServicios(): void {
    this.cambioModalidadStore.actualizarEstado({
      serviciosImmx: this.serviciosImmxForm.value.serviciosImmx.toString()
    });
  }
   /**
     * Selecciona domicilios.
     * @method seleccionarDomicilios
     * @param {any} domicilios - Domicilios seleccionados.
     */
    seleccionarDomicilios(domicilios: ServicioInfo): void {
      this.domiciliosSeleccionados = [{ ...domicilios }];
    }
   /**
     * Elimina empresas nacionales.
     * @method eliminarEmpresasNacionales
     */
    eliminarEmpresasNacionales(): void {
      const INDICE = this.datos.findIndex(
        (item: ServicioInmex) =>
          item.registroContribuyentes ===
          this.empresasSeleccionados[0]?.registroContribuyentes
      );
      if (INDICE !== -1) {
        const DATOSACTUALIZADOS = [...this.datos];
        DATOSACTUALIZADOS.splice(INDICE, 1);
        this.cambioModalidadStore.actualizarEstado({datos:DATOSACTUALIZADOS});
        this.empresasSeleccionados = [];
        this.rfcEmpresa = '';
        this.numeroPrograma = '';
        this.tiempoPrograma = '';
        this.cambioModalidadStore.actualizarEstado(
          { rfcEmpresa: '', numeroPrograma: '', tiempoPrograma: '' }
        )
      }
    }
   
     /**
   * Actualiza el grid de empresas nacionales.
   * @method actualizaGridEmpresasNacionales
   */
  actualizaGridEmpresasNacionales(): void {
    if (
      !this.rfcEmpresa?.trim() ||
      !this.numeroPrograma?.trim() ||
      !this.tiempoPrograma?.trim()
    ) {
      return; 
    }
  
    const CUERPODATOS = {
      servicio: 'Auditoría de sistemas de seguridad',
      registroContribuyentes: this.rfcEmpresa,
      denominacionSocial: 'AAL970927390',
      numeroIMMEX: this.numeroPrograma,
      anoIMMEX: this.tiempoPrograma,
    };
  
    const DATOSACTUALIZADOS = [...this.datos, CUERPODATOS];
    
    this.cambioModalidadStore.actualizarEstado({rfcEmpresa: ''});
    this.cambioModalidadStore.actualizarEstado({numeroPrograma: ''});
    this.cambioModalidadStore.actualizarEstado({tiempoPrograma: ''});
    this.datos= DATOSACTUALIZADOS;
    this.cambioModalidadStore.actualizarEstado({datos:this.datos})
    this.rfcEmpresa = '';
    this.numeroPrograma = '';
    this.tiempoPrograma = '';
  }
  /**
     * Selecciona empresas.
     * @method seleccionarEmpresas
     * @param {any} empresas - Empresas seleccionadas.
     */
    seleccionarEmpresas(empresas: ServicioInmex): void {
    this.empresasSeleccionados = [{ ...empresas }];
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
