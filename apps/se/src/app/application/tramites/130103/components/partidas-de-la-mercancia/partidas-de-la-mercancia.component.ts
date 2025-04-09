import { AlertComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PARTIDAS_DE_LA_MERCANCIA } from '../../constantes/importacion-definitiva.enum';
import { Partidas } from '../../models/importacion-definitiva.model';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';

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
  selector: 'app-partidas-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule
  ],
  templateUrl: './partidas-de-la-mercancia.component.html',
  styleUrl: './partidas-de-la-mercancia.component.scss',
})
export class PartidasDeLaMercanciaComponent implements OnInit {
  /**
  * compo doc
  * @property datosDeLaMercanciaFormData
  * @type {DatosDelTramite[]}
  * @description
  * Esta propiedad contiene la configuración de los campos del formulario dinámico 
  * utilizado en el componente. La configuración está basada en la constante 
  * `PARTIDAS_DE_LA_MERCANCIA`, que define los detalles de cada campo, como su 
  * identificador, etiqueta, tipo de entrada, validadores, y más.
  * 
  * Se utiliza para renderizar dinámicamente los campos del formulario y para 
  * gestionar su comportamiento, como la validación y la interacción con los datos 
  * obtenidos de los servicios.
  * 
  * @example
  * const campo = this.datosDeLaMercanciaFormData.find((datos) => datos.campo === 'regimen');
  * console.log(campo.label_nombre); // Muestra: "Régimen al que se destinará la mercancía"
  */
  public datosDeLaMercanciaFormData: DatosDelTramite[] = PARTIDAS_DE_LA_MERCANCIA;

  /**
  * compo doc
  * @property instrucciones
  * @type {string}
  * @description
  * Esta propiedad contiene el texto de las instrucciones que se mostrarán en el componente. 
  * El valor de esta propiedad se obtiene de la constante `TEXTOS.INSTRUCCIONES`, la cual 
  * define los mensajes o guías que deben seguir los usuarios al interactuar con el formulario 
  * o la interfaz del componente.
  * 
  * @example
  * console.log(this.instrucciones);
  * // Muestra: "Por favor, complete todos los campos obligatorios antes de continuar."
  */
  public instrucciones = TEXTOS.INSTRUCCIONES;

  /**
  * compo doc
  * @property instrucciones_para_partidas
  * @type {string}
  * @description
  * Esta propiedad contiene el texto de las instrucciones específicas para las partidas de la mercancía 
  * que se mostrarán en el componente. El valor de esta propiedad se obtiene de la constante 
  * `TEXTOS.INSTRUCCIONES_PARA_PARTIDAS`, la cual define los mensajes o guías que deben seguir los usuarios 
  * al interactuar con las partidas en el formulario o la interfaz del componente.
  * 
  * @example
  * console.log(this.instrucciones_para_partidas);
  * // Muestra: "Por favor, revise las partidas antes de continuar con el trámite."
  */
  public instrucciones_para_partidas = TEXTOS.INSTRUCCIONES_PARA_PARTIDAS;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof RepresentanteLegalComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    cantidad_total: new FormControl({ value: '100', disabled: true }),
    valor_total: new FormControl({ value: '100', disabled: true }),
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
    { encabezado: 'Cantidad', clave: (artículo) => artículo.cantidad, orden: 1 },
    { encabezado: 'Unidad de medida', clave: (artículo) => artículo.unidad_de_medida, orden: 2 },
    { encabezado: 'Fracción Arancelaria', clave: (artículo) => artículo.fraccion_arancelaria_tigie, orden: 3 },
    { encabezado: 'Descripción', clave: (artículo) => artículo.descripcion, orden: 4 },
    { encabezado: 'Precio unitario USD', clave: (artículo) => artículo.precio_unitario, orden: 5 },
    { encabezado: 'Total USD', clave: (artículo) => artículo.total_usd, orden: 6 }
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

  ngOnInit(): void {
    console.log('partidas', this.forma)
  }

  public agregar(): void {
    console.log(this.ninoFormGroup.value)
  }
}
