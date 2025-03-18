import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generar-dictamen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generar-dictamen.component.html',
  styleUrl: './generar-dictamen.component.scss',
})
export class GenerarDictamenComponent {
  formDictamen: FormGroup = this.fb.group({
    sentidoDictamen: ['', [Validators.required]],
    justificacionDictamen:['', [Validators.required]]

});

constructor(private fb: FormBuilder,
) {}

}
