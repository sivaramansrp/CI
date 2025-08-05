import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, map, takeUntil } from 'rxjs';

import {
  ConsultaioQuery,
  ConsultaioState,
  SeccionLibStore,
  SolicitanteComponent,
} from '@ng-mf/data-access-user';
import { Anexo1Component } from '../../components/anexo-1/anexo-1.component';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';
import { SECCIONES_TRAMITE_80203 } from '../../constantes/immex-registro-de-solicitud-modality.enums';
import { immexRegistroform } from '../../modelos/immex-registro-de-solicitud-modality.model';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss
 * @standalone
 * @imports CommonModule, SolicitanteComponent, Anexo1Component
 * @description
 * Clase que implementa la lógica del primer paso del formulario multipaso.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, Anexo1Component],
})

/**
 * @class PasoUnoComponent
 * @description
 * Clase que implementa la lógica del primer paso del formulario multipaso.
 */
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Datos de respuesta del servidor utilizados para actualizar el formulario.
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta para el trámite.
   */
  public consultaState!: ConsultaioState;

  /**
   * Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * Constructor que inicializa el store de la sección.
   * @param seccionStore Servicio para manejar el estado de las secciones.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param permisoImmexDatosService Servicio para obtener y actualizar datos IMMEX.
   */
  constructor(
    private seccionStore: SeccionLibStore,
    private readonly consultaQuery: ConsultaioQuery,
    private permisoImmexDatosService: PermisoImmexDatosService
  ) {}

  /**
   * Método de inicialización del componente. Asigna las secciones del formulario.
   * @inheritdoc
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
    // this.asignarSecciones();
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.permisoImmexDatosService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.permisoImmexDatosService.actualizarEstadoFormulario(
            resp?.immexRegistro || ({} as immexRegistroform)
          );
        }
      });
  }

  /**
   * Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Anexo I', component: 'anexo-1' },
  ];

  /**
   * Evento emitido al cambiar de pestaña.
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada y emite el evento `tabChanged`.
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * Método privado que asigna las secciones del formulario y establece su estado inicial.
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_80203;

    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (
        Object.prototype.hasOwnProperty.call(
          PREDETERMINADO.PASO_1,
          LLAVE_SECCION
        )
      ) {
        // @ts-expect-error - Ignorar error de tipo
        SECCIONES.push(PREDETERMINADO.PASO_1[LLAVE_SECCION]);
        FORMA_VALIDA.push(false);
      }
    }

    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
  /**
   * Limpia las suscripciones y recursos al destruir el componente.
   * @inheritdoc
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
