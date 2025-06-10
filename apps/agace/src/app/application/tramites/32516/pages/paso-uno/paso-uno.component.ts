import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { ConsultaDatosService } from '../../servicios/consulta-datos.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit} from '@angular/core';
import { Output } from '@angular/core';
import { PersonaTerceros } from '@ng-mf/data-access-user';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Componente para el asistente de solicitud.
 * Este componente gestiona la navegación entre los pasos del formulario de solicitud.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss'
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Indica si existen datos de respuesta para mostrar en el formulario.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

    /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

    /**
   * Lista de personas relacionadas con el trámite.
   * @type {PersonaTerceros[]}
   */
  public personas: PersonaTerceros[] = [];
  /**
  * Subject utilizado para gestionar la desuscripción de observables.
  * Se completa en `ngOnDestroy()` para prevenir fugas de memoria.
  * @property {Subject<void>} destroyNotifier$
  * @private
  */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice - Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  public indice: number | undefined = 1;

  /**
   * Initializes the component with required query and store for state management.
   *
   * @param Tramite260210Query Query to access procedure state.
   * @param tramite260214Store Store to update procedure state.
   */
  constructor(
    private route: ActivatedRoute, private seccionStore: SeccionLibStore, private consultaDatosService: ConsultaDatosService, private consultaQuery: ConsultaioQuery
  ) {
// Se puede agregar aquí la lógica del constructor si es necesario
  }
  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Se suscribe a los cambios en el estado de la consulta y a los parámetros de la ruta.
   * @method ngOnInit
   */
  ngOnInit(): void {
        this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;
          if (this.consultaState.update) {
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();
    this.route.queryParams
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = Number(tab['indice'] || 1);
      });
  }
    /**
     * Guarda los datos del formulario obtenidos del servicio.
     * Este método se suscribe al servicio para obtener los datos de la solicitud
     * y actualiza el estado del formulario con la información recibida.
     * @method guardarDatosFormulario
     */
    guardarDatosFormulario(): void {
      this.consultaDatosService
        .getDatosDeLaSolicitudData()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((resp) => {
          if (resp) {
            this.esDatosRespuesta = true;
            this.personas =
              (resp as { personas?: PersonaTerceros[] }).personas || [];
            this.consultaDatosService.actualizarEstadoFormulario(resp);
          }
        });
    }
  /**
   * Evento emitido al cambiar de pestaña.
   * @event tabChanged
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada.
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * Maneja la limpieza de recursos antes de destruir el componente.
   * Completa el Subject `destroyNotifier$` para evitar fugas de memoria.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}