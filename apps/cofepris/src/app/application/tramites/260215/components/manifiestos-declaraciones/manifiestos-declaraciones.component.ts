import {
  AlertComponent,
  InputRadioComponent,
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
import CumplimientoOptions from '@libs/shared/theme/assets/json/260215/cumplimiento-options.json';
import { MENSAJE_DE_ALERTA } from '../../enum/permiso.enum';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';

/**
 * Componente principal para gestionar el formulario de manifiestos.
 */
@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule,
    InputRadioComponent,
  ],
  templateUrl: './manifiestos-declaraciones.component.html',
  styleUrl: './manifiestos-declaraciones.component.css',
})
export class ManifiestosComponent implements OnInit, OnDestroy {
  /**
   * Mensaje de alerta.
   */
  public mensaje: string = MENSAJE_DE_ALERTA;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud260215State;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Opciones disponibles para el cumplimiento, basadas en el enumerado `CumplimientoOptions`.
   * Estas opciones se utilizan para definir los posibles estados o tipos de cumplimiento
   * dentro del componente de manifiestos y declaraciones.
   */
 public cumplimientoOptions = CumplimientoOptions;

  
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
 public esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * @param fb
   * @param tramite260215Store
   * @param tramite260215Query
   */
  constructor(
    private fb: FormBuilder,
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
          this.manifiestos.disable();
        } else if (!this.esFormularioSoloLectura) {
          this.manifiestos.enable();
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
   * Inicializa el formulario de manifiestos y declaraciones.
   *
   * Este método suscribe al observable `selectSolicitud$` para obtener el estado actual de la solicitud
   * y lo asigna a la propiedad `solicitudState`. Posteriormente, crea un formulario reactivo (`manifiestos`)
   * utilizando `FormBuilder`, inicializando el campo `cumplimiento` con el valor correspondiente del estado
   * de la solicitud y aplicando la validación requerida.
   *
   * @remarks
   * La suscripción se gestiona con `takeUntil` para evitar fugas de memoria al destruir el componente.
   */
   inicializarFormulario(): void {
        this.tramite260215Query.selectSolicitud$
          .pipe(
            takeUntil(this.destroyNotifier$),
            map((seccionState) => {
              this.solicitudState = seccionState;
            })
          )
          .subscribe()
           this.manifiestos = this.fb.group({
            mensaje: [Validators.required],
            cumplimiento: [this.solicitudState?.cumplimiento, Validators.required],
          });
    }
  /**
   * Grupo de formularios principal.
   * @property {FormGroup} manifiestos
   */
public manifiestos!: FormGroup;

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario()
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
