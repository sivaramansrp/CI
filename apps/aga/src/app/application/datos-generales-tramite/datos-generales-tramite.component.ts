import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { DatosGeneralesDelTramite, TareasActivas } from '@libs/shared/data-access-user/src/core/models/datos-generales-del-tramite.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, catchError, map, of, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { TramiteQuery } from '@libs/shared/data-access-user/src/core/queries/tramite.query';
import { TramiteService } from '@libs/shared/data-access-user/src/core/services/tramite.service';
import { TramiteState } from '@libs/shared/data-access-user/src/core/estados/tramite.store';

import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';

import { AccuseComponentes, ListaComponentes, Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { LISTA_TRIMITES } from '../core/enums/lista-trimites.enums';


@Component({
  selector: 'app-datos-generales-tramite',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReviewersTabsComponent],
  templateUrl: './datos-generales-tramite.component.html',
  styleUrl: './datos-generales-tramite.component.scss',
})
export class DatosGeneralesTramiteComponent implements OnInit, OnDestroy {
  /** 
  * Subject para destruir las suscripciones.
  */
  private destruirSuscripcion$: Subject<void> = new Subject();
  /** Formulario de tramite */
  public FormTramite!: FormGroup;
  /** Datos generales del tramite */
  datosGeneralesTramite: DatosGeneralesDelTramite = {
    numeroDeTramite: "",
    tipoDeSolicitud: "",
    diasHabilesTranscurridos: "",
    tareasActivas: []
  };
  /** Lista de tareas activas */
  tareas: TareasActivas[] = [];
  /**
  * Notificador para destruir las suscripciones.
  */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
     * Estado de la solicitud.
     */
  public solicitudTramiteState!: TramiteState;
  /**
   * idTramite
   */
  idTramite: string = "";
  /**
   * @property {Type<unknown>} viewChild
   * @description Referencia dinámica al componente hijo que se carga según la pestaña seleccionada.
   */
  viewChild!: Type<unknown>;
  /**
   * @property {AccuseComponentes | undefined} slectTramite
   * @description Objeto que representa el trámite seleccionado actualmente.
   */
  slectTramite!: AccuseComponentes | undefined;
  /**
   * @property {number} tramite
   * @description Identificador del trámite seleccionado.
   */
  tramite: number = 0;

  /**
   * @property {ConsultaioState} guardarDatos
   * @description Estado actual del trámite consultado.
   */
  guardarDatos!: ConsultaioState;

  /**
   * Esta variable se utiliza para almacenar el estado de la consulta.
   */
  public consultaState!:ConsultaioState;

  constructor(
    private tramiteService: TramiteService,
    private fb: FormBuilder,
    private solicitudtramiteQuery: TramiteQuery,
    private consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
          this.consultaState = seccionState;
          this.tramite = Number(seccionState.procedureId);
          if (this.tramite) {
              this.selectTramite(this.tramite);
          }
        })
      )
      .subscribe();
    }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Inicializa el formulario de tramite y consulta los datos generales del tramite.
   */
  ngOnInit(): void {
    this.inicializaFormTramite();
    this.solicitudtramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudTramiteState = seccionState;
          this.idTramite = seccionState.idTramite;
        })
      )
      .subscribe();
      
    this.consultarDatosGeneralesTramite();
  }

  /**
   * Inicializa el formulario de tramite
   * @returns {void}
   */
  inicializaFormTramite(): void {
    this.FormTramite = this.fb.group({
      numeroDeTramite: [{ value: '', disabled: true }],
      tipoDeSolicitud: [{ value: '', disabled: true }],
      diasHabilesTranscurridos: [{ value: '', disabled: true }],
      tareasActivas: [[]]
    });
  }

  /**
   * Consulta los datos generales del tramite
   * @returns {void}
   */
  consultarDatosGeneralesTramite(): void {
    this.tramiteService.obtenerDatosTramite(this.idTramite)
      .pipe(
        map((data) => {
          // Asignar los datos al formulario
          this.FormTramite.get('numeroDeTramite')?.setValue(data.numeroDeTramite);
          this.FormTramite.get('tipoDeSolicitud')?.setValue(data.tipoDeSolicitud);
          this.FormTramite.get('diasHabilesTranscurridos')?.setValue(data.diasHabilesTranscurridos);
          this.FormTramite.get('tareasActivas')?.setValue(data.tareasActivas);
          this.tareas = data.tareasActivas;

        }),
        catchError((_error) => {
          console.error('Error al consultar datos del trámite', _error);
          return of(null);
        }),
        takeUntil(this.destruirSuscripcion$)
      )
      .subscribe();
  }

  /**
   * @method viewChildcambioDePestana
   * @description Cambia el componente hijo mostrado según la pestaña seleccionada.
   * @param {Tabulaciones} id - Identificador de la pestaña seleccionada.
   * @returns {void}
   */
  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find((v: ListaComponentes) => v.id === id.id);
    if (LI) {
      this.loadComponent(LI);
    }
  }

  /**
   * @method loadComponent
   * @description Carga dinámicamente un componente hijo según la ruta especificada en el objeto recibido.
   * @param {ListaComponentes} li - Objeto que contiene la información y la ruta del componente a cargar.
   * @returns {Promise<void>}
   */
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      return;
    }
    this.viewChild = await li.componentPath() as Type<unknown>;
  }

  /**
* Se ejecuta al destruir el componente.
* Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
*/
  ngOnDestroy(): void {
    this.destruirSuscripcion$.next();
    this.destruirSuscripcion$.complete();
  }

/**
   * @method selectTramite
   * @description Selecciona el trámite a evaluar y actualiza la referencia del trámite seleccionado.
   * @param {number} i - Identificador del trámite.
   * @returns {void}
   */
  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }
}
