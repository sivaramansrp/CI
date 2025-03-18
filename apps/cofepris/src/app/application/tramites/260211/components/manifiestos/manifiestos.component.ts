import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { MensajeDeAlerta } from '../../enum/manifiestos.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manifiestos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    ReactiveFormsModule
  ],
  templateUrl: './manifiestos.component.html',
  styleUrl: './manifiestos.component.css',
})
export class ManifiestosComponent {

  public mensaje:string = MensajeDeAlerta

   constructor(private readonly fb: FormBuilder){}
  
    /**
     * Grupo de formularios principal.
     * @property {FormGroup} manifiestos
     */
    manifiestos!: FormGroup;
}
