import { ANEXAR, REQUISITOS } from '@libs/shared/data-access-user/src/core/enums/constantes-alertas.enum';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { PANTA_PASOS, PASO_DOS, PASO_TRES, PASO_UNO } from '../../services/certificados-licencias-permisos.enum';
import { Subject, takeUntil } from 'rxjs';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/301/servicios-pantallas.model';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosService } from '@libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src/core/models/forma-render.model';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
/**
 * PasoUnoComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-todospasos',
  templateUrl: './todospasos.component.html',
})
export class TodospasosComponent implements OnDestroy {

  /**
* Esta variable se utiliza para almacenar la lista de pasos.
*/
 pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 /**
  * Esta variable se utiliza para almacenar el índice del paso.
  */
 indice: number = 1;

/**
 * Representa el título del paso actual en el proceso.
 * El valor se inicializa como `PASO_UNO`, que probablemente
 * corresponde al primer paso en un flujo de trabajo de múltiples pasos.
 */
 titulo: string = PASO_UNO;

   /**
    * Notificador para destruir observables activos.
    */
   private destroyed$ = new Subject<void>();


   /**
   * Esta variable se utiliza para almacenar el componente wizard.
   * @param wizardComponent - El componente wizard.
   */
   @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

   /**
    * Esta variable se utiliza para almacenar los datos de los pasos.
    * @param datosPasos - Los datos de los pasos.
    * @param nroPasos - El número de pasos.
    * @param indice - El índice.
    * @param txtBtnAnt - El texto del botón anterior.
    * @param txtBtnSig - El texto del botón siguiente.
    */

  /**
   * Represents the data for the steps in the process.
   * 
   * @property {number} nroPasos - The number of steps.
   * @property {number} indice - The current index of the step.
   * @property {string} txtBtnAnt - The text for the "Previous" button.
   * @property {string} txtBtnSig - The text for the "Continue" button.
   */
   public datosPasos: DatosPasos = {
     nroPasos: this.pantallasPasos.length,
     indice: this.indice,
     txtBtnAnt: 'Anterior',
     txtBtnSig: 'Continuar',
   };

  /**
   * Una propiedad pública que contiene el texto de los requisitos para la aplicación.
   * Se inicializa con el valor de la constante `REQUISITOS`.
   */
   public TEXTOS = REQUISITOS;

  /**
   * Una propiedad pública que contiene el texto de los ANEXAR para la aplicación.
   * Se inicializa con el valor de la constante `ANEXAR`.
   */
   public TEXTOS2 = ANEXAR;
/**
 * Un array de objetos Catalogo que representa el catálogo de documentos.
 * Este array está inicialmente vacío y puede ser poblado con instancias de Catalogo.
 */
  public catalogoDocumentos: Catalogo[] = [];

  constructor(private catalogosServices: CatalogosService) {
//
  }


   /**
   * Este método se utiliza para inicializar el componente.
   */
   public getValorIndice(e: AccionBoton) {
    this.getHeaderDatos();
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Actualiza la propiedad `titulo` en función del valor actual de `indice`.
   * 
   * El método utiliza una declaración `switch` para determinar el valor apropiado
   * de `titulo` según los siguientes casos:
   * - `indice` igual a 1: Establece `titulo` como `PASO_DOS`.
   * - `indice` igual a 2: Establece `titulo` como `PASO_TRES`.
   * - Caso por defecto: Establece `titulo` como `PASO_UNO`.
   */
  public getHeaderDatos() {
    switch (this.indice) {
      case 1: {
        this.titulo = PASO_DOS;
        break;
      }
      case 2: {
        this.titulo = PASO_TRES;
        break;
      }
      default: {
        this.titulo = PASO_UNO;
        break;
      }
    }
  }

   /**
   * Obtiene el catálogo de tipos de documentos del servicio de catálogos.
   * 
   * Este método recupera el catálogo de tipos de documentos identificado por 
   * `CATALOGOS_ID.CAT_TIPO_DOCUMENTO` del `catalogosServices`. 
   * Si la respuesta contiene algún elemento, los asigna a `catalogoDocumentos`.
   * 
   * @returns {void}
   */
   public getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyed$)).subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => { 
          //
        },
      });
  }

    /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }

}
