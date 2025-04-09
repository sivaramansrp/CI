import { ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Partidas } from '../../models/importacion-definitiva.model';
import { USO_ESPECIFICO_DE_LA_MERCANCIA } from '../../constantes/importacion-definitiva.enum';

interface DatosDelTramite {
  id: string;
  label_nombre: string;
  campo: string;
  clase: string;
  tipo_input: string;
  desactivado: boolean;
  solo_lectura: boolean;
  validadores: { tipo: string }[];
  marcador_de_posicion: string;
  margin_top?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opciones?: any[];
}

@Component({
  selector: 'app-uso-especifico-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent
  ],
  templateUrl: './uso-especifico-de-la-mercancia.component.html',
  styleUrl: './uso-especifico-de-la-mercancia.component.scss',
})

export class UsoEspecificoDeLaMercanciaComponent {
  /**
    * compo doc
    * @property usoEspecificoFormData
    * @type {DatosDelTramite[]}
    * @description
    * Esta propiedad contiene la configuración de los campos del formulario dinámico 
    * utilizado en el componente. La configuración está basada en la constante 
    * `USO_ESPECIFICO_DE_LA_MERCANCIA`, que define los detalles de cada campo, como su 
    * identificador, etiqueta, tipo de entrada, validadores, y más.
    * 
    * Se utiliza para renderizar dinámicamente los campos del formulario y para 
    * gestionar su comportamiento, como la validación y la interacción con los datos 
    * obtenidos de los servicios.
    */
    public usoEspecificoFormData: DatosDelTramite[] = USO_ESPECIFICO_DE_LA_MERCANCIA;

    /**
     * compo doc
     * @type {FormGroup}
     * @memberof UsoEspecificoDeLaMercanciaComponent
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

    /**
     * Configuración de las columnas de la tabla.
     */
    public encabezadoDeTabla: ConfiguracionColumna<Partidas>[] = [
      { encabezado: '', clave: (artículo) => artículo.id, orden: 1 },
      { encabezado: 'Fracción Arancelaria', clave: (artículo) => artículo.fraccion_arancelaria_prosec, orden: 2 },
      { encabezado: 'Descripción', clave: (artículo) => artículo.descripcion, orden: 3 }
    ];
    
    /**
     * Define los datos que se mostrarán en la tabla dinámica.
     */
    public datosTabla: Partidas[] = [];
    
    /**
     * Referencia a la clase o enumeración `TablaSeleccion`.
     * 
     * Esta propiedad se utiliza para acceder a las funcionalidades
     * o valores definidos en `TablaSeleccion` dentro del componente.
     */
    public TablaSeleccion = TablaSeleccion;

    public agregar(): void {
      console.log(this.ninoFormGroup.value);
    }
}
