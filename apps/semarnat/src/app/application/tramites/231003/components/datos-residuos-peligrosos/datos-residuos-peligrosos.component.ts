import { CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model'
import { CommonModule } from '@angular/common';
import { EstadoFormularioResiduo } from '../../models/datos-residuos.model';
import { FormularioResiduoQuery } from '../../estados/queries/datos-residuos.query';
import { FormularioResiduoStore } from '../../estados/tramites/datos-residuos.store';
import rawData from '@libs/shared/theme/assets/json/231003/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 * Se hace un cast del JSON importado al tipo `SolicitudJson`.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;

/**
 * Componente encargado de manejar la sección de datos de residuos peligrosos.
 * Es un componente standalone que importa módulos y componentes necesarios para su funcionamiento.
 */

@Component({
  selector: 'app-datos-residuos-peligrosos',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    ReactiveFormsModule, InputRadioComponent, CatalogoSelectComponent, TableComponent],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.scss',
})
export class DatosResiduosPeligrososComponent implements OnInit {
  /** 
  * Formulario reactivo que contiene los datos generales del residuo. 
  */
  formularioDatos!: FormGroup;

  /** 
   * Formulario reactivo que contiene la información detallada del residuo peligroso.
   */
  formularioResiduo!: FormGroup;


  /**
   * Opciones de radio generales utilizadas en el formulario de residuos peligrosos.
   */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /**
   * Opciones de radio para la clasificación del residuo.
   */
  clasificacionRadioOptions: RadioOpcion[] = RADIO_OPCIONES?.clasificacionRadioOptions;

  /**
 * Opciones de radio utilizadas en el formulario para etiquetar residuos.
 */
  public etiquetasForm = RADIO_OPCIONES;


  /**
   * Constructor del componente. Inicializa el formulario reactivo y conecta con el store y query de Akita.
   * 
   * @param fb - Constructor del formulario reactivo.
   * @param formularioStore - Store de Akita que gestiona el estado del formulario de residuos.
   * @param formularioQuery - Query de Akita para obtener el estado actual del formulario.
   */
  constructor(
    public fb: FormBuilder,
    private formularioStore: FormularioResiduoStore,
    private formularioQuery: FormularioResiduoQuery
  ) {
    // Lógica del constructor si es necesaria
  }

  /**
   * Método de inicialización del componente.
   * Carga los catálogos desde el archivo JSON y configura los formularios.
   */
  ngOnInit(): void {

    /** Inicializa el formulario con datos de materia prima */
    this.inicializarFormulario();

    /** Crea el formulario para capturar los datos del residuo */
    this.crearFormularioResiduo();

    /** Restaura valores guardados en el store de Akita */
    this.recuperarValoresDesdeStore();
  }


  /**
   * Inicializa el formulario de datos de materia prima con validaciones y algunos campos deshabilitados por defecto.
   */
  private inicializarFormulario(): void {
    this.formularioDatos = this.fb.group({
      /** Número de la materia prima (campo obligatorio) */
      numero: ['', Validators.required],

      /** Nombre de la materia prima (campo obligatorio) */
      nombreMateriaPrima: ['', Validators.required],

      /** Cantidad (deshabilitado por defecto, se habilita automáticamente) */
      cantidad: [{ value: '', disabled: true }],

      /** Cantidad en letra (deshabilitado por defecto) */
      cantidadLetra: [{ value: '', disabled: true }],

      /** Unidad de medida (deshabilitado por defecto) */
      unidadDeMedida: [{ value: '', disabled: true }],

      /** Fracción arancelaria (deshabilitado por defecto) */
      fraccionArancelaria: [{ value: '', disabled: true }]
    });
  }



  /**
   * Crea el formulario para capturar los datos del residuo peligroso.
   * Cada campo se inicializa con su valor por defecto y sus validaciones correspondientes.
   */
  private crearFormularioResiduo(): void {
    this.formularioResiduo = this.fb.group({
      /** Fracción arancelaria del residuo (obligatorio) */
      fraccionArancelaria: ['', Validators.required],

      /** NICO (Número de Identificación Comercial) (obligatorio) */
      nico: ['', Validators.required],

      /** Acotación (campo deshabilitado por defecto, obligatorio) */
      acotacion: [{ value: '', disabled: true }, Validators.required],

      /** Indicador si es residuo peligroso (obligatorio) */
      residuoPeligroso: ['', Validators.required],

      /** Cantidad del residuo (obligatorio) */
      cantidad: ['', Validators.required],

      /** Cantidad en letra (campo deshabilitado por defecto) */
      cantidadLetra: [{ value: '', disabled: true }],

      /** Unidad de medida (obligatorio) */
      unidadMedida: ['', Validators.required],

      /** Clasificación del residuo (obligatorio) */
      clasificacion: ['', Validators.required],

      /** Clave del residuo (obligatorio) */
      claveResiduo: ['', Validators.required],

      /** Nombre del residuo (obligatorio) */
      nombre: ['', Validators.required],

      /** Descripción del residuo (obligatorio) */
      descripcion: ['', Validators.required],

      /** CRETI (Corrosivo, Reactivo, Explosivo, Tóxico, Inflamable) (obligatorio) */
      creti: ['', Validators.required],

      /** Estado físico del residuo (obligatorio) */
      estadoFisico: ['', Validators.required],

      /** Tipo de contenedor utilizado (obligatorio) */
      tipoContenedor: ['', Validators.required],

      /** Capacidad del contenedor (obligatorio) */
      capacidad: ['', Validators.required]
    });
  }


  /**
   * Recupera los valores almacenados en el estado (store) de Akita y los asigna
   * a los formularios correspondientes sin emitir eventos de cambio.
   */
  private recuperarValoresDesdeStore(): void {
    /** Obtiene el estado actual del store */
    const ESTADO = this.formularioQuery.getValue();

    /** Actualiza los valores del formulario de datos */
    this.formularioDatos.patchValue(ESTADO.formularioDatos, { emitEvent: false });

    /** Actualiza los valores del formulario del residuo */
    this.formularioResiduo.patchValue(ESTADO.formularioResiduo, { emitEvent: false });
  }


  /**
   * Actualiza un campo específico del formulario de datos de materia prima en el store.
   *
   * @param field - Nombre del campo del formulario de datos a actualizar.
   */
  actualizarCampoFormularioDatos(field: keyof EstadoFormularioResiduo['formularioDatos']): void {
    const VALOR = this.formularioDatos.get(field)?.value;
    this.formularioStore.actualizarFormularioDatos({
      ...this.formularioDatos.getRawValue(),
      [field]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de residuos en el store.
   *
   * @param field - Nombre del campo del formulario de residuos a actualizar.
   */
  actualizarCampoFormularioResiduo(field: keyof EstadoFormularioResiduo['formularioResiduo']): void {
    const VALOR = this.formularioResiduo.get(field)?.value;
    this.formularioStore.actualizarFormularioResiduo({
      ...this.formularioResiduo.getRawValue(),
      [field]: VALOR,
    });
  }


}
