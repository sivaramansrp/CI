import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CancelacionPeticion261701State, Tramite261701Store } from '../../estados/store/tramite261701.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Tramite261701Query } from '../../estados/query/tramite261701.query';

/**
 * ManifiestosDeclaracionesComponent es un componente que permite gestionar los manifiestos
 * y declaraciones, mostrando alertas y títulos relacionados con el proceso en el contexto de trámites.
 * 
 * @component
 */
@Component({
  selector: 'manifiestos-declaraciones',
  templateUrl: './manifiestos-declaraciones.component.html',
  styleUrl: './manifiestos-declaraciones.component.scss',
})
export class ManifiestosDeclaracionesComponent implements OnInit, AfterViewInit, OnDestroy{

  /**
   * Obtiene el mensaje de alerta para los manifiestos.
   */
  private getManifiestosAlert = ManifiestosDeclaracionesComponent.getManifiestosAlert;

/** compo doc
 * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
 *
 * @type {string}
 * @memberof ManifiestosDeclaracionesComponent
 */
  public manifiestosAlert: string = this.getManifiestosAlert().message;
  
  /**
   * compo doc
   * Subject para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * compo doc
   * Indica si el checkbox "manifiestos" está marcado o no.
   * Esta variable se utiliza para rastrear dinámicamente el estado del checkbox
   * y puede actualizarse en función de la interacción del usuario.
   * 
   * @type {boolean}
   * @memberof ManifiestosDeclaracionesComponent
   */
  public manifiestosCheckboxChecked: boolean = false;

  /**
   * compo doc
   * Estado de la solicitud de la sección 261701.
   * @type {CancelacionPeticion261701State}
   * @memberof ManifiestosDeclaracionesComponent
   */
    public cancelacionPeticionState!: CancelacionPeticion261701State;

  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 
      
  /**
 * compo doc
 * @constructor
 * Inicializa una nueva instancia del componente `ManifiestosDeclaracionesComponent`.
 * 
 * @param tramite261701Store Servicio encargado de gestionar el estado dinámico asociado al trámite 261701.
 * @param tramite261701Query Consulta que facilita la obtención de datos específicos del estado del trámite 261701.
 */
  constructor(
    private tramite261701Store: Tramite261701Store,
    private tramite261701Query: Tramite261701Query,
    private consultaioQuery: ConsultaioQuery, 
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe()
}

  /**
  * compo doc
  * @method ngOnInit
  * @description 
  * /**
    El gancho ngOnInit se llama para inicializar el formulario
  * @memberof ManifiestosDeclaracionesComponent
  * @returns {void}
  */
  
  ngOnInit(): void {
    this.tramite261701Query.select$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.cancelacionPeticionState = seccionState;
        })
      )
      .subscribe();

    if(this.esFormularioSoloLectura){
      this.manifiestosAlert = this.getManifiestosAlert(true).message;
    }
  }

  /**
   * Genera el HTML para el mensaje de manifiestos con la opción de habilitar o deshabilitar el checkbox
   */
  static getManifiestosAlert(disabled: boolean = false): { message: string } {
    return {
      message: `
        <div class="row">
          <div class="col-md-2 d-flex justify-content-center align-items-center">
            <form>
              <label>
                <input type="checkbox" id="manifiestos" name="manifiestos" required ${disabled ? 'disabled' : ''}>
                <span class="ml-5" style="color: #31708f;">*</span>
              </label>
            </form>
          </div>
          <div class="col-md-10">
            <p>Cumplo con los requisitos y la normatividad aplicable, sin que ello me exima de que la autoridad sanitaria verifique su cumplimiento, esto sin perjuicio de las sanciones en las que pueda incurrir por falsedad de declaraciones dadas a una autoridad. Asimismo, acepto que la notificación de este trámite sea a través de la Ventanilla Única de Comercio Exterior por los mecanismos de la misma.</p>
          </div>
        </div>
        `
    };
  }

  /**
   * compo doc
   * @method establecerValor
   * @description
   * Este método se utiliza para establecer el estado del checkbox "manifiestos"
   * basado en el valor almacenado en el estado `cancelacionPeticionState`.
   * 
   * @returns {void}
   * @memberof ManifiestosDeclaracionesComponent
   */
  establecerValor(): void {
    const CHECKBOX_ELEMENT = document.getElementById('manifiestos');
    if (CHECKBOX_ELEMENT) {
      (CHECKBOX_ELEMENT as HTMLInputElement).checked = this.cancelacionPeticionState['manifiestos'];
    }
  }

  /**
   * @method ngAfterViewInit
   * @description
   * Este método se ejecuta después de que la vista del componente ha sido inicializada.
   * - Agrega un evento de escucha al checkbox "manifiestos" para rastrear los clics.
   * - Actualiza dinámicamente el estado del checkbox y almacena el valor en el store.
   * - Establece el valor inicial del checkbox según el estado actual.
   * 
   * @memberof ManifiestosDeclaracionesComponent
   * @returns {void}
   */
  ngAfterViewInit(): void {
    const ELEMENTO_CHECKBOX = document.getElementById('manifiestos');
    if (ELEMENTO_CHECKBOX) {
      // Definir el manejador del evento
      const MANEJADOR_CLICK = () => {
        this.manifiestosCheckboxChecked = (ELEMENTO_CHECKBOX as HTMLInputElement).checked;
        this.tramite261701Store.establecerDatos('manifiestos', this.manifiestosCheckboxChecked);
      };

      // Agregar el evento de escucha al checkbox
      ELEMENTO_CHECKBOX.addEventListener('click', MANEJADOR_CLICK);

      // Almacenar el manejador en el elemento para eliminarlo posteriormente
      (ELEMENTO_CHECKBOX as HTMLElement & { __manejadorClick?: EventListener }).__manejadorClick = MANEJADOR_CLICK;
    }
    this.establecerValor();
  }

  /**
   * @method ngOnDestroy
   * @description
   * Este método se ejecuta cuando el componente se destruye.
   * - Elimina el evento de escucha del checkbox "manifiestos" para evitar fugas de memoria.
   * - Notifica la destrucción del componente a través del Subject `destroyNotifier$`.
   * 
   * @memberof ManifiestosDeclaracionesComponent
   * @returns {void}
   */
  ngOnDestroy(): void {
    const ELEMENTO_CHECKBOX = document.getElementById('manifiestos');
    if (ELEMENTO_CHECKBOX && (ELEMENTO_CHECKBOX as HTMLElement & { __manejadorClick?: EventListener }).__manejadorClick) {
      // Eliminar el evento de escucha del checkbox
      ELEMENTO_CHECKBOX.removeEventListener('click', (ELEMENTO_CHECKBOX as HTMLElement & { __manejadorClick?: EventListener }).__manejadorClick!);
    }
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
