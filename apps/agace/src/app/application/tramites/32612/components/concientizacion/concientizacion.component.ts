import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_CONCIENTIZACION } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_CAPACITACION, CONFIGURACION_CAPACITACIONDOS } from '../../constants/concientizacion.enum';

@Component({
  selector: 'app-concientizacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './concientizacion.component.html',
  styleUrl: './concientizacion.component.scss',
})
export class ConcientizacionComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_CONCIENTIZACION;
  public forma: FormGroup = new FormGroup({
    capacitacionFormGroup: new FormGroup({}),
    capacitacionDosFormGroup: new FormGroup({})
  });

  public capacitacionDatos = CONFIGURACION_CAPACITACION;
  public capacitacionDatosDos = CONFIGURACION_CAPACITACIONDOS;

  constructor() {}

  ngOnInit(): void {}

  get capacitacionFormGroup(): FormGroup {
    return this.forma.get('capacitacionFormGroup') as FormGroup;
  }
  get capacitacionDosFormGroup(): FormGroup {
    return this.forma.get('capacitacionDosFormGroup') as FormGroup;
  }
}
