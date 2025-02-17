import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import radioOptionsData from '../../../../../assets/json/120301/tipos-de-fabricante-exportador.json';
import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import unidadRadioFields from '../../../../../assets/json/220401/unidad.json';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { HistoricoFabricantesService } from '../../../../core/services/120301/historico-fabricantes/historico-fabricantes.service';

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
export class HistoricoFabricantesComponent implements OnInit {
  formGroup!: FormGroup;
  radioOptions = radioOptionsData;
  selectedValue: string | number = '';
  defaultSelect: string | number = '';
  radioBoton = unidadRadioFields;

  tableColumns = [
    'Nombre del fabricante',
    'Número de registro fiscal',
    'Dirección',
    'Correo Electrónico',
    'Teléfono',
  ];

  fabricantesNacionales: any[] = [];
  fabricantesDatos: any[] = [];

  constructor(private fb: FormBuilder, private historicoFabricantesService: HistoricoFabricantesService) {}

  ngOnInit(): void {
    this.fetchData();
    this.formGroup = this.fb.group({
      seleccion: [this.selectedValue]
    });
  }

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
        console.error('Error while fetching the data:', error);
        this.fabricantesNacionales = [];
        this.fabricantesDatos = [];
      }
    });
  }

  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }

  form!: FormGroup;

  dropdownConfigs: CatalogosSelect[] = [
    { labelNombre: 'Delegaciones estatales SAGARPA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'OSIA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'Oficina Central', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'Distrito Desarrollo Rural (DDR)', required: false, catalogos: this.getCatalogos(), primerOpcion: '' }
  ];

  private getCatalogos() {
    return [
      { id: 1, descripcion: 'Option 1' },
      { id: 2, descripcion: 'Option 2' },
      { id: 3, descripcion: 'Option 3' }
    ];
  }

  seleccionar(e: any) {}

  cargarArchivo() {}

  agregar() {}
}