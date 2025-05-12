import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-generar-dictamen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generar-dictamen.component.html',
  styleUrl: './generar-dictamen.component.scss',
})
export class GenerarDictamenComponent {
  
constructor(private fb: FormBuilder
) {
    // do nothing.
}
  formDictamen: FormGroup = this.fb.group({
  sentidoDictamen: ['', [Validators.required]],
  justificacionDictamen:['', [Validators.required]]
  });
}
