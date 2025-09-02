import { MENSAJE_DE_VALIDACION,TITULOMENSAJE } from '../../constants/medicos-uso.enum';
import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { AccionBoton } from '@ng-mf/data-access-user';
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { Notificacion } from '@ng-mf/data-access-user';
import { NotificacionesComponent } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { PASOS } from '../../constants/medicos-uso.enum';

/**
 * @component ContenedorDePasosComponent
 * @description Componente contenedor principal del flujo tipo "wizard".
 * Administra la navegación entre los pasos del formulario y la lógica para cambiar de vista,
 * así como el título dinámico mostrado en el encabezado.
 */
@Component({
  selector: 'app-contenedor-de-pasos',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
    AlertComponent,
    NotificacionesComponent,

  ],
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent {
  /**
   * @property tituloMensaje
   * @description Título dinámico que se muestra en la parte superior del componente wizard.
   * Cambia según el paso activo.
   * @type {string | null}
   */
  public tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property pasos
   * @description Lista de pasos definidos para el wizard.
   * @type {ListaPasosWizard[]}
   */
  public pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property indice
   * @description Índice actual del paso seleccionado en el wizard.
   * @type {number}
   */
  public indice: number = 1;

  /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;

   /**
 * @property {string} MENSAJE_DE_ERROR
 * @description
 * Propiedad usada para almacenar el mensaje de error actual.
 * Se inicializa como cadena vacía y se actualiza en función
 * de las validaciones o errores capturados en el flujo.
 */
   MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;

   /**
    * @property {string} infoAlert
    * Clase CSS usada para mostrar alertas informativas.
    */
   public infoAlert = 'alert-danger text-center';

  
    /** Nueva notificación relacionada con el RFC. */
    public seleccionarFilaNotificacion!: Notificacion;

  /**
   * @property wizardComponent
   * @description Referencia al componente `WizardComponent`, permite manipular métodos como `siguiente()` o `atras()`.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 * }
 */
esFormaValido: boolean = false;

esMostrarAlerta: boolean = false;


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
   * @property datosPasos
   * @description Datos requeridos por el componente wizard para configurar botones y número de pasos.
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description Cambia el índice del paso actual manualmente.
   * @param {number} i - Índice del paso seleccionado.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Recibe una acción desde el botón de navegación del wizard y actualiza el paso y el título.
   * Llama al método correspondiente en el wizard para avanzar o retroceder.
   * @param {AccionBoton} e - Objeto con el valor del paso y la acción a ejecutar (`cont` o `atras`).
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {

    if (e.accion === 'cont') {
      let isValid = true;

        if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarPasoUno();
      }
      if(this.esFormaValido===false){
        this.mostrarAlerta=true;
        this.seleccionarFilaNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE_DE_VALIDACION,
          cerrar: true,
          tiempoDeEspera: 2000,
          txtBtnAceptar: 'SI',
          txtBtnCancelar: 'NO',
        }
      }
      if (!isValid) {
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        return;
      }

      this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;

      this.wizardComponent.siguiente();
      return;
    }

      this.indice = e.valor;
    this.datosPasos.indice = this.indice;
    this.wizardComponent.atras();

}

  /**
   * @method obtenerNombreDelTítulo
   * @description Método auxiliar estático que devuelve el título correspondiente a cada paso.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título a mostrar en el encabezado del wizard.
   */
  public static obtenerNombreDelTítulo(valor: number): string {
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
}
