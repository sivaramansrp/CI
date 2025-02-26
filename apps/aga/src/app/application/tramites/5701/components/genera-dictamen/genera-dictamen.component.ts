import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'genera-dictamen',
  templateUrl: './genera-dictamen.component.html',
  styleUrl: './genera-dictamen.component.scss'
})
export class GeneraDictamenComponent {
  formDictamen: FormGroup = this.fb.group({
      sentidoDictamen: ['', [Validators.required]],
      justificacionDictamen:['', [Validators.required]]

  });

  constructor(private fb: FormBuilder,
  ) {}
}
