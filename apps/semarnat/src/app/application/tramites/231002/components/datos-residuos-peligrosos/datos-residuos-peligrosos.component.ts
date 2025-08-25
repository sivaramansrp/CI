import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent, InputRadioComponent, MAX_DIGITS_VALIDATOR, Notificacion, NotificacionesComponent, REGEX_DECIMAL, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231002/solicitud.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

import { EstadoFormularioResiduo } from '../../models/datos-residuos.model';
import { FormularioResiduoQuery } from '../../estados/queries/datos-residuos.query';
import { FormularioResiduoStore } from '../../estados/tramites/datos-residuos.store';

import { Modal } from 'bootstrap';
import { ResiduoPeligroso } from '../../models/aviso-catalogo.model';
import rawData from '@libs/shared/theme/assets/json/231002/solicitud.json';

/**
 * Constante que contiene las opciones de radio y demás datos del archivo JSON.
 * Se hace un cast del JSON importado al tipo `SolicitudJson`.
 */
const RADIO_OPCIONES = rawData as SolicitudJson;

/**
 * Interface para los datos de la materia prima
 */
interface MateriaPrima {
  id: string;
  nombre: string;
  cantidad: string;
  cantidadLetra: string;
  unidadMedida: string;
  fraccionArancelaria: string;
}

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
    TablaDinamicaComponent,
    NotificacionesComponent
  ],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.scss'
})
export class DatosResiduosPeligrososComponent implements OnInit {
  /** Event emitter para enviar datos del residuo al componente padre */
  @Output() residuoAgregado = new EventEmitter<ResiduoPeligroso>();

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

  /** Control para mostrar/ocultar mensaje de error */
  esFormaValido = false;

  /** Mensaje de error a mostrar */
  alertaErrorFormulario = '';

  /** Objeto de notificación para mostrar popup */
  public nuevaNotificacion: Notificacion = {} as Notificacion;

  /** Lista de materias primas para la tabla */
  materiasPrimas: MateriaPrima[] = [];

  /** Lista de elementos seleccionados en la tabla */
  itemsSeleccionados: Set<number> = new Set();

  /** Estado del botón borrar */
  borrarHabilitado = false;

    /**
   * Instancia del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  modalInstances: Modal | null = null;

  /** Getter para verificar si el botón Agregar debe estar habilitado */
  get agregarHabilitado(): boolean {
    const CANTIDAD = this.formularioDatos.get('cantidad')?.value;
    const CANTIDAD_LETRA = this.formularioDatos.get('cantidadLetra')?.value;
    const UNIDAD_MEDIDA = this.formularioDatos.get('unidadDeMedida')?.value;
    const FRACCION_ARANCELARIA = this.formularioDatos.get('fraccionArancelaria')?.value;
    
    return Boolean(CANTIDAD && CANTIDAD_LETRA && UNIDAD_MEDIDA && FRACCION_ARANCELARIA);
  }

  /** Getters para verificar el estado disabled de los dropdowns de clasificación */
  get claveResiduoDisabled(): boolean {
    return this.formularioResiduo?.get('claveResiduo')?.disabled ?? true;
  }
 
  /**
   * Getter para verificar si el campo 'nombre' del formulario de residuo está deshabilitado.
   */
  get nombreDisabled(): boolean {
    return this.formularioResiduo?.get('nombre')?.disabled ?? true;
  }

  /**
   * Getter para verificar si el campo 'descripcion' del formulario de residuo está deshabilitado.
   */
  get descripcionDisabled(): boolean {
    return this.formularioResiduo?.get('descripcion')?.disabled ?? true;
  }

  /** Getters para obtener los valores actuales de los dropdowns (para mostrar en disabled state) */
  get claveResiduoValue(): string {
    return this.formularioResiduo?.getRawValue()?.claveResiduo || '';
  }

   /**
   * Getter para verificar si el campo 'nombreValue' del formulario de residuo está deshabilitado.
   */
  get nombreValue(): string {
    return this.formularioResiduo?.getRawValue()?.nombre || '';
  }

  /**
   * Getter para verificar si el campo 'descripcionValue' del formulario de residuo está deshabilitado.
   */
  get descripcionValue(): string {
    return this.formularioResiduo?.getRawValue()?.descripcion || '';
  }

  /** Enum de tipos de selección de tabla para uso en template */
  TablaSeleccion = TablaSeleccion;

  /** Configuración de columnas para la tabla dinámica */
  configuracionTablaMaterias: ConfiguracionColumna<MateriaPrima>[] = [
    {
      encabezado: 'Id materia prima',
      clave: (item: MateriaPrima) => item.id,
      orden: 1
    },
    {
      encabezado: 'Nombre materia prima',
      clave: (item: MateriaPrima) => item.nombre,
      orden: 2
    },
    {
      encabezado: 'Cantidad',
      clave: (item: MateriaPrima) => item.cantidad,
      orden: 3
    },
    {
      encabezado: 'Cantidad letra',
      clave: (item: MateriaPrima) => item.cantidadLetra,
      orden: 4
    },
    {
      encabezado: 'Unidad de medida',
      clave: (item: MateriaPrima) => item.unidadMedida,
      orden: 5
    },
    {
      encabezado: 'Fracción',
      clave: (item: MateriaPrima) => item.fraccionArancelaria,
      orden: 6
    }
  ];

  /** Datos de fracción arancelaria con sus NICOs relacionados */
  private readonly fraccionArancelariaData = [
    {
      fraccionId: 1, // Corresponde al ID en el JSON de arancelaria
      fraccionDescripcion: 'Polietileno con densidad superior o igual a 0,94',
      nicos: [
        {
          nicoId: 'NICO001',
          nicoDescripcion: 'Polietileno alta densidad granulado',
          acotacion: 'Material plástico granulado de alta densidad utilizado para fabricación de envases y productos moldeados'
        },
        {
          nicoId: 'NICO002',
          nicoDescripcion: 'Polietileno alta densidad en polvo',
          acotacion: 'Material plástico en polvo de alta densidad para procesos de extrusión y moldeo'
        }
      ]
    },
    {
      fraccionId: 2,
      fraccionDescripcion: 'Policarbonatos en formas primarias',
      nicos: [
        {
          nicoId: 'NICO003',
          nicoDescripcion: 'Policarbonato transparente',
          acotacion: 'Resina de policarbonato transparente de alta resistencia para aplicaciones ópticas y estructurales'
        },
        {
          nicoId: 'NICO004',
          nicoDescripcion: 'Policarbonato reforzado',
          acotacion: 'Policarbonato con fibra de vidrio para aplicaciones de alta resistencia mecánica'
        }
      ]
    },
    {
      fraccionId: 3,
      fraccionDescripcion: 'Los demás copolímeros de acrilonitrilo-butadieno-estireno',
      nicos: [
        {
          nicoId: 'NICO005',
          nicoDescripcion: 'ABS natural',
          acotacion: 'Copolímero ABS en estado natural para moldeo por inyección y extrusión'
        },
        {
          nicoId: 'NICO006',
          nicoDescripcion: 'ABS ignífugo',
          acotacion: 'Copolímero ABS con propiedades retardantes al fuego para aplicaciones eléctricas'
        }
      ]
    }
  ];

  /** Datos para la tabla dinámica */
  materiasPrimasTabla: MateriaPrima[] = [];

  /** Datos simulados de materias primas para búsqueda */
  private readonly materiasDisponibles = [
    {
      id: 'E5/00000003/10/2022',
      nombre: 'Polietileno de alta densidad',
      cantidad: '1000',
      cantidadLetra: 'MIL',
      unidadMedida: 'Tonelada',
      fraccionArancelaria: '39012099'
    },
    {
      id: 'E5/00000004/10/2022',
      nombre: 'Policarbonato reciclado',
      cantidad: '750',
      cantidadLetra: 'SETECIENTOS CINCUENTA',
      unidadMedida: 'Kilogramos',
      fraccionArancelaria: '39074001'
    },
    {
      id: 'E5/00000005/10/2022',
      nombre: 'ABS virgen',
      cantidad: '2500',
      cantidadLetra: 'DOS MIL QUINIENTOS',
      unidadMedida: 'Kilogramos',
      fraccionArancelaria: '39033099'
    }
  ];

  /**
   * Constructor del componente.
   * 
   * @param fb - Servicio para construir formularios reactivos.
   * @param formularioStore - Store Akita que gestiona el estado del formulario.
   * @param formularioQuery - Query Akita para consultar el estado del formulario.
   * @param cdr - Change Detector Reference para forzar detección de cambios.
   */
  constructor(
    public fb: FormBuilder,
    private formularioStore: FormularioResiduoStore,
    private formularioQuery: FormularioResiduoQuery,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Inicializa el componente cargando formularios y recuperando datos del store.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.crearFormularioResiduo();
    this.recuperarValoresDesdeStore();
    
    // Inicialmente dropdowns vacíos hasta que se haga búsqueda/selección
    this.etiquetasForm.nombre = [];
    this.etiquetasForm.nico = [];
    
    // Asegurar que los dropdowns de clasificación estén deshabilitados al inicializar
    this.formularioResiduo.get('claveResiduo')?.disable();
    this.formularioResiduo.get('nombre')?.disable();
    this.formularioResiduo.get('descripcion')?.disable();
    
    // Verificar estado después de la inicialización
    setTimeout(() => {
      this.verificarEstadoDropdowns();
    }, 100);
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
        Validators.pattern(REGEX_DECIMAL),
        DatosResiduosPeligrososComponent.noCommaValidator,
        DatosResiduosPeligrososComponent.maxDigitsValidator
      ]],
      cantidadLetra: [{ value: '', disabled: true }],
      unidadMedida: ['', Validators.required],
      clasificacion: ['', Validators.required],
      claveResiduo: [{ value: '', disabled: true }, Validators.required],
      nombre: [{ value: '', disabled: true }, Validators.required],
      descripcion: [{ value: '', disabled: true }, Validators.required],
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
    
    // Guardar el estado actual de disabled de los controles importantes
    const CLAVE_RESIDUO_DISABLED = this.formularioResiduo.get('claveResiduo')?.disabled;
    const NOMBRE_DISABLED = this.formularioResiduo.get('nombre')?.disabled;
    const DESCRIPCION_DISABLED = this.formularioResiduo.get('descripcion')?.disabled;
    
    this.formularioDatos.patchValue(ESTADO.formularioDatos, { emitEvent: false });
    this.formularioResiduo.patchValue(ESTADO.formularioResiduo, { emitEvent: false });
    
    // Restaurar el estado disabled después del patch si estaban deshabilitados
    if (CLAVE_RESIDUO_DISABLED) {
      this.formularioResiduo.get('claveResiduo')?.disable();
    }
    if (NOMBRE_DISABLED) {
      this.formularioResiduo.get('nombre')?.disable();
    }
    if (DESCRIPCION_DISABLED) {
      this.formularioResiduo.get('descripcion')?.disable();
    }
    
    // Asegurar que los dropdowns de clasificación permanezcan deshabilitados por defecto
    this.formularioResiduo.get('claveResiduo')?.disable();
    this.formularioResiduo.get('nombre')?.disable();
    this.formularioResiduo.get('descripcion')?.disable();
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
      const REGEX = MAX_DIGITS_VALIDATOR;
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

  /**
   * Busca materias primas por número de bitácora
   */
  buscarMateriaPrima(): void {
    const NUMERO = this.formularioDatos.get('numero')?.value;
    
    // Marcar el campo como touched para mostrar validaciones
    this.formularioDatos.get('numero')?.markAsTouched();
    
    if (!NUMERO) {
      // No mostrar alert, solo la validación del campo
      this.esFormaValido = false;
      this.alertaErrorFormulario = '';
      return;
    }

    // Verificar si ya existe una materia prima con el mismo número de bitácora en la tabla
    const MATERIA_EXISTENTE = this.materiasPrimas.find(materia => materia.id === NUMERO);
    
    if (MATERIA_EXISTENTE) {
      // Mostrar notificación de duplicado si ya existe en la tabla
      this.mostrarNotificacionDuplicado();
      return;
    }

    // Simular búsqueda en base de datos
    const MATERIA_ENCONTRADA = this.materiasDisponibles.find(m => m.id === NUMERO);
    
    if (MATERIA_ENCONTRADA) {
      // Ocultar mensaje de error si existe
      this.esFormaValido = false;
      this.alertaErrorFormulario = '';
      
      // Solo actualizar las opciones del dropdown cuando se encuentra la materia
      this.etiquetasForm.nombre = [
        { id: 1, descripcion: MATERIA_ENCONTRADA.nombre }
      ];
      
      // Los campos permanecen deshabilitados hasta que se seleccione del dropdown
    } else {
      // Mostrar mensaje de error cuando no se encuentra la materia prima
      this.esFormaValido = true;
      this.alertaErrorFormulario = 'El número de bitácora no existe';
      
      // Si no se encuentra, limpiar el dropdown
      this.etiquetasForm.nombre = [];
      
      // También limpiar los campos deshabilitados
      this.formularioDatos.get('cantidad')?.setValue('');
      this.formularioDatos.get('cantidadLetra')?.setValue('');
      this.formularioDatos.get('unidadDeMedida')?.setValue('');
      this.formularioDatos.get('fraccionArancelaria')?.setValue('');
    }
  }

  /**
   * Maneja el cambio en el dropdown de nombre de materia prima
   */
  onNombreMateriaPrimaChange(): void {
    const NUMERO = this.formularioDatos.get('numero')?.value;
    const MATERIA_ENCONTRADA = this.materiasDisponibles.find(m => m.id === NUMERO);
    
    if (MATERIA_ENCONTRADA) {
      // Ocultar mensaje de error si existe
      this.esFormaValido = false;
      this.alertaErrorFormulario = '';
      
      // Auto-llenar los campos PERO mantenerlos disabled
      this.formularioDatos.get('cantidad')?.setValue(MATERIA_ENCONTRADA.cantidad);
      this.formularioDatos.get('cantidadLetra')?.setValue(MATERIA_ENCONTRADA.cantidadLetra);
      this.formularioDatos.get('unidadDeMedida')?.setValue(MATERIA_ENCONTRADA.unidadMedida);
      this.formularioDatos.get('fraccionArancelaria')?.setValue(MATERIA_ENCONTRADA.fraccionArancelaria);
      
      // Actualizar el store
      this.formularioStore.actualizarFormularioDatos(this.formularioDatos.getRawValue());
    }
  }

  /**
   * Maneja el cambio en el dropdown de Fracción Arancelaria
   */
  onFraccionArancelariaChange(): void {
    const FRACCION_SELECCIONADA = this.formularioResiduo.get('fraccionArancelaria')?.value;
    
    if (FRACCION_SELECCIONADA) {
      // Convertir a número si viene como string para asegurar la comparación
      const FRACCION_ID = typeof FRACCION_SELECCIONADA === 'string' ? parseInt(FRACCION_SELECCIONADA, 10) : FRACCION_SELECCIONADA;
      
      // Buscar la fracción seleccionada y cargar sus NICOs
      const FRACCION_DATA = this.fraccionArancelariaData.find(f => f.fraccionId === FRACCION_ID);
      
      if (FRACCION_DATA) {
        // Actualizar las opciones del dropdown NICO
        this.etiquetasForm.nico = FRACCION_DATA.nicos.map((nico, index) => ({
          id: index + 1,
          descripcion: `${nico.nicoId} - ${nico.nicoDescripcion}`
        }));
      } else {
        // Limpiar NICO si no se encuentra la fracción
        this.etiquetasForm.nico = [];
      }
      
      // Limpiar los campos dependientes
      this.formularioResiduo.get('nico')?.setValue('');
      this.formularioResiduo.get('acotacion')?.setValue('');
    } else {
      // Limpiar todo si no hay fracción seleccionada
      this.etiquetasForm.nico = [];
      this.formularioResiduo.get('nico')?.setValue('');
      this.formularioResiduo.get('acotacion')?.setValue('');
    }
  }

  /**
   * Maneja el cambio en el dropdown de NICO
   */
  onNicoChange(): void {
    const FRACCION_SELECCIONADA = this.formularioResiduo.get('fraccionArancelaria')?.value;
    const NICO_SELECCIONADO = this.formularioResiduo.get('nico')?.value;
    
    if (FRACCION_SELECCIONADA && NICO_SELECCIONADO) {
      // Convertir a número si viene como string
      const FRACCION_ID = typeof FRACCION_SELECCIONADA === 'string' ? parseInt(FRACCION_SELECCIONADA, 10) : FRACCION_SELECCIONADA;
      
      // Buscar la fracción y el NICO seleccionados
      const FRACCION_DATA = this.fraccionArancelariaData.find(f => f.fraccionId === FRACCION_ID);
      
      if (FRACCION_DATA) {
        // El NICO_SELECCIONADO viene como índice del dropdown, así que restamos 1
        const NICO_INDEX = NICO_SELECCIONADO - 1;
        const NICO_DATA = FRACCION_DATA.nicos[NICO_INDEX];
        
        if (NICO_DATA) {
          // Auto-llenar el campo de acotación
          this.formularioResiduo.get('acotacion')?.setValue(NICO_DATA.acotacion);
        }
      }
    } else {
      // Limpiar acotación si no hay selección completa
      this.formularioResiduo.get('acotacion')?.setValue('');
    }
  }

  /**
   * Maneja el cambio en el campo cantidad para auto-llenar cantidad en letra
   */
  onCantidadChange(): void {
    const CANTIDAD_VALUE = this.formularioResiduo.get('cantidad')?.value;
    
    if (CANTIDAD_VALUE && !isNaN(parseFloat(CANTIDAD_VALUE))) {
      const NUMERO = parseFloat(CANTIDAD_VALUE);
      
      // Conversión básica de números a letras
      let cantidadLetra = '';
      if (NUMERO === 1) {
        cantidadLetra = 'UNO';
      } else if (NUMERO === 2) {
        cantidadLetra = 'DOS';
      } else if (NUMERO === 3) {
        cantidadLetra = 'TRES';
      } else if (NUMERO === 10) {
        cantidadLetra = 'DIEZ';
      } else if (NUMERO === 100) {
        cantidadLetra = 'CIEN';
      } else if (NUMERO === 1000) {
        cantidadLetra = 'MIL';
      } else {
        // Para números más complejos, usar formato básico
        cantidadLetra = NUMERO.toString().toUpperCase();
      }
      
      // Auto-llenar el campo cantidad letra
      this.formularioResiduo.get('cantidadLetra')?.setValue(cantidadLetra);
    } else {
      // Limpiar si no hay valor válido
      this.formularioResiduo.get('cantidadLetra')?.setValue('');
    }
  }

  /**
   * Maneja el cambio en el radio button de clasificación
   */
  onClasificacionChange(): void {
    const CLASIFICACION_SELECCIONADA = this.formularioResiduo.get('clasificacion')?.value;
    
    if (CLASIFICACION_SELECCIONADA) {
      this.manejarCambioClasificacion(CLASIFICACION_SELECCIONADA);
    } else {
      // Si no hay selección, deshabilitar todos
      this.formularioResiduo.get('claveResiduo')?.disable();
      this.formularioResiduo.get('nombre')?.disable();
      this.formularioResiduo.get('descripcion')?.disable();
    }
  }

  /**
   * Método para verificar y forzar el estado de los dropdowns (para debugging)
   */
  verificarEstadoDropdowns(): void {
    const CLASIFICACION_VALUE = this.formularioResiduo.get('clasificacion')?.value;
    
    // Forzar deshabilitación si no hay clasificación seleccionada
    if (!CLASIFICACION_VALUE) {
      this.formularioResiduo.get('claveResiduo')?.disable();
      this.formularioResiduo.get('nombre')?.disable();
      this.formularioResiduo.get('descripcion')?.disable();
    }
  }

  /**
   * Maneja la lógica de habilitar/deshabilitar dropdowns según la clasificación seleccionada
   */
  private manejarCambioClasificacion(clasificacionSeleccionada: string): void {
    // Guardar los valores actuales antes de hacer cambios
    const CLAVE_ACTUAL = this.formularioResiduo.get('claveResiduo')?.value;
    const NOMBRE_ACTUAL = this.formularioResiduo.get('nombre')?.value;
    const DESCRIPCION_ACTUAL = this.formularioResiduo.get('descripcion')?.value;
    
    // Deshabilitar todos los dropdowns primero (manteniendo sus valores)
    this.formularioResiduo.get('claveResiduo')?.disable();
    this.formularioResiduo.get('nombre')?.disable();
    this.formularioResiduo.get('descripcion')?.disable();
    
    // Restaurar los valores después de deshabilitar (algunos componentes los pierden)
    if (CLAVE_ACTUAL) {
      this.formularioResiduo.get('claveResiduo')?.setValue(CLAVE_ACTUAL);
    }
    if (NOMBRE_ACTUAL) {
      this.formularioResiduo.get('nombre')?.setValue(NOMBRE_ACTUAL);
    }
    if (DESCRIPCION_ACTUAL) {
      this.formularioResiduo.get('descripcion')?.setValue(DESCRIPCION_ACTUAL);
    }
    
    // Habilitar el dropdown correspondiente según la selección
    if (clasificacionSeleccionada === 'Clave de residuo') {
      this.formularioResiduo.get('claveResiduo')?.enable();
    } else if (clasificacionSeleccionada === 'Nombre') {
      this.formularioResiduo.get('nombre')?.enable();
    } else if (clasificacionSeleccionada === 'Descripción') {
      this.formularioResiduo.get('descripcion')?.enable();
    }
    
    // Forzar detección de cambios para actualizar la UI
    this.cdr.detectChanges();
    
    // Actualizar el store después de los cambios
    this.formularioStore.actualizarFormularioResiduo(this.formularioResiduo.getRawValue());
  }

  /**
   * Muestra una notificación de error cuando se intenta agregar un residuo duplicado.
   */
  mostrarNotificacionDuplicado(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: '',
      mensaje: 'Los datos proporcionados ya han sido agregados, por favor agregue datos diferentes',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Agrega una materia prima a la tabla
   */
  agregarMateriaPrima(): void {
    if (this.formularioDatos.valid) {
      const NUEVA_MATERIA: MateriaPrima = {
        id: this.formularioDatos.get('numero')?.value,
        nombre: this.formularioDatos.get('nombreMateriaPrima')?.value,
        cantidad: this.formularioDatos.get('cantidad')?.value,
        cantidadLetra: this.formularioDatos.get('cantidadLetra')?.value,
        unidadMedida: this.formularioDatos.get('unidadDeMedida')?.value,
        fraccionArancelaria: this.formularioDatos.get('fraccionArancelaria')?.value
      };

      this.materiasPrimas.push(NUEVA_MATERIA);
      
      // Actualizar los datos de la tabla dinámica
      this.materiasPrimasTabla = [...this.materiasPrimas];
      
      // Limpiar el formulario
      this.formularioDatos.reset();
    }
  }

  /**
   * Borra los elementos seleccionados de la tabla
   */
  borrarElementosSeleccionados(): void {
    if (this.itemsSeleccionados.size === 0) {
      return;
    }

    // Convertir a array y ordenar de mayor a menor para eliminar correctamente
    const INDICES_A_ELIMINAR = Array.from(this.itemsSeleccionados).sort((a, b) => b - a);
    
    INDICES_A_ELIMINAR.forEach(index => {
      this.materiasPrimas.splice(index, 1);
    });

    // Limpiar selecciones y actualizar tabla
    this.itemsSeleccionados.clear();
    this.borrarHabilitado = false;
    this.materiasPrimasTabla = [...this.materiasPrimas];
  }

  /**
   * Maneja el clic en una fila de la tabla dinámica
   */
  onSeleccionarFila(materia: MateriaPrima): void {
    const INDEX = this.materiasPrimas.findIndex(m => m.id === materia.id);
    if (INDEX !== -1) {
      if (this.itemsSeleccionados.has(INDEX)) {
        this.itemsSeleccionados.delete(INDEX);
      } else {
        this.itemsSeleccionados.add(INDEX);
      }
      this.borrarHabilitado = this.itemsSeleccionados.size > 0;
    }
  }

  /**
   * Maneja la selección de filas desde la tabla dinámica (checkbox selection)
   */
  onFilasSeleccionadas(filasSeleccionadas: MateriaPrima[]): void {
    // Limpiar selecciones previas
    this.itemsSeleccionados.clear();
    
    // Agregar nuevas selecciones
    filasSeleccionadas.forEach(materia => {
      const INDEX = this.materiasPrimas.findIndex(m => m.id === materia.id);
      if (INDEX !== -1) {
        this.itemsSeleccionados.add(INDEX);
      }
    });
    
    // Actualizar estado del botón borrar
    this.borrarHabilitado = this.itemsSeleccionados.size > 0;
  }

  /**
   * Agrega un residuo peligroso y emite el evento al componente padre
   */
  agregarResiduoPeligroso(): void {
    // Validar que el formulario de residuo sea válido
    if (this.formularioResiduo.invalid) {
      // Marcar todos los campos como tocados para mostrar mensajes de error del formulario de residuo
      Object.keys(this.formularioResiduo.controls).forEach(key => {
        const CONTROL = this.formularioResiduo.get(key);
        if (CONTROL) {
          CONTROL.markAsTouched();
        }
      });
      return; // Salir de la función si el formulario es inválido
    }

    // Validar que se hayan agregado materias primas
    if (this.materiasPrimas.length === 0) {
      // Mostrar mensaje de error si no hay materias primas
      this.esFormaValido = true;
      this.alertaErrorFormulario = 'Debe agregar al menos una materia prima relacionada';
      return;
    }

    // Crear el objeto con todos los datos del residuo según la interface ResiduoPeligroso
    const RESIDUO_DATA: ResiduoPeligroso = {
      origenResiduoGeneracion: 'Producción Industrial', // Se puede obtener del radio seleccionado
      fraccionArancelaria: this.formularioResiduo.get('fraccionArancelaria')?.value || '',
      nombreResiduo: this.formularioResiduo.get('residuoPeligroso')?.value || '',
      nico: this.formularioResiduo.get('nico')?.value || '',
      acotacion: this.formularioResiduo.get('acotacion')?.value || '',
      nombreResiduoPeligroso: this.formularioResiduo.get('residuoPeligroso')?.value || '',
      cantidad: this.formularioResiduo.get('cantidad')?.value || '',
      cantidadLetra: this.formularioResiduo.get('cantidadLetra')?.value || '',
      unidadMedida: this.formularioResiduo.get('unidadMedida')?.value || '',
      claveClasificacion: this.formularioResiduo.get('claveResiduo')?.value || '',
      nombreClasificacion: this.formularioResiduo.get('nombre')?.value || '',
      descripcionClasificacion: this.formularioResiduo.get('descripcion')?.value || '',
      descripcionOtraClasificacion: '', // Campo opcional
      creti: this.formularioResiduo.get('creti')?.value || '',
      estadoFisico: this.formularioResiduo.get('estadoFisico')?.value || '',
      descripcionOtroEstadoFisico: '', // Campo opcional
      numeroManifiesto: this.formularioResiduo.get('manifiesto')?.value || '',
      tipoContenedor: this.formularioResiduo.get('tipoContenedor')?.value || '',
      descripcionOtroContenedor: '', // Campo opcional
      capacidad: this.formularioResiduo.get('capacidad')?.value || ''
    };

    // Emitir el evento con los datos
    this.residuoAgregado.emit(RESIDUO_DATA);

    // Limpiar formularios y datos relacionados
    this.formularioResiduo.reset();
    this.formularioDatos.reset();
    this.materiasPrimas = [];
    this.materiasPrimasTabla = [];
    this.itemsSeleccionados.clear();
    this.borrarHabilitado = false;
    
    // Limpiar mensaje de error si existe
    this.esFormaValido = false;
    this.alertaErrorFormulario = '';

    // Cerrar el modal usando Bootstrap's modal API
    DatosResiduosPeligrososComponent.cerrarModal();
  }

  /**
   * Cierra el modal de forma segura
   */
  private static cerrarModal(): void {
    try {
      const MODAL_ELEMENT = document.getElementById('modalDatosResiduosPeligrosos');
      if (MODAL_ELEMENT) {
        const MODAL = Modal.getInstance(MODAL_ELEMENT);
        if (MODAL) {
          MODAL.hide();
        } else {
          // Si no hay instancia, crear una nueva y cerrarla
          const NEW_MODAL = new Modal(MODAL_ELEMENT);
          NEW_MODAL.hide();
        }
      } else {
        // Alternativa: usar el dismiss modal de Bootstrap directamente
        const CLOSE_BUTTON = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (CLOSE_BUTTON) {
          CLOSE_BUTTON.click();
        }
      }
    } catch (error) {
      console.warn('No se pudo cerrar el modal automáticamente:', error);
    }
  }
}
