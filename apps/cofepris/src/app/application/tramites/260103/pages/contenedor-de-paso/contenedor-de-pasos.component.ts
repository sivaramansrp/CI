import {
  AVISO,
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { PASOS, TITULOMENSAJE } from '../../constants/importacion-retorno-sanitario.enum';
import { MENSAJE_DE_VALIDACION } from '../../../260212/constants/medicos-uso.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';
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
export class ContenedorDePasosComponent {
  
    /**
   * @property {string} MENSAJE_DE_ERROR
   * @description
   * Propiedad usada para almacenar el mensaje de error actual.
   * Se inicializa como cadena vacía y se actualiza en función
   * de las validaciones o errores capturados en el flujo.
   */
     MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;
  
    infoError = 'alert-danger text-center';
     /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = false;
    /** Nueva notificación relacionada con el RFC. */
    public seleccionarFilaNotificacion!: Notificacion;
    /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;
  
    /**
      * @property {PasoUnoComponent} pasoUnoComponent
      * @description
      * Referencia al componente hijo `PasoUnoComponent` mediante
      * `@ViewChild`. Permite acceder a sus métodos y propiedades
      * desde este componente padre.
    */
    @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';
  /**
   * @property {string | null} tituloMensaje
   * @description Título del mensaje que se muestra en el wizard.
   * Inicializado con el valor de `TITULOMENSAJE`.
   */

  tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description Lista de pasos del wizard.
   * Inicializado con el valor de `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  
    TEXTOS: string = AVISO.Aviso;

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
      if (e.accion === 'cont') {
          let isValid = true;
    
            if (this.indice === 1 && this.pasoUnoComponent) {
            isValid = this.pasoUnoComponent.validarPasoUno();
          }
          if(!this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor()){
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
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
          }
          if (!isValid) {
            this.esFormaValido = true;
            this.datosPasos.indice = this.indice;
            return;
          }
          this.esFormaValido = false;
          this.postGuardarDatos(e);
        }else{
          this.indice = e.valor;
          this.datosPasos.indice = this.indice;
          this.wizardComponent.atras();
        }
  }

    postGuardarDatos(e: AccionBoton): void {
            // Calcular el nuevo índice basado en la acción
            let indiceActualizado = e.valor;
            if (e.accion === 'cont') {
              indiceActualizado = e.valor;
            }
            if (indiceActualizado > 0 && indiceActualizado < 5) {
              this.indice = indiceActualizado;
              this.datosPasos.indice = indiceActualizado;
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
  obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return this.pasos[1].titulo;
      case 3:
        return this.pasos[2].titulo;
      default:
        return TITULOMENSAJE;
    }
  }
}
