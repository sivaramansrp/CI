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
 * @import { HistoricoFabricantesService } from '../../../../core/services/120301/historico-fabricantes/historico-fabricantes.service';
 * @import { ServiciosElegibilidadDeTextilesService } from '../../../../core/services/120301/servicios-elegibilidad-de-textiles.service';
 * @import { HISTORICO_TBCOL } from '../../../../shared/constantes/elegibilidad-de-textiles.enums';
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import radioOptionsData from '../../../../../assets/json/120301/tipos-de-fabricante-exportador.json';
import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import unidadRadioFields from '../../../../../assets/json/220401/unidad.json';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { HistoricoFabricantesService } from '../../../../core/services/120301/historico-fabricantes/historico-fabricantes.service';
import { ServiciosElegibilidadDeTextilesService } from '../../../../core/services/120301/servicios-elegibilidad-de-textiles.service';
import { HISTORICO_TBCOL } from '../../../../shared/constantes/elegibilidad-de-textiles.enums';

@Component({
  selector: 'historico-fabricantes',
  templateUrl: './historico-fabricantes.component.html',
  styleUrls: ['./historico-fabricantes.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    TableComponent,
    InputRadioComponent
  ]
})
export class HistoricoFabricantesComponent implements OnInit, OnDestroy {
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
  tableColumns = HISTORICO_TBCOL;

  /**
   * @property {any[]} fabricantesNacionales - Array de datos de fabricantes nacionales.
   */
  fabricantesNacionales: any[] = [];

  /**
   * @property {any[]} fabricantesDatos - Array de datos de fabricantes.
   */
  fabricantesDatos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private historicoFabricantesService: HistoricoFabricantesService,
    private readonly serviciosElegibilidadDeTextilesService: ServiciosElegibilidadDeTextilesService
  ) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de los fabricantes.
   */
  ngOnInit(): void {
    this.fetchData();
    this.historicoFabricantesForm = this.fb.group({
      exportadorFabricanteMismo: ['', Validators.required],
      numeroRegistroFiscal: ['', [Validators.required, Validators.minLength(5)]],
      fabricantesNacionales: [[]],
      fabricantesDatos: [[]]
    });
  }

  /**
   * @method fetchData
   * @description Obtiene los datos de los fabricantes desde el servicio.
   */
  fetchData(): void {
    this.historicoFabricantesService.getDatos().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.fabricantesNacionales) && Array.isArray(response.fabricantesDatos)) {
          this.fabricantesNacionales = response.fabricantesNacionales.map((item) => {
            return { tbodyData: item.tbodyData };
          });

          this.fabricantesDatos = response.fabricantesDatos.map((item) => {
            return { tbodyData: item.tbodyData };
          });
        } else {
          console.error('La respuesta de la API no tiene el formato esperado:', response);
          this.fabricantesNacionales = [];
          this.fabricantesDatos = [];
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los datos:', error);
        this.fabricantesNacionales = [];
        this.fabricantesDatos = [];
      }
    });
  }

  /**
   * @method onValueChange
   * @description Maneja el cambio de valor del radio.
   * @param {any} newValue - El nuevo valor seleccionado.
   */
  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }

  form!: FormGroup;

  /**
   * @property {CatalogosSelect[]} dropdownConfigs - Configuraciones de los dropdowns.
   */
  dropdownConfigs: CatalogosSelect[] = [
    { labelNombre: 'Delegaciones estatales SAGARPA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'OSIA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'Oficina Central', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'Distrito Desarrollo Rural (DDR)', required: false, catalogos: this.getCatalogos(), primerOpcion: '' }
  ];

  /**
   * @method getCatalogos
   * @description Obtiene los catálogos para los dropdowns.
   * @returns {any[]} Array de catálogos.
   */
  private getCatalogos() {
    return [
      { id: 1, descripcion: 'Option 1' },
      { id: 2, descripcion: 'Option 2' },
      { id: 3, descripcion: 'Option 3' }
    ];
  }

  /**
   * @method ngOnDestroy
   * @description Guarda el estado del formulario antes de destruir el componente.
   */
  ngOnDestroy(): void {
    this.serviciosElegibilidadDeTextilesService.setSoliciante('historicoFabricantesForm', this.historicoFabricantesForm.value);
  }
}