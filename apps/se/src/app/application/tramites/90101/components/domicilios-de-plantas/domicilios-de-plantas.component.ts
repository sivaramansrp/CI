/**
 * @component DomiciliosDePlantasComponent
 * @description Este componente es responsable de manejar los domicilios de plantas.
 * Incluye la lógica para obtener y gestionar los datos de las plantas, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { TEXTO } from '../../../../shared/constantes/prosec/prosec.module';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { ProsecService } from '../../../../core/services/90101/prosec.module';
 * @import { PLANTACOLUMNS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
import { TEXTO } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
import { TablaSeleccion } from 'libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.scss',
})
export class DomiciliosDePlantasComponent {

  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos de las plantas.
   */
  forma!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = TEXTO;

  /**
   * @property {Catalogo[]} estadoSeleccionar - Array de catálogos de estados.
   */
  estadoSeleccionar: any[] = [];

  /**
   * @property {Catalogo[]} RepresentacionFederal - Array de catálogos de representación federal.
   */
  RepresentacionFederal: any[] = [];

  /**
   * @property {Catalogo[]} ActividadProductiva - Array de catálogos de actividad productiva.
   */
  ActividadProductiva: any[] = [];

  TablaSeleccion = TablaSeleccion;

  // configuracionColumnas = [
  //   { encabezado: 'No. partida', clave: (ele: any) => ele.noPartida, orden: 1 },
  //   {
  //     encabezado: 'Tipo de requisito',
  //     clave: (ele: any) => ele.tipoDeRequisito,
  //     orden: 2,
  //   },
  //   {
  //     encabezado: 'Requisito',
  //     clave: (ele: any) => ele.requistio,
  //     orden: 3,
  //   },
  //   {
  //     encabezado: 'Número de Certificado Internacional',
  //     clave: (ele: any) => ele.numberoDeCertificadoInternacional,
  //     orden: 4,
  //   },
  //   {
  //     encabezado: 'Fracción arancelaria',
  //     clave: (ele: any) => ele.fraccionArancelaria,
  //     orden: 5,
  //   },
  //   {
  //     encabezado: 'Descripción de la fracción',
  //     clave: (ele: any) => ele.descripcion,
  //     orden: 6,
  //   },
  //   {
  //     encabezado: 'Nico',
  //     clave: (ele: any) => ele.nico,
  //     orden: 7,
  //   },
  // ];

  // datos = [
  //   {
  //     noPartida: '1',
  //     tipoDeRequisito: 'Número de Oficio con Medidas Zoosanitarias',
  //     requistio: '023-15-643-ARG',
  //     numberoDeCertificadoInternacional: '00102899',
  //     fraccionArancelaria: '51012102',
  //     descripcion: 'Lana esquilada',
  //     nico: '00',
  //   },
  // ];

  plantaColumnsConfiguracion = [
    { encabezado: 'Calle', clave: (ele: any) => ele.calle, orden: 1 },
    {
      encabezado: 'Número exterior',
      clave: (ele: any) => ele.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (ele: any) => ele.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (ele: any) => ele.codigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (ele: any) => ele.colonia,
      orden: 5,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (ele: any) => ele.municipioOAlcaldia,
      orden: 6,
    },
  ];

  plantasDatos = [
    {
      calle: 'CALLE 5',
      numeroExterior: 'S/N',
      numeroInterior: '',
      codigoPostal: '81124',
      colonia: 'OTRA NO ESPECIFICADA EN EL CATÁLOGO',
      municipioOAlcaldia: 'GUASAVE'
    }

  ];



  constructor(private readonly fb: FormBuilder, private ProsecService: ProsecService) {
    this.forma = this.fb.group({
      modalidad: [''],
      Estado: [''],
      RepresentacionFederal: [''],
      ActividadProductiva: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene las listas de datos.
   */
  ngOnInit(): void {
    this.obtenserLista();
  }

  /**
   * @method obtenserLista
   * @description Obtiene las listas de datos de estados, representación federal y actividad productiva.
   */
  obtenserLista(): void {
    this.obtenserListaEstado();
  }

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de estados desde el servicio.
   */
  obtenserListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('estado.json').subscribe(data => {
      this.estadoSeleccionar = data as Catalogo[];
    });
  }

  /**
   * @method obtenserListaFederal
   * @description Obtiene la lista de representación federal desde el servicio.
   */
  obtenserListaFederal(): void {
    this.ProsecService.obtenerMenuDesplegable('federal.json').subscribe(data => {
      this.RepresentacionFederal = data as Catalogo[];
    });
  }

  /**
   * @method obtenserListaActividad
   * @description Obtiene la lista de actividad productiva desde el servicio.
   */
  obtenserListaActividad(): void {
    this.ProsecService.obtenerMenuDesplegable('actividad_productiva.json').subscribe(data => {
      this.ActividadProductiva = data as Catalogo[];
    });
  }
}