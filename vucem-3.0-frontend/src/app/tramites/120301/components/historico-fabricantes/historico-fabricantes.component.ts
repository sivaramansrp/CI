import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
// import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import radioOptionsData from '../../../../../assets/json/120301/tipos-de-fabricante-exportador.json'

import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import unidadRadioFields from '../../../../../assets/json/220401/unidad.json'
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
@Component({
  selector: 'historico-fabricantes',
  templateUrl: './historico-fabricantes.component.html',
  styleUrl: './historico-fabricantes.component.scss',
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
/** Grupo de formulario para manejar la selección de radio */
formGroup!: FormGroup;
/** Opciones de radio cargadas desde un archivo JSON */
radioOptions = radioOptionsData; // Use imported JSON data
/** Valor seleccionado actualmente */
selectedValue: string | number = ''; // Update the type to string | number
defaultSelect:string | number = '';

radioBoton = unidadRadioFields // import data from Json

constructor(private fb: FormBuilder) {

}
ngOnInit(): void {
  this.formGroup = this.fb.group({
    seleccion: [this.selectedValue]
  });
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
onValueChange(newValue: any) {
  this.selectedValue = newValue;
}
form!: FormGroup; // Declare the `form` property

dropdownConfigs: CatalogosSelect[] = [
  { labelNombre: 'Delegaciones estatales SAGARPA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
  { labelNombre: 'OSIA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
  { labelNombre: 'Oficina Central', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
  { labelNombre: 'Distrito Desarrollo Rural (DDR)', required: false, catalogos: this.getCatalogos(), primerOpcion: '' }
];

  /**
 * Retrieves a list of catalog items.
 *
 * @returns An array of catalog objects, each containing an `id` and a `descripcion`.
 */
private getCatalogos() {
  return [
    { id: 1, descripcion: 'Option 1' },
    { id: 2, descripcion: 'Option 2' },
    { id: 3, descripcion: 'Option 3' }
  ];
}

febricantescolumnas = [
  'Nombre del fabricante',
  'Número de registro fiscal',
  'Dirección',
  'Carreo Electrónico',
  'Teléfono',
];

febricantesDatos = [
  {
    tbodyData: ['LAURA CONTRERAS','AEVL621207B95','SAN GABRIEL 144 DURANGO','laura2992@hotmail.com','044-6182999535'],
  }
]
febricantescolumnas2 = [
  'Nombre del fabricante',
  'Número de registro fiscal',
  'Dirección',
  'Carreo Electrónico',
  'Teléfono',
];

febricantesDatos2 = [
  {
    tbodyData: ['LUIS AMBROSIO MARTINEZ VALENZUELA','MAVL621207C95','SAN GABRIEL 144 DURANGO','arual2992@hotmail.com','044-6182999535'],
  }
]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
seleccionar(e:any){
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
cargarArchivo(){

}
// eslint-disable-next-line @typescript-eslint/no-empty-function
agregar(){}


}
