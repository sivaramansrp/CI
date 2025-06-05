import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna,CrosslistComponent,TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud130106State, Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
import {Subject, map,takeUntil } from 'rxjs';
import { AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/aviso-privacidad.enum'
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Partidas } from '@libs/shared/data-access-user/src/core/models/130106/partidas.model';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import fraccions from '@libs/shared/theme/assets/json/130106/fraccion.json';
/**
 * Componente que maneja el formulario de fracción, incluyendo la inicialización y la gestión de fechas seleccionadas.
 */
@Component({
  selector: 'app-fraccion', // Selector del componente en el DOM
  standalone: true,
  imports: [CatalogoSelectComponent, FormsModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent, CrosslistComponent,AlertComponent], // Importa los módulos necesarios para el funcionamiento del componente
  templateUrl: './fraccion.component.html', // Define la plantilla HTML del componente
  styleUrl: './fraccion.component.scss' // Define los estilos CSS del componente
})
/* Componente que gestiona la sección de fracción arancelaria del formulario,  
   implementa lógica de inicialización y limpieza de recursos. */
export class FraccionComponent implements OnInit, OnDestroy {
/** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
 esFormularioSoloLectura: boolean = false;
  /**
   * Formulario reactivo para manejar los datos de la fracción.
   */
  fraccionForm!: FormGroup;
/**
   * Lista de fracciones obtenidas del archivo JSON.
   */  
  public fraccion: Catalogo[] = fraccions.fraccion;
  /**
   * Lista de unidades de medida obtenidas del archivo JSON.
   */
  public umt: Catalogo[] = fraccions.UMT;
 /**
   * Lista de bloques obtenidos del archivo JSON.
   */
   public bloque: Catalogo[] = fraccions.bloque;
  /**
   * Lista de entidades obtenidas del archivo JSON.
   */
  public entidad: Catalogo[] = fraccions.entidad;
 /**
   * Lista de representaciones obtenidas del archivo JSON.
   */ 
  public representacion: Catalogo[] = fraccions.representacion;
 /**
   * Estado de la solicitud 130106.
   */ 
  public solicitudState!: Solicitud130106State;

  /**
   * Subject para manejar la destrucción de observables y evitar fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de partidas, cada una representando una línea de datos.
   */
  partidas: Partidas[] = [];

  /**
   * Constructor que inyecta dependencias necesarias para el componente.
   * @param fb - FormBuilder para crear el formulario reactivo.
   * @param tramite130106Store - Store para manejar el estado de la solicitud.
   * @param tramite130106Query - Query para obtener el estado de la solicitud.
   */
  constructor(private fb: FormBuilder,
    public tramite130106Store: Tramite130106Store,
    public tramite130106Query: Tramite130106Query,
    private consultaioQuery: ConsultaioQuery,
    ) {
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
       
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe()
     }

  /**
   * Datos que configuran las columnas de la tabla de partidas.
   */
  partidasDatas: ConfiguracionColumna<Partidas>[] = [
    { encabezado: 'Cantidad', clave: (item: Partidas) => item.cantidad, orden: 1 },
    { encabezado: 'Unidad de medida', clave: (item: Partidas) => item.unidad, orden: 2 },
    { encabezado: 'Fracción arancelaria', clave: (item: Partidas) => item.fraccion, orden: 3 },
    { encabezado: 'Descripción', clave: (item: Partidas) => item.descripcion, orden: 4 },
    { encabezado: 'Precio unitario USD', clave: (item: Partidas) => item.precio, orden: 5 },
    { encabezado: 'Total USD', clave: (item: Partidas) => item.total, orden: 6 }
  ];
// Enum o clase que representa las opciones de selección en la tabla
  TablaSeleccion = TablaSeleccion;
/**
 * Constante que contiene los textos del aviso a mostrar en la interfaz.
 * Se utiliza para mostrar mensajes informativos, advertencias u otros textos fijos.
 */
  public TEXTOS = AVISO;

  /**
   * Lista de rangos de días seleccionados por el usuario.
   */
  selectRangoDias: string[] = [];

  /**
   * Lista de fechas seleccionadas por el usuario.
   */
  fechasSeleccionadas: string[] = [];

  /**
   * Lista de fechas disponibles.
   */
  fechasDatos: string[] = [];

  /**
   * Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * Definición de los botones con su respectiva acción para agregar y quitar fechas.
   */
  botonField = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.agregar('t'),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.quitar('t'),
    },
  ];
  /**
   * Agrega elementos a la lista de fechas seleccionadas dependiendo del tipo de acción.
   * @param tipo - El tipo de acción ('t' para agregar todos, otro valor para agregar una sola fecha).
   */
  agregar(tipo: string): void {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias]; // Agrega todos los rangos de días
      this.fechasDatos = []; // Vacía las fechas disponibles
    } else {
      const FECHAVALOR = this.fecha.value.map(Number); // Convierte las fechas seleccionadas en un array de números
      this.fechasSeleccionadas.push(this.fechasDatos[FECHAVALOR]); // Agrega la fecha seleccionada a las fechas seleccionadas
      this.fechasDatos.splice(FECHAVALOR, 1); // Elimina la fecha seleccionada de las fechas disponibles
    }
  }
  /**
   * Elimina elementos de la lista de fechas seleccionadas dependiendo del tipo de acción.
   * @param tipo - El tipo de acción ('t' para eliminar todas, otro valor para eliminar una sola fecha).
   */
  quitar(tipo: string = ''): void {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas]; // Mueve todas las fechas seleccionadas a fechas disponibles
      this.fechasSeleccionadas = []; // Limpia la lista de fechas seleccionadas
    } else {
      const FECHAVALOR = this.fechaSeleccionada.value.map(Number); // Convierte la fecha seleccionada en un número
      this.fechasDatos.push(this.fechasSeleccionadas[FECHAVALOR]); // Agrega la fecha seleccionada de vuelta a las fechas disponibles
      this.fechasSeleccionadas.splice(FECHAVALOR, 1); // Elimina la fecha seleccionada de la lista
    }
  }
  /**
   * Método que se ejecuta cuando el componente es inicializado.
   */
  ngOnInit(): void {
   this.inicializarCertificadoFormulario();
    this.selectRangoDias = this.solicitudState.selectRangoDias;
  }
/**
 * Inicializa el formulario de solicitud.
 * Este método configura los valores predeterminados, validadores 
 * y estructura del formulario utilizado para capturar los datos de la solicitud.
 */
    inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     
     this.inicializarFormulario()
    }  
  }
    /**
   * Establece valores en el store del trámite a partir de los campos del formulario.
   * @param form - El formulario con los valores que se deben asignar.
   * @param campo - El campo específico del formulario.
   * @param metodoNombre - El nombre del método en el store donde se deben asignar los valores.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130106Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130106Store[metodoNombre] as (value: unknown) => void)(VALOR); // Llama al método correspondiente en el store
  }
  /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
     if (this.esFormularioSoloLectura) {
  this.fraccionForm.disable();
} else {
  this.fraccionForm.enable();
}
  }
  /**
   * Inicializa el formulario de la solicitud con los valores del estado.
   * También se suscribe a los cambios en el estado de la solicitud.
   */
  public inicializarFormulario(): void {
    this.tramite130106Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$), // Se asegura de limpiar los observables al destruir el componente
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud130106State; // Asigna el estado de la solicitud
        })
      )
      .subscribe(); // Realiza la suscripción para actualizar el estado
 
    // Crea el formulario con los valores predeterminados
    this.fraccionForm = this.fb.group({
      fraccion: [this.solicitudState.fraccion, Validators.required],
      cantidad: [this.solicitudState.cantidad, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      factura: [this.solicitudState.factura, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      umt: [this.solicitudState.umt, Validators.required],
      mercanciaCantidad: [this.solicitudState.cantidad, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      mercanciaFactura: [this.solicitudState.factura, [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      descripcion: [this.solicitudState.umt, Validators.required],
      cantidadTotal: [this.solicitudState.umt, Validators.required],
      valorTotal: [this.solicitudState.umt, Validators.required],
      especifico: [this.solicitudState.especifico, Validators.required],
      justificacion: [this.solicitudState.justificacion, Validators.required],
      observaciones: [this.solicitudState.observaciones],
      entidad: [this.solicitudState.entidad, Validators.required],
      representacion: [this.solicitudState.representacion, Validators.required],
      bloque: [this.solicitudState.bloque, Validators.required],
      disponible: [this.solicitudState.disponible,],
      seleccionado: [this.solicitudState.seleccionado, Validators.required],
    });
    /* Se suscribe a los cambios del campo 'bloque' del formulario */
    this.fraccionForm.get('bloque')?.valueChanges.subscribe(() => {
      this.selectRangoDias =["ESTADOS UNIDOS DE AMERICA CANADA"];
      this.tramite130106Store.updateSelectRangoDias(this.selectRangoDias)      
    });
    /* Actualiza los campos del formulario con base en la lógica actual */
    this.updateformfied();
  }
  /**
 * Actualiza los campos del formulario relacionados con fracciones.
 * 
 * Este método deshabilita los campos 'cantidadTotal' y 'valorTotal'
 * para evitar que el usuario los edite manualmente, ya que probablemente
 * se calculan automáticamente o dependen de otros valores.
 */
  updateformfied(): void { 
    // Deshabilita los campos para que no se puedan editar
    this.fraccionForm.get('cantidadTotal')?.disable();
    this.fraccionForm.get('valorTotal')?.disable();
  }

  /**
   * Convierte los datos del formulario en una nueva partida y la agrega a la lista de partidas.
   */
  generarPartidas(): void {
    const FORMDATA = this.fraccionForm.value; // Obtiene los datos del formulario
    const NEWPARTIDA: Partidas = {
      cantidad: FORMDATA.cantidad, // Asigna la cantidad
      unidad: fraccions.UMT.find(item => item.id === Number(FORMDATA.umt))?.descripcion, // Asigna la unidad
      fraccion: fraccions.fraccion.find(item => item.id === Number(FORMDATA.fraccion))?.descripcion, // Asigna la fracción arancelaria
      descripcion: FORMDATA.descripcion, // Asigna la descripción
      precio: 1.000, // Precio fijo
      total: FORMDATA.cantidad // Total calculado con la cantidad
    };
    this.partidas.push(NEWPARTIDA);
    this.fraccionForm.patchValue({
      cantidadTotal: FORMDATA.cantidad,
      valorTotal:FORMDATA.cantidad
    }); // Agrega la nueva partida a la lista
  }
  /**
   * Se ejecuta cuando el componente es destruido. Limpia recursos y observables.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica que el componente ha sido destruido
    this.destroyNotifier$.complete(); // Completa el observable
  }
}
