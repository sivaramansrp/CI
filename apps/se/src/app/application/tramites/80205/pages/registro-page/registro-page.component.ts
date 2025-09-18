
import { Component,OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AVISO } from '@ng-mf/data-access-user';
import { AmpliacionServiciosQuery } from '../../estados/tramite80205.query';


import { DatosPasos } from '@ng-mf/data-access-user';
import {ERROR_FORMA_ALERT} from '../../models/datos-info.model';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';

import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz que representa una acción asociada a un botón.
 * 
 * @property {string} accion - Nombre o descripción de la acción que realiza el botón.
 * @property {number} valor - Valor asociado a la acción, que puede ser utilizado para identificar o parametrizar la acción.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @fileoverview Componente principal para el formulario de certificado zoosanitario.
 * Este componente gestiona el flujo del formulario a través de un asistente (wizard),
 * controlando la navegación entre los pasos y la información mostrada en cada uno.
 * @component RegistroPageComponent --80205
 * @selector app-registro-page
 * @templateUrl ./registro-page.component.html
 */
@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
})
export class RegistroPageComponent implements OnDestroy {

  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos - Lista de los pasos del asistente, incluyendo título y componente asociado.
   */
  pasos: ListaPasosWizard[] = PASOS;
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string | null = 'Registro de solicitud IMMEX modalidad ampliación servicios ';

  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent - Referencia al componente Wizard para controlar la navegación.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice actual del paso.
   * @property {number} indice - Índice del paso actual en el que se encuentra el usuario.
   */
  indice: number = 1;

   /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
   @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

   /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
   public formErrorAlert = ERROR_FORMA_ALERT;


  /**
     * Constante que almacena el valor de la nota de privacidad.
     * 
     * @constant AVISO_PRIVACIDAD_ADJUNTAR - Almacena el valor definido en `NOTA.AVISO_PRIVACIDAD_ADJUNTAR`.
     * Se utiliza para adjuntar o gestionar el aviso de privacidad dentro del sistema.
     */
      AVISO_PRIVACIDAD_ADJUNTAR = AVISO.Aviso;

      /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = false;

  /**
   * Datos para la configuración de los botones del asistente.
   * @property {DatosPasos} datosPasos - Configuración para los botones "Anterior" y "Siguiente".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito - Mensaje que se muestra si el primer paso se completa con éxito.
   */
  mensajeDeTextoDeExito: string = "MENSAJE_DE_ÉXITO_ETAPA_UNO";

  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción (cont/atras) y el valor (índice) del botón.
   */
  constructor(private tramiteQuery: AmpliacionServiciosQuery, private seccion: SeccionLibStore, 
  ){
    this.tramiteQuery.FormaValida$.pipe(takeUntil(this.destroyNotifier$)).subscribe(res => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([true]);
    })
  }
  /**
   * Maneja el cambio de índice basado en el valor y la acción proporcionados.
   * 
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción a realizar.
   *   - `valor`: Número que representa el índice. Debe estar entre 1 y 4 (exclusivo).
   *   - `accion`: Cadena que indica la acción a realizar ('cont' para avanzar, cualquier otro valor para retroceder).
   * 
   * Si el valor está dentro del rango permitido, actualiza el índice y realiza la acción correspondiente
   * en el componente del asistente (`wizardComponent`).
   */
  getValorIndice(e: AccionBoton): void {
    if(e.accion==='cont'){
      let isValid=true;
      if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarTodosLosFormularios();
      }
      if (!isValid) {
        this.esFormaValido = true;
  
        this.datosPasos.indice = this.indice;
        return;
      }
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
   * Obtiene el título para cada página según el índice.
   * @method obtenerNombreDelTítulo
   * @param {number} valor - El índice de la página.
   * @returns {string} - El título correspondiente.
   */
   

  /**
   * Cambia el título del mensaje según la pestaña seleccionada.
   * @method enTabChange
   * @param {number} selectedTab - El índice de la pestaña seleccionada.
   */
  enTabChange(selectedTab: number): void {
    switch (selectedTab) {
      case 1:
        this.tituloMensaje = 'Registro de solicitud IMMEX modalidad ampliación servicios';
        break;
      case 2:
        this.tituloMensaje =
          'Registro de solicitud IMMEX modalidad ampliación servicios';
        break;
      default:
        this.tituloMensaje = 'Registro de solicitud IMMEX modalidad ampliación servicios';
        break;
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente se destruye.
   * Emite un valor en el observable `destroyNotifier$` para notificar a los suscriptores
   * que deben limpiar recursos o cancelar suscripciones, y luego completa el observable.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}