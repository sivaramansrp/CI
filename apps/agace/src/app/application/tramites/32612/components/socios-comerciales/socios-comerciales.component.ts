import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SOCIOS_COMERCIALES } from '../../constants/texto-estatico.enum';
import { CONFIGURACION, CONFIGURACION_REQUERIMIENTOS } from '../../constants/socios-comerciales.enum';

@Component({
  selector: 'app-socios-comerciales',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './socios-comerciales.component.html',
  styleUrl: './socios-comerciales.component.scss',
})
export class SociosComercialesComponent implements OnInit {

  public textos = TEXTOS_ESTATICOS_SOCIOS_COMERCIALES;
  public forma: FormGroup = new FormGroup({
    criteriosFormGroup: new FormGroup({}),
    requerimientosFormGroup: new FormGroup({}),
  });
  public criteriosDatos = CONFIGURACION;
  public requerimientosDatos = CONFIGURACION_REQUERIMIENTOS;



  constructor() { }

  ngOnInit(): void {}

  get criteriosFormGroup(): FormGroup {
    return this.forma.get('criteriosFormGroup') as FormGroup;
  }
  get requerimientosFormGroup(): FormGroup {
    return this.forma.get('requerimientosFormGroup') as FormGroup;
  }
}
