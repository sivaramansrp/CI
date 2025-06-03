import {
  AL_DAR,
  AlertComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud260215State,
  Tramite260215Store,
} from '../../estados/tramites/tramite260215.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DomicilioComponent } from '../domicilio-establecimiento/domicilio-establecimiento.component';
import { ManifiestosComponent } from '../manifiestos-declaraciones/manifiestos-declaraciones.component';
import { RepresentanteLegalComponent } from '../representante-legal/representante-legal.component';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

/**
 * Componente responsable de gestionar y mostrar los datos principales del formulario,
 * incluyendo domicilio, manifiestos y representante legal.
 */
@Component({
  selector: 'app-datos-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    DomicilioComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent,
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosDeLaComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb
   * @param tramite260215Store
   * @param tramite260215Query
   */


   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  public esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor de la clase `DatosSolicitudComponent`.
   *
   * @param fb Instancia de `FormBuilder` utilizada para la creación y gestión de formularios reactivos.
   * @param tramite260215Store Servicio para la gestión del estado relacionado con el trámite 260215.
   * @param tramite260215Query Servicio para consultar el estado del trámite 260215.
   * @param consultaioQuery Servicio para consultar el estado de la sección `Consultaio`.
   *
   * Al inicializar el componente, se suscribe al estado de `Consultaio` para:
   * - Actualizar la propiedad `esFormularioSoloLectura` según el estado recibido.
   * - Llamar al método `inicializarEstadoFormulario()` para aplicar configuraciones adicionales.
   * - Cancelar automáticamente la suscripción cuando se emite un valor en `destroyNotifier$`, evitando fugas de memoria.
   */
  constructor(
    public readonly fb: FormBuilder,
    private tramite260215Store: Tramite260215Store,
    private tramite260215Query: Tramite260215Query,
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
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
  }

 /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.forma.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.forma.enable();
      }
  }


  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }  
  }

/**
 * Inicializa el formulario reactivo para la solicitud del trámite 260215.
 * 
 * - Se suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
 *   y lo asigna a la propiedad `solicitudState`.
 * - Crea el formulario (`forma`) utilizando `FormBuilder`, estableciendo los valores iniciales
 *   de los campos a partir de `solicitudState` y deshabilitándolos.
 * - Los campos `denominacion` y `correo` son requeridos.
 * 
 * @remarks
 * La suscripción al observable se gestiona con `takeUntil` para evitar fugas de memoria.
 */
 inicializarFormulario(): void {
    this.tramite260215Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.forma = this.fb.group({
      rfcDel: [{ value: this.solicitudState?.rfcDel, disabled: true }],
      denominacion: [
        { value: this.solicitudState?.denominacion, disabled: true },
        Validators.required,
      ],
      correo: [
        { value: this.solicitudState?.correo, disabled: true },
        Validators.required,
      ],
    });
  }
  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
 public forma!: FormGroup;

  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
 public colapsable: boolean = true;

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   *
   * @type {Importante}
   * @memberof RegistroParaLaComponent
   */
  public TEXTOS = AL_DAR;

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable():void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Método que se llama cuando se inicializa el componente
   * */
  ngOnInit():void {
   this.inicializarEstadoFormulario()
  }

  /**
   * Método que se llama cuando se envía el formulario.
   */
  alternarControlesDeFormulario():void {
    Object.keys(this.forma.controls).forEach((controlName) => {
      const CONTROL = this.forma.get(controlName);
      if (CONTROL?.disabled) {
        CONTROL.enable();
      }
    });
  }
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260215Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.tramite260215Store[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
