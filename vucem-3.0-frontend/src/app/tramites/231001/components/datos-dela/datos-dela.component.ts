/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-dela',
  templateUrl: './datos-dela.component.html',
  styleUrl: './datos-dela.component.scss',
})
export class DatosDelaComponent {
comboAutorizacionIMMEX: any[] = [];

  solicitudForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.solicitudForm = this.fb.group({
      datosdelForm: this.fb.group({
        numeroRegistroAmbiental: ['', Validators.required],
        descripcionGenerica1: ['', Validators.required],
        numeroProgramaImmex: ['', Validators.required],
   
      })
    });
  }
  
  isInvalid(id: string): boolean | null {
    const control = this.solicitudForm.get('datosdelForm').get(id);
    return control?.invalid && control?.touched;
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      console.log('Form Submitted!', this.solicitudForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
  
}
