/**
 * @component HistoricoFabricantesComponent
 * @description Este componente es responsable de manejar el historial de fabricantes.
 * Incluye un formulario para capturar los datos de los fabricantes y tablas para mostrar los fabricantes nacionales y sus datos.
 * 
 * @import { Component, OnDestroy, OnInit } from '@angular/core';
 * @import { CommonModule } from '@angular/common';
 * @import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 * @import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
 * @import radioOptionsData from '../../../../../assets/json/120301/tipos-de-fabricante-exportador.json';
 * @import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';
 * @import { CatalogosSelect } from '../../../../core/models/shared/components.model';
 * @import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
 * @import { TableComponent } from '../../../../shared/components/table/table.component';
 * @import unidadRadioFields from '../../../../../assets/json/220401/unidad.json';
 * @import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
 * @import { HISTORICO_TBCOL } from '../../../../shared/constantes/elegibilidad-de-textiles.enums';
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { 
  CatalogosSelect, 
  
  ConfiguracionColumna, 
  
  SeccionLibQuery, 
  
  SeccionLibState, 
  
  SeccionLibStore, 
  
  TablaSeleccion
 } from '@ng-mf/data-access-user';

import { ElegibilidadDeTextilesStore, TextilesState, createInitialState } from '../../estados/elegibilidad-de-textiles.store';
import { Subject,delay, map, takeUntil, tap } from 'rxjs';
import { CATALOGOS } from '../../constantes/elegibilidad-de-textiles.enums';
import { CommonModule } from '@angular/common';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HistoricoColumns } from '../../models/elegibilidad-de-textiles.model';
import { HttpErrorResponse } from '@angular/common/http';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import radioOptionsData from '@libs/shared/theme/assets/json/120301/tipos-de-fabricante-exportador.json';
import unidadRadioFields from '@libs/shared/theme/assets/json/220401/unidad.json';

@Component({
  selector: 'app-historico-fabricantes',
  templateUrl: './historico-fabricantes.component.html',
  styleUrls: ['./historico-fabricantes.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TableComponent,
    InputRadioComponent,
    TablaDinamicaComponent
  ]
})
export class HistoricoFabricantesComponent implements OnInit {
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
   * @property {string[]} tableColumns - Array de encabezados de columnas de la tabla.
   */

  TablaSeleccion = TablaSeleccion;

  tableColumns: ConfiguracionColumna<HistoricoColumns>[] = [
    { encabezado: 'Nombre del fabricante', 
      clave: (fila) => fila.NombreFabricante, 
      orden: 1 },
    {
      encabezado: 'Número de registro fiscal',
      clave: (fila) => fila.NumeroRegistroFiscal,
      orden: 2,
    },
    {
      encabezado: 'Dirección',
      clave: (fila) => fila.Direccion,
      orden: 3,
    },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.CorreoElectrónico,
      orden: 4,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila) => fila.Telefono,
      orden: 5,
    },
  ];

  /**
   * @property {any[]} fabricantesNacionales - Array de datos de fabricantes nacionales.
   */
  fabricantesNacionales: HistoricoColumns[] = [];

  private destroyNotifier$: Subject<void> = new Subject();

  private historicoState!: TextilesState;

  private seccionState!: SeccionLibState

  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private elegibilidadTextilesService: ElegibilidadTextilesService
  ) { 
    // Constructor logic can be added here if needed
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
              { id: 3, descripcion: "AllValida" }])
          }
        })
      )
      .subscribe();

    this.seccionStore.establecerFormaValida([false])

    if(this.historicoState.formaValida && this.historicoState.formaValida[0] && this.historicoState.formaValida[0].descripcion === 'AllValida'){
    this.seccionStore.establecerSeccion([true]);
    this.seccionStore.establecerFormaValida([true])
  }
  else{
    this.seccionStore.establecerFormaValida([false]);
  }
  }

  initActionFormBuild(): void {
    this.historicoFabricantesForm = this.fb.group({
      exportadorFabricanteMismo: [this.historicoState.exportadorFabricanteMismo,],
      numeroRegistroFiscal: [this.historicoState.numeroRegistroFiscal, [Validators.required, Validators.minLength(5)]],
      fabricantesNacionales: [[]],
    });
  }
  /**
   * @method fetchData
   * @description Obtiene los datos de los fabricantes desde el servicio.
   */
  recuperarDatos(): void {
    this.elegibilidadTextilesService.obtenerTablaDatos<HistoricoColumns>('historico-fabricantes.json').subscribe(
      (response) => {
          this.fabricantesNacionales = response as HistoricoColumns[]
        },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  /**
   * @method onValueChange
   * @description Maneja el cambio de valor del radio.
   * @param {any} newValue - El nuevo valor seleccionado.
   */
  onValueChange(newValue: number|string) {
    this.selectedValue = newValue;
  }

  form!: FormGroup;

  /**
   * @property {CatalogosSelect[]} dropdownConfigs - Configuraciones de los dropdowns.
   */
  dropdownConfigs: CatalogosSelect[] = [
    { labelNombre: 'Delegaciones estatales SAGARPA', required: true, catalogos: CATALOGOS, primerOpcion: '' },
    { labelNombre: 'OSIA', required: true, catalogos: CATALOGOS, primerOpcion: '' },
    { labelNombre: 'Oficina Central', required: true, catalogos: CATALOGOS, primerOpcion: '' },
    { labelNombre: 'Distrito Desarrollo Rural (DDR)', required: false, catalogos: CATALOGOS, primerOpcion: '' }
  ];


  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ElegibilidadDeTextilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    console.log(VALOR);
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }
}