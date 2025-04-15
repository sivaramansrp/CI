import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureState } from '../../../../estados/tramites/tramites261101.store';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
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
  templateUrl: './datosestablecimiento.component.html',
  styleUrl: './datosestablecimiento.component.css',
})
export class DatosestablecimientoComponent implements OnInit, OnDestroy {
  /**
 * Formulario reactivo para datos preoperativos.
 */
  datosdelestablecimiento!: FormGroup;
  /** Subject para notificar la destrucción del componente */
  private destroy$ = new Subject<void>();
  private seccionState!: DatosProcedureState;

  constructor(private fb: FormBuilder,
    private store: DatosProcedureStore,
    private query: DatosProcedureQuery,
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data: DatosProcedureState) => {
        this.seccionState = data;
      });
    this.crearFormulario();
  }

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
