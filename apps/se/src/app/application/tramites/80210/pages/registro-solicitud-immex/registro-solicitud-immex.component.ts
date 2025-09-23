import { AVISO, DatosPasos } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { Tramites80210State } from '../../estados/tramites80210.store';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';
import { createInitialState } from '../../estados/tramites80210.store';

/**
 * Interfaz que representa el botón de acción.
 */
interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;
  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

/**
 * Componente de registro-solicitud-immex.
 *
 * Este componente maneja el flujo de pasos para el proceso de registro-solicitud-immex.
 *
 * @selector 'app-registro-solicitud-immex'
 * @templateUrl './registro-solicitud-immex.component.html'
 * @styleUrl './registro-solicitud-immex.component.scss'
 */
@Component({
  selector: 'app-registro-solicitud-immex',
  templateUrl: './registro-solicitud-immex.component.html',
  styleUrl: './registro-solicitud-immex.component.scss',
})
export class registroSolicitudImmexComponent implements OnInit {
  /**
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Esta variable se utiliza para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente `WizardComponent` dentro de la plantilla.
   *
   * @viewChild wizardComponent - Utiliza el decorador `@ViewChild` para acceder al componente `WizardComponent`.
   * Permite interactuar con sus propiedades y métodos en el código del componente principal.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Constante que almacena el valor de la nota de privacidad.
   *
   * @constant AVISO_PRIVACIDAD_ADJUNTAR - Almacena el valor definido en `NOTA.AVISO_PRIVACIDAD_ADJUNTAR`.
   * Se utiliza para adjuntar o gestionar el aviso de privacidad dentro del sistema.
   */
  AVISO_PRIVACIDAD_ADJUNTAR = AVISO.Aviso;

  /**
   * Datos relacionados con los pasos.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * URL de la página actual.
   */
  public solicitudState!: Tramites80210State;
  /**
   * Estado de la solicitud actual.
   *
   * @type {Tramites80210State}
   * @memberof registroSolicitudImmexComponent
   */
  idTipoTRamite: string = '80101';

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se utiliza para referenciar la solicitud en curso.
   */
  idSolicitud: number = 0;

  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

  ngOnInit(): void {
    this.solicitudState = createInitialState();
  }

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
   * @ignore
   * Este método es ignorado por Compodoc.
   */
  cargaEnProgreso: boolean = true;

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado del botón de carga de archivos.
   *  carga - Indica si la carga de documentos está activa o no.
   * {void} No retorna ningún valor.
   */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
   * Maneja el estado de progreso de la carga de documentos.
   * Actualiza la variable `cargaEnProgreso` según el estado recibido.
   * @param carga - Indica si la carga está en progreso (`true`) o no (`false`).
   */
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
   * Maneja la navegación entre los pasos del asistente según las acciones de los botones.
   * @param e - La acción del botón que contiene el tipo de acción y el valor del índice.
   */
  getValorIndice(evento: AccionBoton): void {
    this.indice = evento.valor;
    this.wizardComponent[evento.accion === 'cont' ? 'siguiente' : 'atras']();
  }
}
