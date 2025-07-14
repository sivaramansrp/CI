import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTOS_ESTATICOS_SEGURIDAD_INFORMACION } from '../../constants/texto-estatico.enum';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { CONFIGURACION, CONFIGURACION_ENTREGAS, CONFIGURACION_IDENTIFICACION } from '../../constants/controles-de-acceso.enum';

@Component({
  selector: 'app-controles-de-acceso',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './controles-de-acceso.component.html',
  styleUrl: './controles-de-acceso.component.scss',
})
export class ControlesDeAccesoComponent implements OnInit {

 public textos = TEXTOS_ESTATICOS_SEGURIDAD_INFORMACION;
  public forma: FormGroup = new FormGroup({
    personalFormGroup: new FormGroup({}),
    identificacionFormGroup: new FormGroup({}),
    entregasFormGroup: new FormGroup({}),
  });
  public personalDatos = CONFIGURACION;
  public identificacionDatos = CONFIGURACION_IDENTIFICACION;
  public entregasDatos = CONFIGURACION_ENTREGAS; 

  constructor() { }

  ngOnInit(): void {}

  get personalFormGroup(): FormGroup {
    return this.forma.get('personalFormGroup') as FormGroup;
  }
  get identificacionFormGroup(): FormGroup {
    return this.forma.get('identificacionFormGroup') as FormGroup;
  }

  get entregasFormGroup(): FormGroup {
    return this.forma.get('entregasFormGroup') as FormGroup;
  }

}
