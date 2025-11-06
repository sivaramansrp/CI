/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
import { AVISO, FIRMAR } from '@libs/shared/data-access-user/src';

import { Component, OnDestroy, ViewChild } from '@angular/core';
 
import { ASIGNACION } from '@ng-mf/data-access-user';

import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { DatosPasos, WizardComponent } from '@libs/shared/data-access-user/src';

/**
 * Interface representing the action of a button.
 */
interface AccionBoton {
  /**
   * The action to be performed.
   */
  accion: string;
  /**
   * The value associated with the action.
   */
  valor: number;
}

/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent implements OnDestroy {
    /**
   * Reference to the WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  
  /**
   * Lista de pasos para el asistente (wizard) de asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNACION;
 
  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;
 
  /**
   * Clase CSS para aplicar estilos específicos a los elementos de la interfaz.
   */
  class: string = 'alert-danger';

  /**
   * The data for the steps in the wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /** Variables para manejo de validaciones */
  mostrarMensajeValidacion: boolean = false;
  mensajeValidacion: string = '';
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  /**
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
  public TEXTOS = {
    AVISO,
    FIRMAR,
  };

   /**
   * Maneja el evento de continuar del botón y valida antes de avanzar
   * @param e The action button event containing the action and value.
   */
  public getValorIndice(e: AccionBoton): void {
    // Si es acción de continuar, validar antes de avanzar
    if (e.accion === 'cont') {
      if (this.validarPasoActual()) {
        // Si la validación es exitosa, continuar con la navegación
        if (e.valor > 0 && e.valor < 5) {
          this.indice = e.valor;
          this.wizardComponent.siguiente();
          this.cerrarMensajeValidacion();
        }
      } else {
      
        this.mostrarMensajeConAutoClose();
      }
    } else {
      
      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        this.wizardComponent.atras();
        this.cerrarMensajeValidacion();
      }
    }
  }

  /**
   * Valida los campos obligatorios del paso actual
   * @returns true si todos los campos obligatorios están completos, false en caso contrario
   */
  private validarPasoActual(): boolean {
    switch (this.indice) {
      case 1:
        return this.validarPasoUno();
      case 2:
        return this.validarPasoDos();
      case 3:
        return this.validarPasoTres();
      default:
        return true;
    }
  }

  /**
   * Valida los campos obligatorios del paso 1 (datos)
   * @returns true si todos los campos obligatorios están completos
   */
  private validarPasoUno(): boolean {
    const CAMPOSOBLIGATORIOS = this.verificarCamposObligatoriosPaso1();

    if (!CAMPOSOBLIGATORIOS.valido) {
      this.mensajeValidacion = `La Solicitud ha quedado registrada con el número temporal 202768273. Éste no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la Solicitud al momento en que ésta sea firmada.`;
      return false;
    }
    return true;
  }

  /**
   * Valida los campos obligatorios del paso 2
   * @returns true si todos los campos obligatorios están completos
   */
  private validarPasoDos(): boolean {
    const CAMPOSOBLIGATORIOS = this.verificarCamposObligatoriosPaso2();
    
    if (!CAMPOSOBLIGATORIOS.valido) {
      this.mensajeValidacion = `Para continuar es necesario completar los siguientes campos obligatorios: ${CAMPOSOBLIGATORIOS.camposFaltantes.join(', ')}`;
      return false;
    }
    return true;
  }

  /**
   * Valida los campos obligatorios del paso 3
   * @returns true si todos los campos obligatorios están completos
   */
  private validarPasoTres(): boolean {
    const CAMPOSOBLIGATORIOS = this.verificarCamposObligatoriosPaso3();

    if (!CAMPOSOBLIGATORIOS.valido) {
      this.mensajeValidacion = `Para continuar es necesario completar los siguientes campos obligatorios: ${CAMPOSOBLIGATORIOS.camposFaltantes.join(', ')}`;
      return false;
    }
    return true;
  }

  /**
   * Muestra el mensaje de validación con auto-close después de 5 segundos
   */
  private mostrarMensajeConAutoClose(): void {
    this.mostrarMensajeValidacion = true;
     if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    // Auto-close después de 5 segundos
    this.timeoutId = setTimeout(() => {
      this.cerrarMensajeValidacion();
    }, 5000);
  }

  /**
   * Verifica los campos obligatorios específicos del paso 1
   * @returns objeto con información de validación
   */
  private verificarCamposObligatoriosPaso1(): { valido: boolean; camposFaltantes: string[] } {
    const COMPOSFALTANTES: string[] = [];
  
    COMPOSFALTANTES.push('Campos obligatorios');
    
    return {
      valido: false, 
      camposFaltantes: COMPOSFALTANTES
    };
  }

  /**
   * Verifica los campos obligatorios específicos del paso 2
   * @returns objeto con información de validación
   */
  private verificarCamposObligatoriosPaso2(): { valido: boolean; camposFaltantes: string[] } {
    const COMPOSFALTANTES: string[] = [];
 const CAMPOEJEMPLO = this.obtenerValorCampo('campoEjemploPaso2');

    if (!CAMPOEJEMPLO || CAMPOEJEMPLO === '') {
      COMPOSFALTANTES.push('Campo requerido del paso 2');
    }
    
    return {
      valido: COMPOSFALTANTES.length === 0,
      camposFaltantes: COMPOSFALTANTES
    };
  }

  /**
   * Verifica los campos obligatorios específicos del paso 3
   * @returns objeto con información de validación
   */
  private verificarCamposObligatoriosPaso3(): { valido: boolean; camposFaltantes: string[] } {
    const COMPOSFALTANTES: string[] = [];
 const CAMPOEJEMPLO = this.obtenerValorCampo('campoEjemploPaso3');

    if (!CAMPOEJEMPLO || CAMPOEJEMPLO === '') {
      COMPOSFALTANTES.push('Campo requerido del paso 3');
    }
    
    return {
      valido: COMPOSFALTANTES.length === 0,
      camposFaltantes: COMPOSFALTANTES
    };
  }

  /**
   * Obtiene el valor de un campo específico del formulario
   * @param nombreCampo Nombre del campo a obtener
   * @returns Valor del campo o null si no existe
   */
  private obtenerValorCampo(nombreCampo: string): string | null {
   const ELEMENTO = document.querySelector(`[name="${nombreCampo}"]`) as HTMLInputElement;
    if (ELEMENTO) {
      return ELEMENTO.value;
    }
    
    return null;
  }

  /**
   * Cierra el mensaje de validación
   */
  public cerrarMensajeValidacion(): void {
    this.mostrarMensajeValidacion = false;
    this.mensajeValidacion = '';
    
    // Limpiar timeout si existe
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /**
   * Cleanup al destruir el componente
   */
  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}