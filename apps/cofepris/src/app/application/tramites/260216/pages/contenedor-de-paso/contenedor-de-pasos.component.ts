/**
 * @file contenedor-de-pasos.component.ts
 * @description Este archivo define el componente `ContenedorDePasosComponent`, que actúa como un contenedor para manejar los pasos de un wizard (asistente).
 * Permite la navegación entre diferentes pasos y actualiza el título del mensaje según el paso seleccionado.
 *
 * @component
 * @name ContenedorDePasosComponent
 * @selector app-contenedor-de-pasos
 * @standalone true
 * @templateUrl ./contenedor-de-pasos.component.html
 * @styleUrl ./contenedor-de-paso.component.scss
 *
 * @description
 * Este componente encapsula la lógica y la presentación de un wizard que guía al usuario a través de varios pasos.
 * Utiliza componentes reutilizables como `WizardComponent`, `PasoUnoComponent`, `PasoDosComponent`, y `PasoTresComponent`.
 *
 * @dependencies
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - WizardComponent: Componente reutilizable para manejar la navegación entre pasos.
 * - PasoUnoComponent: Componente que representa el primer paso del wizard.
 * - PasoDosComponent: Componente que representa el segundo paso del wizard.
 * - PasoTresComponent: Componente que representa el tercer paso del wizard.
 * - BtnContinuarComponent: Componente reutilizable para manejar los botones de navegación.
 */

import {
  AccionBoton,
  AlertComponent,
  DatosPasos,
  ListaPasosWizard,
  PasoCargaDocumentoComponent,
  PasoFirmaComponent,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FALTAN_CAMPOS_POR_CAPTURAR, PASOS, TITULOMENSAJE } from '../../constants/medicos-uso.enum';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite260216State } from '../../estados/tramite260216Store.store';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-contenedor-de-pasos',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    BtnContinuarComponent,
    AlertComponent,
    PasoFirmaComponent,
    PasoCargaDocumentoComponent,
    PasoFirmaComponent
  ],
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent {
     /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;
    /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;
      /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;
    /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

   /**
       * Estado del formulario de registro IMMEX.
       */
      storeData!: Tramite260216State;
  /**
   * @property {string | null} tituloMensaje
   * @description Título del mensaje que se muestra en el wizard.
   * Inicializado con el valor de `TITULOMENSAJE`.
   */
  tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description Lista de pasos del wizard.
   * Inicializado con el valor de `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice
   * @description Índice actual del paso seleccionado en el wizard.
   * Inicializado con el valor `1`.
   */
  indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del wizard.
   * Utilizado para manejar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * @description Objeto que contiene información sobre los pasos del wizard.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description Cambia el índice actual al valor proporcionado.
   * @param {number} i - Índice del paso seleccionado.
   *
   * @example
   * ```typescript
   * this.seleccionaTab(2);
   * console.log(this.indice); // 2
   * ```
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
 * @property {string} MENSAJE_DE_ERROR
 * @description
 * Propiedad usada para almacenar el mensaje de error actual.
 * Se inicializa como cadena vacía y se actualiza en función
 * de las validaciones o errores capturados en el flujo.
 */
  MENSAJE_DE_ERROR: string = '';

  /**
   * @property {string} infoAlert
   * Clase CSS usada para mostrar alertas informativas.
   */
  public infoAlert = 'alert-danger text-center';

  /**
 * @property {PasoUnoComponent} pasoUnoComponent
 * @description
 * Referencia al componente hijo `PasoUnoComponent` mediante
 * `@ViewChild`. Permite acceder a sus métodos y propiedades
 * desde este componente padre.
 */
  @ViewChild(PasoUnoComponent)
  pasoUnoComponent!: PasoUnoComponent;

  /**
   * @method getValorIndice
   * @description Actualiza el índice y el título del mensaje según la acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción ('cont' o 'atras').
   *
   * @example
   * ```typescript
   * const accion: AccionBoton = { valor: 2, accion: 'cont' };
   * this.getValorIndice(accion);
   * console.log(this.indice); // 2
   * ```
   */
  getValorIndice(e: AccionBoton): void {
    this.MENSAJE_DE_ERROR = '';
    if (e.valor > 0 && e.valor < 5) {
      this.tituloMensaje = ContenedorDePasosComponent.obtenerNombreDelTítulo(
        e.valor
      );
      const VALIDO = this.pasoUnoComponent?.validarPasoUno();
      if (VALIDO) {
         this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      } else {
        this.MENSAJE_DE_ERROR = FALTAN_CAMPOS_POR_CAPTURAR;
      }
    }
  }

  /**
   * @method obtenerNombreDelTítulo
   * @description Devuelve el título correspondiente al paso actual.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título del paso.
   *
   * @example
   * ```typescript
   * const titulo = ContenedorDePasosComponent.obtenerNombreDelTítulo(2);
   * console.log(titulo); // 'Cargar archivos'
   * ```
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Firmar';
      default:
        return TITULOMENSAJE;
    }
  }
    /**
  * Método para manejar el evento de carga de documentos.
  * Actualiza el estado del botón de carga de archivos.
  *  carga - Indica si la carga de documentos está activa o no.
  * {void} No retorna ningún valor.
  */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }
   /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }
    onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
     /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
   /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
    /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }
}