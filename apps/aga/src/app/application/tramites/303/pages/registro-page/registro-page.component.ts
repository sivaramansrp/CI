import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { DatosPasos, SeccionLibState } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

interface AccionBoton {
  /**
   * Nombre o identificador de la acción del botón.
   */
  accion: string;
  /**
   * Valor numérico relacionado con la acción del botón.
   */
  valor: number;
}
@Component({
  templateUrl: './registro-page.component.html',
  styles: '',
})
export class RegistroPageComponent {
  /** Lista de pasos para el componente wizard */
  pasos: ListaPasosWizard[] = PASOS;
  /** Indice del paso actual */
  indice: number = 1;
  /** Estado de la sección actual */
  public seccion!: SeccionLibState;
  /** Evento para cargar archivos */
  @Output() cargarArchivosEvento = new EventEmitter<void>();
  /** Evento para regresar a la sección de cargar documentos */
  @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();
  /** Indica si el botón de carga de archivos está activado */
  activarBotonCargaArchivos: boolean = false;
  /** Indica si la sección de cargar documentos está activa */
  seccionCargarDocumentos: boolean = true;
  /** Referencia al componente wizard */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /** Datos de los pasos del wizard */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña en el wizard
   * @param i Indice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice del paso actual
   * @param e Evento de acción del botón
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 3) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  siguiente(): void {
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
  /**
   * Maneja el evento de clic en el botón de carga de archivos
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }

  /**
   * Maneja el evento de clic en el botón de regresar a la sección de cargar documentos
   */
  anteriorSeccionCargarDocumento(): void {
    this.regresarSeccionCargarDocumentoEvento.emit();
  }

  /**
   * Maneja el evento de carga de documentos
   * @param carga Indica si se debe activar el botón de carga de archivos
   */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }

  /**
   * Maneja el evento de carga de documentos
   * @param cargaRealizada Indica si la carga de documentos se realizó con éxito
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }

}
