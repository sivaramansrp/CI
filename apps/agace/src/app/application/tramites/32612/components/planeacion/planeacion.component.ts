import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTOS_ESTATICOS_PLANEACION } from '../../constants/texto-estatico.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION, CONFIGURACION_AUDITORIAS, CONFIGURACION_CONTINGENCIA, CONFIGURACION_POLITICAS } from '../../constants/analisis-riesgo-forma.enum';
import { CONFIGURACION_REVISIONES } from '../../constants/socios-comerciales.enum';

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
    auditoriasFormGroup: new FormGroup({}),
    contingenciaFormGroup: new FormGroup({}),
    revisionesFormGroup: new FormGroup({}),
  });
  public analisisDeRiesgoDatos = CONFIGURACION;
  public politicasDatos = CONFIGURACION_POLITICAS;
  public auditoriasDatos = CONFIGURACION_AUDITORIAS;
  public contingenciaDatos = CONFIGURACION_CONTINGENCIA;
  public revisionesDatos = CONFIGURACION_REVISIONES;


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
  get auditoriasFormGroup(): FormGroup {
    return this.forma.get('auditoriasFormGroup') as FormGroup;
  }
  get contingenciaFormGroup(): FormGroup {
    return this.forma.get('contingenciaFormGroup') as FormGroup;
  }
  get revisionesFormGroup(): FormGroup {
    return this.forma.get('revisionesFormGroup') as FormGroup;
  }
}
