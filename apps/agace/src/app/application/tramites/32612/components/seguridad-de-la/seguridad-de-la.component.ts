import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { TEXTOS_ESTATICOS_SEGURIDAD_DE_LA } from '../../constants/texto-estatico.enum';
import { CONFIGURACION_TECNOLOGIA, CONFIGURACION_TECNOLOGIA_DOS } from '../../constants/seguridad-de-la.enum';

@Component({
  selector: 'app-seguridad-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './seguridad-de-la.component.html',
  styleUrl: './seguridad-de-la.component.scss',
})
export class SeguridadDeLaComponent {

  public textos = TEXTOS_ESTATICOS_SEGURIDAD_DE_LA;
  public forma: FormGroup = new FormGroup({
    tecnologiaFormGroup: new FormGroup({}),
    tecnologiaDosFormGroup: new FormGroup({}),
  });

  public tecnologiaDatos = CONFIGURACION_TECNOLOGIA;
  public tecnologiaDosDatos = CONFIGURACION_TECNOLOGIA_DOS;

  constructor() {

  }

  ngOnInit() {

  }

  get tecnologiaFormGroup(): FormGroup {
    return this.forma.get('tecnologiaFormGroup') as FormGroup;
  }

  get tecnologiaDosFormGroup(): FormGroup {
    return this.forma.get('tecnologiaDosFormGroup') as FormGroup;
  }


}
