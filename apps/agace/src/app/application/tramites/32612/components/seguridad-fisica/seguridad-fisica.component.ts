import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD } from '../../constants/texto-estatico.enum';
import { CONFIGURACION, CONFIGURACION_ACCESOS, CONFIGURACION_ALUMBRADO, CONFIGURACION_DISPOSITIVOS, CONFIGURACION_ESTACIONAMIENTOS, CONFIGURACION_PERIMETRALES, CONFIGURACION_SISTEMAS } from '../../constants/seguridad-fisica.enum';

@Component({
  selector: 'app-seguridad-fisica',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-fisica.component.html',
  styleUrl: './seguridad-fisica.component.scss',
})
export class SeguridadFisicaComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD;
  public forma: FormGroup = new FormGroup({
    instalacionesFormGroup: new FormGroup({}),
    accesosFormGroup: new FormGroup({}),
    perimetralesFormGroup: new FormGroup({}),
    estacionamientosFormGroup: new FormGroup({}),
    dispositivosFormGroup: new FormGroup({}),
    alumbradoFormGroup: new FormGroup({}),
    sistemasFormGroup: new FormGroup({}),
  });
  public instalacionesDatos = CONFIGURACION;
  public accesosDatos = CONFIGURACION_ACCESOS;
  public perimetralesDatos = CONFIGURACION_PERIMETRALES;
  public estacionamientosDatos = CONFIGURACION_ESTACIONAMIENTOS;
  public dispositivosDatos = CONFIGURACION_DISPOSITIVOS;
  public alumbradoDatos = CONFIGURACION_ALUMBRADO;
  public sistemasDatos = CONFIGURACION_SISTEMAS;

  constructor() {}

  ngOnInit(): void {

  }

  get instalacionesFormGroup(): FormGroup {
    return this.forma.get('instalacionesFormGroup') as FormGroup;
  }
  get accesosFormGroup(): FormGroup {
    return this.forma.get('accesosFormGroup') as FormGroup;
  }
  get perimetralesFormGroup(): FormGroup {
    return this.forma.get('perimetralesFormGroup') as FormGroup;
  }
  get estacionamientosFormGroup(): FormGroup {
    return this.forma.get('estacionamientosFormGroup') as FormGroup;
  }
  get dispositivosFormGroup(): FormGroup {
    return this.forma.get('dispositivosFormGroup') as FormGroup;
  }
  get alumbradoFormGroup(): FormGroup {
    return this.forma.get('alumbradoFormGroup') as FormGroup;
  }
  get sistemasFormGroup(): FormGroup {
    return this.forma.get('sistemasFormGroup') as FormGroup;
  }


}
