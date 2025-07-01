/**
 * Este componente maneja el formulario de transporte.
 */

import { Catalogo, ConsultaioQuery } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component'; 
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { TransporteService } from '../../services/transporte/transporte.service';

/**
 * Este componente maneja el formulario de transporte.
 */


@Component({
  selector: 'app-transporte',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  templateUrl: './transporte.component.html',
  styleUrl: './transporte.component.scss',
})
export class TransporteComponent implements OnInit, OnDestroy {

  /**
   * Formulario para el registro de transporte.
   * @type {FormGroup}
   */
  transporteForm!: FormGroup;

  /**
   * Opciones de medio de transporte.
   * @type {Catalogo[]}
   */
  medioDeTransporteOptions: Catalogo[] = [];

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
   * Indica si el formulario ha sido cargado correctamente con los datos del servicio.
   * Se utiliza para mostrar u ocultar elementos en la interfaz según el estado de carga.
   * @type {boolean}
   */
  formularioCargado: boolean = false;

  /**
   * Constructor del componente.
   * Servicio para la creación de formularios reactivos y para obtener datos de transporte.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {TransporteService} service - Servicio para obtener datos de transporte.
   * @param {Tramite110209Store} tramite110209Store - Servicio para manejar el estado del trámite.
   * @param {Tramite110209Query} tramite110209Query - Servicio para consultar el estado del trámite.
   */
  constructor(private fb: FormBuilder, private service: TransporteService, private tramite110209Store: Tramite110209Store, private tramite110209Query: Tramite110209Query, private consultaQuery: ConsultaioQuery) {
    this.transporteForm = this.fb.group({
      medioDeTransporte: ['',Validators.required],
      rutaCompleta: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)],
      puertoDeEmbarque: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)],
      puertoDeDesembarque: ['',Validators.pattern(/^(?!\s)(.*\S)?$/)]
    });

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
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene las opciones de medio de transporte y los valores del store.
   */
  ngOnInit(): void {
    this.getMedioDeTransporte();
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
      'medioDeTransporte',
      'rutaCompleta',
      'puertoDeEmbarque',
      'puertoDeDesembarque'
    ];
    CAMPOS.forEach(campo => {
      const CONTROL = this.transporteForm.get(campo);
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
   * Obtiene las opciones de medio de transporte desde el servicio.
   */
  getMedioDeTransporte(): void {
    this.service.getMedioDeTransporte().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.medioDeTransporteOptions = data;
        this.formularioCargado = true;
      }
    );
  }

  /**
   * Establece los valores en el store.
   * @param {FormGroup} form - El formulario del cual se obtienen los valores.
   * @param {string} campo - El nombre del campo del formulario.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    // Obtiene el valor del campo especificado en el formulario
    const VALOR = form.get(campo)?.value;
    // Actualiza el store con el nuevo valor para el campo correspondiente
    this.tramite110209Store.setTramite110209({ [campo]: VALOR });
  }

  /**
   * Obtiene los valores del store y los asigna al formulario.
   */
  getValoresStore(): void {
    this.tramite110209Query.selectTramite110209$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.transporteForm.patchValue({
            medioDeTransporte: seccionState.medioDeTransporte,
            rutaCompleta: seccionState.rutaCompleta,
            puertoDeEmbarque: seccionState.puertoDeEmbarque,
            puertoDeDesembarque: seccionState.puertoDeDesembarque
          });
        })
      )
      .subscribe();
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