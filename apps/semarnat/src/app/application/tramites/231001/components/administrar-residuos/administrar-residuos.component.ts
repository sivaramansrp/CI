import { CATALOGOS_ID, Catalogo, CatalogosService, ConfiguracionColumna,ConsultaioQuery,TablaDinamicaComponent,TablaSeleccion } from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud231001State, Tramite231001Store } from '../../estados/tramites/tramite231001.store';
import { Subject, map } from 'rxjs';

import { AdministrarResiduosService } from '../../services/administrar-residuos.service';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import {MATERIA_PRIMA_TABLA} from '../../models/datos.model';
import { MateriaPrima } from '../../models/datos.model';
import { MateriaprimaformserviceService } from '../../services/materia-prima-formservice.service';
import { Modal } from 'bootstrap';
import {REGEX_NUMERIC_ONLY} from '@ng-mf/data-access-user';
import { REGEX_NUMEROS_DECIMALES } from '@ng-mf/data-access-user';
import {REGEX_SEIS_SIGNIFICATIVOS} from '@ng-mf/data-access-user';  
import { TableComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite231001Query } from '../../estados/queries/tramite231001.query';
import { takeUntil } from 'rxjs';




/**
 * Componente para administrar residuos
 */
@Component({
  selector: 'app-administrar-residuos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent,CatalogoSelectComponent],
  templateUrl: './administrar-residuos.component.html',
  styleUrl: './administrar-residuos.component.scss',
})
export class AdministrarResiduosComponent implements OnInit, OnDestroy {
  /**
   * Datos del encabezado de la tabla
   */
  tableHeaderData: string[] = [];

  /**
   * Tipo de selección para las tablas (checkbox)
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos del cuerpo de la tabla
   */
  tableBodyData: { tbodyData: string[] }[] = [];
  /**
   * Datos de la tabla obtenidos de un archivo JSON
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getEstablecimientoTableData: any;
  /**
   * Formulario para el recuento total de filas
   */
  formularioParaRecuentoTotal!: FormGroup;

  /**
   * Configuración de columnas para la tabla de mercancías
   */
  mercanciasTabla: ConfiguracionColumna<MateriaPrima>[] = MATERIA_PRIMA_TABLA;

  /**
   * Datos para la tabla de mercancías
   */
  mercanciasTablaDatos: MateriaPrima[] = [];

  
  /**
   * Instancia del modal para gestionar archivos.
   *
   * Se utiliza para abrir o cerrar el modal de archivos.
   */
  modalInstances: Modal | null = null;

   /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
   @ViewChild('modalBuscar') modalBuscar!: ElementRef;



  /**
   * Sujeto utilizado para gestionar la destrucción y limpieza de suscripciones en el componente.
   * Se emite un valor cuando el componente se destruye, permitiendo cancelar observables y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();
    /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando se establece en `true`, todos los controles del formulario y elementos interactivos
 * se deshabilitan, impidiendo que el usuario realice cambios. Esta propiedad normalmente se
 * configura según el estado de la aplicación, por ejemplo, al visualizar una solicitud enviada
 * o cuando el usuario no tiene permisos de edición.
 */
  esFormularioSoloLectura: boolean = false;
    /**
 * Estado actual de la sección del trámite 120501.
 * Esta propiedad almacena los datos del estado de la sección, obtenidos generalmente
 * desde el store o desde una consulta al backend. Se utiliza para inicializar y actualizar
 * los formularios del componente con los valores correspondientes a la solicitud en curso.
 */
   private seccionState!: Solicitud231001State;

   /**
   * @property {FormGroup} materiaPrimaForm
   * Formulario principal del componente para la gestión de datos de residuos.
   */
   materiaPrimaForm!: FormGroup;
   
     /**
      *  aduanas
      *  Arreglo que almacena los catálogos de aduanas.
      */
     aduanas!: Catalogo[];

 /**
   * Opciones del catálogo de unidad de medida.
   */
 comboUnidadMedida!: Catalogo[];

 /**
  * Opciones del catálogo de capítulo de fracción.
  */
 comboCapituloFraccion!: Catalogo[];

 /**
  * Opciones del catálogo de partida de fracción.
  */
 comboPartidaFraccion!: Catalogo[];

 /**
  * Opciones del catálogo de subpartida de fracción.
  */
 comboSubPartidaFraccion!: Catalogo[];

 /**
  * Opciones del catálogo de fracción arancelaria.
  */
 comboFraccionArancelariaParametros!: Catalogo[];
/**
   * Indica si el formulario tiene errores de validación.
   *
   * Se utiliza para mostrar/ocultar el alert de errores en el modal.
   */
esFormaValido: boolean = false;
/**
   * Mensaje de error del formulario para mostrar en el alert.
   *
   * Contiene el HTML del mensaje de error a mostrar cuando hay validaciones fallidas.
   */
formErrorAlert: string = 'Faltan campos por capturar.';

/**
   * Referencia al botón para cerrar el modal.
   *
   * Se utiliza para cerrar el modal de manera programada.
   */
@ViewChild('closeModal') closeModal!: ElementRef;


/**
 * Arreglo que contiene las filas seleccionadas por el usuario.
 */
selectedMercancias: MateriaPrima[] = [];

/**
 * Expresión regular para validar campos que solo admiten valores numéricos.
 * 
 * Se utiliza para validar campos de formulario que requieren únicamente números enteros,
 * sin permitir caracteres especiales, letras o espacios.
 * 
 * @type {RegExp}
 * @example
 * // Uso en validadores de formulario
 * cantidad: ['', [Validators.pattern(this.REGEX_NUMERIC_ONLY)]]
 */
REGEX_NUMERIC_ONLY = REGEX_NUMERIC_ONLY;

/**
 * Expresión regular para validar campos que admiten números decimales.
 * 
 * Se utiliza para validar campos de formulario que requieren números con decimales,
 * permitiendo punto decimal y números enteros. Útil para campos como cantidades,
 * precios, pesos, etc.
 * 
 * @type {RegExp}
 * @example
 * // Uso en validadores de formulario
 * precio: ['', [Validators.pattern(this.REGEX_NUMEROS_DECIMALES)]]
 */
REGEX_NUMEROS_DECIMALES = REGEX_NUMEROS_DECIMALES;

/**
 * Indica si el campo de cantidad tiene el foco activo.
 * 
 * Esta propiedad se utiliza para controlar el comportamiento visual y funcional
 * del campo cantidad cuando el usuario interactúa con él. Permite aplicar
 * estilos específicos, mostrar ayudas contextuales o ejecutar validaciones
 * en tiempo real cuando el campo está enfocado.
 * 
 * @type {boolean}
 * @default false
 * @example
 * // En el template HTML
 * <input (focus)="isCantidadFocused = true" 
 *        (blur)="isCantidadFocused = false"
 *        [class.focused]="isCantidadFocused">
 * 
 * // En el componente para mostrar ayuda contextual
 * @if (isCantidadFocused) {
 *   <div class="help-text">Ingrese la cantidad en números</div>
 * }
 */
public isCantidadFocused: boolean = false;
  /**
   * Constructor de la clase
   * FormBuilder para crear formularios reactivos
   * Servicio para administrar residuos
   */
  constructor(private fb: FormBuilder,
     private service: AdministrarResiduosService,
      private serviceMateria: MateriaprimaformserviceService,
       
     private consultaioQuery: ConsultaioQuery,
    private catalogosServices: CatalogosService,
    private tramite231001Query: Tramite231001Query,
    private tramite231001Store: Tramite231001Store
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
           this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.loadAdministrarResiduos();
    this.aduanasdata();
    this.loadComboUnidadMedida();
    this.loadComboCapituloFraccion();
    this.loadComboPartidaFraccion();
    this.loadComboSubPartidaFraccion();
    this.loadComboFraccionArancelariaParametros();

  }

      /**
 * Inicializa el estado de los formularios según el modo de solo lectura.
 *
 * Si el formulario está en modo solo lectura (`esFormularioSoloLectura`), llama a `guardarDatosFormulario()`
 * para deshabilitar todos los controles. En caso contrario, inicializa los formularios normalmente.
 */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); 
    } else {
      this.crearFormularioParaRecuentoTotal();
    }
  }
   /**
 * Guarda y actualiza el estado de los formularios según el modo de solo lectura.
 *
 * Inicializa los formularios y luego los deshabilita si el formulario está en modo solo lectura,
 * o los habilita si está en modo edición.
 */
  guardarDatosFormulario(): void {
    this.crearFormularioParaRecuentoTotal();
    if (this.esFormularioSoloLectura) {
      this.formularioParaRecuentoTotal.disable();
     
    } else {
      this.formularioParaRecuentoTotal.enable();
    }
}
/**
 * 
 * @returns void
 * Guarda la materia prima ingresada en el formulario.
 */
guardarMateriaPrima(): void {
  if (this.materiaPrimaForm.invalid) {
    this.materiaPrimaForm.markAllAsTouched();
    this.esFormaValido = true;
    return;
  }
  this.esFormaValido = false;

  const VAL = this.materiaPrimaForm.value;

  const NEU: MateriaPrima = {
    nombreMateriaPrima: VAL.nombreDeLaMateriaPrima,
    cantidad: VAL.cantidad,
    cantidadLetra: "100",
    unidadMedida: VAL.unidadMedidaComercial,
    fraccion: VAL.fraccion
  };

  this.mercanciasTablaDatos=[...this.mercanciasTablaDatos,NEU]
  this.tramite231001Store.actualizarEstado({ mercanciasTablaDatos: this.mercanciasTablaDatos });
  this.materiaPrimaForm.reset();

  this.cerrarModal();
}

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Se utiliza para emitir y completar el observable `destroyed$`, permitiendo limpiar suscripciones y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Obtiene los datos del establecimiento y los asigna a las variables de la tabla
   */
  public getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
}

  /**
   * Crea el formulario para el recuento total de filas
   */
  crearFormularioParaRecuentoTotal(): void {
    this.obtenerEstadoSolicitud();
    this.formularioParaRecuentoTotal = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
      aduanas: [this.seccionState?.aduanas, Validators.required],
    });
      this.materiaPrimaForm = this.fb.group({
          descUnidadMedida: [''],
          descFraccion: [''],
          generica1: [''],
          clavePartida: [''],
          claveSubPartida: [''],
    
          nombreDeLaMateriaPrima: [
            this.seccionState?.nombreDeLaMateriaPrima,
            [Validators.required, Validators.maxLength(120)],
          ], 
          cantidad: [
            this.seccionState?.cantidad,
            [
              Validators.required,
              Validators.pattern(REGEX_NUMERIC_ONLY),
              Validators.pattern(REGEX_SEIS_SIGNIFICATIVOS),
              Validators.maxLength(18),
            ],
          ], 
          cantidadEnLetra: [
            { value: this.seccionState?.cantidadEnLetra, disabled: true },
            Validators.maxLength(256),
          ], 
          unidadMedidaComercial: [this.seccionState?.unidadMedidaComercial, Validators.required],
          capituloFraccion: [this.seccionState?.capituloFraccion, Validators.required],
          partidaFraccion: [this.seccionState?.partidaFraccion, Validators.required],
          subPartidaFraccion: [this.seccionState?.subPartidaFraccion, Validators.required],
          fraccion: [this.seccionState?.fraccion, Validators.required],
        });
  }

 /**
   * Método que carga las opciones del catálogo de unidad de medida.
   */
 loadComboUnidadMedida(): void {
  this.serviceMateria.getUnidadMedida().pipe(
     takeUntil(this.destroyed$)
   ).subscribe(
     (data) => {
       this.comboUnidadMedida = data;
     }
   );
}

 /**
   * Método que carga las opciones del catálogo de capítulo de fracción.
   */
 loadComboCapituloFraccion(): void {
  this.serviceMateria.getCapituloFraccion().pipe(
 takeUntil(this.destroyed$)).subscribe(
 (data) => {
   this.comboCapituloFraccion = data;
 }
);
}
/**
   * Método que carga las opciones del catálogo de partida de fracción
   */
loadComboPartidaFraccion(): void{
  this.serviceMateria.getPartidaFraccion().pipe(
  takeUntil(this.destroyed$)).subscribe(
  (data) => {
    this.comboPartidaFraccion = data;
  }
);
}
 /**
   * Método que carga las opciones del catálogo de subpartida de fracción desde un archivo JSON.
   */
 loadComboSubPartidaFraccion(): void {
  this.serviceMateria.getSubPartidaFraccion().pipe(
  takeUntil(this.destroyed$)).subscribe(
  (data) => {
    this.comboSubPartidaFraccion = data;
  }
);
}
 /**
   * Método que carga las opciones del catálogo de fracción arancelaria desde un archivo JSON.
   */
 loadComboFraccionArancelariaParametros(): void {
  this.serviceMateria.getFraccionArancelariaParametros().pipe(
  takeUntil(this.destroyed$)).subscribe(
  (data) => {
    this.comboFraccionArancelariaParametros = data;
  }
);
}
  /**
   * Cierra el modal activo.
   *
   * Este método utiliza la referencia al botón de cierre del modal para cerrarlo
   * y resetea el estado de validación del formulario de mercancía.
   */
  cerrarModal(): void {
   
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    
    }

    if (this.modalInstances) {
      this.modalInstances.hide();
    }
    this.materiaPrimaForm.reset();
  }
/**
   * Muestra el formulario modal para buscar mercancías.
   * Inicializa la instancia del modal si no está creada y luego lo muestra.
   * @return void
   * */
  showForm():void{
    if (this.modalBuscar) {
      if (!this.modalInstances) {
        this.modalInstances = new Modal(this.modalBuscar.nativeElement);
      }
    }
    this.modalInstances?.show();
  }

   /**
   * Suscribe al observable `selectSolicitud$` del query `tramite120501Query` para obtener el estado actual de la solicitud y actualizar la propiedad `seccionState` con los datos recibidos. La suscripción se mantiene activa hasta que se emite un valor en `destroyed$`, evitando fugas de memoria.
   */
  obtenerEstadoSolicitud(): void {
    this.tramite231001Query.selectSolicitud$?.pipe(takeUntil(this.destroyed$))
      .subscribe((data: Solicitud231001State) => {
        this.seccionState = data;
        this.mercanciasTablaDatos=this.seccionState.mercanciasTablaDatos;
      });
  }
    /**
   * Convierte la cantidad numérica a su equivalente en texto.
   */
    obtenerLetraCantidad(cantidad: string): void {
      this.materiaPrimaForm.patchValue({
        cantidadEnLetra: cantidad === '1' ? 'UNO' : '',
      });
    }
  /**
   * Actualiza el recuento total de filas en el formulario
   */
  public actualizarRecuentoTotalDeFilas(): void {
    const TOTAL_ROW_COUNT = this.tableBodyData.length;
    this.formularioParaRecuentoTotal.patchValue({ recuentoTotalDeFilas: TOTAL_ROW_COUNT });
}

  /**
   * Carga los datos para administrar residuos
   */
  loadAdministrarResiduos(): void {
    this.service
      .getAdministrarResiduos()
      .pipe(
        takeUntil(this.destroyed$) // Se usa takeUntil para asegurarse de que las suscripciones se cancelen al destruirse el componente
      )
      .subscribe((data) => {
        this.getEstablecimientoTableData = data;
        this.getEstablecimiento();
        this.actualizarRecuentoTotalDeFilas();
      });
  }
 /**
 * Obtiene el valor de un campo específico del formulario y lo establece en el store utilizando el método proporcionado.
 */
setValoresStore(form: FormGroup, campo: string): void {
  const VALOR = form.get(campo)?.value;
  this.tramite231001Store.actualizarEstado({ [campo]: VALOR });
}
/*
  * Maneja la selección múltiple de mercancías en la tabla.
  * @param seleccionados - Arreglo de mercancías seleccionadas.
  */
onSeleccionMultiple(seleccionados: MateriaPrima[]): void {
  this.selectedMercancias = seleccionados;
}
/**
 * Borra las filas seleccionadas de la tabla de mercancías.
 * Si no hay filas seleccionadas, la función retorna sin hacer nada.
 * Actualiza el estado en el store y el recuento total de filas después de la eliminación.
 * */
borrarFilasSeleccionadas(): void {
  if (!this.selectedMercancias || this.selectedMercancias.length === 0) {
    return;
  }

  this.mercanciasTablaDatos = this.mercanciasTablaDatos.filter(
    (item) => !this.selectedMercancias.includes(item)
  );

  this.selectedMercancias = [];
 this.tramite231001Store.actualizarEstado({ mercanciasTablaDatos: this.mercanciasTablaDatos });

  this.actualizarRecuentoTotalDeFilas();
}

  
  
  /**
   * Obtiene los datos de las aduanas desde el servicio de catálogos.
   */
  aduanasdata(): void {
   
    this.serviceMateria.getSubPartidaFraccion().pipe(
      takeUntil(this.destroyed$)).subscribe(
      (data) => {
        this.aduanas = data;
      }
    );

  }
}