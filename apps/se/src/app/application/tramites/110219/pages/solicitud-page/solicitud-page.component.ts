import {
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

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
  standalone: true,
  imports: [
    WizardComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    PasoTresComponent,
    CommonModule,
  ],
})
export class SolicitudPageComponent implements OnInit {
  /**
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Lista de pasos del asistente (wizard).
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * Número del paso actual, utilizado para identificar el paso activo.
   */
  nombre: number = 1;

  /**
   * Indica si el número de certificado es válido.
   */
  isNumeroDe!: boolean;

  /**
   * Indica si los datos del número son válidos.
   */
  isNumeroDatos: boolean = false;

  /**
   * Indica si el patrón del número es válido.
   */
  isNumeroPattern!: boolean;

  /**
   * Datos de configuración de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Inicializa el componente y ajusta la lista de pasos del asistente,
   * excluyendo el paso con índice 2 y reasignando el índice del paso 3 a 2.
   */
  ngOnInit(): void {
    this.pasos = this.pasos
      .filter((step) => step.indice !== 2)
      .map((step) => (step.indice === 3 ? { ...step, indice: 2 } : step));
  }

  /**
   * Selecciona una pestaña del asistente según el índice proporcionado.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón y navega entre los pasos del asistente.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    this.alEventoHijo(this.nombre);

    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.nombre = 1;
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Maneja el evento emitido por un componente hijo y actualiza el número de paso.
   * @param event Número del evento emitido.
   */
  alEventoHijo(event: number): void {
    this.nombre = event;
  }

  /**
   * Actualiza el estado de validez del número de certificado.
   * @param event Valor booleano que indica si el número es válido.
   */
  isNumeroDeCertificado(event: boolean): void {
    this.isNumeroDe = event;
  }

  /**
   * Actualiza el estado de validez del patrón del número.
   * @param event Valor booleano que indica si el patrón es válido.
   */
  isNumeroDePattern(event: boolean): void {
    this.isNumeroPattern = event;
  }

  /**
   * Obtiene y actualiza el número de certificado.
   * @param event Número del certificado.
   */
  getDatosCertificado(event: number): void {
    this.nombre = event;
  }

  /**
   * Actualiza el estado de los datos del número y avanza al siguiente paso si no son válidos.
   * @param event Valor booleano que indica si los datos del número son válidos.
   */
  isDatosNumero(event: boolean): void {
    this.isNumeroDatos = event;
    this.isNumeroPattern = false;
    if (!this.isNumeroDatos) {
      this.getValorIndice({
        accion: 'cont',
        valor: 2,
      });
    }
  }
}