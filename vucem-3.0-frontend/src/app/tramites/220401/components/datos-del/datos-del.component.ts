/* eslint-disable sort-imports */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import radioOptionsData from '../../../../../assets/json/220401/radioButton.json'
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
  formGroup!: FormGroup;
  radioOptions = radioOptionsData; // Use imported JSON data
  selectedValue = 'option1';
  constructor(private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      seleccion: [this.selectedValue]
    });

  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange(newValue: any) {
    console.log('Selected Value:', newValue);
    this.selectedValue = newValue;
  }
  form!: FormGroup; // Declare the `form` property
}
