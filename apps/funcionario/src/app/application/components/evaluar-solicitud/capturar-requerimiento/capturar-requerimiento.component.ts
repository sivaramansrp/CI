import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import data  from '../../../../../../../../libs/shared/theme/assets/json/funcionario/cat-tipo-requerimiento.json';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-capturar-requerimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './capturar-requerimiento.component.html',
  styleUrl: './capturar-requerimiento.component.scss',
})
export class CapturarRequerimientoComponent {

 /**
   * Catálogo de tipo de requerimiento
   */
 catTipoRequerimiento!: Catalogo[];

  ngOnInit(): void {
    this.catTipoRequerimiento = data;
  }

  formRequerimiento: FormGroup = this.fb.group({
    tipoRequerimiento: ['', [Validators.required]],
    justificacionReq: ['', [Validators.required]]

  });

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
  ) { }

  /**
   * Método para establecer el tipo de requerimiento seleccionado
   */

  tipoRequerimientoSeleccionado() {
    this.toastr.success('Tipo de requerimiento seleccionado');
  }
  
}
