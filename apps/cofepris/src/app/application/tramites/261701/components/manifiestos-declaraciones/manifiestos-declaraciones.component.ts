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
  templateUrl: './manifiestosDeclaraciones.component.html',
  styleUrl: './manifiestosDeclaraciones.component.scss',
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
    public CancelacionPeticionState!: CancelacionPeticion261701State;

      
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
  // eslint-disable-next-line no-empty-function
  ) {}

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
          this.CancelacionPeticionState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * compo doc
   * @method establecerValor
   * @description
   * Este método se utiliza para establecer el estado del checkbox "manifiestos"
   * basado en el valor almacenado en el estado `CancelacionPeticionState`.
   * 
   * @returns {void}
   * @memberof ManifiestosDeclaracionesComponent
   */
  establecerValor(): void {
    const CHECKBOX_ELEMENT = document.getElementById('manifiestos');
    if (CHECKBOX_ELEMENT) {
      (CHECKBOX_ELEMENT as HTMLInputElement).checked = this.CancelacionPeticionState['manifiestos'];
    }
  }

  /**
   * compo doc
   * @method ngAfterViewInit
   * @description
   * Este gancho se ejecuta después de que la vista del componente ha sido inicializada.
   * En este método se agrega un evento de escucha al checkbox "manifiestos" para 
   * actualizar dinámicamente su estado y almacenar el valor correspondiente en 
   * el store del trámite 261701. Además, se establece el valor inicial del checkbox 
   * según el estado actual.
   * 
   * @memberof ManifiestosDeclaracionesComponent
   * @returns {void}
   */
  ngAfterViewInit(): void {
    const CHECKBOX_ELEMENT = document.getElementById('manifiestos');
    if (CHECKBOX_ELEMENT) {
      CHECKBOX_ELEMENT.addEventListener('click', () => {
        this.manifiestosCheckboxChecked = (CHECKBOX_ELEMENT as HTMLInputElement).checked;
        this.tramite261701Store.establecerDatos('manifiestos', this.manifiestosCheckboxChecked);
      });
    }
    this.establecerValor();
  }

  /**
   * @method ngOnDestroy
   * @description Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   * @memberof ManifiestosDeclaracionesComponent
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
