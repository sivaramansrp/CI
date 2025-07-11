import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';


@Component({
  selector: 'app-almacen-general',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,InputRadioComponent],
  templateUrl: './almacen-general.component.html',
  styleUrl: './almacen-general.component.scss',
})
export class AlmacenGeneralComponent {
  almacenGeneralForm : FormGroup;

  constructor(private fb: FormBuilder) {
    this.almacenGeneralForm = this.fb.group({
      // Define your form controls and their initial values here
    });
  }
}
