import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { PERIODO_EN_EL_QUE_PERMANECERA } from '../../constantes/exportar-ilustraciones.enum';

@Component({
  selector: 'periodo-en-el-extranjero',
  standalone: true,
  imports: [
    CommonModule,
    FormasDinamicasComponent,
    ReactiveFormsModule
  ],
  templateUrl: './periodo-en-el-extranjero.component.html',
  styleUrl: './periodo-en-el-extranjero.component.scss',
})
export class PeriodoEnElExtranjeroComponent {
  /**
     * compo doc
     * @property periodoPermaneceraFormData
     * @type {ModeloDeFormaDinamica[]}
     * @description
     * Esta propiedad contiene la configuración de los campos del formulario dinámico
     * utilizado en el componente. La configuración está basada en la constante
     * `PERIODO_EN_EL_QUE_PERMANECERA`, que define los detalles de cada campo, como su
     * identificador, etiqueta, tipo de entrada, validadores, y más.
     *
     * Se utiliza para renderizar dinámicamente los campos del formulario y para
     * gestionar su comportamiento, como la validación y la interacción con los datos
     * obtenidos de los servicios.
     */
     public periodoPermaneceraFormData = PERIODO_EN_EL_QUE_PERMANECERA;

     /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentanteLegalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({})
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
