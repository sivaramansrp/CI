import { Component } from '@angular/core';
import { TituloComponent } from '../../../../../shared/components/titulo/titulo.component';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../../shared/components/input-radio/input-radio.component';
import radioOptionsData from '../../../../../../assets/json/220401/radioButton.json'; // Adjust the path if needed
@Component({
  selector: 'app-datos-del',
  templateUrl: './datos-del.component.html',
  standalone: true,
  styleUrl: './datos-del.component.scss',
  imports:[
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent
  ]
})
export class DatosDelComponent {
  // radioOptions = [
  //   { label: 'Animal', value: 'A' },
  //   { label: 'Option B', value: 'B' },
  //   { label: 'Option C', value: 'C' }
  // ];
  radioOptions = radioOptionsData; // Use imported JSON data
  selectedValue = 'option1';
  onValueChange(newValue: any) {
    console.log('Selected Value:', newValue);
    this.selectedValue = newValue;
  }
  form!: FormGroup; // Declare the `form` property
}
