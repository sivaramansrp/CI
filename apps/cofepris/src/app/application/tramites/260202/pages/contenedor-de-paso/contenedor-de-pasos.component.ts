import {
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
  WizardComponent
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { PASOS, TITULO_MENSAJE } from '../../constants/importacion-materias-primas.enum';
import { Tramite260202Query } from '../../estados/tramite260202Query.query';
import { Tramite260202State } from '../../estados/tramite260202Store.store';

/**
 * @component
 * @name ContenedorDePasosComponent
 * @description
 * Este componente es un contenedor para manejar los pasos de un wizard (asistente).
 * Permite la navegación entre diferentes pasos y actualiza el título del mensaje
 * según el paso seleccionado.
 *
 * @selector app-contenedor-de-pasos
 * @standalone true
 * @imports
 * - CommonModule
 * - WizardComponent
 * - PasoUnoComponent
 * - PasoDosComponent
 * - PasoTresComponent
 * - BtnContinuarComponent
 */
@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent implements OnInit {

  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * @property {string | null} tituloMensaje
   * @description Título del mensaje que se muestra en el wizard.
   * Inicializado con el valor de `TITULOMENSAJE`.
   */ 

  tituloMensaje: string | null = TITULO_MENSAJE;

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
   * @property {Tramite260202State} storeData
   * @description Estado de la tienda para el trámite 260202.
   */
  storeData!: Tramite260202State;

  /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;

  /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;

  /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;

  constructor(private tramite260202Query: Tramite260202Query) {}
  
  ngOnInit(): void {
    this.tramite260202Query.selectTramiteState$.pipe().subscribe((data) => {
      this.storeData = data;
    });
  }

  /**
   * @method seleccionaTab
   * @description Cambia el índice actual al valor proporcionado.
   * @param {number} i - Índice del paso seleccionado.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Actualiza el índice y el título del mensaje según la acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción ('cont' o 'atras').
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = ContenedorDePasosComponent.obtenerNombreDelTítulo(
        e.valor
      );

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method obtenerNombreDelTítulo
   * @description Devuelve el título correspondiente al paso actual.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título del paso.
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULO_MENSAJE;
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Firmar';
      default:
        return TITULO_MENSAJE;
    }
  }

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
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
}
