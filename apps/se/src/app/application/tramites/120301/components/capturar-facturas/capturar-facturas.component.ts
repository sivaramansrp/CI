/**
 * @component CapturarFacturasComponent
 * @description Este componente es responsable de capturar los detalles de las facturas.
 * Incluye un formulario para capturar los datos de las facturas y una tabla para mostrar las facturas capturadas.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup, Validators } from '@angular/forms';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 */

import { CPATURAR_TBCOL, EXPEDICION_FACTURA_FECHA } from '../../constantes/elegibilidad-de-textiles.enums';
import { Component, OnInit } from '@angular/core';
import { ElegibilidadDeTextilesStore, TextilesState } from '../../estados/elegibilidad-de-textiles.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeccionLibQuery, SeccionLibState, SeccionLibStore } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil} from 'rxjs';
import { CapturarFacturasService } from '../../services/capturar-facturas/capturar-facturas.service';
import { Catalogo} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

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

  private destroyNotifier$: Subject<void> = new Subject();

  private capturarState!: TextilesState

  private seccionState!: SeccionLibState

  constructor(
    private capturarFacturasService: CapturarFacturasService,
    private ElegibilidadTextilesService: ElegibilidadTextilesService,
    private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    // Constructor logic can be added here if needed
   }

  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.seccionState = seccionState;
          })
        )
        .subscribe();
    this.ElegibilidadDeTextilesQuery.selectTextile$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.capturarState = state as TextilesState;
        })
      )
      .subscribe();

        this.fetchData();
        this.obtenerListasDesplegables();
        this.initActionFormBuild();
  }

  initActionFormBuild(): void {
    this.facturaForm = this.fb.group({
      numeroFactura: ['', Validators.required],
      cantidadTotal: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      unidadDeMedida: ['', Validators.required],
      fechaInicioInput: ['', Validators.required],
      valorDolares: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      taxId: ['', Validators.required],
      razonSocial: ['', Validators.required],
      calle: ['', Validators.required],
      ciudad: ['', Validators.required],
      cp: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]], // Assuming CP is a 5-digit postal code
      pais: ['', Validators.required],
    });
  }
  fetchData(): void {
    this.capturarFacturasService.getDatos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.facturas)) {
          this.facturas = response.facturas.map((item: any) => {
            var data = {
              tbodyData: item.tbodyData
            }
            return data;
          });
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
  unidadDeMedida: Catalogo[] = [];
  /**
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

  setValoresStore(
      form: FormGroup,
      campo: string,
      metodoNombre: keyof ElegibilidadDeTextilesStore
    ): void {
      const VALOR = form.get(campo)?.value;
      console.log(VALOR);
      (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: any) => void)(
        VALOR
      );
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