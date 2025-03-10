import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { catalogoResponse, InputRadioComponent } from '@ng-mf/data-access-user';

import { TituloComponent } from '@ng-mf/data-access-user';

// eslint-disable-next-line @nx/enforce-module-boundaries
import radioOptionsData from 'libs/shared/theme/assets/json/220401/tipo-de-certifico.json';

import { AgregarArchivoComponent } from '@ng-mf/data-access-user';

import { CatalogosSelect } from '@ng-mf/data-access-user';
import { SelectCatalogosComponent } from '@ng-mf/data-access-user';
import { TableComponent } from '@ng-mf/data-access-user';

import { Agregar220401Store, solicitud220401State } from '../../../../estados/tramites/agregar220401.store';
import { AgregarQuery } from '../../../../estados/queries/agregar.query';


// eslint-disable-next-line @nx/enforce-module-boundaries
import unidadRadioFields from 'libs/shared/theme/assets/json/220401/unidad.json';

import { map, Subject, takeUntil } from 'rxjs';

import { SeccionStore } from '../../../../estados/seccion.store';
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
export class DatosDelCertificadoComponent implements OnInit, OnDestroy {
  /** Grupo de formulario para manejar la selección de radio */
  formGroup!: FormGroup;
  solicitudForm!:FormGroup;
  /** Opciones de radio cargadas desde un archivo JSON */
  radioOptions = radioOptionsData; // Use imported JSON data
  selectedValue: string = 'Nuevo';
  /** Valor seleccionado actualmente */
  // selectedValue$: Observable<string | number> = this.agregarQuery.selectedValue$;
  defaultSelect: string | number = 'oficina central';
  private destroyNotifier$: Subject<void> = new Subject();
  
  datosdelForm!: FormGroup;
  radioBoton = unidadRadioFields; // import data from Json
  // public datosState!: solicitud220401State;
  public solicitudState!: solicitud220401State;
  estadoJson: catalogoResponse[] = [];

  // eslint-disable-next-line no-empty-function
  constructor(private fb: FormBuilder,
    private agregar220401Store: Agregar220401Store,
    private agregarQuery: AgregarQuery,    
   
) {}
  ngOnInit(): void {
    
    this.agregarQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

      this.datosdelForm= this.fb.group({
        datoscertificado:[this.solicitudState?.datoscertificado],
        certificada: [this.solicitudState?.certificada],
        osia:[this.solicitudState?.osia]
      })

      }
    onValueChange(value: string | number) {
      this.selectedValue = value.toString();
    }
  
  form!: FormGroup; // Declare the `form` property
  // datosdelForm!: FormGroup;

  dropdownConfigs: CatalogosSelect[] = [
    {
      labelNombre: 'Delegaciones estatales SAGARPA',
      required: true,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
    {
      labelNombre: 'OSIA',
      required: true,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
    {
      labelNombre: 'Oficina Central',
      required: true,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
    {
      labelNombre: 'Distrito Desarrollo Rural (DDR)',
      required: false,
      catalogos: DatosDelCertificadoComponent.getCatalogos(),
      primerOpcion: '',
    },
  ];

  /**
   * Retrieves a list of catalog items.
   *
   * @returns An array of catalog objects, each containing an `id` and a `descripcion`.
   */
  private static getCatalogos(): { id: number; descripcion: string }[] {
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


 /**
   * Establece el valor de un campo en el store de Tramite31601.
   *
   * @param {FormGroup} form - El grupo de formularios que contiene el campo.
   * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
   * @param {keyof Tramite31601Store} metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
 setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Agregar220401Store): void {
  const VALOR = form.get(campo)?.value;
 console.log("abc", VALOR);
  (this.agregar220401Store[metodoNombre] as (value: string) => void)(VALOR);
}

/**
 * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
 * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
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

  
}
