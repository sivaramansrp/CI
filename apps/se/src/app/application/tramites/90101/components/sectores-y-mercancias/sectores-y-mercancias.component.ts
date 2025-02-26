/**
 * @component SectoresYMercanciasComponent
 * @description Este componente es responsable de manejar los sectores y mercancías.
 * Incluye la lógica para obtener y gestionar los datos de los sectores, así como los catálogos relacionados.
 * 
 * @import { Component, OnInit } from '@angular/core';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { PARATEXTO } from '../../../../shared/constantes/prosec/prosec.module';
 * @import { CatalogosSelect } from '../../../../core/models/shared/components.model';
 * @import { Catalogo } from '../../../../core/models/shared/catalogos.model';
 * @import { ProsecService } from '../../../../core/services/90101/prosec.module';
 * @import { SECTORCOLUMNS } from '../../../../shared/constantes/prosec/prosec.module';
 */

import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PARATEXTO } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
import { SECTORCOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';

@Component({
  selector: 'app-sectores-y-mercancias',
  templateUrl: './sectores-y-mercancias.component.html',
  styleUrl: './sectores-y-mercancias.component.scss',
})
export class SectoresYMercanciasComponent {

  /**
   * @property {FormGroup} sectoresYMercancias - El grupo de formularios para capturar los datos de los sectores y mercancías.
   */
  sectoresYMercancias!: FormGroup;

  /**
   * @property {string} TEXTO - Constante de texto utilizada en el componente.
   */
  TEXTO: string = PARATEXTO;

  /**
   * @property {Catalogo[]} sector - Array de catálogos de sectores.
   */
  sector: any[] = [];

  /**
   * @property {any[]} sectorColumns - Array de columnas de la tabla de sectores.
   */
  sectorColumns: any[] = SECTORCOLUMNS;

  /**
   * @property {any[]} sectorsDatos - Array de datos de sectores.
   */
  sectorsDatos: any[] = [];

  constructor(private readonly fb: FormBuilder, private ProsecService: ProsecService) {
    this.sectoresYMercancias = this.fb.group({
      sector: [''],
      Fraccion_arancelaria: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene las listas de datos.
   */
  ngOnInit(): void {
    this.obtenserLista();
    this.recuperarDatos();
  }

  /**
   * @method obtenserLista
   * @description Obtiene las listas de datos de sectores.
   */
  obtenserLista(): void {
    this.obtenserListaEstado();
  }

  /**
   * @method obtenserListaEstado
   * @description Obtiene la lista de sectores desde el servicio.
   */
  obtenserListaEstado(): void {
    this.ProsecService.obtenerMenuDesplegable('sector.json').subscribe(data => {
      this.sector = data as Catalogo[];
    });
  }

  /**
   * @method recuperarDatos
   * @description Recupera los datos de los sectores desde el servicio.
   */
  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('sectorDatos.json').subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.sectors)) {
          this.sectorsDatos = response.sectors.map((item: any) => {
            const data = {
              tbodyData: item.tbodyData
            };
            console.log(data);
            return data;
          });
          this.sectorsDatos = [...this.sectorsDatos];
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.sectorsDatos = [];
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.sectorsDatos = [];
      }
    });
  }
}