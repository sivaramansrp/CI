import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DOMICILIO_FISCAL_DEL_SOLICITANTE } from '../../constantes/solicitud-de-registro-tpl.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';

@Component({
  selector: 'domicilio-fiscal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './domicilio-fiscal.component.html',
  styleUrl: './domicilio-fiscal.component.scss',
})
export class DomicilioFiscalComponent {
  /**
      * compo doc
      * @property domicilioFiscalFormData
      * @description
      * Esta propiedad contiene la configuración de los campos del formulario dinámico 
      * utilizado en el componente. La configuración está basada en la constante 
      * `DOMICILIO_FISCAL_DEL_SOLICITANTE`, que define los detalles de cada campo, como su 
      * identificador, etiqueta, tipo de entrada, validadores, y más.
      * 
      * Se utiliza para renderizar dinámicamente los campos del formulario y para 
      * gestionar su comportamiento, como la validación y la interacción con los datos 
      * obtenidos de los servicios.
      */
    public domicilioFiscalFormData = DOMICILIO_FISCAL_DEL_SOLICITANTE;
  
    /**
     * compo doc
     * @type {FormGroup}
     * @memberof DomicilioFiscalComponent
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
