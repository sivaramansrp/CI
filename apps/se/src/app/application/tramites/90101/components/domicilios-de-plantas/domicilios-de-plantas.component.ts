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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Catalogo } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { filaPlantas } from '@ng-mf/data-access-user'
import { ProsecService } from '@ng-mf/data-access-user';
import { TEXTO } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.scss',
})
export class DomiciliosDePlantasComponent implements OnInit {

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
  estadoSeleccionar: Catalogo[] = [];

  /**
   * @property {Catalogo[]} RepresentacionFederal - Array de catálogos de representación federal.
   */
  RepresentacionFederal: Catalogo[] = [];

  /**
   * @property {Catalogo[]} ActividadProductiva - Array de catálogos de actividad productiva.
   */
  ActividadProductiva: Catalogo[] = [];

  TablaSeleccion = TablaSeleccion;

  plantaColumnsConfiguracion: ConfiguracionColumna<filaPlantas>[] = [
    { encabezado: 'Calle', clave: (fila) => fila.calle, orden: 1 },
    {
      encabezado: 'Número exterior',
      clave: (fila) => fila.numeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (fila) => fila.numeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (fila) => fila.codigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (fila) => fila.colonia,
      orden: 5,
    },
    {
      encabezado: 'Municipio o alcaldía',
      clave: (fila) => fila.municipioOAlcaldia,
      orden: 6,
    },
  ];

  plantasDatos = [
    {
      calle: 'CALLE 5',
      numeroExterior: 'S/N',
      numeroInterior: '',
      codigoPostal: 81124,
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