import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CancelacionPeticion261701State, Tramite261701Store } from '../../estados/store/tramite261701.store';
import { Subject, map, takeUntil } from 'rxjs';
import { MANIFIESTOS_ALERT } from '../../constantes/cancelacion-peticion.enum';
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
/** compo doc
 * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
 *
 * @type {string}
 * @memberof ManifiestosDeclaracionesComponent
 */
  public manifiestosAlert: string = MANIFIESTOS_ALERT.message;
  
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
 * compo doc
 * @constructor
 * Inicializa una nueva instancia del componente `ManifiestosDeclaracionesComponent`.
 * 
 * @param tramite261701Store Servicio encargado de gestionar el estado dinámico asociado al trámite 261701.
 * @param tramite261701Query Consulta que facilita la obtención de datos específicos del estado del trámite 261701.
 */
  constructor(
    private tramite261701Store: Tramite261701Store,
    private tramite261701Query: Tramite261701Query 
  ) {
    // Constructor vacio
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
      (ELEMENTO_CHECKBOX as any).__manejadorClick = MANEJADOR_CLICK;
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
    if (ELEMENTO_CHECKBOX && (ELEMENTO_CHECKBOX as any).__manejadorClick) {
      // Eliminar el evento de escucha del checkbox
      ELEMENTO_CHECKBOX.removeEventListener('click', (ELEMENTO_CHECKBOX as any).__manejadorClick);
    }
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
