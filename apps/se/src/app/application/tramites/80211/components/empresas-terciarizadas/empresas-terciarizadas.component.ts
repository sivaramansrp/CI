import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  ConsultaioQuery,
  REGEX_RFC,
  TablaSeleccion,
} from '@ng-mf/data-access-user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormularioDatos,
  Plantas,
} from '../../modelos/registro-expansion.model';
import { Subject, map, takeUntil, tap } from 'rxjs';
import {
  Tramite80211Store,
  Tramites80211State,
} from '../../estados/tramites80211.store';
import { CONFIGURACION_TABLA_PLANTAS } from '../../enums/registro-expansion.enum';
import { Tramite80211Query } from '../../estados/tramites80211.query';
import { registroSolicitudImmexService } from '../../services/registro-expansion.service';

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
     * Estado global del trámite 80211.
     */
    tramites80211State!: Tramites80211State;
  
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
     * @param tramite80211Store - Estado global del trámite 80211.
     * @param tramite80211Query - Consulta del estado global del trámite 80211.
     */
    constructor(
      private formBuilder: FormBuilder,
      @Inject(registroSolicitudImmexService)
      public registroSolicitudService: registroSolicitudImmexService,
      private tramite80211Store: Tramite80211Store,
      private tramite80211Query: Tramite80211Query,
      private consultaQuery: ConsultaioQuery
    ) {
      this.createEmpresasForm();
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
        this.empresasForm.get('rfc')?.enable();
        this.inicializarFormulario();
      }
    }
  
    /**
   * Inicializa el formulario de empresas terciarizadas.
   *
   * - Inicializa el estado global del trámite 80210.
   * - Asigna el valor de `showPlantas` según el estado actual.
   * - Solicita los estados disponibles a través del servicio.
   * - Obtiene los datos del formulario y actualiza los valores del formulario reactivo.
   * - Si se deben mostrar plantas, segrega los datos de plantas disponibles y seleccionadas.
   * - Si no, limpia las listas de plantas.
   * - Finalmente, crea la estructura del formulario reactivo.
   *
   * @returns {void}
   */
    inicializarFormulario(): void {
      this.initializeTramite80211State();
      this.showPlantas = this.tramites80211State.showPlantas;
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
    }
  
  
     /**
     * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
     * Luego reinicializa el formulario con los valores actualizados desde el store.
     */
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      this.empresasForm.disable();
    }
  
  
    /**
     * Crea el formulario reactivo para las empresas.
     */
    createEmpresasForm(): void {
      this.empresasForm = this.formBuilder.group({
        modalidad: [{ value: '', disabled: true }],
        folio: [{ value: '', disabled: true }],
        ano: [{ value: '', disabled: true }],
        rfc: ['', [Validators.required, Validators.pattern(REGEX_RFC)]],
        estado: ['', [Validators.required]],
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
        this.tramite80211Store.establecerDatos({plantasDisponibles:[]});
        this.segregatePlantasDatos();
        this.tramite80211Store.establecerDatos({showPlantas:this.showPlantas});
        this.empresasForm.get('rfc')?.reset();
        this.empresasForm.get('estado')?.reset();
      }
    }
  
      /**
     * Verifica si el formulario de empresas es válido.
     *
     * @returns {boolean} Retorna `true` si el formulario es válido y el campo 'estado' tiene un valor distinto de '-1'; de lo contrario, retorna `false`.
     */
    esFormularioValido(): boolean {
      return this.empresasForm.valid && this.empresasForm.get('estado')?.value;
    }
  
    /**
     * Inicializa el estado global del trámite 80211.
     */
    initializeTramite80211State(): void {
      this.tramite80211Query.selectTramite80211$
        .pipe(takeUntil(this.destoryNotification$))
        .subscribe((datos) => {
          this.tramites80211State = datos;
        });
    }
  
    /**
     * Segrega los datos de las plantas en disponibles y seleccionadas.
     */
    segregatePlantasDatos(): void {
      
      if (this.tramites80211State.plantasDisponibles.length > 0) {
        this.plantasDisponibles = this.tramites80211State.plantasDisponibles;
      } else {
        if(this.empresasForm.valid) {
        this.registroSolicitudService.obtenerPlantasDatos()
          .pipe(
            takeUntil(this.destoryNotification$),
            tap((plantas) => {
              this.tramite80211Store.establecerDatos({plantasDisponibles:plantas?.datos});
            })
          )
          .subscribe((plantas) => {
            this.plantasDisponibles = plantas?.datos;
          });
        } else {
          this.plantasDisponibles = [];
        }
      }
  
      if (this.tramites80211State.plantasSeleccionadas.length > 0) {
        this.plantasSeleccionadas =this.tramites80211State.plantasSeleccionadas;
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
  if (!this.listaFilaDisponibles?.length) {
    return;
  }

  const PLANTAS_A_MOVER = this.plantasDisponibles.filter(planta =>
    !this.listaFilaDisponibles.some(selectedPlanta => 
      selectedPlanta.id === planta.id
    )
  );

  const PLANTAS_SELECCIONADAS_ACTUALIZADAS = [...this.plantasSeleccionadas];
  PLANTAS_A_MOVER.forEach(planta => {
    const EXISTS = PLANTAS_SELECCIONADAS_ACTUALIZADAS.some(
      plantaSeleccionada => plantaSeleccionada.id === planta.id
    );
    if (!EXISTS) {
      PLANTAS_SELECCIONADAS_ACTUALIZADAS.push(planta);
    }
  });

  this.plantasSeleccionadas = PLANTAS_SELECCIONADAS_ACTUALIZADAS;

  this.plantasDisponibles = [...this.listaFilaDisponibles];
  this.updateStoreForPlantas();

  this.listaFilaDisponibles = [];
}
  /**
   * Actualiza el estado global con las plantas disponibles y seleccionadas.
   */
  public updateStoreForPlantas(): void {
    this.tramite80211Store.establecerDatos({
      plantasDisponibles: [...this.plantasDisponibles],
      plantasSeleccionadas: [...this.plantasSeleccionadas]
    });

    this.plantasDisponibles = [...this.plantasDisponibles];
    this.plantasSeleccionadas = [...this.plantasSeleccionadas];
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
