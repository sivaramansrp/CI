import {
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MATERIA_PRIMA_TABLA,
  MateriaPrima,
  MateriaPrima231001,
} from '../../../231001/models/datos.model';

import {
  RadioOpcion,
  SolicitudJson,
} from '@libs/shared/data-access-user/src/core/models/231003/solicitud.model';
import { CommonModule } from '@angular/common';
import { ConvertNumberAmountToStringAmount } from '@libs/shared/data-access-user/src/core/utils/convertNumberAmountToStringAmount';
import { EstadoFormularioResiduo } from '../../models/datos-residuos.model';
import { FormularioResiduoQuery } from '../../estados/queries/datos-residuos.query';
import { FormularioResiduoStore } from '../../estados/tramites/datos-residuos.store';
import { ResiduoPeligroso } from '../../../231002/models/aviso-catalogo.model';
import { SoloNumericaDecimalDirective } from '@libs/shared/data-access-user/src/tramites/directives/solo-numeros-punto/solo-numero-y-punto.directive';
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
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    NotificacionesComponent,
    SoloNumericaDecimalDirective,
  ],
  templateUrl: './datos-residuos-peligrosos.component.html',
  styleUrl: './datos-residuos-peligrosos.component.scss',
})
export class DatosResiduosPeligrososComponent implements OnInit {
  /**
   * Evento emitido cuando se agrega un residuo peligroso.
   * El payload es un objeto `ResiduoPeligroso`.
   */
  @Output() residuoAgregado = new EventEmitter<ResiduoPeligroso>();

  /** Indica si el formulario está en estado válido (usado para mostrar mensajes). */
  esFormaValido = true;

  /** Mensaje de alerta mostrado en pantalla cuando hay errores de validación. */
  alertaErrorFormulario = '';

  /** Notificación para mostrar alertas/errores al usuario. */
  public nuevaNotificacion: Notificacion = {} as Notificacion;

  /** Conjunto de índices seleccionados en la tabla (para acciones en lote). */
  itemsSeleccionados: Set<number> = new Set();

  /** Formulario reactivo de datos de materia prima. */
  formularioMateriaPrima!: FormGroup;

  /** Formulario reactivo de captura del residuo peligroso. */
  formularioResiduo!: FormGroup;

  /**
   * Opciones de radio generales utilizadas en el formulario de residuos peligrosos.
   */
  radioOptions: RadioOpcion[] = RADIO_OPCIONES?.radioOptions;

  /**
   * Opciones de radio para la clasificación del residuo.
   */
  clasificacionRadioOptions: RadioOpcion[] =
    RADIO_OPCIONES?.clasificacionRadioOptions;

  /**
   * Opciones de radio utilizadas en el formulario para etiquetar residuos.
   */
  public etiquetasForm = RADIO_OPCIONES;
  /**
   * Objeto que representa el estado de clasificación de los campos de residuos peligrosos.
   * Cada propiedad indica si el campo correspondiente ha sido clasificado.
   *
   * @property claveResiduo - Indica si la clave del residuo ha sido clasificada.
   * @property nombre - Indica si el nombre ha sido clasificado.
   * @property descripcion - Indica si la descripción ha sido clasificada.
   */
  public clasificacionObj = {
    claveResiduo: false,
    nombre: false,
    descripcion: false,
  };

  materiasDisponibles: MateriaPrima231001[] = [];
  materiasDisponiblesCatalogo: Catalogo[] = [];
  materiasPrimas: MateriaPrima231001[] = [];
  materiasPrimasTabla: MateriaPrima231001[] = [];
  configuracionTablaMaterias: ConfiguracionColumna<MateriaPrima231001>[] =
    MATERIA_PRIMA_TABLA;

  borrarHabilitado = false;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param formularioStore - Store de Akita que persiste el estado del formulario.
   * @param formularioQuery - Query de Akita para leer el estado actual del formulario.
   */
  constructor(
    public fb: FormBuilder,
    private formularioStore: FormularioResiduoStore,
    private formularioQuery: FormularioResiduoQuery
  ) {
    // Lógica del constructor si es necesaria
  }

  TablaSeleccion = TablaSeleccion;
  selectedMercancias: MateriaPrima[] = [];
  /**
   * Método de inicialización del componente.
   * Carga los catálogos desde el archivo JSON y configura los formularios.
   */
  ngOnInit(): void {
    /** Inicializa el formulario con datos de materia prima */
    this.inicializarFormularioMateriaPrima();

    /** Crea el formulario para capturar los datos del residuo */
    this.crearFormularioResiduo();

    /** Restaura valores guardados en el store de Akita */
    this.recuperarValoresDesdeStore();
  }

  /**
   * Inicializa el formulario de materia prima con validaciones y campos deshabilitados por defecto.
   */
  private inicializarFormularioMateriaPrima(): void {
    this.formularioMateriaPrima = this.fb.group({
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
      fraccionArancelaria: [{ value: '', disabled: true }],
    });
  }

  /**
   * Maneja la selección múltiple de mercancias desde la tabla.
   * @param seleccionados Array de mercancias seleccionadas.
   */
  onSeleccionMultiple(seleccionados: MateriaPrima[]): void {
    this.selectedMercancias = seleccionados;
  }

  /**
   * Crea el formulario para capturar los datos del residuo peligroso y sus validadores.
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
      capacidad: ['', Validators.required],
    });
  }

  /**
   * Recupera valores almacenados en el store y los aplica a los formularios sin emitir eventos.
   */
  private recuperarValoresDesdeStore(): void {
    /** Obtiene el estado actual del store */
    const ESTADO = this.formularioQuery.getValue();

    /** Actualiza los valores del formulario de datos */
    this.formularioMateriaPrima.patchValue(ESTADO.formularioMateriaPrima, {
      emitEvent: false,
    });

    /** Actualiza los valores del formulario del residuo */
    this.formularioResiduo.patchValue(ESTADO.formularioResiduo, {
      emitEvent: false,
    });
  }

  /**
   * Actualiza un campo específico del formulario de datos de materia prima y lo persiste en el store.
   * @param field - Clave del campo a actualizar.
   */
  actualizarCampoFormularioDatos(
    field: keyof EstadoFormularioResiduo['formularioMateriaPrima']
  ): void {
    const VALOR = this.formularioMateriaPrima.get(field)?.value;
    this.formularioStore.actualizarFormularioDatos({
      ...this.formularioMateriaPrima.getRawValue(),
      [field]: VALOR,
    });
  }

  /**
   * Actualiza un campo específico del formulario de residuo y lo persiste en el store.
   * @param field - Clave del campo a actualizar.
   */
  actualizarCampoFormularioResiduo(
    field: keyof EstadoFormularioResiduo['formularioResiduo']
  ): void {
    const VALOR = this.formularioResiduo.get(field)?.value;
    this.formularioStore.actualizarFormularioResiduo({
      ...this.formularioResiduo.getRawValue(),
      [field]: VALOR,
    });
  }

  /**
   * Similar a `actualizarCampoFormularioResiduo` pero sincroniza también las banderas
   * de clasificación (clave, nombre, descripción) según el valor recibido.
   * @param field - Clave del campo a actualizar.
   */
  actualizarCampoFormularioResiduoDos(
    field: keyof EstadoFormularioResiduo['formularioResiduo']
  ): void {
    const VALOR = this.formularioResiduo.get(field)?.value;
    this.clasificacionObj.claveResiduo =
      VALOR === 'Clave de residuo' ? true : false;
    this.clasificacionObj.nombre = VALOR === 'Nombre' ? true : false;
    this.clasificacionObj.descripcion = VALOR === 'Descripción' ? true : false;
    this.formularioStore.actualizarFormularioResiduo({
      ...this.formularioResiduo.getRawValue(),
      [field]: VALOR,
    });
  }

  /**
   * Elimina los elementos seleccionados del arreglo `materiasPrimas`.
   * Ordena índices de mayor a menor para evitar desajustes al momento de eliminar.
   */
  borrarElementosSeleccionados(): void {
    if (this.itemsSeleccionados.size === 0) {
      return;
    }

    // Convertir a array y ordenar de mayor a menor para eliminar correctamente
    const INDICES_A_ELIMINAR = Array.from(this.itemsSeleccionados).sort(
      (a, b) => b - a
    );

    INDICES_A_ELIMINAR.forEach((index) => {
      this.materiasPrimas.splice(index, 1);
    });

    // Limpiar selecciones y actualizar tabla
    this.itemsSeleccionados.clear();
    this.borrarHabilitado = false;
    this.materiasPrimasTabla = [...this.materiasPrimas];
  }

  /**
   * Maneja las filas seleccionadas desde la tabla dinámica y actualiza el conjunto de índices seleccionados.
   * @param filasSeleccionadas - Array de materias seleccionadas.
   */
  onFilasSeleccionadas(filasSeleccionadas: MateriaPrima231001[]): void {
    // Limpiar selecciones previas
    this.itemsSeleccionados.clear();

    // Agregar nuevas selecciones
    filasSeleccionadas.forEach((materia) => {
      const INDEX = this.materiasPrimas.findIndex((m) => m.id === materia.id);
      if (INDEX !== -1) {
        this.itemsSeleccionados.add(INDEX);
      }
    });

    // Actualizar estado del botón borrar
    this.borrarHabilitado = this.itemsSeleccionados.size > 0;
  }

  /**
   * Inicia la búsqueda de materia prima por número de bitácora.
   * Valida que el campo esté presente y maneja duplicados.
   */
  buscarMateriaPrima(): void {
    const NUMERO = this.formularioMateriaPrima.get('numero')?.value;
    this.formularioMateriaPrima.get('numero')?.markAsTouched();

    if (!NUMERO) {
      this.esFormaValido = false;
      this.alertaErrorFormulario = 'Debes ingresar un número de bitácora';
      return;
    }

    const MATERIA_EXISTENTE = this.materiasPrimas.find(
      (materia) => materia.id === NUMERO
    );

    if (MATERIA_EXISTENTE) {
      this.mostrarNotificacionDuplicado();
    } else {
      this.buscarMateriaPrimaById();
    }
  }

  /**
   * Muestra una notificación de duplicado cuando se intenta agregar una materia existente.
   */
  mostrarNotificacionDuplicado(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: '',
      mensaje:
        'Los datos proporcionados ya han sido agregados, por favor agregue datos diferentes',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * Búsqueda simulada / remota de materia prima por ID de bitácora.
   * Si se utiliza la API, aquí se debe sustituir por la llamada HTTP correspondiente.
   */
  buscarMateriaPrimaById(): void {
    const NO_BITACORA = this.formularioMateriaPrima.get('numero')?.value;
    if (!NO_BITACORA) {
      this.setMateriaEncontradaMensaje('Debes ingresar un número de bitácora');
    }
    //   .subscribe({
    //     next: (data) => {
    //       this.materiasDisponibles = data ?? [];
    //       const MATERIAS_FOUND = this.materiasDisponibles.filter(
    //         (m) => m.id === NO_BITACORA
    //       );

    //       if (MATERIAS_FOUND.length > 0) {
    //         this.esFormaValido = true;
    //         this.alertaErrorFormulario = '';
    //         this.materiasDisponiblesCatalogo = MATERIAS_FOUND.map((m) => ({
    //           id: m.id ?? 0,
    //           descripcion: m.nombreMateriaPrima ?? '',
    //         }));
    //       } else {
    //         this.setMateriaEncontradaMensaje('El número de bitácora no existe');
    //       }
    //     },
    //     error: () => {
    //       this.setMateriaEncontradaMensaje(
    //         'Error al consultar la materia prima'
    //       );
    //     },
    //   });
  }

  /**
   * Establece el mensaje y estado cuando no se encuentra una materia prima.
   * @param mensaje - Texto a mostrar al usuario.
   */
  setMateriaEncontradaMensaje(mensaje: string): void {
    this.esFormaValido = false;
    this.alertaErrorFormulario = mensaje;
    this.etiquetasForm.nombre = [];
    this.formularioMateriaPrima.get('cantidad')?.setValue('');
    this.formularioMateriaPrima.get('cantidadLetra')?.setValue('');
    this.formularioMateriaPrima.get('unidadDeMedida')?.setValue('');
    this.formularioMateriaPrima.get('fraccionArancelaria')?.setValue('');
  }

  /**
   * Maneja el cambio en el dropdown de nombre de materia prima para autocompletar campos relacionados.
   */
  onNombreMateriaPrimaChange(): void {
    const NUMERO = this.formularioMateriaPrima.get('numero')?.value;
    const MATERIA_ENCONTRADA = this.materiasDisponibles.find(
      (m) => m.id === NUMERO
    );

    if (MATERIA_ENCONTRADA) {
      this.formularioMateriaPrima
        .get('cantidad')
        ?.setValue(MATERIA_ENCONTRADA.generica2);
      this.formularioMateriaPrima
        .get('cantidadLetra')
        ?.setValue(MATERIA_ENCONTRADA.cantidadEnLetra);
      this.formularioMateriaPrima
        .get('unidadDeMedida')
        ?.setValue(MATERIA_ENCONTRADA.unidadMedidaComercialClave);
      this.formularioMateriaPrima
        .get('fraccionArancelaria')
        ?.setValue(MATERIA_ENCONTRADA.descFraccion);

      // Actualizar el store
      this.formularioStore.actualizarFormularioDatos(
        this.formularioMateriaPrima.getRawValue()
      );
    }
  }

  /**
   * Valida formularios y crea el objeto ResiduoPeligroso que se emite al componente padre.
   * Realiza limpieza de formularios y estados al final.
   */
  agregarResiduoPeligroso(): void {
    // Validar que se hayan agregado materias primas
    if (this.materiasPrimas.length === 0) {
      // Mostrar mensaje de error si no hay materias primas
      this.esFormaValido = true;
      this.alertaErrorFormulario =
        'Debe agregar al menos una materia prima relacionada';
      return;
    }

    // Crear el objeto con todos los datos del residuo según la interface ResiduoPeligroso
    const RESIDUO_DATA: ResiduoPeligroso = {
      origenResiduoGeneracion: 'Producción Industrial', // Se puede obtener del radio seleccionado
      fraccionArancelaria: this.getFraccionName(),
      nombreResiduo:
        this.formularioResiduo.get('residuoPeligroso')?.value || '',
      nico: this.getNicoName(),
      acotacion: this.formularioResiduo.get('acotacion')?.value || '',
      nombreResiduoPeligroso:
        this.formularioResiduo.get('residuoPeligroso')?.value || '',
      cantidad: this.formularioResiduo.get('cantidad')?.value || '',
      cantidadLetra: this.formularioResiduo.get('cantidadLetra')?.value || '',
      unidadMedida: this.getUnidadMedidaName(),
      claveClasificacion: this.getClaveClasificacion(),
      nombreClasificacion: this.getNameClasificacion(),
      descripcionClasificacion: this.getDescClasificacion(),
      descripcionOtraClasificacion: '', // Campo opcional
      creti: this.getCreti(),
      estadoFisico: this.getEstadoFisico(),
      descripcionOtroEstadoFisico: '', // Campo opcional
      numeroManifiesto: this.formularioResiduo.get('manifiesto')?.value || '',
      tipoContenedor: this.getTipoContenedor(),
      descripcionOtroContenedor: '', // Campo opcional
      capacidad: this.formularioResiduo.get('capacidad')?.value || '',
      fraccionName: this.getFraccionName(),
      nicoName: this.getNicoName(),
      unidadMedidaName: this.getUnidadMedidaName(),
      claveClasificacionDesc: this.getClaveClasificacion(),
      nameClasificacion: this.getNameClasificacion(),
      descClasificacion: this.getDescClasificacion(),
      cretiDesc: this.getCreti(),
      estadoFisicoDesc: this.getEstadoFisico(),
      tipoContenedorDesc: this.getTipoContenedor(),
    };

    // Emitir el evento con los datos
    this.residuoAgregado.emit(RESIDUO_DATA);

    // Limpiar formularios y datos relacionados
    this.formularioResiduo.reset();
    this.formularioMateriaPrima.reset();
    this.materiasPrimas = [];
    this.materiasPrimasTabla = [];
    this.itemsSeleccionados.clear();
    this.borrarHabilitado = false;

    // Limpiar mensaje de error si existe
    this.esFormaValido = true;
    this.alertaErrorFormulario = '';
  }

  /**
   * Obtiene la descripción de la fracción arancelaria seleccionada desde `etiquetasForm`.
   * @returns Descripción de la fracción o cadena vacía si no existe.
   */
  private getFraccionName = (): string => {
    const FRACCION_ID = this.formularioResiduo.get(
      'fraccionArancelaria'
    )?.value;
    return (
      this.etiquetasForm.arancelaria.find(
        (f) => f.id === parseInt(FRACCION_ID, 10)
      )?.descripcion ?? ''
    );
  };

  /**
   * Obtiene la descripción del NICO seleccionado desde `etiquetasForm`.
   * @returns Descripción del NICO o cadena vacía si no existe.
   */
  private getNicoName = (): string => {
    const NICO_ID = this.formularioResiduo.get('nico')?.value;
    const NICO_DATA = this.etiquetasForm.nico.find(
      (f) => f.id === Number(NICO_ID)
    );
    return NICO_DATA?.descripcion ?? '';
  };

  /**
   * Obtiene la descripción de la unidad de medida seleccionada.
   * @returns Nombre de la unidad de medida o cadena vacía si no existe.
   */
  private getUnidadMedidaName = (): string => {
    const UNIDAD_ID = this.formularioResiduo.get('unidadMedida')?.value;
    const UNIDADES = this.etiquetasForm.unidad || [];
    const UNIDAD_DATA = UNIDADES.find((u) => u.id === Number(UNIDAD_ID));
    return UNIDAD_DATA ? UNIDAD_DATA.descripcion : '';
  };

  /**
   * Obtiene la descripción de la clave de clasificación seleccionada.
   * @returns Descripción o cadena vacía si no existe.
   */
  private getClaveClasificacion = (): string => {
    const CLAVE = this.formularioResiduo.get('claveResiduo')?.value;
    const CLAVE_CLASIFICACION_DESC = this.etiquetasForm.residuo?.find(
      (c) => c.id === Number(CLAVE)
    )?.descripcion;
    return CLAVE_CLASIFICACION_DESC || '';
  };

  /**
   * Obtiene el nombre asociado a la clasificación por nombre.
   * @returns Nombre de clasificación o cadena vacía si no existe.
   */
  private getNameClasificacion = (): string => {
    const NOMBRE = this.formularioResiduo.get('nombre')?.value;
    const CLAVE_CLASIFICACION_NAME = this.etiquetasForm.tipoNombre?.find(
      (c) => c.id === Number(NOMBRE)
    )?.descripcion;
    return CLAVE_CLASIFICACION_NAME || '';
  };

  /**
   * Obtiene la descripción de la clasificación por descripción.
   * @returns Descripción o cadena vacía si no existe.
   */
  private getDescClasificacion = (): string => {
    const DESC = this.formularioResiduo.get('descripcion')?.value;
    const CLAVE_CLASIFICACION_DESC = this.etiquetasForm.descripcion?.find(
      (c) => c.id === Number(DESC)
    )?.descripcion;
    return CLAVE_CLASIFICACION_DESC || '';
  };

  /**
   * Obtiene la descripción del CRETI seleccionado.
   * @returns Descripción o cadena vacía si no existe.
   */
  private getCreti = (): string => {
    const CRETI = this.formularioResiduo.get('creti')?.value;
    const CRETI_DESC = this.etiquetasForm.creti?.find(
      (c) => c.id === Number(CRETI)
    )?.descripcion;
    return CRETI_DESC || '';
  };

  /**
   * Obtiene la descripción del estado físico seleccionado.
   * @returns Descripción o cadena vacía si no existe.
   */
  private getEstadoFisico = (): string => {
    const ESTADO = this.formularioResiduo.get('estadoFisico')?.value;
    const ESTADO_DESC = this.etiquetasForm.estadoFisico?.find(
      (e) => e.id === Number(ESTADO)
    )?.descripcion;
    return ESTADO_DESC || '';
  };

  /**
   * Obtiene la descripción del tipo de contenedor seleccionado.
   * @returns Descripción o cadena vacía si no existe.
   */
  private getTipoContenedor = (): string => {
    const TIPO = this.formularioResiduo.get('tipoContenedor')?.value;
    const TIPO_DESC = this.etiquetasForm.tipoContenedor?.find(
      (t) => t.id === Number(TIPO)
    )?.descripcion;
    return TIPO_DESC || '';
  };

  /**
   * Convierte una cantidad numérica a su representación en letra y la asigna al control correspondiente.
   * @param cantidad - Valor numérico en string a convertir.
   */
  obtenerLetraCantidad(cantidad: string): void {
    this.formularioResiduo.get('cantidadLetra')?.enable();
    this.formularioResiduo.patchValue({
      cantidadLetra: ConvertNumberAmountToStringAmount.convierteNumerosALetra(
        parseFloat(cantidad)
      ),
    });
    this.formularioResiduo.get('cantidadLetra')?.disable();
  }
}
