import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TEXTOS_ESTATICOS_GESTION } from '../../constants/texto-estatico.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CONFIGURACION_ACTUALIZADA, CONFIGURACION_CONTROL, CONFIGURACION_GESTION } from '../../constants/gestion-aduanera.enum';

@Component({
  selector: 'app-gestion-aduanera',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './gestion-aduanera.component.html',
  styleUrl: './gestion-aduanera.component.scss',
})
export class GestionAduaneraComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_GESTION;
  public forma: FormGroup = new FormGroup({
    gestionFormGroup: new FormGroup({}),
    controlFormGroup: new FormGroup({}),
    actualizadaFormGroup: new FormGroup({})
  });
  public gestionDatos = CONFIGURACION_GESTION;
  public controlDatos = CONFIGURACION_CONTROL;
  public actualizadaDatos = CONFIGURACION_ACTUALIZADA;

  constructor() {}

  ngOnInit(): void {}

  get gestionFormGroup(): FormGroup {
    return this.forma.get('gestionFormGroup') as FormGroup;
  }

  get controlFormGroup(): FormGroup {
    return this.forma.get('controlFormGroup') as FormGroup;
  }

  get actualizadaFormGroup(): FormGroup {
    return this.forma.get('actualizadaFormGroup') as FormGroup;
  }



}
