import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoSelectComponent, InputRadioComponent, Notificacion, NotificacionesComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { RadioOpcion, SolicitudJson } from '@libs/shared/data-access-user/src/core/models/231002/solicitud.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src/core/enums/tabla-seleccion.enum';

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
  formErrorAlert = '';

  /** Objeto de notificación para mostrar popup */
  public nuevaNotificacion: Notificacion = {} as Notificacion;

  /** Lista de materias primas para la tabla */
  materiasPrimas: MateriaPrima[] = [];

  /** Lista de elementos seleccionados en la tabla */
  itemsSeleccionados: Set<number> = new Set();

  /** Estado del botón borrar */
  borrarHabilitado = false;

  /** Getter para verificar si el botón Agregar debe estar habilitado */
  get agregarHabilitado(): boolean {
    const CANTIDAD = this.formularioDatos.get('cantidad')?.value;
    const CANTIDAD_LETRA = this.formularioDatos.get('cantidadLetra')?.value;
    const UNIDAD_MEDIDA = this.formularioDatos.get('unidadDeMedida')?.value;
    const FRACCION_ARANCELARIA = this.formularioDatos.get('fraccionArancelaria')?.value;
    
    return Boolean(CANTIDAD && CANTIDAD_LETRA && UNIDAD_MEDIDA && FRACCION_ARANCELARIA);
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
    
    // Inicialmente dropdown vacío hasta que se haga búsqueda
    this.etiquetasForm.nombre = [];
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
      this.formErrorAlert = '';
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
      this.formErrorAlert = '';
      
      // Solo actualizar las opciones del dropdown cuando se encuentra la materia
      this.etiquetasForm.nombre = [
        { id: 1, descripcion: MATERIA_ENCONTRADA.nombre }
      ];
      
      // Los campos permanecen deshabilitados hasta que se seleccione del dropdown
    } else {
      // Mostrar mensaje de error cuando no se encuentra la materia prima
      this.esFormaValido = true;
      this.formErrorAlert = 'El número de bitácora no existe';
      
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
      this.formErrorAlert = '';
      
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
   * Muestra notificación cuando se intenta agregar un duplicado
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
}
