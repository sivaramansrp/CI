import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosProcedureQuery } from '../../estados/datos-solicitude.query';
import { DatosProcedureStore } from '../../estados/datos-solicitude.store';
import { FormBuilder } from '@angular/forms';
// import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';



@Component({
  selector: 'app-datosestablecimiento',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './datosestablecimiento.component.html',
  styleUrl: './datosestablecimiento.component.css',
})
export class DatosestablecimientoComponent implements OnInit{
    /**
   * Formulario reactivo para datos preoperativos.
   */
    datosdelestablecimiento!: FormGroup;
      /** Subject para notificar la destrucción del componente */
      private destroy$ = new Subject<void>();
    constructor(private fb: FormBuilder,
       private store: DatosProcedureStore,
          private query: DatosProcedureQuery,
    ) {
      this.datosdelestablecimiento = this.fb.group({
        Denominacion:['']
      });
    }

  ngOnInit(): void {
    this.query.selectProrroga$?.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('data', data);

        this.datosdelestablecimiento?.patchValue({
          Denominacion: data.prorrogaData.Denominacion,
        });
      });
  }
      /**
 * Establecer valores en DatosProcedureStore
   */
  setValoresStore(): void {
    this.store.setDenominacion(this.datosdelestablecimiento.get('Denominacion')?.value);
  }
}
