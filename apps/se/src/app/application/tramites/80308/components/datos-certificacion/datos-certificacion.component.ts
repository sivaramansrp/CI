import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-datos-certificacion',
  templateUrl: './datos-certificacion.component.html',
  styleUrl: './datos-certificacion.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule,TituloComponent ]
})
export class DatosCertificacionComponent {
  certificionForm!: FormGroup;

  constructor( private fb: FormBuilder) {
    this.certificionForm = this.fb.group({
      certificion: [{value: 'Si', disabled: true}]
    })
  }

}
