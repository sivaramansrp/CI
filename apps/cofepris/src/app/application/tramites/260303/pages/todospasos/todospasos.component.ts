import { ANEXAR, REQUISITOS } from '@libs/shared/data-access-user/src/core/enums/constantes-alertas.enum';
import { Component, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent, AnexarDocumentosComponent, BtnContinuarComponent, PasoFirmaComponent, PasoCargaDocumentoComponent } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS, PASO_DOS, PASO_TRES, PASO_UNO } from '../../services/certificados-licencias-permisos.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { PasoCuatroComponent } from '../paso-cuatro/paso-cuatro.component';

import { Subject, takeUntil } from 'rxjs';
import { AccionBoton } from '@libs/shared/data-access-user/src/core/models/301/servicios-pantallas.model';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosService } from '@libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { DatosPasos } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src/core/models/forma-render.model';
import { WizardComponent } from '@libs/shared/data-access-user/src/tramites/components/wizard/wizard.component';
import { Solicitud260303State } from '../../../../estados/tramites/260303/tramite260303.store';
/**
 * PasoUnoComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-todospasos',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    BtnContinuarComponent,
    PasoUnoComponent,
    WizardComponent,
    PasoFirmaComponent,
    PasoCargaDocumentoComponent
  ],
  templateUrl: './todospasos.component.html',
})
export class TodospasosComponent implements OnDestroy {

  /**
    * Evento que se emite para cargar archivos.
    * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
    */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Estado de la solicitud actual.
   */
  solicitudState!: Solicitud260303State;
  /**
* Identificador numérico de la solicitud actual.
* Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
*/
  idSolicitud: number = 0;

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
* Indica si el botón para cargar archivos está habilitado.
*/
  activarBotonCargaArchivos: boolean = false;
  /**
* Indica si la sección de carga de documentos está activa.
* Se inicializa en true para mostrar la sección de carga de documentos al inicio.
*/
  seccionCargarDocumentos: boolean = true;
  /**
 * Indica si la carga de documentos está en progreso.
 * Se inicializa en true para indicar que la carga está en progreso al inicio.
 */
  cargaEnProgreso: boolean = true;


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
  public getValorIndice(e: AccionBoton): void {
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
  public getHeaderDatos(): void {
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
 * Emite un evento para cargar archivos.
 * {void} No retorna ningún valor.
 */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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
 *  Método para manejar el evento de carga en progreso.
 * @param carga Indica si la carga está en progreso.
 */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
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
