/**
 * Componente Angular para gestionar la información relacionada al trámite 80104.
 * Importa módulos y dependencias necesarias para formularios reactivos, gestión de estado y suscripciones.
 */
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnDestroy,OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud80104State, Tramite80104Store } from '../../../estados/tramites/tramite80104.store';
import { Subject,map,takeUntil } from 'rxjs';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ComplimentosService } from '../../services/complimentos.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DisponsibleFiscal } from '../../models/empresas.model';
import { Tramite80104Query } from '../../../estados/queries/tramite80104.query';
/**
 * Componente que maneja la visualización y gestión de empresas dentro del flujo de solicitud.
 * 
 * Este componente permite gestionar las empresas disponibles y seleccionadas, así como la búsqueda de controladoras fiscales.
 * Además, utiliza formularios reactivos para capturar la información necesaria y realizar la interacción con el store.
 */
@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent
  ],
  templateUrl: './empresas.component.html',
  styleUrl: './empresas.component.scss'
})
/**
 * Componente encargado de gestionar la sección de empresas dentro del trámite.
 * Implementa OnInit y OnDestroy para inicializar datos y limpiar suscripciones.
 */
export class EmpresasComponent implements OnInit, OnDestroy {

  @Output() seleccionadasDatos: EventEmitter<DisponsibleFiscal[]> = new EventEmitter();

  @Output() estadosOpciones: EventEmitter<Catalogo[]> = new EventEmitter();

  /**
   * Título para la sección de empresas.
   */
  @Input() tituloEmpresas: string = '';

  /**
   * Título para la sección de disponibles.
   */
  @Input() tituloDisponibles: string = '';

  /**
   * Título para la sección de seleccionadas.
   */
  @Input() tituloSeleccionadas: string = '';

  /**
   * Lista de estados del catálogo para seleccionar en el formulario.
   */
  @Input() estadosCatalogo: Catalogo[] = [];

  /**
   * Configuración de la tabla de datos para la visualización de empresas.
   */
  @Input() configuracionTablaDatos: ConfiguracionColumna<DisponsibleFiscal>[] = [];

  /**
   * Formulario reactivo utilizado para la captura de la información de empresas.
   */
  empresasForm!: FormGroup;

  /**
   * Lista de empresas disponibles para ser seleccionadas.
   */
  disponibles: DisponsibleFiscal[] = [];

  /**
   * Lista de empresas seleccionadas.
   */
  seleccionadas: DisponsibleFiscal[] = [];

  /**
   * Checkbox para la tabla de selección de empresas.
   */
  public checkbox = TablaSeleccion.CHECKBOX;

  /**
   * Estado actual de la solicitud, gestionado por el store.
   */
  public solicitudState!: Solicitud80104State;

  /**
   * Notificador para destruir el observable de la suscripción.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor que inyecta los servicios necesarios para la creación del componente.
   *
   * @param fb FormBuilder para la creación de formularios reactivos.
   * @param tramite80104Store Store utilizado para gestionar el estado de la solicitud.
   * @param tramite80104Query Query utilizado para obtener el estado actual de la solicitud.
   */
  constructor(
    private fb: FormBuilder,
    private tramite80104Store: Tramite80104Store,
    private tramite80104Query: Tramite80104Query,
     private consultaioQuery: ConsultaioQuery,
    private complimentosService: ComplimentosService,
        ) { 
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe();
    }
     /**
   * Método que se ejecuta cuando el componente es inicializado.
   * 
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   */
  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
    if (this.estadosCatalogo.length === 0) {
      this.obtenerEstados();
    }
  }

  /**
   * Obtiene la lista de estados llamando al servicio `complimentosService`.
   * Se suscribe al observable retornado por `getEstado()` y muestra la respuesta en la consola.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`.
   */
  obtenerEstados():void {
    this.complimentosService.getEstado()
    .pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.estadosCatalogo = res.datos;
      this.estadosOpciones.emit(this.estadosCatalogo);
    }); 
  }

   /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario();
    }  
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
        this.empresasForm.disable();
   
      } else {
        this.empresasForm.enable();
      
      }
  }
 
  /**
   * Inicializa el formulario reactivo para capturar los datos de las empresas.
   * También obtiene el estado actual de la solicitud y la lista de empresas disponibles y seleccionadas.
   */
  private inicializarFormulario(): void {
    this.tramite80104Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud80104State;
        })
      )
      .subscribe();

    this.empresasForm = this.fb.group({
      rfc: [this.solicitudState.rfc, Validators.required],
      estado: [this.solicitudState.estado, Validators.required],
    });

    // Obtiene las empresas disponibles y seleccionadas del store
    this.disponibles = this.tramite80104Query.getValue().disponibles;
    this.seleccionadas = this.tramite80104Query.getValue().seleccionadas;
  }

  /**
   * Establece los valores del store a partir de los datos del formulario.
   * 
   * @param form Formulario del cual se extrae el valor.
   * @param campo Campo del formulario que se va a extraer.
   * @param metodoNombre Nombre del método del store que se va a utilizar para guardar el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite80104Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite80104Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que simula la búsqueda de controladoras fiscales basándose en los valores del formulario.
   * 
   * Asigna un valor ficticio a las empresas disponibles y lo guarda en el store.
   */
  buscarControladoras(): void {
    if (this.empresasForm.valid) {
      const DATA: DisponsibleFiscal[] = [
        {
          calle: 'LOMBARDINI PTE',
          numeroExterior: '1353',
          numeroInterior: 'yes',
          codigoPostal: '81124',
          colonia: 'OTRA NO ESPECIFICADA EN GUASAVE',
          municipioDelegacion: 'EL CATALOGO',
          entidadFederativa: this.estadosCatalogo.find(item => item.id === Number(this.empresasForm.value.estado))?.descripcion,
          pais: 'ESTADOS UNIDOS MEXICANOS',        
          registroFederalContribuyentes: this.solicitudState.rfc,
          domicilioFiscalSolicitante: 'AV SAN DIEGO 137 PARQUE IND B QUINTANA EL MARQUES QUERETARO ESTADOS UNIDOS MEXICANOS',
          razonSocial: 'CORPORACION MEXICANA DE COMPUTO S DE RL DE CV'
        }
      ];
      // Asigna el arreglo a la variable que usa tu tabla
      this.disponibles = DATA;
      this.tramite80104Store.setDisponibles(DATA);
    }
  }

  /**
   * Método que agrega todas las empresas disponibles a la lista de seleccionadas y elimina las disponibles.
   * Luego, actualiza el store con los cambios realizados.
   */
  agregarPlantas(): void {
    this.seleccionadas = [...this.disponibles];
    this.disponibles = [];
    this.tramite80104Store.setDisponibles([]);
    this.tramite80104Store.setSeleccionadas(this.seleccionadas);
    this.seleccionadasDatos.emit(this.seleccionadas);
  }

  /**
   * Elimina todas las plantas seleccionadas, vaciando el arreglo `seleccionadas`.
   * 
   * @remarks
   * Esta función se utiliza para limpiar la selección de plantas en el componente.
   */
  eliminarPlantas(): void {
    if (this.seleccionadas.length > 0) {

      this.seleccionadas = this.seleccionadas.filter(item => {

        return !this.seleccionadas.some(selectedItem =>
          selectedItem.calle === item.calle &&
          selectedItem.codigoPostal === item.codigoPostal
        );
      })
    }
    this.seleccionadas = [];
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Libera los recursos y completa la notificación de destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
