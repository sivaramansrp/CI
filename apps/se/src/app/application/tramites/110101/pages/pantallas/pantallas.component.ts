/* eslint-disable sort-imports */
import { Component, ViewChild } from '@angular/core';
import { PANTAPASOS } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';

/**
 * **Interfaz que representa una acción de un botón en la interfaz**  
 * 
 * Define la estructura de datos para gestionar las acciones ejecutadas  
 * al interactuar con botones en la aplicación.  
 */
interface AccionBoton {
  /** 
   * **Tipo de acción que realizará el botón**  
   * Especifica la acción asociada al botón cuando el usuario lo presiona.  
   * Puede ser valores como `'guardar'`, `'cancelar'`, `'eliminar'`, `'continuar'`, etc.  
   */
  accion: string;

  /** 
   * **Valor numérico asociado a la acción del botón**  
   * Representa un identificador que proporciona contexto a la acción.  
   * Puede indicar el índice de un paso en un asistente, un ID de elemento,  
   * o cualquier otro valor numérico relevante para la lógica de la aplicación.  
   */
  valor: number;
}


/**
 * Este componente se utiliza para mostrar los pasos del asistente - 110101
 * Lista de pasos
 * Índice del paso
 */

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
})
export class PantallasComponent {

  /**
   * **Lista de pasos del asistente (wizard)**  
   *
   * - Almacena la lista de pasos que conforman el flujo del asistente.  
   * - `ListaPasosWizard[]`: Define el tipo de datos como una lista de pasos del wizard.  
   * - Se inicializa con el valor de `PANTAPASOS`, que contiene la configuración de los pasos.  
   */
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;

  /**
   * **Índice del paso actual en el asistente (wizard)**  
   *
   * - Almacena el número del paso en el que se encuentra el usuario dentro del flujo.  
   * - Se inicializa en `1`, lo que indica que el asistente comienza en el primer paso.  
   */
  indice: number = 1;


  /**
  * **Lista de pasos del asistente (wizard)**  
  *
  * - Contiene la secuencia de pasos que conforman el flujo del asistente.  
  * - `ListaPasosWizard[]`: Define el tipo de datos como una lista de pasos del wizard.  
  * - Se inicializa con `PASOS`, que almacena la configuración de los pasos.  
  */
  pasos: ListaPasosWizard[] = PASOS;



  /**
  * **Referencia al componente del asistente (wizard)**  
  *
  * - `@ViewChild` permite acceder a la instancia del `WizardComponent` en el template.  
  * - Se usa para controlar y manipular el asistente de manera programática.  
  * - `!:` indica que la variable se inicializará después de que la vista se haya renderizado.  
  */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;


  /**
   * **Datos de configuración para el asistente (wizard)**  
   *
   * - `nroPasos`: Número total de pasos en el asistente, obtenido de la longitud de `pasos`.  
   * - `indice`: Paso actual en el que se encuentra el usuario.  
   * - `txtBtnAnt`: Texto para el botón de navegación hacia atrás ('Anterior').  
   * - `txtBtnSig`: Texto para el botón de navegación hacia adelante ('Continuar').  
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Total de pasos en el asistente.
    indice: this.indice, // Paso actual del asistente.
    txtBtnAnt: 'Anterior', // Texto del botón de retroceso.
    txtBtnSig: 'Continuar', // Texto del botón de avance.
  };


  /**
   * **Actualiza el índice del paso y navega en el asistente**  
   *
   * - Verifica que el valor recibido esté dentro del rango permitido (entre 1 y 4).  
   * - Si es válido, actualiza el índice (`this.indice`) con el nuevo valor.  
   * - Si la acción (`e.accion`) es `'cont'`, avanza al siguiente paso en el asistente.  
   * - Si la acción no es `'cont'`, retrocede al paso anterior.  
   *
   * @param {AccionBoton} e - Objeto con la acción y el valor del nuevo índice.  
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente(); // Avanza al siguiente paso.
      } else {
        this.wizardComponent.atras(); // Retrocede al paso anterior.
      }
    }
  }



}
