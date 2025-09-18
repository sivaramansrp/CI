import { BehaviorSubject, Subject,Subscription,map, takeUntil } from 'rxjs';
import {
  Catalogo,
  CatalogoServices,
  ConfiguracionColumna,
  ConsultaioQuery,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PLANTAS_TABLA_CONFIGURACION,SUBFABRICANTE_TABLA_CONFIGURACION } from '../../constantes/subfabricante-tabla-configuracion.enum';
import {PlantasDireccionModelo,SubfabricanteDireccionModelo
} from '../../modelos/subfabricante.model';
import {CatalogoSelectComponent} from '@libs/shared/data-access-user/src'
import { CommonModule } from '@angular/common';
import { SubfabricanteService } from '../../servicios/servicios-subfabricante.service';
import { Tramites80207Queries } from '../../estados/tramite80207.query';
import { Tramites80207Store } from '../../estados/tramite80207.store';

/**
 * @fileoverview Componente para la gestión de empresas submanufactureras.
 * Este componente maneja la lógica y la presentación del formulario de empresas submanufactureras,
 * incluyendo la inicialización, la obtención de datos y la gestión de los controles del formulario.
 * @module empresasSubmanufactureras --80207
 */

/**
 * Componente para la gestión de empresas submanufactureras.
 * @class EmpresasSubmanufacturerasComponent --80207
 * @implements {OnInit, OnDestroy}
 */

@Component({
  selector: 'app-empresas-subfabricante',
  templateUrl: './empresas-subfabricante.component.html',
  styleUrls: ['./empresas-subfabricante.component.scss'],
  standalone: true,
  imports: [
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
})
export class EmpresasSubFabricanteComponent implements OnInit, OnDestroy {
  /**
   * Formulario para la información de registro.
   * @property {FormGroup} formularioInfoRegistro
   */
  formularioInfoRegistro!: FormGroup;

  /**
   * Formulario para los datos del subcontratista.
   * @property {FormGroup} formularioDatosSubcontratista
   */
  formularioDatosSubcontratista!: FormGroup;


  /**
   * Lista de estados obtenida del servicio.
   * @property {Catalogo[]} estadoCatalogo
   */

  estadoCatalogo: Catalogo[] = [];

  /**
   * Tipo de selección de la tabla.
   * @property {TablaSeleccion} tablaSeleccion
   */
  tablaSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas de la tabla de subfabricantes.
   * @property {ConfiguracionColumna<SubfabricanteDireccionModelo>[]} configuracionTabla
   */
  configuracionTabla: ConfiguracionColumna<SubfabricanteDireccionModelo>[] =
  SUBFABRICANTE_TABLA_CONFIGURACION;
 /**
  * 
  * Configuración de las columnas de la tabla de plantas.
  * @property {ConfiguracionColumna<PlantasDireccionModelo>[]} configuracionTablaPlantas
  */
  configuracionTablaPlantas: ConfiguracionColumna<PlantasDireccionModelo>[] =
  PLANTAS_TABLA_CONFIGURACION;

  /**
   * Datos del subfabricante seleccionado.
   * @property {SubfabricanteDireccionModelo[]} datosDelSubfabricanteSeleccionado
   */
  datosDelSubfabricanteSeleccionado: SubfabricanteDireccionModelo[] = [];

  /**
   * Agregar los datos del subfabricante seleccionado.
   * @property {SubfabricanteDireccionModelo[]} datosSubfabricanteParaSerAgregados
   */
  datosSubfabricanteParaSerAgregados: SubfabricanteDireccionModelo[] = [];

  /**
   * Datos de las plantas para ser agregadas.
   * @property {PlantasDireccionModelo[]} datosPlantasParaSerAgregados
   */

  datosPlantasParaSerAgregados: PlantasDireccionModelo[] = [];

  /**
   * Datos de la tabla de subfabricantes disponibles.
   * @property {SubfabricanteDireccionModelo[]} datosTablaSubfabricantesDisponibles
   */
  datosTablaSubfabricantesDisponibles: SubfabricanteDireccionModelo[] = [];

  /**
   * Lista de subfabricantes por eliminar.
   * @property {SubfabricanteDireccionModelo[]} listaDeSubfabricantesPorEliminar
   */
listaDeSubfabricantesPorEliminar:PlantasDireccionModelo[] = [];

  /**
   * Controla la visualización de la tabla de subfabricantes disponibles.
   * @property {BehaviorSubject<boolean>} mostrarTablaSubfabricantesDisponibles$
   */
  mostrarTablaSubfabricantesDisponibles$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /**
   * Controla la visualización de la tabla de subfabricantes seleccionados.
   * @property {Boolean} mostrarTablaSubfabricantesSeleccionadas
   */
  mostrarTablaSubfabricantesSeleccionadas: boolean = false;

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
  * Número de identificación del Sistema de Información Nacional (SIN).
  * Este número se utiliza para identificar de manera única el registro en el sistema.
  * @property {number} SIN
  * @default -1
  * @type {number}
  */
  SIN:number=-1;
  /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Indica si el campo debe ser deshabilitado.
   * @property {boolean} campoDeshabilitar
   */
  campoDeshabilitar:boolean= false;

     /**
     * Suscripción para manejar observables.
     * @property {Subscription} subscription
     */
    private subscription: Subscription = new Subscription();
   
    tramiteId: string = '80207';
 

  /**
   * Constructor del componente que inyecta los servicios necesarios para la creación del formulario
   * y la inicialización de datos.
   *
   * @param {FormBuilder} fb - Servicio que ayuda a construir formularios reactivos en Angular.
   * @param {SubfabricanteService} subfabricanteDatosService - Servicio para manejar la lógica relacionada con los subfabricantes.
   * @param {Tramites80207Queries} query - Servicio que contiene las consultas para obtener los datos relacionados con los trámites.
   * @param {Tramites80207Store} store - Servicio que maneja el estado de los trámites y datos asociados.
   */
  constructor(
    private fb: FormBuilder,
    private subfabricanteDatosService: SubfabricanteService,
    public query: Tramites80207Queries,
    private store: Tramites80207Store,
    private consultaioQuery: ConsultaioQuery,
    private catalogoService: CatalogoServices

  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      ).subscribe();
    
  }

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
    this.obtenerDatosDeRegistro();
    this.obtenerDatosDelAlmacen();
    this.obtenerListaEstado(this.tramiteId);
  }

  /**
   * Obtiene los datos del almacén y los asigna al formulario de información de registro.
   * Se suscribe al observable `infoRegisterEstado$` para obtener los datos, y cuando se reciben,
   * se actualiza la propiedad `infoRegistro` y se establece el valor del formulario `formularioInfoRegistro`.
   *
   * @method obtenerDatosDelAlmacen
   */
  obtenerDatosDelAlmacen(): void {
    this.query.infoRegisterEstado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((infoRegister) => {
        this.formularioInfoRegistro.setValue(infoRegister);
      });

    this.query.datosSubcontratistaEstado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosSubcontratista) => {
        this.formularioDatosSubcontratista.patchValue({rfc:datosSubcontratista.rfc,estado: datosSubcontratista.estado});
        this.store.setFormValida({
          esDatosSubcontratistaValido: this.formularioDatosSubcontratista.valid,
        });
      });

      this.query.plantasBuscadas$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((plantasBuscadas)=>{
        if(plantasBuscadas.length>0){
          this.datosTablaSubfabricantesDisponibles=plantasBuscadas;
          this.mostrarTablaSubfabricantesDisponibles$.next(true);
        }
      })

      this.query.plantas$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((plantas)=>{
        if(plantas.length>0){
          this.datosPlantasParaSerAgregados=plantas;
        }
      })



    this.query.plantasSubfabricantesAgregar$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((plantasSubfabricantesAgregar) => {
        if (plantasSubfabricantesAgregar.length > 0) {
      
            this.mostrarTablaSubfabricantesSeleccionadas = true;
        }
        else{
          this.datosSubfabricanteParaSerAgregados =[];
          this.mostrarTablaSubfabricantesSeleccionadas = false;
        }
      });

  }

  /**
   * Actualiza el estado seleccionado en los datos del subcontratista y lo guarda en el store.
   *
   * Este método recibe un objeto `estadoSeleccionado` de tipo `Catalogo`, y actualiza la propiedad `estado`
   * de `datosSubcontratista` con el ID del estado seleccionado. Luego, se utiliza el método `setDatosContr`
   * del store para almacenar los datos actualizados del subcontratista.
   *
   * @method enEstadoSeleccionado
   * @param {Catalogo} estadoSeleccionado - Objeto que contiene el estado seleccionado, con su propiedad `id`.
   */
  enEstadoSeleccionado(): void {
    this.formularioDatosSubcontratista.patchValue({
      estado: this.formularioDatosSubcontratista.value.estado.toString(),
    })
    this.store.setDatosContr(this.formularioDatosSubcontratista.value);
  }

  /**
   * Obtiene el valor del RFC del formulario de datos del subcontratista y lo guarda en el store.
   *
   * Este método recupera el valor del campo `rfc` desde el formulario `formularioDatosSubcontratista`,
   * luego actualiza la propiedad `rfc` en los datos del subcontratista (`datosSubcontratista`) con el valor obtenido.
   * Finalmente, almacena los datos actualizados del subcontratista en el store utilizando el método `setDatosContr`.
   *
   * @method obtenerRFC
   */
  obtenerRFC(): void {
    this.store.setDatosContr(this.formularioDatosSubcontratista.value);
  }

  /**
   * Obtiene los datos de registro del servicio `subfabricanteDatosService` y los guarda en el store.
   *
   * Este método se suscribe al observable proporcionado por el servicio `subfabricanteDatosService.getDatos()`.
   * Cuando se recibe una respuesta, se verifica que no sea nula o indefinida, y luego se almacena la información
   * de registro en el store utilizando el método `setInfoRegistro`. La suscripción se gestiona para que se complete
   * cuando el componente sea destruido, gracias al uso de `takeUntil` con `destroyNotifier$`.
   *
   * @method obtenerDatosDeRegistro
   */
  obtenerDatosDeRegistro(): void {
    this.subfabricanteDatosService
      .getDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response) => {
        if (response) {
          this.store.setInfoRegistro(response);
        }
      });
  }

 

  /**
   * Inicializa el formulario de información de registro con los datos obtenidos o con valores vacíos si no hay datos disponibles.
   * @method inicializarFormularioInfoRegistro
   */
  inicializarFormularioInfoRegistro(): void {
    this.formularioInfoRegistro = this.fb.group({
      modalidad: [{ value: '', disabled: true }],
      folio: [{ value: '', disabled: true }],
      ano: [{ value: '', disabled: true }],
    });
  }
  /**
   * Guarda los datos del formulario y actualiza el estado del componente.
   * Si el formulario está en modo solo lectura, deshabilita los campos.
   * Si no, habilita los campos para permitir la edición.
   *
   * @method guardarDatosFormulario
   * @returns {void} Este método no retorna ningún valor.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormularioInfoRegistro();
    this.inicializarFormularioDatosSubcontratista(); 
    if (this.esFormularioSoloLectura) {
      this.campoDeshabilitar=true;
      this.formularioDatosSubcontratista.disable();
    } else{
      this.campoDeshabilitar=false;
      this.formularioDatosSubcontratista.enable();
    } }
   /**  
   * Evalúa si se debe inicializar o cargar datos en el formulario.  
   * Además, obtiene la información del catálogo de mercancía.
   */
   inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormularioInfoRegistro();
    this.inicializarFormularioDatosSubcontratista(); 
    }  

  }

  /**
   * Inicializa el formulario de datos del subcontratista con los datos obtenidos o con valores vacíos si no hay datos disponibles.
   * @method inicializarFormularioDatosSubcontratista
   */
  inicializarFormularioDatosSubcontratista(): void {
    this.formularioDatosSubcontratista = this.fb.group({
      rfc: ['', Validators.required],
      estado: ['1', Validators.required],
    });
  }

  /**
   * Obtiene la lista de estados desde el servicio y actualiza la propiedad estadoCatalogo.
   * @method obtenerListaEstado
   */
  obtenerListaEstado(tramite: string): void {
    this.subscription.add(
      this.catalogoService
      .estadosCatalogo(tramite)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response) => {
        const DATOS = response.datos as Catalogo[];
        
        if (response) {
          this.estadoCatalogo = DATOS;
        }
      })
    );
  }
  

  /**
   * Obtiene la lista de subfabricantes disponibles desde el servicio y actualiza las cabeceras y datos de la tabla correspondiente.
   * @method obtenerSubfabricantesDisponibles
   */
  obtenerSubfabricantesDisponibles(): void {
    this.subfabricanteDatosService
      .getSubfabricantesDisponibles()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response: SubfabricanteDireccionModelo[]) => {
        if (response.length > 0) {
          this.store.addPlantasBuscadas(response)
        }
      });
  }

  /**
   * Obtiene el registro seleccionado de la tabla de subfabricantes disponibles.
   * @method obtenerRegistroSeleccionado
   * @param {SubfabricanteDireccionModelo[]} event - Evento con los datos del registro seleccionado.
   */
  obtenerRegistroSeleccionado(event: SubfabricanteDireccionModelo[]): void {
    if (event.length > 0) {
      this.datosDelSubfabricanteSeleccionado = event;
    } else {
      this.mostrarTablaSubfabricantesSeleccionadas = false;
      this.datosDelSubfabricanteSeleccionado = [];
    }
  }

  /**
   * Realiza una búsqueda de subfabricantes disponibles.
   * @method realizarBusqueda
   */
  realizarBusqueda(): void {
    const RFC_VALUE = this.formularioDatosSubcontratista.get('rfc')?.value;
    const ESTADO_VALUE = this.formularioDatosSubcontratista.get('estado')?.value;
  
    if (RFC_VALUE !== '' && ESTADO_VALUE > -1) {
      this.obtenerSubfabricantesDisponibles();
    }
  }

  /**
   * Agrega plantas a la lista de subfabricantes seleccionados.
   * @method agregarPlantas
   */
  agregarPlantas(): void {
    if (this.datosDelSubfabricanteSeleccionado.length > 0) {
      this.subfabricanteDatosService
        .getPlantasDisponibles()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((response: PlantasDireccionModelo[]) => {
          if (response.length > 0) {
            const DATOS: PlantasDireccionModelo[] = [];
  
            for (let i = 0; i < this.datosDelSubfabricanteSeleccionado.length; i++) {
              response.forEach((item) => {
                DATOS.push(JSON.parse(JSON.stringify(item)));
              });
            }
  
            this.store.addPlantas(DATOS);
          }
        });
    }
  }

  
    
  

  /**
   * Obtiene los datos del subfabricante por eliminar.
   * @method datosDelSubfabricantePorEliminar
   * @param {SubfabricanteDireccionModelo[]} event - Evento con los datos del subfabricante por eliminar.
   */
  datosDelSubfabricantePorEliminar(
    event: PlantasDireccionModelo[]
  ): void {
    this.listaDeSubfabricantesPorEliminar = event;
  }

  

  /**
   * Elimina las plantas de subfabricantes de la lista de subfabricantes a eliminar.
   *
   * Este método actualiza el store con la lista de subfabricantes a eliminar mediante el método
   * `setPlantasSubfabricantesEliminar`, pasando como parámetro la propiedad `listaDeSubfabricantesPorEliminar`.
   *
   * @method eliminarPlantas
   */
  eliminarPlantas(): void {
    const DATOS = this.listaDeSubfabricantesPorEliminar?.length || 0;
  
    if (DATOS === 0) { return }
    const DATOSRES = [...this.datosPlantasParaSerAgregados];
    DATOSRES.splice(0, DATOS);
    this.datosPlantasParaSerAgregados = DATOSRES;
    this.store.setPlantas(DATOSRES);
    this.listaDeSubfabricantesPorEliminar= [];
  }
  
    /**
   * @description Verifica si un control del formulario es inválido.
   * @param nombreControl El nombre del control a verificar.
   * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
   */
    esInvalido(nombreControl: string): boolean {
      const CONTROL = this.formularioDatosSubcontratista.get(nombreControl);
      return CONTROL
        ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
        : false;
    }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.mostrarTablaSubfabricantesDisponibles$.next(false);
    this.mostrarTablaSubfabricantesSeleccionadas = false;
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
