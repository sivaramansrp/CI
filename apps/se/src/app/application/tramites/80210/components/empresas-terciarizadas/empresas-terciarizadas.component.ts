import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  ConsultaioQuery,
  TablaSeleccion,
} from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormularioDatos,
  Plantas,
} from '../../modelos/registro-solicitud-immex.model';
import { Subject, map, takeUntil, tap } from 'rxjs';
import {
  Tramite80210Store,
  Tramites80210State,
} from '../../estados/tramites80210.store';
import { CONFIGURACION_TABLA_PLANTAS } from '../../enums/registro-solicitud-immex.enum';
import { Tramite80210Query } from '../../estados/tramites80210.query';
import { registroSolicitudImmexService } from '../../services/registro-solicitud-immex.service';

/**
 * Componente para gestionar las empresas terciarizadas.
 * 
 * @remarks
 * Este componente permite la gestión de plantas disponibles y seleccionadas,
 * así como la interacción con el formulario de empresas y el estado global.
 */
@Component({
  selector: 'app-empresas-terciarizadas',
  templateUrl: './empresas-terciarizadas.component.html',
  styleUrl: './empresas-terciarizadas.component.scss',
})
export class EmpresasTerciarizadasComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo para gestionar los datos de las empresas.
   */
  empresasForm!: FormGroup;

  /**
   * Estado global del trámite 80210.
   */
  tramites80210State!: Tramites80210State;

  /**
   * Lista de plantas disponibles para selección.
   */
  plantasDisponibles: Plantas[] = [];

  /**
   * Lista de plantas seleccionadas.
   */
  plantasSeleccionadas: Plantas[] = [];

  /**
   * Lista temporal de filas disponibles seleccionadas en la tabla.
   */
  listaFilaDisponibles: Plantas[] = [];

  /**
   * Lista temporal de filas seleccionadas en la tabla.
   */
  listaFilaSeleccionada: Plantas[] = [];

  /**
   * Indica si se deben mostrar las plantas en la interfaz.
   */
  showPlantas!: boolean;

  /**
   * Configuración de las columnas de la tabla dinámica.
   */
  tablaConfiguration: ConfiguracionColumna<Plantas>[] =
    CONFIGURACION_TABLA_PLANTAS;

  /**
   * Tipo de selección para la tabla dinámica.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Notificación para destruir observables al destruir el componente.
   */
  destoryNotification$: Subject<void> = new Subject<void>();

   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * 
   * @param formBuilder - Constructor de formularios reactivos.
   * @param registroSolicitudService - Servicio para gestionar solicitudes Immex.
   * @param tramite80210Store - Estado global del trámite 80210.
   * @param tramite80210Query - Consulta del estado global del trámite 80210.
   */
  constructor(
    private formBuilder: FormBuilder,
    @Inject(registroSolicitudImmexService)
    public registroSolicitudService: registroSolicitudImmexService,
    private tramite80210Store: Tramite80210Store,
    private tramite80210Query: Tramite80210Query,
    private consultaQuery: ConsultaioQuery
  ) {
     /**
 * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destoryNotification$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.  
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  inicializarFormulario(): void {
    this.initializeTramite80210State();
    this.showPlantas = this.tramites80210State.showPlantas;
    this.registroSolicitudService.obtenerEstados();
    this.registroSolicitudService
      .obtenerFormularioDatos()
      .pipe(takeUntil(this.destoryNotification$))
      .subscribe((datos) => {
        this.actualizarFormulario(datos);
        if (this.showPlantas) {
          this.segregatePlantasDatos();
        } else {
          this.plantasDisponibles = [];
          this.plantasSeleccionadas = [];
        }
      });
    this.createEmpresasForm();
  }


   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.empresasForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.empresasForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
}


  /**
   * Crea el formulario reactivo para las empresas.
   */
  createEmpresasForm(): void {
    this.empresasForm = this.formBuilder.group({
      modalidad: [{ value: '', disabled: true }],
      folio: [{ value: '', disabled: true }],
      ano: [{ value: '', disabled: true }],
      rfc: ['', [Validators.required]],
      estado: ['-1', [Validators.required]],
    });
  }

  /**
   * Actualiza los valores del formulario con los datos proporcionados.
   * 
   * @param datos - Datos del formulario a actualizar.
   */
  actualizarFormulario(datos: FormularioDatos): void {
    this.empresasForm.get('modalidad')?.setValue(datos.modalidad);
    this.empresasForm.get('folio')?.setValue(datos.folio);
    this.empresasForm.get('ano')?.setValue(datos.ano);
  }

  /**
   * Busca las empresas controladoras y actualiza el estado de las plantas.
   */
  buscarControladoras(): void {
    if (this.esFormularioValido()) {
      this.showPlantas = true;
      this.tramite80210Store.establecerDatos({plantasDisponibles:[]});
      this.segregatePlantasDatos();
      this.tramite80210Store.establecerDatos({showPlantas:this.showPlantas});
      this.empresasForm.get('rfc')?.reset();
      this.empresasForm.get('estado')?.reset("-1");
    }
  }

    /**
   * Verifica si el formulario de empresas es válido.
   *
   * @returns {boolean} Retorna `true` si el formulario es válido y el campo 'estado' tiene un valor distinto de '-1'; de lo contrario, retorna `false`.
   */
  esFormularioValido(): boolean {
    return this.empresasForm.valid && this.empresasForm.get('estado')?.value !== '-1';
  }

  /**
   * Inicializa el estado global del trámite 80210.
   */
  initializeTramite80210State(): void {
    this.tramite80210Query.selectTramite80210$
      .pipe(takeUntil(this.destoryNotification$))
      .subscribe((datos) => {
        this.tramites80210State = datos;
      });
  }

  /**
   * Segrega los datos de las plantas en disponibles y seleccionadas.
   */
  segregatePlantasDatos(): void {
    
    if (this.tramites80210State.plantasDisponibles.length > 0) {
      this.plantasDisponibles = this.tramites80210State.plantasDisponibles;
    } else {
      if(this.empresasForm.valid) {
      this.registroSolicitudService.obtenerPlantasDatos()
        .pipe(
          takeUntil(this.destoryNotification$),
          tap((plantas) => {
            this.tramite80210Store.establecerDatos({plantasDisponibles:plantas?.datos});
          })
        )
        .subscribe((plantas) => {
          this.plantasDisponibles = plantas?.datos;
        });
      } else {
        this.plantasDisponibles = [];
      }
    }

    if (this.tramites80210State.plantasSeleccionadas.length > 0) {
      this.plantasSeleccionadas =this.tramites80210State.plantasSeleccionadas;
    } else {
      this.plantasSeleccionadas = [];
    }
  }

  /**
   * Maneja las filas seleccionadas en la tabla de disponibles.
   * 
   * @param fila - Lista de filas seleccionadas.
   */
  manejarFilaDisponibles(fila: Plantas[]): void {
    this.listaFilaDisponibles = fila;
  }

  /**
   * Maneja las filas seleccionadas en la tabla de seleccionadas.
   * 
   * @param fila - Lista de filas seleccionadas.
   */
  manejarFilaSeleccionada(fila: Plantas[]): void {
    this.listaFilaSeleccionada = fila;
  }

  /**
 * Agrega plantas seleccionadas a la lista de seleccionadas, evitando duplicados.
 */
agregarPlantas(): void {
  if (this.listaFilaDisponibles?.length === 0) {
    return;
  }

  // Filtrar las plantas que no están ya en plantasSeleccionadas
  const NUEVASPLANTAS = this.listaFilaDisponibles.filter(
    (plantaDisponible) =>
      !this.plantasSeleccionadas.some(
        (plantaSeleccionada) => plantaSeleccionada.id === plantaDisponible.id
      )
  );

  // Agregar solo las nuevas plantas a plantasSeleccionadas
  this.plantasSeleccionadas.push(...NUEVASPLANTAS);

  // Remover las plantas movidas de plantasDisponibles
  this.plantasDisponibles = this.plantasDisponibles.filter(
    (planta) => !this.listaFilaDisponibles.includes(planta)
  );

  // Actualizar el estado global
  this.updateStoreForPlantas();

  // Limpiar la lista temporal de filas seleccionadas
  this.listaFilaDisponibles = [];
}
  /**
   * Actualiza el estado global con las plantas disponibles y seleccionadas.
   */
  public updateStoreForPlantas(): void {
    const DISPONIBLES_PLANTAS_ID = this.plantasDisponibles.map(
      (planta) => planta
    );
    this.tramite80210Store.establecerDatos({plantasDisponibles:DISPONIBLES_PLANTAS_ID});
    const SELECCIONADA_PLANTAS_ID = this.plantasSeleccionadas.map(
      (planta) => planta
    );
    this.tramite80210Store.establecerDatos({plantasSeleccionadas:SELECCIONADA_PLANTAS_ID});

  }

  /**
   * Elimina plantas seleccionadas de la lista de seleccionadas.
   */
  eliminarPlantas(): void {
    if (this.listaFilaSeleccionada?.length === 0) {
      return;
    }
  
    // Filtrar las plantas que no están ya en plantasDisponibles
    const NUEVASPLANTAS = this.listaFilaSeleccionada.filter(
      (plantaDisponible) =>
        !this.plantasDisponibles.some(
          (plantaSeleccionada) => plantaSeleccionada.id === plantaDisponible.id
        )
    );
  
    // Agregar solo las nuevas plantas a plantasDisponibles
    this.plantasDisponibles.push(...NUEVASPLANTAS);
  
    // Remover las plantas movidas de plantasDisponibles
    this.plantasSeleccionadas = this.plantasSeleccionadas.filter(
      (planta) => !this.listaFilaSeleccionada.includes(planta)
    );
  
    // Actualizar el estado global
    this.updateStoreForPlantas();
  
    // Limpiar la lista temporal de filas seleccionadas
    this.listaFilaSeleccionada = [];
  }


  /**
   * Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destoryNotification$.next();
    this.destoryNotification$.complete();
  }
}
