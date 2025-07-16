import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'seguridad-de-procesos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent,
    TituloComponent
  ],
  templateUrl: './seguridad-de-procesos.component.html',
  styleUrls: ['./seguridad-de-procesos.component.scss'],
})
export class SeguridadDeProcesosComponent {

  public seguridadDeProcesosForm: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
  }); 
}
