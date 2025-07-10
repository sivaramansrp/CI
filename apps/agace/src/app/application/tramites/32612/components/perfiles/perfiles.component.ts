import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRadioComponent, TituloComponent } from "@libs/shared/data-access-user/src";
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION_DATOS } from '../../constants/perfiles.enum';

@Component({
  selector: 'app-perfiles',
  standalone: true,
  imports: [
    CommonModule, 
    TituloComponent,
    FormasDinamicasComponent,
    InputRadioComponent,
    ReactiveFormsModule
  ],
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.scss',
})
export class PerfilesComponent implements OnInit {


  public opcionDeBotonDeRadio = [
    {
      "label": "Si",
      "value": "Si"
    },
    {
      "label": "No",
      "value": "No"
    }
  ]

  public forma: FormGroup = new FormGroup({
    certificacionesFormGroup: new FormGroup({}),
  });
  public certificacionesDatos = CONFIGURACION_DATOS;


  constructor() {

  }

  ngOnInit() {

  }

  get certificacionesFormGroup(): FormGroup {
    return this.forma.get('certificacionesFormGroup') as FormGroup;
  }


}
