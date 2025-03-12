import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlDar, AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
  ],
  templateUrl: './datosDeLa.component.html',
  styleUrl: './datosDeLa.component.css',
})
export class DatosDeLaComponent implements OnInit{

  constructor(private readonly fb: FormBuilder){}

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;
  
  /**
   * Indica si la sección es colapsable.
   * @property {boolean} colapsable
   */
  colapsable: boolean = true;

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   * 
   * @type {Importante}
   * @memberof RegistroParaLaComponent
   */
  public TEXTOS = AlDar;

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @method mostrar_colapsable
   */
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }

  ngOnInit(){
    this.forma = this.fb.group({
      rfcDel: [{ value: '', disabled: true }],
      denominacion: [{ value: '', disabled: true }, Validators.required],
      correo: [{ value: '', disabled: true }, Validators.required],
    });
  }
  toggleFormControls() {
    Object.keys(this.forma.controls).forEach(controlName => {
      const control = this.forma.get(controlName);
      if (control?.disabled) {
        control.enable();
      }
    });
  }
}
