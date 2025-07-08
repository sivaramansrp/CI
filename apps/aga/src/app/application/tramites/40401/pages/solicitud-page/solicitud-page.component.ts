/**
 * Componente principal de la página de solicitud para el trámite 40401 del sistema AGA.
 *
 * Este archivo contiene el componente Angular que gestiona la página principal de solicitud
 * del trámite 40401. Implementa un wizard de múltiples pasos que guía al usuario a través
 * del proceso de registro y solicitud, manejando la navegación, validación de formularios,
 * y coordinación con el sistema de gestión de estado reactivo.
 *
 * El componente implementa:
 * - Wizard de navegación con pasos secuenciales
 * - Gestión de estado reactivo utilizando Akita Store/Query
 * - Validación condicional de formularios por paso
 * - Control de flujo basado en configuraciones de transportación
 * - Integración con componentes hijos especializados
 * - Manejo del ciclo de vida con cleanup automático de suscripciones
 *
 * @fileoverview Componente principal del wizard de solicitud del trámite 40401
 * @author Sistema de Gestión de Trámites - Frontend Team
 * @version 1.0.0
 * @since 1.0.0
 * @module SolicitudPageComponent
 */

import { BtnContinuarComponent, DatosPasos } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { OnDestroy, OnInit } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

import { PASOS } from '../../enum/solicitante.enum';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite40401Query } from '../../../../core/queries/tramite40401.query';
import { Tramite40401Store } from '../../../../core/estados/tramites/tramite40401.store';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que define la estructura de acciones de botones del wizard.
 *
 * Esta interfaz especifica el contrato para objetos que representan acciones
 * ejecutadas por botones en la interfaz del wizard. Define el tipo de acción
 * a realizar y el valor numérico asociado para la navegación entre pasos.
 *
 * @interface AccionBoton
 *
 * @example
 * ```typescript
 * const accion: AccionBoton = {
 *   accion: 'cont',  // o 'prev' para retroceder
 *   valor: 2         // índice del paso objetivo
 * };
 * ```
 *
 * @since 1.0.0
 */
interface AccionBoton {
  /**
   * @property {string} accion
   * Tipo de acción del botón ('cont' para continuar, 'prev' para retroceder).
   */
  accion: string;

  /**
   * @property {number} valor
   * Valor numérico que indica el índice del paso objetivo.
   */
  valor: number;
}
/**
 * Componente Angular standalone para la página de solicitud del trámite 40401.
 *
 * Este componente implementa la funcionalidad principal de la página de solicitud,
 * gestionando un wizard de múltiples pasos que guía al usuario a través del proceso
 * de registro del trámite 40401. Utiliza el patrón de gestión de estado reactivo
 * con Akita Store/Query para coordinar el estado de la aplicación y maneja
 * la navegación condicional basada en configuraciones específicas del trámite.
 *
 * Características del componente:
 * - Componente standalone con importaciones explícitas
 * - Implementa OnInit y OnDestroy para gestión del ciclo de vida
 * - Integra wizard de navegación con validación condicional
 * - Maneja estado reactivo con RxJS y Akita
 * - Controla flujo de navegación basado en configuraciones de transportación
 * - Gestiona referencias a componentes hijos especializados
 *
 * @component
 * @standalone
 * @implements {OnInit, OnDestroy}
 * @selector app-solicitud-page
 *
 * @example
 * ```html
 * <!-- Uso del componente en template padre: -->
 * <app-solicitud-page></app-solicitud-page>
 * ```
 *
 * @example
 * ```typescript
 * // Navegación programática al componente:
 * this.router.navigate(['tramites/40401/solicitud']);
 * ```
 *
 * @since 1.0.0
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
  standalone: true,
  imports: [
    WizardComponent,
    PasoUnoComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    CommonModule,
  ],
})
export class SolicitudPageComponent implements OnInit, OnDestroy {
  /**
   * Configuración de pasos del wizard para el proceso de solicitud del trámite 40401.
   *
   * Esta propiedad contiene un array de objetos `ListaPasosWizard` que definen
   * la estructura completa de pasos del wizard de solicitud. Cada paso incluye
   * información sobre su estado, título, y configuración de navegación, estableciendo
   * el flujo secuencial que debe seguir el usuario durante el proceso.
   *
   * @property {Array<ListaPasosWizard>} pasos
   * @readonly
   *
   * @example
   * ```typescript
   * // Acceder al número total de pasos:
   * const totalPasos = this.pasos.length;
   *
   * // Obtener el paso actual:
   * const pasoActual = this.pasos.find(paso => paso.activo);
   *
   * // Verificar pasos completados:
   * const pasosCompletados = this.pasos.filter(paso => paso.completado);
   * ```
   *
   * @since 1.0.0
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Indicador de estado para el control de validación de nombres en el formulario.
   *
   * Esta propiedad booleana controla la visualización y validación de campos
   * relacionados con nombres en el formulario del trámite. Se utiliza para
   * mostrar mensajes de error o requerimientos específicos cuando la validación
   * de nombres no es satisfactoria.
   *
   * @property {boolean} nombre
   * @default false
   *
   * @example
   * ```typescript
   * // Activar validación de nombre:
   * this.nombre = true;
   *
   * // Uso en template para mostrar mensajes:
   * if (this.nombre) {
   *   // Mostrar mensaje de error de validación
   * }
   * ```
   *
   * @since 1.0.0
   */
  nombre: boolean = false;

  /**
   * Índice del paso actualmente activo en el wizard de solicitud.
   *
   * Esta propiedad representa la posición actual del usuario dentro del flujo
   * de pasos del wizard. Se utiliza para controlar la navegación, mostrar el
   * contenido apropiado del paso actual, y gestionar la progresión a través
   * del proceso de solicitud del trámite 40401.
   *
   * @property {number} indice
   * @default 1
   *
   * @example
   * ```typescript
   * // Navegar al paso específico:
   * this.indice = 2;
   *
   * // Verificar si estamos en el primer paso:
   * if (this.indice === 1) {
   *   // Lógica específica del primer paso
   * }
   *
   * // Avanzar al siguiente paso:
   * this.indice = this.indice + 1;
   * ```
   *
   * @since 1.0.0
   */
  indice: number = 1;

  /**
   * Subject para gestionar la destrucción de suscripciones RxJS del componente.
   *
   * Este Subject implementa el patrón takeUntil para cancelar automáticamente
   * todas las suscripciones activas cuando el componente es destruido. Previene
   * fugas de memoria y efectos secundarios no deseados al asegurar que las
   * suscripciones se cancelen correctamente durante el ciclo de vida del componente.
   *
   * @property {Subject<void>} destroyNotifier$
   *
   * @example
   * ```typescript
   * // Uso típico en suscripciones del componente:
   * this.tramiteQuery.selectSolicitud$
   *   .pipe(takeUntil(this.destroyNotifier$))
   *   .subscribe(data => {
   *     // Lógica de procesamiento
   *   });
   * ```
   *
   * @since 1.0.0
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indicador de estado para habilitar o deshabilitar opciones de transportación.
   *
   * Esta propiedad booleana determina si las opciones de transportación están
   * habilitadas en el flujo actual del trámite. Se utiliza para controlar la
   * validación condicional y la navegación del wizard basada en los requisitos
   * específicos de transportación del trámite 40401.
   *
   * @property {boolean} transportacion
   * @default false
   *
   * @example
   * ```typescript
   * // Verificar si se requiere transportación:
   * if (this.transportacion) {
   *   // Aplicar validaciones adicionales de transportación
   *   this.validarDatosTransportacion();
   * }
   *
   * // Condicionar navegación:
   * const puedeAvanzar = !this.transportacion || this.validacionCompleta;
   * ```
   *
   * @since 1.0.0
   */
  transportacion: boolean = false;

  /**
   * Referencia al componente hijo WizardComponent para control programático del wizard.
   *
   * Esta referencia permite la interacción directa con el componente wizard desde
   * el componente padre, habilitando el control programático de la navegación,
   * el acceso a métodos específicos del wizard, y la coordinación entre la lógica
   * del componente padre y la funcionalidad del wizard de pasos.
   *
   * @viewChild
   * @property {WizardComponent} wizardComponent
   *
   * @example
   * ```typescript
   * // Navegar programáticamente en el wizard:
   * this.wizardComponent.siguiente();  // Avanzar al siguiente paso
   * this.wizardComponent.atras();      // Retroceder al paso anterior
   *
   * // Acceder a propiedades del wizard:
   * const pasoActual = this.wizardComponent.pasoActual;
   * ```
   *
   * @since 1.0.0
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Configuración de datos para la navegación y control del wizard de solicitud.
   *
   * Este objeto contiene toda la información necesaria para configurar y controlar
   * la navegación del wizard, incluyendo el número total de pasos, el índice actual,
   * y los textos de los botones de navegación. Esta configuración se pasa al
   * componente wizard para su funcionamiento correcto.
   *
   * @property {DatosPasos} datosPasos
   *
   * @example
   * ```typescript
   * // Configuración típica del wizard:
   * {
   *   nroPasos: 3,               // Total de pasos en el proceso
   *   indice: 1,                 // Paso actual
   *   txtBtnAnt: 'Anterior',     // Texto del botón retroceder
   *   txtBtnSig: 'Continuar'     // Texto del botón avanzar
   * }
   * ```
   *
   * @since 1.0.0
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente de página de solicitud del trámite 40401.
   *
   * Inyecta las dependencias necesarias para la gestión del estado del trámite,
   * incluyendo el store para actualizaciones de estado y el query para consultas
   * reactivas. La inyección de dependencias es manejada automáticamente por el
   * framework de Angular siguiendo el patrón Akita de gestión de estado.
   *
   * @constructor
   * @param {Tramite40401Store} store - Store de Akita para gestión del estado del trámite 40401
   * @param {Tramite40401Query} tramiteQuery - Query de Akita para consultas reactivas del estado del trámite
   *
   * @example
   * ```typescript
   * // Angular maneja automáticamente la inyección de dependencias:
   * // - store: Para actualizar estado del trámite y paso activo
   * // - tramiteQuery: Para consultar estado reactivo de la solicitud
   * ```
   *
   * @since 1.0.0
   */
  constructor(
    public store: Tramite40401Store,
    public tramiteQuery: Tramite40401Query
  ) {
    // Inicializa el paso activo en el store
  }

  /**
   * Método del ciclo de vida Angular que se ejecuta al inicializar el componente.
   *
   * Este método configura las suscripciones necesarias para el funcionamiento reactivo
   * del componente, estableciendo la suscripción al estado de la solicitud del trámite
   * y configurando la lógica de validación condicional para transportación. Utiliza
   * el patrón takeUntil para garantizar la limpieza automática de suscripciones.
   *
   * Operaciones realizadas:
   * - Suscripción reactiva al estado de la solicitud del trámite 40401
   * - Evaluación condicional de requisitos de transportación
   * - Configuración de validaciones basadas en pestaña activa y datos faltantes
   * - Mapeo del estado de la solicitud a propiedades locales del componente
   *
   * @method ngOnInit
   * @implements {OnInit}
   *
   * @example
   * ```typescript
   * // Se ejecuta automáticamente por Angular después del constructor:
   * // 1. Se establece la suscripción al estado de la solicitud
   * // 2. Se evalúan los requisitos de transportación
   * // 3. Se configuran las validaciones condicionales
   * ```
   *
   * @since 1.0.0
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.transportacion =
            seccionState.pestanaActiva === 2 &&
            (!seccionState.pais ||
              !seccionState.codigo ||
              !seccionState.transportacion);
          // Asigna el estado de la solicitud al estado actual
        })
      )
      .subscribe();
  }

  /**
   * Selecciona y activa una pestaña específica en el wizard por su índice.
   *
   * Este método permite la navegación directa a un paso específico del wizard
   * actualizando el índice actual. Se utiliza para implementar navegación no
   * secuencial cuando el usuario selecciona directamente una pestaña específica
   * en la interfaz del wizard.
   *
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña/paso a seleccionar (base 1)
   * @returns {void} No retorna valor, pero actualiza el estado del componente
   *
   * @example
   * ```typescript
   * // Navegar directamente al paso 2:
   * this.seleccionaTab(2);
   *
   * // Uso desde template con click de pestaña:
   * // <button (click)="seleccionaTab(3)">Ir al Paso 3</button>
   * ```
   *
   * @since 1.0.0
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Procesa acciones de botones del wizard y gestiona la navegación condicional.
   *
   * Este método maneja las acciones de navegación del wizard procesando eventos
   * de botones "Anterior" y "Continuar". Implementa lógica condicional específica
   * para el trámite 40401, incluyendo validaciones de transportación que pueden
   * bloquear o modificar el flujo normal de navegación del wizard.
   *
   * Lógica de procesamiento:
   * 1. Validación del rango de valores del paso objetivo
   * 2. Evaluación de requisitos de transportación para el paso 2
   * 3. Activación de validaciones específicas si faltan datos
   * 4. Navegación normal del wizard si las validaciones pasan
   * 5. Actualización del paso activo en el store de estado
   *
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del índice objetivo
   * @returns {void} No retorna valor, pero ejecuta navegación y actualiza estado
   *
   * @example
   * ```typescript
   * // Avanzar al siguiente paso:
   * this.getValorIndice({ accion: 'cont', valor: 2 });
   *
   * // Retroceder al paso anterior:
   * this.getValorIndice({ accion: 'prev', valor: 1 });
   *
   * // Uso desde componente hijo:
   * onBotonContinuar(): void {
   *   this.getValorIndice({ accion: 'cont', valor: this.indiceActual + 1 });
   * }
   * ```
   *
   * @since 1.0.0
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      if (this.transportacion && e.valor === 2) {
        this.nombre = true;
        this.datosPasos.indice = 1;
      } else {
        this.nombre = false;
        this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
      this.store.setPasoActivo(this.indice);
    }
  }

  /**
   * Avanza automáticamente al siguiente paso del wizard de solicitud.
   *
   * Este método proporciona una forma conveniente de avanzar al siguiente paso
   * del wizard incrementando automáticamente el índice actual. Utiliza internamente
   * el método `getValorIndice` para aplicar todas las validaciones y lógica
   * condicional correspondiente al flujo del trámite 40401.
   *
   * @method continuar
   * @returns {void} No retorna valor, pero ejecuta navegación al siguiente paso
   *
   * @example
   * ```typescript
   * // Avanzar al siguiente paso programáticamente:
   * this.continuar();
   *
   * // Uso en respuesta a validación exitosa:
   * if (this.formularioValido) {
   *   this.continuar();
   * }
   *
   * // Uso desde template:
   * // <button (click)="continuar()">Siguiente</button>
   * ```
   *
   * @since 1.0.0
   */
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
  }

  /**
   * Método del ciclo de vida Angular que se ejecuta cuando el componente es destruido.
   *
   * Este método implementa la interfaz OnDestroy y se encarga de la limpieza adecuada
   * de recursos cuando el componente es removido del DOM. Emite una señal a través
   * del Subject destroyNotifier$ para cancelar todas las suscripciones activas y
   * luego completa el Subject para liberar la memoria y prevenir fugas.
   *
   * Operaciones de limpieza realizadas:
   * 1. Emisión de señal de destrucción a través de destroyNotifier$
   * 2. Completado del Subject para liberar recursos
   * 3. Cancelación automática de todas las suscripciones usando takeUntil
   *
   * @method ngOnDestroy
   * @implements {OnDestroy}
   * @returns {void} No retorna ningún valor
   *
   * @example
   * ```typescript
   * // Se ejecuta automáticamente por Angular cuando:
   * // - El usuario navega a otra ruta
   * // - El componente padre es destruido
   * // - La aplicación se cierra
   * ```
   *
   * @since 1.0.0
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
