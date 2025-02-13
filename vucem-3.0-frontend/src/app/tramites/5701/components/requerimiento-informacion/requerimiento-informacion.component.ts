import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

@Component({
  selector: 'requerimiento-informacion',
  templateUrl: './requerimiento-informacion.component.html',
  styleUrl: './requerimiento-informacion.component.scss'
})
export class RequerimientoInformacionComponent {
  /**
   * Catálogo de tipo de requerimiento
   */
  catTipoRequerimiento : Catalogo[]= [
    {
      id: 1,
      descripcion: "Documento y datos"

    },
    {
      id: 2,
      descripcion: "Otros"

    }
  ]
  

  formRequerimiento: FormGroup = this.fb.group({
        tipoRequerimiento: ['', [Validators.required]],
        justificacionReq:['', [Validators.required]]

  });

  constructor(private fb: FormBuilder,
      private toastr: ToastrService,
  ) {}

  /**
   * Método para establecer el tipo de requerimiento seleccionado
   */

  tipoRequerimientoSeleccionado(){
    this.toastr.success('Tipo de requerimiento seleccionado');
  }

}
