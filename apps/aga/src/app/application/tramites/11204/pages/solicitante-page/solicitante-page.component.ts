import { ANEXAR, CARGAR } from '../../enums/datos-tramite.enum';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { ListaPasosWizard,Usuario } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa una AccionBoton.
 * Utilizamos esta interfaz para definir la estructura de los datos de una AccionBoton.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit {
  /**
   * Arreglo que contiene los pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Índice de la pestaña actual.
   */
  indice: number = 1;


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
   * Evento que se emite para regresar a la sección de carga de documentos.
   * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
   */
  regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();


  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Representa los datos del usuario para el componente.
   * Esta propiedad se inicializa como un arreglo vacío convertido al tipo `Usuario`.
   * Asegúrate de que el tipo `Usuario` esté correctamente definido y que esta propiedad
   * reciba los datos de usuario adecuados durante el ciclo de vida del componente.
   */
  datosUsuario: Usuario = [] as unknown as Usuario;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Método de inicialización del componente.
   * Se ejecuta al inicializar el componente y actualiza el título del segundo paso.
   */
  ngOnInit(): void {
    this.pasos = PASOS;
    this.pasos = this.pasos.map((paso) => {
      if (paso.indice === 2 && paso.titulo === ANEXAR.label) {
        return { ...paso, titulo: CARGAR.label };
      }
      return paso;
    });
  }

  /**
   * Selecciona una pestaña.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice y navega en el wizard.
   * @param e El evento de acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Emite el evento continuar.
   */
  continuar(): void {
    this.getValorIndice({ accion: 'cont', valor: this.indice + 1 });
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

}
