import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_DE_PROCESOS } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_COMMUNICACION, CONFIGURACION_PROCESOS } from '../../constants/seguridad-de-procesos.enum';

@Component({
  selector: 'app-seguridad-de-procesos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-de-procesos.component.html',
  styleUrl: './seguridad-de-procesos.component.scss',
})
export class SeguridadDeProcesosComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD_DE_PROCESOS;
  public forma: FormGroup = new FormGroup({
    procesamientoFormGroup: new FormGroup({}),
    comunicacionFormGroup: new FormGroup({}),
  });
  public procesamientoDatos = CONFIGURACION_PROCESOS;
  public comunicacionDatos = CONFIGURACION_COMMUNICACION;

  constructor() { }

  ngOnInit(): void {}

  get procesamientoFormGroup(): FormGroup {
    return this.forma.get('procesamientoFormGroup') as FormGroup;
  }
  get comunicacionFormGroup(): FormGroup {
    return this.forma.get('comunicacionFormGroup') as FormGroup;
  }

}
