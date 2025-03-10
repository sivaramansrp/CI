import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Catalogo,
  catalogoResponse,
  CatalogoSelectComponent,
  InputRadioComponent,
} from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import radioOptionsData from 'libs/shared/theme/assets/json/220401/tipo-de-certifico.json';
import { AgregarArchivoComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
import unidadRadioFields from 'libs/shared/theme/assets/json/220401/unidad.json';
import { Pantallas220401Service } from '../pantallas220401.service';
import { Observable } from 'rxjs';

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
    TableComponent,
    CatalogoSelectComponent,
  ],
})
export class DatosDelCertificadoComponent implements OnInit {
  /**
   * Lista de delegaciones obtenidas desde la API.
   */
  delegacionesJson: catalogoResponse[] = [];

  /**
   * Grupo de formulario principal para la selección de opciones.
   */
  formGroup1!: FormGroup;

  /**
   * Grupo de formulario para manejar la selección de radio.
   */
  formGroup!: FormGroup;

  /**
   * Opciones de radio cargadas desde un archivo JSON.
   */
  radioOptions = radioOptionsData;

  /**
   * Valor seleccionado actualmente en el radio.
   */
  selectedValue: string | number = 'option1';

  /**
   * Valor predeterminado de selección.
   */
  defaultSelect: string | number = 'oficina central';

  /**
   * Configuración de botones de radio basada en datos importados.
   */
  radioBoton = unidadRadioFields;

  /**
   * Configuración de catálogos usados en los selectores.
   */
  catalogConfigs = [
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl',
      required: true,
    },
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl2',
      required: true,
    },
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl3',
      required: true,
    },
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl4',
      required: false,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private _pantallas220401Service: Pantallas220401Service
  ) {}

  /**
   * Inicializa el componente y configura los formularios.
   */
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      tipoCertificado: ['', Validators.required],
      message: [{ value: '', disabled: true }],
    });

    this.formGroup1 = this.fb.group({});
    this.catalogConfigs.forEach((config) => {
      this.formGroup1.addControl(
        config.controlName,
        new FormControl('', Validators.required)
      );
    });
    this.loaddataDelegacionesData();

    this._pantallas220401Service.getState().subscribe((state) => {
      this.catalogConfigs.forEach((config) => {
        if (state[config.controlName]) {
          this.formGroup1
            .get(config.controlName)
            ?.setValue(state[config.controlName]);
        }
      });
    });
  }

  /**
   * Carga los datos de delegaciones desde el servicio y actualiza la configuración de los catálogos.
   */
  loaddataDelegacionesData(): void {
    console.log('getDelegaciones');
    this._pantallas220401Service.getDelegacionesData().subscribe((data) => {
      this.delegacionesJson = data;
      this.updateCatalogConfigs();
    });
  }

  /**
   * Actualiza la configuración de los catálogos con los nuevos datos de delegaciones.
   */
  updateCatalogConfigs(): void {
    this.catalogConfigs.forEach((config) => {
      config.catalogo = this.delegacionesJson;
    });
  }

  /**
   * Obtiene las delegaciones seleccionadas y las guarda en el estado global.
   */
  getDelegaciones() {
    const SELECTED_DELEGCIONES = this.catalogConfigs.map((config) => ({
      controlName: config.controlName,
      value: this.formGroup1.get(config.controlName)?.value,
    }));
    SELECTED_DELEGCIONES.forEach((delegacion) => {
      this._pantallas220401Service.setState(
        delegacion.controlName,
        delegacion.value
      );
    });
  }

  /**
   * Maneja el cambio de valor en el input de radio.
   * @param newValue Nuevo valor seleccionado.
   */
  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }

  form!: FormGroup;

  /**
   * Columnas de la tabla de datos de mercancías.
   */
  tableColumns = [
    'No. partida',
    'Fracción arancelaria',
    'Descripción de la fracción',
    'Unidad de medida de tarifa (UMT)',
    'Cantidad (UMT)',
    'Unidad de medida de comercialización (UMC)',
    'Cantidad (UMC)',
  ];

  /**
   * Datos de la tabla de mercancías.
   */
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

  seleccionar(e: any) {}
  cargarArchivo() {}
  agregar() {}
}
