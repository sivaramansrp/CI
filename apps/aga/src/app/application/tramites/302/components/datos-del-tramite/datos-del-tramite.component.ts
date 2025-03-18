/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { FormularioDinamico } from '@libs/shared/data-access-user/src/core/models/shared/forms-model';
import { InputCheckComponent } from '@libs/shared/data-access-user/src/tramites/components/input-check/input-check.component';
import {
  AlertComponent,
  Catalogo,
  CatalogosSelect,
  ConfiguracionColumna,
  SelectCatalogosComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  DATOS_ALERT,
  DATOS_DEL_DONANTE,
  DOMICILIO_FISCAL,
  MERCANCIAS,
  PRODUCTOS,
} from '../../constantes/datos-del-tramite.enum';
import { DetallesDelProducto } from '../../models/certi-registro.model';
import { FormulariosDeCertiRegistroComponent } from '../formularios-de-certi-registro/formularios-de-certi-registro.component';

@Component({
  selector: 'datos-del-tramite',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCheckComponent,
    SelectCatalogosComponent,
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    FormulariosDeCertiRegistroComponent,
  ],
  templateUrl: './datos-del-tramite.component.html',
  styleUrl: './datos-del-tramite.component.scss',
})
export class DatosDelTramiteComponent implements OnInit {
  @ViewChild('modalAgregarProductos') modalElement!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  form: FormGroup = this.fb.group({});
  mercancia = MERCANCIAS;
  productos = PRODUCTOS;
  datosDelDonante = DATOS_DEL_DONANTE;
  domicilioFiscal = DOMICILIO_FISCAL;
  public listaDeOficinasDeAduanas: CatalogosSelect = {
    labelNombre: 'Aduana por la que ingresará la mercancía',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'Opción 1',
      },
      {
        id: 2,
        descripcion: 'Opción 1',
      },
    ],
  };

  public listImportacionTemporal: CatalogosSelect = {
    labelNombre: 'Ano de importacion temporal',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'Opción 1',
      },
      {
        id: 2,
        descripcion: 'Opción 2',
      },
    ],
  };

  public listaUnidadDeMedida: CatalogosSelect = {
    labelNombre: 'Unidad de medida',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: [
      {
        id: 1,
        descripcion: 'Opción 1',
      },
      {
        id: 2,
        descripcion: 'Opción 2',
      },
      {
        id: 3,
        descripcion: 'Opción 3',
      },
    ],
  };

  /**
   * Array que contiene los datos de las personas cargadas desde el archivo JSON.
   * @type {DetallesDelProducto[]}
   */
  detallesDelProducto: DetallesDelProducto[] = [];
  TablaSeleccion = TablaSeleccion;
  configuracionTabla: ConfiguracionColumna<any>[] = [
    {
      encabezado: 'Tipo de mercancia',
      clave: (item: any) => item.tipoDeMercancia,
      orden: 1,
    },
    { encabezado: 'Cantidad', clave: (item: any) => item.cantidad, orden: 2 },
    {
      encabezado: 'Unidad de medida de commercializacion',
      clave: (item: any) => item.unidadDeMedida,
      orden: 3,
    },
    {
      encabezado: 'Ano de importacion temporal',
      clave: (item: any) => item.anoDeImportacion,
      orden: 4,
    },
    {
      encabezado: 'Modelo',
      clave: (item: any) => item.modelo,
      orden: 5,
    },
    {
      encabezado: 'Marca',
      clave: (item: any) => item.marca,
      orden: 6,
    },
    {
      encabezado: 'Numero De Serie',
      clave: (item: any) => item.numeroDeSerie,
      orden: 7,
    },
  ];

  modal: string = 'modal';
  modalConfirmación: string = 'modal';
  formAgregarProductos: FormGroup = this.fb.group({});
  formDatosDelDonante: FormGroup = this.fb.group({});
  formDomicilioFiscal: FormGroup = this.fb.group({});

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y de advertencia.
   *
   * @type {DATOS_ALERT}
   * @memberof DatosDelTramiteComponent
   */
  public DATOS_ALERT = DATOS_ALERT.message;

  constructor(
    private fb: FormBuilder
  ) // eslint-disable-next-line no-empty-function
  {}

  ngOnInit() {
    this.inicializarFormGroup(this.form, MERCANCIAS);
    this.inicializarFormGroup(this.formAgregarProductos, PRODUCTOS);
    this.inicializarFormGroup(this.formDatosDelDonante, DATOS_DEL_DONANTE);
    this.inicializarFormGroup(this.formDomicilioFiscal, DOMICILIO_FISCAL);
  }

  /** Esta función inicializa un FormGroup agregando FormControls basados 
   * en la configuración de formData, añadiendo listas 
   * desplegables a campos específicos. */

  inicializarFormGroup(formName: FormGroup, formData: any) {
    if (formName) {
      formData.forEach((campo: any) => {
        const VALIDATORS = this.mapValidadores(campo?.validators);
        formName.addControl(
          campo.campo,
          new FormControl({ value: '', disabled: campo.disabled }, VALIDATORS)
        );

        if (campo.campo === 'unidadDeMedida') {
          campo.listaDesplegable = this.listaUnidadDeMedida;
        }

        if (campo.campo === 'anoDeImportacionTemporal') {
          campo.listaDesplegable = this.listImportacionTemporal;
        }
      });
    }
  }

  /** Convierte nombres de validadores en funciones de validación. */
  // eslint-disable-next-line class-methods-use-this
  mapValidadores = (validators: string[]): ValidatorFn[] => {
    const FORM_VALIDATORS: ValidatorFn[] = [];
    if (validators.includes('required')) {
      FORM_VALIDATORS.push(Validators.required);
    }
    return FORM_VALIDATORS;
  };

  /** Asigna la descripción del catálogo seleccionado al control del formulario. */
  // eslint-disable-next-line class-methods-use-this
  docSeleccionado(event: Catalogo, form: FormGroup, formControl: string) {
    form?.get(formControl)?.setValue(event?.descripcion);
  }

  abrirModal() {
    this.modal = 'show';
  }

  cerrarModal() {
    this.closeModal.nativeElement.click();
  }

  agregarAgente() {
    if (!this.formAgregarProductos.valid) {
      return;
    }
    const PRODUCTOS = this.formAgregarProductos.value;
    this.detallesDelProducto.push(PRODUCTOS);
    this.formAgregarProductos.reset();
    this.cerrarModal();
    this.modalConfirmación = 'show';
  }

  // eslint-disable-next-line class-methods-use-this
  listaDeFilaSeleccionada(event: any) {
    console.log(event);
  }
}
