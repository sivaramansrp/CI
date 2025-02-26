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
import { HttpErrorResponse } from '@angular/common/http';
import { PLANTACOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
import { TEXTO } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';

@Component({
  selector: 'app-domicilios-de-plantas',
  templateUrl: './domicilios-de-plantas.component.html',
  styleUrl: './domicilios-de-plantas.component.scss'
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

  /**
   * @property {any[]} plantaColumns - Array de columnas de la tabla de plantas.
   */
  plantaColumns: any[] = PLANTACOLUMNS;

  /**
   * @property {any[]} plantas - Array de datos de plantas.
   */
  plantas: any[] = [];

  constructor(private readonly fb: FormBuilder, private ProsecService: ProsecService) {
    this.forma = this.fb.group({
      modalidad: [''],
      Estado: [''],
      RepresentacionFederal: [''],
      ActividadProductiva: [''],
    });
    this.recuperarDatos();
    this.datosSeleccionados();
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

  /**
   * @method recuperarDatos
   * @description Recupera los datos de las plantas desde el servicio.
   */
  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('plantasDatos.json').subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.plantas)) {
          this.plantas = response.plantas.map((item: any) => {
            const data = {
              tbodyData: item.tbodyData
            };
            return data;
          });
          this.plantas = [...this.plantas];
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.plantas = [];
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.plantas = [];
      }
    });
  }

  /**
   * @method datosSeleccionados
   * @description Recupera los datos seleccionados de las plantas desde el servicio.
   */
  datosSeleccionados(): void {
    this.ProsecService.obtenerTablaDatos('datosSeleccionados.json').subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.plantas)) {
          this.plantas = response.plantas.map((item: any) => {
            let data = {
              tbodyData: item.tbodyData
            };
            return data;
          });
          this.plantas = [...this.plantas];
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.plantas = [];
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.plantas = [];
      }
    });
  }
}