import {
  CatalogosSelect,
  ConfiguracionColumna,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaSeleccion,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Validators } from '@angular/forms';

import radioOptionsData from '@libs/shared/theme/assets/json/120301/tipos-de-fabricante-exportador.json';
import unidadRadioFields from '@libs/shared/theme/assets/json/220401/unidad.json';

import { Subject } from 'rxjs';
import { delay } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { tap } from 'rxjs';

import {
  CATALOGOS,
  VALIDO,
} from '../../constantes/elegibilidad-de-textiles.enums';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HistoricoColumns } from '../../models/elegibilidad-de-textiles.model';
import { TextilesState } from '../../estados/elegibilidad-de-textiles.store';

/**
 * @component HistoricoFabricantesComponent
 * @description Este componente es responsable de manejar el historial de fabricantes.
 * Incluye un formulario para capturar los datos de los fabricantes y tablas para mostrar los fabricantes nacionales y sus datos.
 */
@Component({
  selector: 'app-historico-fabricantes',
  templateUrl: './historico-fabricantes.component.html',
  styleUrls: ['./historico-fabricantes.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    TablaDinamicaComponent,
  ],
})
export class HistoricoFabricantesComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input()
  formularioDeshabilitado: boolean = false;
  /**
   * @property {FormGroup} historicoFabricantesForm - El grupo de formularios para capturar los datos de los fabricantes.
   */
  historicoFabricantesForm!: FormGroup;

  /**
   * @property {any[]} radioOptions - Opciones de radio para el formulario.
   */
  radioOptions = radioOptionsData;

  /**
   * @property {string | number} selectedValue - Valor seleccionado del radio.
   */
  selectedValue: string | number = '';

  /**
   * @property {string | number} defaultSelect - Valor por defecto del select.
   */
  defaultSelect: string | number = '';

  /**
   * @property {any[]} radioBoton - Opciones de radio para el formulario.
   */
  radioBoton = unidadRadioFields;

  /**
   * @property {TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {ConfiguracionColumna<HistoricoColumns>[]} tableColumns - Configuración de las columnas de la tabla de fabricantes nacionales.
   */
  tableColumns: ConfiguracionColumna<HistoricoColumns>[] = [
    {
      encabezado: 'Nombre del fabricante',
      clave: (fila) => fila.nombreFabricante,
      orden: 1,
    },
    {
      encabezado: 'Número de registro fiscal',
      clave: (fila) => fila.numeroRegistroFiscal,
      orden: 2,
    },
    {
      encabezado: 'Dirección',
      clave: (fila) => fila.direccion,
      orden: 3,
    },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectrónico,
      orden: 4,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila) => fila.telefono,
      orden: 5,
    },
  ];

  /**
   * @property {HistoricoColumns[]} fabricantesNacionales - Array de datos de fabricantes nacionales.
   */
  fabricantesNacionales: HistoricoColumns[] = [];

  /**
   * @property {Subject<void>} destroyNotifier$ - Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} historicoState - Estado actual del historial de fabricantes.
   */
  private historicoState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   */
  private seccionState!: SeccionLibState;

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios.
   * @param {FormBuilder} fb - Servicio para la creación de formularios reactivos.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para manejar el estado de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para consultar el estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado de la sección.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar el estado de la sección.
   * @param {ElegibilidadTextilesService} elegibilidadTextilesService - Servicio para manejar la lógica de elegibilidad de textiles.
   */
  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private elegibilidadTextilesService: ElegibilidadTextilesService
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de los fabricantes.
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
          this.historicoState = state as TextilesState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.recuperarDatos();

    this.historicoFabricantesForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.historicoFabricantesForm.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.historicoState.formaValida,
              { id: 3, descripcion: 'TodoValido' },
            ]);
          }
        })
      )
      .subscribe();

    this.seccionStore.establecerFormaValida([false]);

    if (
      this.historicoState.formaValida &&
      this.historicoState.formaValida[0] &&
      this.historicoState.formaValida[0].descripcion === VALIDO
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
    if (this.formularioDeshabilitado) {
      this.historicoFabricantesForm.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos de los fabricantes.
   */
  initActionFormBuild(): void {
    this.historicoFabricantesForm = this.fb.group({
      exportadorFabricanteMismo: [
        this.historicoState.exportadorFabricanteMismo,
      ],
      numeroRegistroFiscal: [
        this.historicoState.numeroRegistroFiscal,
        [Validators.required, Validators.minLength(5)],
      ],
      fabricantesNacionales: [[]],
    });
  }

  /**
   * @method recuperarDatos
   * @description Obtiene los datos de los fabricantes desde el servicio.
   */
  recuperarDatos(): void {
    this.elegibilidadTextilesService
      .obtenerTablaDatos<HistoricoColumns>('historico-fabricantes.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          this.fabricantesNacionales = response as HistoricoColumns[];
        },
        error: (error) => {
          console.error('Error al obtener los datos:', error);
        },
      });
  }

  /**
   * @method onValueChange
   * @description Maneja el cambio de valor del radio.
   * @param {string | number} newValue - El nuevo valor seleccionado.
   */
  onValueChange(newValue: number | string): void {
    this.selectedValue = newValue;
  }

  /**
   * @property {CatalogosSelect[]} dropdownConfigs - Configuraciones de los dropdowns.
   */
  dropdownConfigs: CatalogosSelect[] = [
    {
      labelNombre: 'Delegaciones estatales SAGARPA',
      required: true,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
    {
      labelNombre: 'OSIA',
      required: true,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
    {
      labelNombre: 'Oficina Central',
      required: true,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
    {
      labelNombre: 'Distrito Desarrollo Rural (DDR)',
      required: false,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
  ];

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El nombre del campo.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El método del store a invocar.
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
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente es destruido.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
