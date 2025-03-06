import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-autorizar-dictamen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './autorizar-dictamen.component.html',
  styleUrl: './autorizar-dictamen.component.css',
})
export class AutorizarDictamenComponent {
  
  public FormBusqueda!: FormGroup;

  public readonly tareasPendientesList = [
    {
      tbodyData: ['--','--','--','--','--'],
    }
  ];

  public constructor(
    protected readonly formBuilder: FormBuilder,
  ) {
    this.FormBusqueda = this.inicializaFormulario();
  }

  /**
   * Método para crear el formulario y sus campos
   * @returns Un form group con los campos necesarios
   */
  private inicializaFormulario(): FormGroup {
    const camposFomulario = {
      folio: [],
      //fechaInicial: [],
      //fechaFinal: [],
    };
    return this.formBuilder.group(camposFomulario);
  }

}
