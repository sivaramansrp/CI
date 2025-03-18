import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-generar-dictamen',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './generar-dictamen.component.html',
  styleUrl: './generar-dictamen.component.scss',
})
export class GenerarDictamenComponent {
  
constructor(private fb: FormBuilder
) {}

  formDictamen: FormGroup = this.fb.group({
  sentidoDictamen: ['', [Validators.required]],
  justificacionDictamen:['', [Validators.required]]
  });

}
