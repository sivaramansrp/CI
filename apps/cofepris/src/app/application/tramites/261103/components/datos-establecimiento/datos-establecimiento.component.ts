import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
   * Constructor de la clase `DatosestablecimientoComponent`.
   * 
   * @param fb - Servicio `FormBuilder` utilizado para crear formularios reactivos.
   * @param store - Servicio `DatosProcedureStore` que gestiona el estado de los datos del procedimiento.
   * @param query - Servicio `DatosProcedureQuery` que permite realizar consultas sobre el estado del procedimiento.
   */
  constructor(private fb: FormBuilder,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,
  ) {
    // Constructor del componente
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
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
      });
    this.crearFormulario();
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
}
