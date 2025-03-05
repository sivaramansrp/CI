import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import radioOptionsData from 'libs/shared/theme/assets/json/220401/tipo-de-certifico.json';

import { AgregarArchivoComponent } from '@ng-mf/data-access-user';
import { CatalogosSelect } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import unidadRadioFields from 'libs/shared/theme/assets/json/220401/unidad.json';
@Component({
  selector: 'app-datos-del-certificado',
  templateUrl: './datos-del-certificado.component.html',
  standalone: true,
  styleUrl: './datos-del-certificado.component.scss',
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    AgregarArchivoComponent,
    SelectCatalogosComponent,
    TableComponent,
  ],
})
export class DatosDelCertificadoComponent implements OnInit {
  /** Grupo de formulario para manejar la selección de radio */
  formGroup!: FormGroup;
  /** Opciones de radio cargadas desde un archivo JSON */
  radioOptions = radioOptionsData; // Use imported JSON data
  /** Valor seleccionado actualmente */
  selectedValue: string | number = 'option1'; // Update the type to string | number
  defaultSelect: string | number = 'oficina central';

  radioBoton = unidadRadioFields; // import data from Json

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      seleccion: [this.selectedValue],
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }
  form!: FormGroup; // Declare the `form` property

  dropdownConfigs: CatalogosSelect[] = [
    {
      labelNombre: 'Delegaciones estatales SAGARPA',
      required: true,
      catalogos: this.getCatalogos(),
      primerOpcion: '',
    },
    {
      labelNombre: 'OSIA',
      required: true,
      catalogos: this.getCatalogos(),
      primerOpcion: '',
    },
    {
      labelNombre: 'Oficina Central',
      required: true,
      catalogos: this.getCatalogos(),
      primerOpcion: '',
    },
    {
      labelNombre: 'Distrito Desarrollo Rural (DDR)',
      required: false,
      catalogos: this.getCatalogos(),
      primerOpcion: '',
    },
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
      { id: 3, descripcion: 'Option 3' },
    ];
  }

  tableColumns = [
    'No. partida',
    'Fracción arancelaria',
    'Descripción de la fracción',
    'Unidad de medida de tarifa (UMT)',
    'Cantidad (UMT)',
    'Unidad de medida de comercialización (UMC)',
    'Cantidad (UMC)',
  ];

  mercanciasData = [
    {
      tbodyData: [
        'Establecimiento 1',
        '123-456-7890',
        'correo',
        'Actividad 1',
        'Otro detalle',
        'Certificado 001',
        'Domicilio 1',
      ],
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seleccionar(e:any){
  }
  
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cargarArchivo() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  agregar() {}
}
