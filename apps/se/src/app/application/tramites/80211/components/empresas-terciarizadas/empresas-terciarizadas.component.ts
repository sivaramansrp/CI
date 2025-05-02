import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FormularioDatos,
  Plantas,
} from '../../modelos/registro-expansion.model';
import { Subject, takeUntil, tap } from 'rxjs';
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
    private tramite80211Query: Tramite80211Query
  ) {}

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
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
    this.createEmpresasForm();
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
    if (this.empresasForm.valid) {
      this.showPlantas = true;
      this.tramite80211Store.setPlantasDisponibles([]);
      this.segregatePlantasDatos();
      this.tramite80211Store.setShowPlantas(this.showPlantas);
      this.empresasForm.get('rfc')?.reset();
      this.empresasForm.get('estado')?.reset();
    }
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
          tap((plantas) => {
            this.tramite80211Store.setPlantasDisponibles(plantas?.datos);
          }),
          takeUntil(this.destoryNotification$)
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
    this.tramite80211Store.setPlantasDisponibles(DISPONIBLES_PLANTAS_ID);
    const SELECCIONADA_PLANTAS_ID = this.plantasSeleccionadas.map(
      (planta) => planta
    );
    this.tramite80211Store.setPlantasSeleccionada(SELECCIONADA_PLANTAS_ID);

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
   * Establece valores en el estado global desde el formulario.
   * 
   * @param campo - Nombre del campo en el formulario.
   * @param metodoNombre - Método del estado global para actualizar el valor.
   */
  setValoresStore(campo: string, metodoNombre: keyof Tramite80211Store): void {
    const VALOR = this.empresasForm.get(campo)?.value;
    (this.tramite80211Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destoryNotification$.next();
    this.destoryNotification$.complete();
  }
}
