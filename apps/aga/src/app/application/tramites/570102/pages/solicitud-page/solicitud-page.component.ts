import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  PASOS,
  Pedimento,
  WizardComponent,
} from '@ng-mf/data-access-user';

/**
 * Texto de alerta para terceros.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';
/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}
/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnInit {
  /**
   * Indica si el modal debe estar oculto.
   * Se utiliza para controlar la visibilidad del modal en la interfaz de usuario.
   */
  ocultarModal: boolean = false;

  /**
   * Índice del elemento a eliminar.
   */
  public elementoParaEliminar!: number;

  /**
    * Notificación a mostrar en el modal.
    */
  public nuevaNotificacion!: Notificacion;

  /**
    * Lista de pedimentos asociados a la solicitud.
    */
  public pedimentos: Array<Pedimento> = [];

  /**
* Indica si se está cargando un archivo.
*/
  cargarArchivo: boolean = false;

  /**
   * Texto de alerta para terceros.
   * Este texto se muestra en la interfaz de usuario para informar a los usuarios sobre el estado de su solicitud.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * El valor asociado a la acción.
   */
  valor!: number;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
   * Número del paso actual.
   */
  nombre!: number;
  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Guardar y firmar',
  };
  /**
   * Configuración de los datos de los pasos del asistente.
   * Contiene información sobre el número total de pasos, el índice actual,
   * y los textos de los botones "Anterior" y "Continuar".
   */
  datosIndice: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Inicializa el componente.
   * Filtra y mapea los pasos del asistente para excluir y reorganizar pasos específicos.
   */
  ngOnInit(): void {
    this.pasos = this.pasos
      .filter((step) => step.indice !== 2)
      .map((step) => (step.indice === 3 ? { ...step, indice: 2 } : step));
  }
  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */

  getValorIndice(e: AccionBoton): void {
    this.alEventoHijo(this.nombre);
    this.cargaArchivo();
    if (this.ocultarModal) {
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        if (e.accion === 'cont' && this.indice === 2) {
          this.nombre = 1;
          this.wizardComponent.siguiente();
        }
      }
    }
  }

  /**
   * Maneja el evento emitido por un componente hijo.
   *
   * @param event Número del evento emitido.
   */
  alEventoHijo(nombre: number): void {
    this.nombre = nombre;
  }

  /**
  * Elimina un pedimento de la lista.
  * @param borrar Indica si se debe eliminar el pedimento.
  */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
      this.ocultarModal = true;
      this.getValorIndice({ accion: 'cont', valor: 2 });
    }
  }

  /**
   * Abre un modal con una notificación.
   * @param i Índice del elemento a eliminar (opcional).
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        '¿Deseas desistir la solicitud de servicios extraordinarios con el folio 0105700100020252470000001?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Sí',
      txtBtnCancelar: 'No',
    };
    this.elementoParaEliminar = i;
  }

  /**
   * Marca que se está cargando un archivo y abre el modal.
   */
  cargaArchivo(): void {
    this.cargarArchivo = true;
    if (this.indice === 1) {
      this.abrirModal();
    }
  }


}
