import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import radioOptionsData from '../../../../../assets/json/220401/tipo-de-certifico.json'

import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import unidadRadioFields from '../../../../../assets/json/220401/unidad.json'


@Component({
  selector: 'app-facturas-asociadas',
  templateUrl: './facturas-asociadas.component.html',
  styleUrl: './facturas-asociadas.component.scss',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    AgregarArchivoComponent,
    SelectCatalogosComponent,
    TableComponent
  ]
})
export class FacturasAsociadasComponent implements OnInit {
/** Grupo de formulario para manejar la selección de radio */
formGroup!: FormGroup;
/** Opciones de radio cargadas desde un archivo JSON */
radioOptions = radioOptionsData; // Use imported JSON data
/** Valor seleccionado actualmente */
selectedValue: string | number = 'option1'; // Update the type to string | number
defaultSelect:string | number = 'oficina central';

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

tableColumns = [
  'Número de la factura',
  'Razón social',
  'Domicilio',
  'Fecha de expedición de la factura',
  'Cantidad total',
  'Cantidad disponible',
  'disponible	Unidad de medida',
  'Valor en dólares'
];

 mercanciasData = [
  {
    tbodyData: ['5','FACTURA 1','CALLE','2024-11-07 00:00:00.0 GMT 06:00','100','9','Kilogramos','100.0'],
  }
]
asociadastableColumns = [
  'Canidad asociada',
  'Número de la factura',
  'Razón social',
  'Domcilio',
  'Fecha de expedición de la factura',
  'Candidad total',
  'Cantidad disponible',
  'Valor en dólares'
];

asociadastableData = [
  {
    tbodyData: ['prueba leav26agosto2024','ESPERANCITAS.CO','CALLE PRUEBA','2024-11-07 00:00:00.0 GMT 06:00','90','10','Kilogramos','100.0'],
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
