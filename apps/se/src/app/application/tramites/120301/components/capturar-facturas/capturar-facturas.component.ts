
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@ng-mf/data-access-user';
import { InputFecha } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';
import { SeccionLibQuery } from '@ng-mf/data-access-user';
import { SeccionLibState } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

import { EXPEDICION_FACTURA_FECHA, VALIDO } from '../../constantes/elegibilidad-de-textiles.enums';

import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { TextilesState } from '../../estados/elegibilidad-de-textiles.store';

import { CapturarColumns } from '../../models/elegibilidad-de-textiles.model';

import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';

import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

import { REGEX_PATRON_DECIMAL_2} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';
import { REGEX_SOLO_DIGITOS} from '@libs/shared/data-access-user/src/tramites/constantes/regex.constants';

/**
 * @component CapturarFacturasComponent
 * @description Este componente es responsable de capturar los detalles de las facturas.
 * Incluye un formulario para capturar los datos de las facturas y una tabla para mostrar las facturas capturadas.
 */
@Component({
  selector: 'app-capturar-facturas',
  templateUrl: './capturar-facturas.component.html',
  styleUrl: './capturar-facturas.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    ReactiveFormsModule,
    InputFechaComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ]
})
export class CapturarFacturasComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} facturaForm - El grupo de formularios para capturar los datos de las facturas.
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
  

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios.
   */
  constructor(
    private ElegibilidadTextilesService: ElegibilidadTextilesService,
    private readonly httpServicios: HttpClient,
    private readonly fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
   }

  /**
   * @method ngOnInit
   * @description Método que se ejecuta al inicializar el componente.
   */
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
  if(this.capturarState.formaValida && this.capturarState.formaValida[0] && this.capturarState.formaValida[0].descripcion === VALIDO){
    this.seccionStore.establecerSeccion([true]);
    this.seccionStore.establecerFormaValida([true])
  }
  else{
    this.seccionStore.establecerFormaValida([false]);
  }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos de las facturas.
   */
  initActionFormBuild(): void {
    this.facturaForm = this.fb.group({
      numeroFactura: [this.capturarState.numeroFactura, Validators.required],
      cantidadTotal: [this.capturarState.cantidadTotal, [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)]],
      unidadDeMedida: [this.capturarState.unidadDeMedida, Validators.required],
      fechaInicioInput: [''],
      valorDolares: [this.capturarState.valorDolares, [Validators.required, Validators.pattern(REGEX_PATRON_DECIMAL_2)]],
      taxId: [this.capturarState.taxId],
      razonSocial: [this.capturarState.razonSocial, Validators.required],
      calle: [this.capturarState.calle, Validators.required],
      ciudad: [this.capturarState.ciudad, Validators.required],
      cp: [this.capturarState.cp, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)]],
      pais: [{value:this.capturarState.pais,disabled:true},[ Validators.required]],
      fechaExpedicionFactura: ['2025-04-30'], 
    });
  }
  /**
   * @property {Catalogo[]} unidadDeMedida - Configuración para el select de unidad de medida.
   */
  unidadDeMedida: Catalogo[] = [];
  /**
   * @property {InputFecha} fechaInicioInputs - Configuración para el input de fecha de pago.
   */
  fechaInicioInputs: InputFecha = EXPEDICION_FACTURA_FECHA;
  /**
   * @method obtenerListasDesplegables
   * @description Obtiene las listas desplegables necesarias para el formulario.
   */
  obtenerListasDesplegables(): void {
    this.obtenerIngresoSelectList();
  }

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   */
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
   * @method obtenerIngresoSelectList
   * @description Obtiene la lista para el select de unidad de medida.
   */
  obtenerIngresoSelectList():void {
    this.ElegibilidadTextilesService.obtenerMenuDesplegable('unidad-de-medida.json')
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (data) => {
        this.unidadDeMedida = data as Catalogo[];
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener los datos:', error)
      }
    })
  }

  /**
   * @method recuperarDatos
   * @description Obtiene los datos de las facturas desde el servicio.
   */
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
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}