import { Component, OnDestroy, OnInit } from '@angular/core';
import {DatosDomicilioLegalState, DatosDomicilioLegalStore,} from '../../estados/stores/datos-domicilio-legal.store';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators,} from '@angular/forms';
import { InputRadioComponent,TituloComponent,} from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import CumplimientoOptions from '@libs/shared/theme/assets/json/260501/cumplimiento-options.json';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { MANIFIESTOS_DECLARACION } from '../../constantes/aviso-de-funcionamiento.enum';
import { MENSAJE_DE_ALERTA } from '../../constantes/datos-domicilio-legal.enum';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';

/**
 * @description
 * Componente principal para gestionar el formulario de manifiestos y declaraciones.
 * Este componente permite capturar y validar datos relacionados con el cumplimiento
 * de manifiestos y declaraciones en el sistema.
 */
@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
  ],
  templateUrl: './manifiestos-declaraciones.component.html',
  styleUrl: './manifiestos-declaraciones.component.scss',
})
export class ManifiestosComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Mensaje de alerta que se muestra en el componente.
   */
  public mensaje = MENSAJE_DE_ALERTA.message;

  mensajeManifiestos: string = '';

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @description
   * Opciones de cumplimiento cargadas desde un archivo JSON.
   */
  cumplimientoOptions = CumplimientoOptions;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @description
   * Grupo de formularios para capturar los datos de manifiestos.
   */
  isUpdateDatos: boolean = false;

  /**
   * @description
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param DatosDomicilioLegalStore Store para gestionar el estado del domicilio legal.
   * @param DatosDomicilioLegalQuery Query para obtener datos del estado del domicilio legal.
   */
  constructor(
    private fb: FormBuilder,
    private DatosDomicilioLegalStore: DatosDomicilioLegalStore,
    private DatosDomicilioLegalQuery: DatosDomicilioLegalQuery,
    private consultaioQuery: ConsultaioQuery,
    private servicioDeFormularioService: ServicioDeFormularioService,
  ) {
    //Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * @description
   * Grupo de formularios principal para capturar los datos de manifiestos.
   */
  manifiestos!: FormGroup;

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y sus valores iniciales basados en el estado de la solicitud.
   */
  ngOnInit(): void {

    /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `configurarGrupoForm()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.isUpdateDatos = seccionState.update;
        })
      )
      .subscribe()
      this.configurarGrupoForm(); // Configura el formulario reactivo.
  }

  /**
   * @method configurarGrupoForm
   * @description Configura el formulario reactivo para los manifiestos, estableciendo los controles necesarios
   * y asignando valores iniciales desde el estado de la solicitud.
   */
  configurarGrupoForm(): void {
    this.mensajeManifiestos = MANIFIESTOS_DECLARACION.MANIFIESTOS;
    this.DatosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

  this.manifiestos = this.fb.group({
    mensaje: [this.solicitudState?.mensaje, Validators.required],
    cumplimiento: [this.solicitudState?.cumplimiento, Validators.required],
  });

   /*
     * Si el formulario está en modo solo lectura, deshabilita todos los campos.
     * En caso contrario, habilita los campos para permitir la edición.
     * Esto asegura que el formulario refleje correctamente el estado de solo lectura.
     */
    if (this.esFormularioSoloLectura && this.manifiestos ) {
      this.manifiestos.disable();
    } else {
      this.manifiestos.enable();
    }

    this.servicioDeFormularioService.registerForm('manifiestosForm', this.manifiestos);
    this.servicioDeFormularioService.formTouched$.subscribe((formName) => {
      if (formName === 'manifiestosForm') {
        this.manifiestos.markAllAsTouched();
      }
    })
}
  /**
   * @description
   * Método que actualiza el estado del store con los valores del formulario.
   * @param form Formulario reactivo que contiene los datos.
   * @param campo Nombre del campo del formulario que se desea actualizar.
   * @param metodoNombre Nombre del método del store que se invocará.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DatosDomicilioLegalStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.DatosDomicilioLegalStore[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);

    this.servicioDeFormularioService.setFormValue('manifiestosForm', {
        [campo]: VALOR,
      });
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}