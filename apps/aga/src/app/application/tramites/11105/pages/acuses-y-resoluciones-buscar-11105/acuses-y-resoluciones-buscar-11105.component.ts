import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AcusesYResoluionesFolioDelTramiteBuscarComponent,
  InputFecha,
  InputFechaComponent,
  
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
// export const FECHA_INICIO = {
//   labelNombre: 'Fecha inicial',
//   required: true,
//   habilitado: true,
// };

// export const FECHA_FINAL = {
//   labelNombre: 'Fecha final',
//   required: true,
//   habilitado: true,
// };

@Component({
  selector: 'acuses-y-resoluciones-buscar-11105',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputFechaComponent,AcusesYResoluionesFolioDelTramiteBuscarComponent],
  templateUrl: './acuses-y-resoluciones-buscar-11105.component.html',
  styleUrl: './acuses-y-resoluciones-buscar-11105.component.scss',
})
export class AcusesYResolucionesBuscar11105Component {
  // public FormBusqueda!: FormGroup;
  // public fechaInicioInput: InputFecha = FECHA_INICIO;
  // public fechaFinalInput: InputFecha = FECHA_FINAL;
  // public router!: Router;

  public constructor(protected readonly formBuilder: FormBuilder) {
    //this.FormBusqueda = this.inicializaFormulario();
  }

  /**
   * Método para crear el formulario y sus campos
   * @returns Un form group con los campos necesarios
   */
  // private inicializaFormulario(): FormGroup {
  //   const CAMPOS_FOMULARIO = {
  //     folio: [],
  //     fechaInicial: [],
  //     fechaFinal: [],
  //   };
  //   return this.formBuilder.group(CAMPOS_FOMULARIO);
  // }

 
  
}
