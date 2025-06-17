import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261103.store';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datosestablecimiento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TituloComponent],
  templateUrl: './datos-establecimiento.component.html',
  styleUrl: './datos-establecimiento.component.scss',
})
export class DatosestablecimientoComponent implements OnInit, OnDestroy {
  /**
 * Formulario reactivo para datos preoperativos.
 */
  datosdelestablecimiento!: FormGroup;
  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();
  /**
 * Variable que almacena el estado de la sección actual del procedimiento.
 * Se utiliza para gestionar y acceder a los datos relacionados con el estado
 * del procedimiento en curso.
 */
  private seccionState!: DatosProcedureState;
    /**
   * Subject para notificar la destrucción del componente.
   */
    private destroyNotifier$: Subject<void> = new Subject();

    /**
    * Indica si el formulario está en modo solo lectura.
    * Cuando es `true`, los campos del formulario no se pueden editar.
    */
    esFormularioSoloLectura: boolean = false;
  /**
   * Constructor de la clase `DatosestablecimientoComponent`.
   * 
   * @param fb - Servicio `FormBuilder` utilizado para crear formularios reactivos.
   * @param store - Servicio `DatosProcedureStore` que gestiona el estado de los datos del procedimiento.
   * @param query - Servicio `DatosProcedureQuery` que permite realizar consultas sobre el estado del procedimiento.
   */
  constructor(private fb: FormBuilder,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    // Constructor del componente
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
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

    /**
   * Gancho de ciclo de vida `OnInit`.
   * 
   * Este método se ejecuta al inicializar el componente. Realiza las siguientes acciones:
   * - Se suscribe al observable `selectProrroga$` del servicio `DatosProcedureQuery` para obtener
   *   el estado actual del procedimiento y lo asigna a la variable `seccionState`.
   * - Llama al método `crearFormulario` para inicializar el formulario reactivo con los datos
   *   obtenidos del estado actual.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
 * Método para inicializar el formulario reactivo de datos del establecimiento.
 * Este formulario se utiliza para gestionar los datos relacionados con la denominación
 * del establecimiento, obteniendo su valor inicial desde el estado actual de la sección.
 * 
 * El formulario se crea utilizando el FormBuilder y contiene un único campo:
 * - `denominacion`: Representa la denominación del establecimiento, cuyo valor inicial
 *   se obtiene de la propiedad `denominacion` del estado de la sección (`seccionState`).
 */
  crearFormulario(): void {
    this.query.selectProrroga$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.seccionState = seccionState;
      })
    )
    this.datosdelestablecimiento = this.fb.group({
      denominacion: [this.seccionState
        ?.denominacion]
    });
  }
  /**
    * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
    * @param form - El formulario reactivo.
    * @param campo - El nombre del campo en el formulario.
    */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALOR = form.get(campo)?.value;
    this.store.establecerDatos({ [campo]: VALOR });
  }

  /**
* Gancho de ciclo de vida OnDestroy
*/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
/**
 * Inicializa el estado del formulario.
 * 
 * Este método evalúa si el formulario debe ser inicializado en modo solo lectura o en modo editable.
 * 
 * 1. Si el formulario está en modo solo lectura (`esFormularioSoloLectura`):
 *    - Llama al método `guardarDatosFormulario` para cargar los datos y deshabilitar el formulario.
 * 
 * 2. Si el formulario no está en modo solo lectura:
 *    - Llama al método `crearFormulario` para inicializar el formulario reactivo.
 * 
 * 3. Se suscribe al observable `selectProrroga$` del servicio `DatosProcedureQuery` para obtener
 *    el estado actual del procedimiento y lo asigna a la variable `seccionState`.
 * 
 * Este método es útil para configurar el estado inicial del formulario y sincronizarlo
 * con los datos del estado global de la aplicación.
 * 
 * @returns {void}
 */
inicializarEstadoFormulario(): void {
  if (this.esFormularioSoloLectura) {
    this.guardarDatosFormulario();
  } else {
    this.crearFormulario();
  }
  this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
    .subscribe((data: DatosProcedureState) => {
      this.seccionState = data;
    });
}
  
/**
 * Carga los datos del formulario y actualiza su estado.
 * 
 * Este método realiza las siguientes acciones:
 * 
 * 1. Llama al método `crearFormulario` para inicializar el formulario reactivo con los datos obtenidos.
 * 2. Evalúa si el formulario está en modo solo lectura (`esFormularioSoloLectura`):
 *    - Si está en modo solo lectura, deshabilita el formulario utilizando el método `disable`.
 *    - Si no está en modo solo lectura, habilita el formulario utilizando el método `enable`.
 * 
 * Este método es útil para sincronizar los datos del formulario con el estado global de la aplicación
 * y configurar su estado (habilitado o deshabilitado) según corresponda.
 * 
 * @returns {void}
 */
guardarDatosFormulario(): void {
  this.crearFormulario();
  if (this.esFormularioSoloLectura) {
    this.datosdelestablecimiento.disable();
  } else {
    this.datosdelestablecimiento.enable();
  }
}
}
