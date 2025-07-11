import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTOS_ESTATICOS_PLANEACION } from '../../constants/texto-estatico.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION, CONFIGURACION_POLITICAS } from '../../constants/analisis-riesgo-forma.enum';

@Component({
  selector: 'app-planeacion',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './planeacion.component.html',
  styleUrl: './planeacion.component.scss',
})
export class PlaneacionComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_PLANEACION;
  public forma: FormGroup = new FormGroup({
    analisisDeRiesgoFormGroup: new FormGroup({}),
    politicasFormGroup: new FormGroup({}),
  });
  public analisisDeRiesgoDatos = CONFIGURACION;
  public politicasDatos = CONFIGURACION_POLITICAS;

  constructor() {

  }

  ngOnInit() {

  }

  get analisisDeRiesgoFormGroup(): FormGroup {
    return this.forma.get('analisisDeRiesgoFormGroup') as FormGroup;
  }
  get politicasFormGroup(): FormGroup {
    return this.forma.get('politicasFormGroup') as FormGroup;
  }
}
