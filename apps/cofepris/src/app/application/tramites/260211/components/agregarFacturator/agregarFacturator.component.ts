import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-facturator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agregarFacturator.component.html',
  styleUrl: './agregarFacturator.component.css',
})
export class AgregarFacturatorComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
    } else {
      console.log('Form is invalid');
    }
  }



}
