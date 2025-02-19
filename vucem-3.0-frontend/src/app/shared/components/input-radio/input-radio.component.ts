
import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


/**
 * InputRadioComponent es un componente reutilizable que renderiza un grupo de botones de radio.
 * Soporta diseños verticales y horizontales y puede configurarse para ser un campo requerido.
 */
@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.scss'
})
export class InputRadioComponent implements OnInit {
  @Input() gap: string = '10px'; // Default spacing
 /** Grupo de formulario para los botones de radio */
  FormInputRadio!: FormGroup;
    /**
   * Array de opciones de radio, cada una con una etiqueta y un valor.
    */
  @Input() radioOptions: { label: string; value: string | number }[] = [];
   /**
   * El valor actualmente seleccionado.
   * @example 'option1'
   */
  @Input() selectedValue: string | number | null = null;
  /**
   * Indica si los botones de radio son requeridos.
   * @default false
   */
  @Input() isRequired: boolean=false;
   /**
   * Diseño de los botones de radio, ya sea 'vertical' u 'horizontal'.
   * @default 'vertical'
   */
  @Input() layout: 'vertical' | 'horizontal' = 'vertical'; 
  /**
   * Evento emitido cuando el valor seleccionado cambia.
   */
  @Output() valueChange = new EventEmitter<string | number>();
  constructor(private fb: FormBuilder) {
    //constructor
   }

  ngOnInit() {
    this.createFormRadio();

  }
   /**
   * Crea el grupo de formulario para los botones de radio con los validadores apropiados.
   */
  createFormRadio() {
    const validators = this.isRequired ? [Validators.required] : [];
    this.FormInputRadio = this.fb.group({
      seleccion: [this.selectedValue || '', validators]
    });
  }
  /**
   * Maneja el evento de cambio de selección y emite el nuevo valor.
   * @param value - El nuevo valor seleccionado.
   */
  onSelectionChange(value: string | number) {
    this.selectedValue = value;
    this.valueChange.emit(value);
  }
}
