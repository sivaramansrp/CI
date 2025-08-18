import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231002/solicitud.model';
import { CommonModule } from '@angular/common';
import { EstadoFormularioResiduo } from '../../models/datos-residuos.model';
import { FormularioResiduoQuery } from '../../estados/queries/datos-residuos.query';
import { FormularioResiduoStore } from '../../estados/tramites/datos-residuos.store';
import rawData from '@libs/shared/theme/assets/json/231002/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 * Se hace un cast del JSON importado al tipo `SolicitudJson`.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;

/**
 * Componente encargado de manejar la sección de datos de residuos peligrosos.
 */
@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
    TableComponent
  ],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.scss'
})
export class DatosResiduosPeligrososComponent implements OnInit {
  /** Formulario para los datos generales del residuo. */
  formularioDatos!: FormGroup;

  /** Formulario para los detalles del residuo peligroso. */
  formularioResiduo!: FormGroup;

  /** Opciones para el campo de selección de residuos peligrosos. */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /** Opciones de clasificación del residuo. */
  clasificacionRadioOptions: RadioOpcion[] = RADIO_OPCIONES?.clasificacionRadioOptions;

  /** Estructura de datos completa de etiquetas y opciones del JSON. */
  etiquetasForm = RADIO_OPCIONES;

  /**
   * Constructor del componente.
   * 
   * @param fb - Servicio para construir formularios reactivos.
   * @param formularioStore - Store Akita que gestiona el estado del formulario.
   * @param formularioQuery - Query Akita para consultar el estado del formulario.
   */
  constructor(
    public fb: FormBuilder,
    private formularioStore: FormularioResiduoStore,
    private formularioQuery: FormularioResiduoQuery
  ) {}

  /**
   * Inicializa el componente cargando formularios y recuperando datos del store.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.crearFormularioResiduo();
    this.recuperarValoresDesdeStore();
  }

  /**
   * Inicializa el formulario de datos generales de la materia prima.
   */
  private inicializarFormulario(): void {
    this.formularioDatos = this.fb.group({
      numero: ['', Validators.required],
      nombreMateriaPrima: ['', Validators.required],
      cantidad: [{ value: '', disabled: true }],
      cantidadLetra: [{ value: '', disabled: true }],
      unidadDeMedida: [{ value: '', disabled: true }],
      fraccionArancelaria: [{ value: '', disabled: true }]
    });
  }

  /**
   * Crea el formulario de captura para datos del residuo peligroso.
   */
  private crearFormularioResiduo(): void {
    this.formularioResiduo = this.fb.group({
      fraccionArancelaria: ['', Validators.required],
      nico: ['', Validators.required],
      acotacion: [{ value: '', disabled: true }, Validators.required],
      residuoPeligroso: ['', Validators.required],
      cantidad: ['', [
        Validators.required,
        Validators.pattern(/^\d+(\.\d+)?$/),
        DatosResiduosPeligrososComponent.noCommaValidator,
        DatosResiduosPeligrososComponent.maxDigitsValidator
      ]],
      cantidadLetra: [{ value: '', disabled: true }],
      unidadMedida: ['', Validators.required],
      clasificacion: ['', Validators.required],
      claveResiduo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      creti: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      manifiesto: ['', Validators.required],
      tipoContenedor: ['', Validators.required],
      capacidad: ['', Validators.required]
    });
  }

  /**
   * Restaura los valores de los formularios a partir del estado en el store.
   */
  private recuperarValoresDesdeStore(): void {
    const ESTADO = this.formularioQuery.getValue();
    this.formularioDatos.patchValue(ESTADO.formularioDatos, { emitEvent: false });
    this.formularioResiduo.patchValue(ESTADO.formularioResiduo, { emitEvent: false });
  }

  /**
   * Validator personalizado para verificar que no se ingrese coma.
   */
  private static noCommaValidator(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (VALUE && VALUE.includes(',')) {
      return { noComma: true };
    }
    return null;
  }

  /**
   * Validator personalizado para verificar el máximo de 6 dígitos significativos.
   */
  private static maxDigitsValidator(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (VALUE) {
      const REGEX = /^(\d{1,6})(\.\d{1,6})?$/;
      if (!REGEX.test(VALUE)) {
        return { maxDigits: true };
      }
    }
    return null;
  }

  /**
   * Actualiza un campo del formulario de datos generales en el store.
   *
   * @param field - Campo del formulario a actualizar.
   */
  actualizarCampoFormularioDatos(field: keyof EstadoFormularioResiduo['formularioDatos']): void {
    const VALOR = this.formularioDatos.get(field)?.value;
    this.formularioStore.actualizarFormularioDatos({
      ...this.formularioDatos.getRawValue(),
      [field]: VALOR
    });
  }

  /**
   * Actualiza un campo del formulario de residuos peligrosos en el store.
   *
   * @param field - Campo del formulario a actualizar.
   */
  actualizarCampoFormularioResiduo(field: keyof EstadoFormularioResiduo['formularioResiduo']): void {
    const VALOR = this.formularioResiduo.get(field)?.value;
    this.formularioStore.actualizarFormularioResiduo({
      ...this.formularioResiduo.getRawValue(),
      [field]: VALOR
    });
  }
}
