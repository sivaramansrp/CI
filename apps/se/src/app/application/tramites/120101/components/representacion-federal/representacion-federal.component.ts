import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { REPRESENTACION_FEDERAL } from '../../constantes/solicitud-de-registro-tpl.enum';

@Component({
  selector: 'representacion-federal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './representacion-federal.component.html',
  styleUrl: './representacion-federal.component.scss',
})
export class RepresentacionFederalComponent {
  /**
   * compo doc
   * @property representacionFederalFormData
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `REPRESENTACION_FEDERAL`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public representacionFederalFormData = REPRESENTACION_FEDERAL;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentacionFederalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }
}
