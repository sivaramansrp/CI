/**
 * @component CapturarFacturasComponent
 * @description Este componente es responsable de capturar los detalles de las facturas.
 * Incluye un formulario para capturar los datos de las facturas y una tabla para mostrar las facturas capturadas.
 * 
 * @import { Component } from '@angular/core';
 * @import { FormGroup, Validators } from '@angular/forms';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 */


import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiguracionColumna, SeccionLibQuery, SeccionLibState, SeccionLibStore, TablaSeleccion } from '@ng-mf/data-access-user';
import { ElegibilidadDeTextilesStore, TextilesState } from '../../estados/elegibilidad-de-textiles.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, delay, map, takeUntil, tap} from 'rxjs';
import { CapturarColumns } from '../../models/elegibilidad-de-textiles.model';
import { Catalogo} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { EXPEDICION_FACTURA_FECHA } from '../../constantes/elegibilidad-de-textiles.enums';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
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
    TablaDinamicaComponent
  ]
})
export class CapturarFacturasComponent implements OnInit, OnDestroy {
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
    * @property {Array} facturas - Array de datos de facturas para mostrar en la tabla.
    *    * @param {FormBuilder} fb - Servicio para la creación de formularios.
    * @param {HttpClient} httpServicios - Cliente HTTP para realizar solicitudes.--120301
    */
  facturas: CapturarColumns[] = [];

  private destroyNotifier$: Subject<void> = new Subject();

  private capturarState!: TextilesState

  private seccionState!: SeccionLibState

  TablaSeleccion = TablaSeleccion;
  /**
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */
  tableColumns: ConfiguracionColumna<CapturarColumns>[] = [
      { encabezado: 'Número de la factura', 
        clave: (fila) => fila.numeroDeLaFactura, 
        orden: 1 },
      {
        encabezado: 'Razón social',
        clave: (fila) => fila.razonSocial,
        orden: 2,
      },
      {
        encabezado: 'Domicilio',
        clave: (fila) => fila.domicilio,
        orden: 3,
      },
      {
        encabezado: 'Fecha de expedición de la factura',
        clave: (fila) => fila.fechaExpedicionFactura,
        orden: 4,
      },
      {
        encabezado: 'Cantidad total',
        clave: (fila) => fila.cantidadTotal,
        orden: 5,
      },
      {
        encabezado: 'Cantidad disponible',
        clave: (fila) => fila.cantidadDisponible,
        orden: 6,
      },
      {
        encabezado: 'Unidad de medida',
        clave: (fila) => fila.unidadMedida,
        orden: 7,
      },
      {
        encabezado: 'Valor en dólares',
        clave: (fila) => fila.valorDolares,
        orden: 8,
      },
    ];
  

  constructor(
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
      this.initActionFormBuild();
      this.obtenerListasDesplegables();
      this.recuperarDatos();

  this.seccionStore.establecerFormaValida([false]);
  
  this.facturaForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.facturaForm.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.capturarState.formaValida,
              { id: 2, descripcion: "Valida" }])
          }
        })
      )
      .subscribe();
  if(this.capturarState.formaValida && this.capturarState.formaValida[0] && this.capturarState.formaValida[0].descripcion === 'AllValida'){
    this.seccionStore.establecerSeccion([true]);
    this.seccionStore.establecerFormaValida([true])
  }
  else{
    this.seccionStore.establecerFormaValida([false]);
  }
  }

  initActionFormBuild(): void {
    this.facturaForm = this.fb.group({
      numeroFactura: [this.capturarState.numeroFactura, Validators.required],
      cantidadTotal: [this.capturarState.cantidadTotal, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      unidadDeMedida: [this.capturarState.unidadDeMedida, Validators.required],
      fechaInicioInput: [''],
      valorDolares: [this.capturarState.valorDolares, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      taxId: [this.capturarState.taxId],
      razonSocial: [this.capturarState.razonSocial, Validators.required],
      calle: [this.capturarState.calle, Validators.required],
      ciudad: [this.capturarState.ciudad, Validators.required],
      cp: [this.capturarState.cp, [Validators.required, Validators.pattern(/^\d{5}$/)]], // Assuming CP is a 5-digit postal code
      pais: [this.capturarState.pais, Validators.required],
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
   * @property {InputFecha} fechaInicioInputs
   */
  fechaInicioInputs: InputFecha = EXPEDICION_FACTURA_FECHA;
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
      (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
        VALOR
      );
    }

  /**
   * Obtiene la lista para el select de unidad de medida.
   * @method obtenerIngresoSelectList
   */

  obtenerIngresoSelectList() {
    this.ElegibilidadTextilesService.obtenerMenuDesplegable('unidad-de-medida.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (data) => {
        this.unidadDeMedida = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error al obtener los datos:', error)
      }
    })
  }

  recuperarDatos(): void {
    this.ElegibilidadTextilesService.obtenerTablaDatos<CapturarColumns>('capturar-facturas.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (response) => {
        if (response && Array.isArray(response)) {
          this.facturas = response as CapturarColumns[]
        } 
      },
      error: (error) => {
        console.error('Error al obtener los datos:', error);
      }}
    );
  }

  /**
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}