/**
 * @component ProductorIndirectoComponent
 * @description Este componente es responsable de manejar los datos del productor indirecto.
 * Incluye la lógica para obtener y gestionar los datos del productor, así como los catálogos relacionados.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormBuilder, FormGroup } from '@angular/forms';
 * @import { PRODUCTORCOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
 * @import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';
 */

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PRODUCTORCOLUMNS } from 'libs/shared/data-access-user/src/tramites/constantes/prosec.module';
import { ProsecService } from 'libs/shared/data-access-user/src/core/services/90101/prosec.module';

@Component({
  selector: 'app-productor-indirecto',
  templateUrl: './productor-indirecto.component.html',
  styleUrl: './productor-indirecto.component.scss'
})
export class ProductorIndirectoComponent {

  /**
   * @property {FormGroup} productorIndirecto - El grupo de formularios para capturar los datos del productor indirecto.
   */
  productorIndirecto!: FormGroup;

  /**
   * @property {any[]} productorColumns - Array de columnas de la tabla de productores.
   */
  productorColumns: any[] = PRODUCTORCOLUMNS;

  /**
   * @property {any[]} productorDatos - Array de datos de productores.
   */
  productorDatos: any[] = [];

  constructor(private readonly fb: FormBuilder, private ProsecService: ProsecService) {
    this.productorIndirecto = this.fb.group({
      contribuyentes: [''],
    });
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de los productores.
   */
  ngOnInit(): void {
    this.recuperarDatos();
  }

  /**
   * @method recuperarDatos
   * @description Recupera los datos de los productores desde el servicio.
   */
  recuperarDatos(): void {
    this.ProsecService.obtenerTablaDatos('sectorDatos.json').subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.sectors)) {
          this.productorDatos = response.sectors.map((item: any) => {
            const data = {
              tbodyData: item.tbodyData
            };
            return data;
          });
          this.productorDatos = [...this.productorDatos];
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.productorDatos = [];
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error);
        this.productorDatos = [];
      }
    });
  }
}