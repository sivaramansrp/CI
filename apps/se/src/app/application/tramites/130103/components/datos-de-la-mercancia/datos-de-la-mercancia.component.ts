import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATOS_DE_LA_MERCANCIA } from '../../constantes/importacion-definitiva.enum';
import { FormGroup } from '@angular/forms';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';

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

/**
  * compo doc
  * @component
  * @selector app-datos-de-la-mercancia
  * @description
  * Este componente es responsable de gestionar y renderizar los datos relacionados con 
  * la mercancía en el trámite de importación definitiva. Utiliza un formulario dinámico 
  * basado en la configuración definida en `DATOS_DE_LA_MERCANCIA`.
  * 
  * Funcionalidades principales:
  * - Obtiene las opciones dinámicas para los campos del formulario, como "Fracción Arancelaria" 
  *   y "Unidad de medida", a través de servicios.
  * - Renderiza dinámicamente los campos del formulario según la configuración.
  * - Permite la interacción con los datos obtenidos de los servicios para completar 
  *   la información de la mercancía.
  * 
  * Propiedades:
  * - `datosDeLaMercanciaFormData`: Contiene la configuración de los campos del formulario.
  * 
  * Servicios utilizados:
  * - `ImportacionDefinitivaService`: Servicio para obtener datos relacionados con la fracción 
  *   arancelaria y la unidad de medida.
  * 
  * Ciclo de vida:
  * - `ngOnInit`: Llama a los métodos para obtener las opciones dinámicas de los campos del formulario.
  * 
  * @templateUrl ./datos-de-la-mercancia.component.html
  * @styleUrl ./datos-de-la-mercancia.component.scss
  */

@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrl: './datos-de-la-mercancia.component.scss',
})

export class DatosDeLaMercanciaComponent implements OnInit {
  /**
    * compo doc
    * @property datosDelTramiteFormData
    * @type {DatosDelTramite[]}
    * @description
    * Esta propiedad contiene la configuración de los campos del formulario dinámico 
    * utilizado en el componente. La configuración está basada en la constante 
    * `DATOS_DEL_TRAMITE_REALIZER`, que define los detalles de cada campo, como su 
    * identificador, etiqueta, tipo de entrada, validadores, y más.
    * 
    * Se utiliza para renderizar dinámicamente los campos del formulario y para 
    * gestionar su comportamiento, como la validación y la interacción con los datos 
    * obtenidos de los servicios.
    * 
    * @example
    * const campo = this.datosDelTramiteFormData.find((datos) => datos.campo === 'regimen');
    * console.log(campo.label_nombre); // Muestra: "Régimen al que se destinará la mercancía"
    */
    public datosDeLaMercanciaFormData:DatosDelTramite[] = DATOS_DE_LA_MERCANCIA;

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

    /**
    * compo doc
    * @constructor
    * @param {ImportacionDefinitivaService} importacionDefinitivaService - Servicio inyectado que se utiliza para obtener 
    * datos relacionados con el régimen y la clasificación del régimen en el trámite de importación definitiva.
    * 
    * @description
    * Este constructor inicializa el componente e inyecta el servicio `ImportacionDefinitivaService`, 
    * que es necesario para realizar solicitudes y obtener datos dinámicos que se utilizan en el formulario.
    */
    constructor(
      public importacionDefinitivaService: ImportacionDefinitivaService
    // eslint-disable-next-line no-empty-function
    ) {}

    /**
    * compo doc
    * @method ngOnInit
    * @description
    * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente 
    * después de que Angular haya inicializado todas las propiedades vinculadas al componente. 
    * En este caso, se utiliza para llamar al método `obtenerFraccionArancelaria`, el cual 
    * es responsable de obtener las opciones dinámicas para el campo "Fracción Arancelaria" 
    * del formulario.
    * 
    * Funcionalidad:
    * - Inicializa las opciones dinámicas del campo "Fracción Arancelaria" al cargar el componente.
    * 
    * @example
    * ngOnInit(): void {
    *   this.obtenerFraccionArancelaria();
    * }
    */
    ngOnInit(): void {
      this.obtenerFraccionArancelaria();
      this.obtenerUnidadDeMedida();
      console.log('datosDeLaMercanciaFormData', this.datosDeLaMercanciaFormData)
    }

    /**
    * compo doc
    * @method obtenerFraccionArancelaria
    * @description
    * Este método se encarga de obtener las opciones disponibles para el campo "Fracción Arancelaria" 
    * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
    * para obtener los datos relacionados con las fracciones arancelarias.
    * 
    * Funcionalidad:
    * - Realiza una solicitud al servicio para obtener las fracciones arancelarias.
    * - Busca el campo "Fracción Arancelaria" en la configuración del formulario.
    * - Asigna las opciones obtenidas al campo "Fracción Arancelaria" si aún no están definidas.
    * 
    * @example
    * this.obtenerFraccionArancelaria();
    * // Actualiza las opciones del campo "Fracción Arancelaria" en el formulario dinámico.
    */
    public obtenerFraccionArancelaria(): void {
      this.importacionDefinitivaService.getFraccionArancelaria().subscribe((resp) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const REGIMEN_FIELD: any = this.datosDeLaMercanciaFormData.find((datos: DatosDelTramite) => datos.campo === 'fraccion_arancelaria');
        if (REGIMEN_FIELD) {
          if (!REGIMEN_FIELD.opciones) {
            REGIMEN_FIELD.opciones = resp.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      });
    }

    /**
    * compo doc
    * @method obtenerUnidadDeMedida
    * @description
    * Este método se encarga de obtener las opciones disponibles para el campo "Unidad de medida" 
    * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
    * para obtener los datos relacionados con las unidades de medida.
    * 
    * Funcionalidad:
    * - Realiza una solicitud al servicio para obtener las unidades de medida.
    * - Busca el campo "Unidad de medida" en la configuración del formulario.
    * - Asigna las opciones obtenidas al campo "Unidad de medida" si aún no están definidas.
    * 
    * @example
    * this.obtenerUnidadDeMedida();
    * // Actualiza las opciones del campo "Unidad de medida" en el formulario dinámico.
    */
    public obtenerUnidadDeMedida(): void {
      this.importacionDefinitivaService.getUnidadDeMedida().subscribe((resp) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const UNIDAD_FIELD: any = this.datosDeLaMercanciaFormData.find((datos: DatosDelTramite) => datos.campo === 'unidad_de_medida');
        if (UNIDAD_FIELD) {
          if (!UNIDAD_FIELD.opciones) {
            UNIDAD_FIELD.opciones = resp.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      });
    }
}
