
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import radioOptionsData from '../../../../../assets/json/220401/tipo-de-certifico.json'
/**
 * DatosDelComponent es un componente que maneja la selección de opciones de radio y muestra otros componentes basados en la selección.
 */
@Component({
  selector: 'app-datos-del',
  templateUrl: './datos-del.component.html',
  standalone: true,
  styleUrl: './datos-del.component.scss',
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent
  ]
})
export class DatosDelComponent implements OnInit {
   /** Grupo de formulario para manejar la selección de radio */
  formGroup!: FormGroup;
  /** Opciones de radio cargadas desde un archivo JSON */
  radioOptions = radioOptionsData; // Use imported JSON data
  /** Valor seleccionado actualmente */
  selectedValue: string | number = 'option1'; // Update the type to string | number

  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      seleccion: [this.selectedValue]
    });

  }
   /**
   * Maneja el evento de cambio de valor y actualiza el valor seleccionado.
   * @param newValue - El nuevo valor seleccionado.
   */
  onValueChange(newValue: string | number): void {
    console.log('Selected Value:', newValue);
    this.selectedValue = newValue;
    
  }
   /** Declaración de la propiedad `form` */
  form!: FormGroup; // Declare the `form` property
}
