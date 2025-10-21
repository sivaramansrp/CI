import {
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

import { PASOS, TITULOMENSAJE } from '../../constants/medicamentos-destinados-uso.enum';
import { Tramite260208Query } from '../../estados/tramite260208Query.query';
import { Tramite260208State } from '../../estados/tramite260208Store.store';
import { WizardComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent implements OnInit {
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
   * Título del mensaje que se muestra en el componente.
   * Puede ser nulo si no está definido.
   * @type {string | null}
   */
  tituloMensaje: string | null = TITULOMENSAJE;

    /**
     * Estado del formulario de registro IMMEX.
     */
    storeData!: Tramite260208State;

  /**
   * Lista de pasos para el componente wizard.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Referencia al componente Wizard hijo.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de configuración para los pasos del wizard.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
    /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;

    /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();
    constructor(public tramiteQuery: Tramite260208Query) {
        // No se necesita lógica de inicialización adicional.
    }
ngOnInit(): void {
    this.tramiteQuery.selectImmexRegistro$.pipe().subscribe((data) => {
      this.storeData = data;
    }); 
}
  /**
   * Selecciona una pestaña específica del wizard.
   * @method
   * @param {number} i - Índice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene y procesa el valor del índice desde un evento de botón.
   * @method
   * @param {AccionBoton} e - Objeto con la acción y valor del botón
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
   * Método estático que obtiene el nombre del título según el valor del paso.
   * @param {number} valor - Valor numérico del paso actual
   * @returns {string} - Título correspondiente al paso
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
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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
}
