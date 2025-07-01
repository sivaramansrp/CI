/**
 * Componente encargado de gestionar los datos del destinatario.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL,REGEX_SOLO_DIGITOS } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';


/**
 * Componente encargado de gestionar los datos del destinatario.
 */
@Component({
  selector: 'app-datos-del-destinatario',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './datos-del-destinatario.component.html',
  styleUrl: './datos-del-destinatario.component.scss',
})
/**
 * Componente encargado de gestionar los datos del destinatario.
 */
export class DatosDelDestinatarioComponent implements OnInit, OnDestroy {
  /**
   * Representa el formulario del componente.
   * Se espera que esta propiedad sea de tipo 'FormGroup'.
   *
   * @property {FormGroup} datosDelDestinatarioForm - El formulario del componente.
   */
  datosDelDestinatarioForm!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido,
   * permitiendo la desuscripción de observables.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();
  
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente DetallesDelDestinatarioComponent.
   * 
   * @param {FormBuilder} fb - El servicio FormBuilder proporcionado por Angular.
   * @param {Tramite110209Store} tramite110209Store - El store del trámite 110209.
   * @param {Tramite110209Query} tramite110209Query - La consulta del trámite 110209.
   * @example
   * const form = new FormGroup();
   * @public
   */
  constructor(private fb: FormBuilder, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query, private consultaQuery: ConsultaioQuery) {
    this.crearFormulario();
     /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - La suscripción se cancela automáticamente cuando `destroyed$` emite un valor (para evitar fugas de memoria).
    * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
    */
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.actualizarEstadoCampos();
        })
      )
      .subscribe();
      
  }

  /**
   * Crea el formulario del componente.
   */
  crearFormulario(): void {
    this.datosDelDestinatarioForm = this.fb.group({
      nombre: ['' , [Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(25)]],
      primerApellido: ['', [Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(20)]],
      segundoApellido: ['', [Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(20)]],
      numeroDeRegistroFiscal: ['' , [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(30)]],
      razonSocial: ['', [Validators.pattern(REGEX_NO_ESPACIOS_AL_INICIO_NI_AL_FINAL),Validators.maxLength(70)]],
    });
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Crea el formulario del componente.
   */
  ngOnInit(): void {
    this.getValoresStore();
  }

  /**
   * Habilita o deshabilita dinámicamente los campos del formulario
   * según el estado de solo lectura del formulario.
   *
   * @returns void
   * @description Si el formulario está en modo solo lectura, deshabilita ambos campos; de lo contrario, los habilita.
   */
  actualizarEstadoCampos(): void {
    const CAMPOS = [
      'nombre',
      'primerApellido',
      'segundoApellido',
      'numeroDeRegistroFiscal',
      'razonSocial'
    ];
    CAMPOS.forEach(campo => {
      const CONTROL = this.datosDelDestinatarioForm.get(campo);
      if (CONTROL) {
        if (this.esFormularioSoloLectura) {
          CONTROL.disable();
        } else {
          CONTROL.enable();
        }
      }
    });
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110209Query.selectTramite110209$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.datosDelDestinatarioForm.patchValue({
            nombre: seccionState.nombre,
            primerApellido: seccionState.primerApellido,
            segundoApellido: seccionState.segundoApellido,
            numeroDeRegistroFiscal: seccionState.numeroDeRegistroFiscal,
            razonSocial: seccionState.razonSocial,
          });
        })
      )
      .subscribe();
  }

   /**
     * Establece el valor en Tramite110209Store para el campo especificado del formulario.
     * 
     * @param {FormGroup} form - El grupo de formularios que contiene el campo.
     * @param {string} campo - El nombre del campo a obtener y guardar en el store.
     * @returns {void}
     */
    setValoresStore(form: FormGroup, campo: string): void {
      const VALOR = form.get(campo)?.value;
      this.tramite110209Store.setTramite110209({ [campo]: VALOR });
    }
    /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}