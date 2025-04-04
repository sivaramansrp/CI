import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RetirosCofepris261702State, Tramite261702Store } from '../../../../estados/tramites/tramite261702.store';
import { Subject, Subscription, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PERMISO_A_DESISTIR } from '../../constantes/retiros-cofepris.enum';
import { Tramite261702Query } from '../../../../estados/queries/tramite261702.query';

/**
 * @Component Decorador
 * 
 * Este decorador se utiliza para definir los metadatos del componente Angular.
 * Especifica el selector, la plantilla, los estilos y otras configuraciones para el componente.
 * 
 * Propiedades:
 * - `selector`: La etiqueta HTML personalizada utilizada para incluir este componente en las plantillas.
 * - `standalone`: Indica que este componente es un componente independiente y no pertenece a ningún NgModule.
 * - `imports`: Especifica los módulos y componentes de los que depende este componente.
 * - `templateUrl`: La ruta al archivo de plantilla HTML para este componente.
 * - `styleUrl`: La ruta al archivo SCSS que contiene los estilos para este componente.
 */
@Component({
  selector: 'permiso-desistir',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './permisoDesistir.component.html',
  styleUrl: './permisoDesistir.component.scss',
})
export class PermisoDesistirComponent implements OnInit, OnDestroy {

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof PermisoDesistirComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  });

   /**
  * Subject para destruir las suscripciones.
  */
   private destruirNotificador$: Subject<void> = new Subject();

   /**
   * Suscripción a los cambios en el formulario reactivo.
   */
   public subscription: Subscription = new Subscription();
 
   /**
   * Estado de la solicitud de la sección 301.
   * @type {RetirosCofepris261702State}
   * @memberof PermisoDesistirComponent
   */
   public retirosState!: RetirosCofepris261702State;

    /**
   * compo doc
   * @constructor
   * Inicializa una nueva instancia del componente `PermisoDesistirComponent`.
   * 
   * @param tramite261702Store Servicio encargado de gestionar el estado dinámico asociado al trámite 261702.
   * @param tramite261702Query Consulta que facilita la obtención de datos específicos del estado del trámite 261702.
   */
  constructor(
    private tramite261702Store: Tramite261702Store,
    private tramite261702Query: Tramite261702Query
  ) {}
    
  /**
   * compo doc
   * Constantes importadas desde el archivo de enumeración que contienen textos clave y mensajes de advertencia
   * utilizados en el contexto de los trámites relacionados con permisos a desistir.
   * @memberof PermisoDesistirComponent
   */
  public permisoDesistirFormData = PERMISO_A_DESISTIR;

  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * @method ngOnInit
   * @description
   * El gancho `ngOnInit` se llama al inicializar el componente. Este método realiza las siguientes acciones:
   * - Se suscribe al observable `selectRetiros$` para obtener el estado de los retiros y lo asigna a la propiedad `retirosState`.
   * - Escucha los cambios en los valores del formulario reactivo `forma` y actualiza el store dinámico con los valores cambiados.
   * @memberof PermisoDesistirComponent
   * @returns {void}
   */
  ngOnInit(): void {
    this.subscription.add(
      this.tramite261702Query.selectRetiros$
        .pipe(
          takeUntil(this.destruirNotificador$),
          map((seccionState) => {
            this.retirosState = seccionState;
          })
        )
        .subscribe()
    );

    this.forma.valueChanges.subscribe((value: {ninoFormGroup: Record<string, unknown>}) => {
      Object.entries(value.ninoFormGroup).forEach(([key, fieldValue]) => {
        this.changeInValoresStore(key, fieldValue);
      });
    });
  }

  /**
  * compo doc
  * @method changeInValoresStore
  * @description 
  * Este método se utiliza para emitir un evento cuando hay un cambio en los valores del formulario.
  * Recibe como parámetros el formulario preactivo (FormGroup) y el campo que ha cambiado.
  * Luego, emite un objeto con esta información utilizando el EventEmitter `emitirValorCambiado`.
  * @param form - El formulario reactivo que contiene los datos.
  * @param campo - El nombre del campo que ha cambiado.
  */
  public changeInValoresStore(campo: string, value: unknown): void {
    this.tramite261702Store.setDynamicFieldValue(campo, value);
  }

  /**
  * Se ejecuta al destruir el componente.
  * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
  */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
    }
  
}
