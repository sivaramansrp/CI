import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_DEL_PERSONAL } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_ADMINISTRACION, CONFIGURACION_PROCEDIMIENTO, CONFIGURACION_VERIFICACION } from '../../constants/seguridad-del-personal.enum';

@Component({
  selector: 'app-seguridad-del-personal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-del-personal.component.html',
  styleUrl: './seguridad-del-personal.component.scss',
})
export class SeguridadDelPersonalComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD_DEL_PERSONAL;
  public forma: FormGroup = new FormGroup({
    antecedentesLaboralesFormGroup: new FormGroup({}),
    procedimientoFormGroup: new FormGroup({}),
    administracionFormGroup: new FormGroup({}),
  });
  public antecedentesLaboralesDatos = CONFIGURACION_VERIFICACION;
  public procedimientoDatos = CONFIGURACION_PROCEDIMIENTO;
  public administracionDatos = CONFIGURACION_ADMINISTRACION;


  constructor() {}

  ngOnInit(): void {}


  get antecedentesLaboralesFormGroup(): FormGroup {
    return this.forma.get('antecedentesLaboralesFormGroup') as FormGroup;
  }
  get procedimientoFormGroup(): FormGroup {
    return this.forma.get('procedimientoFormGroup') as FormGroup;
  }
  get administracionFormGroup(): FormGroup {
    return this.forma.get('administracionFormGroup') as FormGroup;
  }
}
