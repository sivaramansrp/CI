import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DATOS_DEL_TRAMITE_REALIZER } from '../../constantes/importacion-definitiva.enum';
import { FormGroup } from '@angular/forms';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service'

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
  * @selector app-datos-del-tramite-realizer
  * @description
  * Este componente es responsable de gestionar y renderizar los datos del trámite 
  * relacionados con la importación definitiva. Utiliza un formulario dinámico basado 
  * en la configuración definida en `DATOS_DEL_TRAMITE_REALIZER`.
  * 
  * Funcionalidades principales:
  * - Obtiene las opciones para los campos dinámicos del formulario, como el régimen 
  *   al que se destinará la mercancía y la clasificación del régimen, a través de 
  *   servicios.
  * - Renderiza dinámicamente los campos del formulario según la configuración.
  * 
  * Propiedades:
  * - `datosDelTramiteFormData`: Contiene la configuración de los campos del formulario.
  * 
  * Servicios utilizados:
  * - `ImportacionDefinitivaService`: Servicio para obtener datos relacionados con 
  *   el régimen y la clasificación del régimen.
  * 
  * Ciclo de vida:
  * - `ngOnInit`: Llama a los métodos para obtener las opciones de los campos dinámicos.
  * 
  * @templateUrl ./datos-del-tramite-realizer.component.html
  * @styleUrl ./datos-del-tramite-realizer.component.scss
  */
@Component({
  selector: 'app-datos-del-tramite-realizer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datos-del-tramite-realizer.component.html',
  styleUrl: './datos-del-tramite-realizer.component.scss',
})
 
export class DatosDelTramiteRealizerComponent implements OnInit {

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
  public datosDelTramiteFormData:DatosDelTramite[] = DATOS_DEL_TRAMITE_REALIZER;

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
  * En este caso, se utiliza para llamar a los métodos `obtenerRegimenDestinara` y 
  * `obtenerRegimenClasificacion`, los cuales son responsables de obtener las opciones 
  * dinámicas para los campos del formulario relacionados con el régimen y la clasificación 
  * del régimen.
  * 
  * Funcionalidad:
  * - Inicializa las opciones dinámicas de los campos del formulario al cargar el componente.
  * 
  * @example
  * ngOnInit(): void {
  *   this.obtenerRegimenDestinara();
  *   this.obtenerRegimenClasificacion();
  * }
  */
ngOnInit(): void {
  this.obtenerRegimenDestinara();
  this.obtenerRegimenClasificacion();
  console.log('datosDelTramiteFormData', this.datosDelTramiteFormData)
}

  /**
  * compo doc
  * @method obtenerRegimenDestinara
  * @description
  * Este método se encarga de obtener las opciones disponibles para el campo "régimen" 
  * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
  * para obtener los datos relacionados con los regímenes de mercancías. 
  * 
  * Si la respuesta del servicio es exitosa (código 200), se procesan los datos recibidos 
  * y se asignan como opciones al campo "régimen" dentro de la configuración del formulario.
  * 
  * Funcionalidad:
  * - Realiza una solicitud al servicio para obtener los regímenes de mercancías.
  * - Busca el campo "régimen" en la configuración del formulario.
  * - Asigna las opciones obtenidas al campo "régimen" si aún no están definidas.
  * 
  * @example
  * this.obtenerRegimenDestinara();
  * // Actualiza las opciones del campo "régimen" en el formulario dinámico.
  */
  public obtenerRegimenDestinara(): void {
    this.importacionDefinitivaService.getRegimenMercancia().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const REGIMEN_FIELD: any = this.datosDelTramiteFormData.find((datos: DatosDelTramite) => datos.campo === 'regimen');
        if (REGIMEN_FIELD) {
          if (!REGIMEN_FIELD.opciones) {
            REGIMEN_FIELD.opciones = RESPONSE.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      }
    });
  }

  /**
  * compo doc
  * @method obtenerRegimenClasificacion
  * @description
  * Este método se encarga de obtener las opciones disponibles para el campo "clasificación" 
  * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService` 
  * para obtener los datos relacionados con la clasificación de los regímenes de mercancías.
  * 
  * Si la respuesta del servicio es exitosa (código 200), se procesan los datos recibidos 
  * y se asignan como opciones al campo "clasificación" dentro de la configuración del formulario.
  * 
  * Funcionalidad:
  * - Realiza una solicitud al servicio para obtener las clasificaciones de los regímenes.
  * - Busca el campo "clasificación" en la configuración del formulario.
  * - Asigna las opciones obtenidas al campo "clasificación" si aún no están definidas.
  * 
  * @example
  * this.obtenerRegimenClasificacion();
  * // Actualiza las opciones del campo "clasificación" en el formulario dinámico.
  */
  public obtenerRegimenClasificacion(): void {
    this.importacionDefinitivaService.getClasifiRegimen().subscribe((resp) => {
      if (resp.code === 200) {
        const RESPONSE = resp.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const REGIMEN_FIELD: any = this.datosDelTramiteFormData.find((datos: DatosDelTramite) => datos.campo === 'clasificacion');
        if (REGIMEN_FIELD) {
          if (!REGIMEN_FIELD.opciones) {
            REGIMEN_FIELD.opciones = RESPONSE.map((item: { id: number; descripcion: string }) => ({
              descripcion: item.descripcion,
              id: item.id,
            }));
          }
        }
      }
    });
  }
}
