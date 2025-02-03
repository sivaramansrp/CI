
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import radioOptionsData from '../../../../../assets/json/220401/tipo-de-certifico.json'
import { AgregarArchivoComponent } from '../../../../shared/components/agregar-archivo/agregar-archivo.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import unidadRadioFields from '../../../../../assets/json/220401/unidad.json'
/**
 * DatosDelComponent es un componente que maneja la selección de opciones de radio y muestra otros componentes basados en la selección.
 */
@Component({
  selector: 'app-datos-del',
  templateUrl: './datos-del.component.html',
  standalone: true,
  styleUrl: './datos-del.component.scss',
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
export class DatosDelComponent implements OnInit {
  /** Grupo de formulario para manejar la selección de radio */
  formGroup!: FormGroup;
  /** Opciones de radio cargadas desde un archivo JSON */
  radioOptions = radioOptionsData; // Use imported JSON data
  /** Valor seleccionado actualmente */
  selectedValue: string | number = 'option1'; // Update the type to string | number

  /** Datos de los botones de radio importados desde un archivo JSON */
  radioBoton = unidadRadioFields;

    /**
   * Constructor para inyectar FormBuilder
   * @param fb - Instancia de FormBuilder
   */
    constructor(private fb: FormBuilder) {}
      /**
   * Inicializa el componente y configura el grupo de formulario.
   */
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      seleccion: [this.selectedValue]
    });
  }
   /**
   * Maneja el evento de cambio de valor y actualiza el valor seleccionado.
   * @param newValue - El nuevo valor seleccionado.
   */
  onValueChange(newValue: any) {
    console.log('Selected Value:', newValue);
    this.selectedValue = newValue;
  }
    /** Grupo de formulario adicional */
  form!: FormGroup; // Declare the `form` property
  /** Configuraciones de los dropdowns */
  dropdownConfigs: CatalogosSelect[] = [
    { labelNombre: 'Delegaciones estatales SAGARPA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'OSIA', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'Oficina Central', required: true, catalogos: this.getCatalogos(), primerOpcion: '' },
    { labelNombre: 'Distrito Desarrollo Rural (DDR)', required: false, catalogos: this.getCatalogos(), primerOpcion: '' }
  ];
  /**
   * Obtiene los datos de los catálogos.
   * @returns Un array de objetos de catálogo.
   */
  private getCatalogos() {
    return [
      { id: 1, descripcion: 'Option 1' },
      { id: 2, descripcion: 'Option 2' },
      { id: 3, descripcion: 'Option 3' }
    ];
  }
  /** Columnas de la tabla */
  tableColumns = [
    'No. partida',
    'Fracción arancelaria',
    'Descripción de la fracción',
    'Unidad de medida de tarifa (UMT)',
    'Cantidad (UMT)',
    'Unidad de medida de comercialización (UMC)',
    'Cantidad (UMC)'
  ];
  /** Datos de las mercancías */
   mercanciasData = [
    {
      tbodyData: ['Establecimiento 1','123-456-7890','correo','Actividad 1','Otro detalle','Certificado 001','Domicilio 1'],
    }
  ]
 /**
   * Maneja la selección de un elemento.
   * @param e - El elemento seleccionado.
   */
  seleccionar(e:any){
    console.log(e)
  }
   /** Maneja la carga de archivos */
  cargarArchivo(){

  }
  /** Agrega un nuevo elemento */
  agregar(){}
  

}
