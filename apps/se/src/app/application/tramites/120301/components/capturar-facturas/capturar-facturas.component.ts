/**
 * @component CapturarFacturasComponent
 * @description Este componente es responsable de capturar los detalles de las facturas.
 * Incluye un formulario para capturar los datos de las facturas y una tabla para mostrar las facturas capturadas.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup, Validators } from '@angular/forms';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 */

import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { EXPEDICION_FACTURA_FECHA } from 'libs/shared/data-access-user/src/tramites/constantes/elegibilidad-de-textiles.enums';
import { CapturarFacturasService } from 'libs/shared/data-access-user/src/core/services/120301/capturar-facturas/capturar-facturas.service';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { Catalogo, RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosSelect, InputFecha } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { SelectCatalogosComponent } from 'libs/shared/data-access-user/src/tramites/components/select-catalogos/select-catalogos.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import {CPATURAR_TBCOL} from 'libs/shared/data-access-user/src/tramites/constantes/elegibilidad-de-textiles.enums'
import { ElegibilidadTextilesService } from 'libs/shared/data-access-user/src/core/services/120301/elegibilidad-textiles/elegibilidad-textiles.service';

@Component({
  selector: 'app-capturar-facturas',
  templateUrl: './capturar-facturas.component.html',
  styleUrl: './capturar-facturas.component.scss',
  standalone: true,
  imports: [
    TableComponent,
    TituloComponent,
    ReactiveFormsModule,
    SelectCatalogosComponent,
    InputFechaComponent,
    CatalogoSelectComponent,
  ]
})
export class CapturarFacturasComponent implements OnInit {
  /**
   * @property {FormGroup} forma - El grupo de formularios para capturar los datos de las facturas.
   */
  facturaForm!: FormGroup;

  /**
   * @property {string[]} selectRangoDias - Array de rangos de días seleccionables.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {boolean} colapsable - Booleano para controlar el estado colapsable.
   */
  colapsable: boolean = false;

  /**
   * @property {FormGroup} ConstanciaDelRegistro - El grupo de formularios para datos de la constancia de registro.
   */
  ConstanciaDelRegistro!: FormGroup;



  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */
  tableColumns = CPATURAR_TBCOL;
  /**
  * @property {Array} facturas - Array de datos de facturas para mostrar en la tabla.
  *    * @param {FormBuilder} fb - Servicio para la creación de formularios.
  * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--120301
  */
  facturas: any[] = [];
  constructor(
    private capturarFacturasService: CapturarFacturasService,
    private ElegibilidadTextilesService: ElegibilidadTextilesService,
    private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      cantidadTotal: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      unidadDeMedida: ['', Validators.required],
      fechaInicioInput: ['', Validators.required],
      valorDolares: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      emisorConsignatario: this.fb.group({
        taxId: ['', Validators.required],
        razonSocial: ['', Validators.required],
        calle: ['', Validators.required],
        ciudad: ['', Validators.required],
        cp: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]], // Assuming CP is a 5-digit postal code
        pais: ['', Validators.required],
      })
    });
    this.fetchData();
    this.obtenerListasDesplegables();
  }
  fetchData(): void {
    this.capturarFacturasService.getDatos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.facturas)) {
          this.facturas = response.facturas.map((item) => {
            var data = {
              tbodyData: item.tbodyData
            }
            return data;
          }
          );
          this.facturas = [...this.facturas]
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.facturas = [];
        }
      },
      error: (error: any) => {
        console.error('Error while fetching the data:', error);
        this.facturas = [];
      }
    });
  }
  /**
 * Configuración para el select de unidad de medida.
 * @property {CatalogosSelect} unidadDeMedida
 */
  unidadDeMedida: Catalogo[];
  /**
* Configuración para el input de fecha-expedición-factura.
* @property {InputFecha} fechaInicioInput
*/

  /**
   * Configuración para el input de fecha de pago.
   * @property {InputFecha} fechaInicioInput
   */
  fechaInicioInput: InputFecha = EXPEDICION_FACTURA_FECHA;
  /**
* Obtiene las listas desplegables.
* @method obtenerListasDesplegables
*/
  obtenerListasDesplegables() {
    this.obtenerIngresoSelectList();
  }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerIngresoSelectList
   */

  obtenerIngresoSelectList() {
    this.ElegibilidadTextilesService.obtenerMenuDesplegable('unidad-de-medida.json').subscribe(data => {
      this.unidadDeMedida = data as Catalogo[];
    })
  }

}