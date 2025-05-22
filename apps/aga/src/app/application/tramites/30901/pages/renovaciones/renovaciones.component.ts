import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { RENOVACIONES_PASOS } from '../../enums/renovaciones-muestras-mercancias.enum';
import { ViewChild } from '@angular/core';
import { WizardComponent } from '@ng-mf/data-access-user';

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
 * Componente de renovaciones.
 *
 * Este componente maneja el flujo de pasos para el proceso de renovaciones.
 *
 * @selector 'app-renovaciones'
 * @templateUrl './renovaciones.component.html'
 * @styleUrl './renovaciones.component.scss'
 */
@Component({
  selector: 'app-renovaciones',
  standalone: true,
  imports: [
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    AlertComponent,
    CommonModule,
  ],
  templateUrl: './renovaciones.component.html',
  styleUrl: './renovaciones.component.scss',
})
export class RenovacionesComponent {
  /**
   * Mensaje de error detallado que se muestra cuando hay errores en el formulario.
   * Incluye estilos en línea y un listado de errores específicos.
   * En este caso, se indica que el campo "Pago" es obligatorio.
   */
  errorMessage =
    '<div class="error-container"><style>.error-container {text-align: center;font-family: Arial, sans-serif;}.error-title {font-weight: bold;margin-bottom: 1rem;}.error-item {display: flex;justify-content: center;align-items: center;gap: 0.5rem;}.error-index {text-align: left;min-width: 20px;position: absolute;left: 15px;}.error-text {color: #b40606;}</style><p class="error-title">Corrija los siguientes errores:</p><p class="error-item"><span class="error-index">1.</span><span class="error-text">(Pago) es un campo requerido</span></p></div>';

  /**
   * Mensaje de error general para mostrar que el formulario contiene errores
   * y debe ser revisado por el usuario.
   */
  error = '<p>Error en el formulario, favor de verificar</p>';

  /**
   * Mensaje de error a mostrar.
   */
  esValido = true;

  /*
   * Esta variable se utiliza para almacenar la lista de pasos.
   */
  pasos: ListaPasosWizard[] = RENOVACIONES_PASOS;

  /**
   * Esta variable se utiliza para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente hijo WizardComponent utilizando @ViewChild.
   * Se utiliza para acceder a las propiedades y métodos públicos del componente wizard desde el componente padre.
   * El operador `!` indica que la variable será inicializada por Angular después de la creación del componente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente de solicitud.

   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

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
   * Maneja la navegación entre los pasos del asistente según las acciones de los botones.
   * @param e - La acción del botón que contiene el tipo de acción y el valor del índice.
   */
  getValorIndice(evento: AccionBoton): void {
    if (evento.valor > 0 && evento.valor < 5) {
      if (this.indice === 1) {
        const SOLICITUD_COMPONENT =
          this.pasoUnoComponent?.pagoLineaDeCapturaComponent;
        this.esValido = SOLICITUD_COMPONENT?.validarFormulario() ?? false;
      }

      if (!this.esValido) {
        this.datosPasos.indice = 1;
        return;
      }

      this.indice = evento.valor;
      if (evento.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
}
