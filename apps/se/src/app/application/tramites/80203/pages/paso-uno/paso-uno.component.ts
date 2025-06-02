/* eslint-disable no-empty-function */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SeccionLibStore, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject,map, takeUntil } from 'rxjs';
import { Anexo1Component } from '../../components/anexo-1/anexo-1.component';
import { CommonModule } from '@angular/common';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';
import { SECCIONES_TRAMITE_80203 } from '../../constantes/immex-registro-de-solicitud-modality.enums';
/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss --220202
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone:true,
  imports: [
        CommonModule,
        SolicitanteComponent,
        Anexo1Component
  ]
})

/**
 * @class PasoUnoComponent
 * @description 
 * Clase que implementa la lógica del primer paso del formulario multipaso.
 */
export class PasoUnoComponent implements OnInit {
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

    /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();


  /**
   * @property consultaState
   * @description Estado actual de la consulta para el trámite.
   * @type {ConsultaioState}
   * @memberof PasoUnoComponent
   */
  public consultaState!:ConsultaioState;

  /**
   * @property {number} indice
   * @description Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * @constructor
   * @description Constructor que inicializa el store de la sección.
   * @param {SeccionLibStore} seccionStore - Servicio para manejar el estado de las secciones.
   */
  constructor(private seccionStore: SeccionLibStore,
       private readonly consultaQuery: ConsultaioQuery,
      private permisoImmexDatosService: PermisoImmexDatosService,
  ) {}

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente. Asigna las secciones del formulario.
   */
  ngOnInit(): void {
     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    }
    else {
      this.esDatosRespuesta = true;
    }

    this.asignarSecciones();
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.permisoImmexDatosService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        // this.solocitud301Service.actualizarEstadoFormulario(resp);
        }
      });
  }


  /**
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * @description Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Anexo I', component: 'anexo-1' },
  ];

  /**
   * @event tabChanged
   * @description Evento emitido al cambiar de pestaña.
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * @method seleccionaTab
   * @description Cambia el índice de la pestaña seleccionada y emite el evento `tabChanged`.
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * @method asignarSecciones
   * @description Método privado que asigna las secciones del formulario y establece su estado inicial.
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_80203;

    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (Object.prototype.hasOwnProperty.call(PREDETERMINADO.PASO_1, LLAVE_SECCION)) {
        // @ts-expect-error - Ignorar error de tipo
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }

    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}