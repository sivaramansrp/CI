import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DESCRIPCION_DEL_CUPO } from '../../constantes/solicitud-de-registro-tpl.enum';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';

@Component({
  selector: 'descripcion-del-cupo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormasDinamicasComponent
  ],
  templateUrl: './descripcion-del-cupo.component.html',
  styleUrl: './descripcion-del-cupo.component.css',
})
export class DescripcionDelCupoComponent implements OnChanges {

  @Input() objetoDeFormulario!: InstrumentoCupoTPLForm;

  /**
      * compo doc
      * @property descripcionDelCupoFormData
      * @description
      * Esta propiedad contiene la configuración de los campos del formulario dinámico 
      * utilizado en el componente. La configuración está basada en la constante 
      * `DATOS_GENERALES_DEL_SOLICITANTE`, que define los detalles de cada campo, como su 
      * identificador, etiqueta, tipo de entrada, validadores, y más.
      * 
      * Se utiliza para renderizar dinámicamente los campos del formulario y para 
      * gestionar su comportamiento, como la validación y la interacción con los datos 
      * obtenidos de los servicios.
      */
    public descripcionDelCupoFormData = DESCRIPCION_DEL_CUPO;
  
    /**
     * compo doc
     * @type {FormGroup}
     * @memberof DatosGeneralesComponent
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

    ngOnChanges(): void {
      if (this.objetoDeFormulario) {
        console.log('desc', this.objetoDeFormulario)
        this.establecerValorDeFormulario();
        console.log('form', this.ninoFormGroup)
      }
    }

    public establecerValorDeFormulario(): void {
      this.ninoFormGroup.patchValue({
        fraccionArancelaria: this.objetoDeFormulario.fraccionArancelaria,
        descripcionProducto: this.objetoDeFormulario.productoDescripcion,
        tratadoBloque: this.objetoDeFormulario.cveTratado,
        clasificacionSubproducto: this.objetoDeFormulario.subProductoClasificacion,
        mecanismo: this.objetoDeFormulario.asignacionMecanismo,
        categoria: this.objetoDeFormulario.categoriaTextil,
        clasificacionRegimen: this.objetoDeFormulario.cveRegimenClasificacion,
        descripcionCategoria: this.objetoDeFormulario.categoriaTextilDescripcion,
        paisDestino: this.objetoDeFormulario.cvePaisDestino,
        unidadDeMedida: this.objetoDeFormulario.unidad,
        factor: this.objetoDeFormulario.conversionFactor,
        fechaDeInicio: this.objetoDeFormulario.fechaInicioVigencia,
        fechaDeFin: this.objetoDeFormulario.fechaFinVigencia
      })
      this.ninoFormGroup.updateValueAndValidity();
    }
}
