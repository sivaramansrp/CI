/**
 * Importaciones necesarias para el componente DatosDelCertificado.
 */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
/**
 * Importaciones necesarias para el componente DatosDelCertificado.
 */
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
/** Importación de componentes reutilizables y modelos. */
import {
  Catalogo,
  CatalogoResponse,
  CatalogoSelectComponent,
  ConsultaioQuery,
  InputRadioComponent,
} from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
/** Datos de opciones para el componente de radio desde un archivo JSON. */

// eslint-disable-next-line @nx/enforce-module-boundaries
import radioOptionsData from 'libs/shared/theme/assets/json/220401/tipo-de-certifico.json';
import { AgregarArchivoComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';
/** Importación del store y estado para la gestión de la solicitud. */

import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';
/** Campos de radio desde un archivo JSON. */

// eslint-disable-next-line @nx/enforce-module-boundaries
import unidadRadioFields from 'libs/shared/theme/assets/json/220401/unidad.json';

import { map, Subject, takeUntil } from 'rxjs';

import { Pantallas220401Service } from '../pantallas220401.service';
import { Observable } from 'rxjs';
/**
 * Componente que gestiona los datos del certificado en la solicitud 220401.
 */

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
export class DatosDelCertificadoComponent implements OnInit, OnDestroy {
 
  /** Formulario principal para la solicitud. */
  solicitudForm!:FormGroup;
 /** Opciones de radio importadas desde JSON. */
  radioOptions = radioOptionsData; // Use imported JSON data
  selectedValue: string = 'Nuevo';
 /** Valor seleccionado en el componente de radio. */
  defaultSelect: string | number = 'oficina central';
  /** Notificador para destruir las suscripciones al salir del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Formulario de datos del certificado. */
  datosdelForm!: FormGroup;
  radioBoton = unidadRadioFields; // import data from Json
  public solicitudState!: solicitud220401State;
  estadoJson: CatalogoResponse[] = [];

  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor del componente, inyecta los servicios necesarios.
   */

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder,
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery, 
    private _pantallas220401Service: Pantallas220401Service,
    private consultaioQuery: ConsultaioQuery,  
   
) {
  this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.esFormularioSoloLectura = true;
          // this.inicializarEstadoFormulario();
        })
      )
      .subscribe()
}
/**
   * Inicialización del componente.
   */
  ngOnInit(): void {
    this.datosdelForm = this.fb.group({
      tipoCertificado: ['', Validators.required],
      message: [{ value: '', disabled: true }],
    });

    this.formGroup1 = this.fb.group({});
    /** Suscripción para obtener el estado de la solicitud. */
    this.agregarQuery.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.solicitudState = seccionState;
      })
    )
    .subscribe();
    this.formGroup1= this.fb.group({
      osia:[this.solicitudState?.osia]
    });
    
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

      this.datosdelForm= this.fb.group({
        datoscertificado:[this.solicitudState?.datoscertificado],
        certificada: [this.solicitudState?.certificada],
      })

      }
      /**
   * Maneja los cambios en el valor seleccionado.
   */
  
      onValueChange(value: string | number) {
        this.selectedValue = value.toString();
      }
  
    loaddataDelegacionesData(): void {
      this._pantallas220401Service.getDelegacionesData().subscribe((data) => {
        this.delegacionesJson = data;
        this.updateCatalogConfigs();
      });
    }
    updateCatalogConfigs(): void {
      this.catalogConfigs.forEach((config) => {
        config.catalogo = this.delegacionesJson;
      });
    }
  

  delegacionesJson: CatalogoResponse[] = [];

  
  formGroup1!: FormGroup;

  catalogConfigs = [
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl',
      required: true,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl2',
      required: true,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl3',
      required: true,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
    {
      catalogo: this.delegacionesJson,
      label: 'Delegaciones estatales SAGARPA',
      controlName: 'delegacionesControl4',
      required: false,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
  ];
  
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
   * Limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  
  }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-function, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function, class-methods-use-this, @typescript-eslint/explicit-function-return-type
    seleccionar(e:any){}
    
    // eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this, no-empty-function, @typescript-eslint/explicit-function-return-type
    cargarArchivo() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function, class-methods-use-this, @typescript-eslint/explicit-function-return-type, no-empty-function
    agregar() {}
  
   
    
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
    setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
      const VALOR = form.get(campo)?.value;
    (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
    }
    
 
  private static getCatalogos(): { id: number; descripcion: string }[] {
    return [
      { id: 1, descripcion: 'Option 1' },
      { id: 2, descripcion: 'Option 2' },
      { id: 3, descripcion: 'Option 3' },
    ];
 
}
}