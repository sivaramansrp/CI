import { Component, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_80101 } from '../../constantes/nuevo-programa.enum';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { map, Subject, takeUntil } from 'rxjs';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
@Component({
  selector: 'app-paso-uno-cs',
  templateUrl: './paso-uno-cs.component.html',
})
export class PasoUnoCsComponent implements OnInit {
  /**
   * @description Constructor del componente.
   * Inicializa el componente y establece el índice de la pestaña seleccionada.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$ - Subject para notificar la destrucción del componente.
   * Utilizado para cancelar suscripciones y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Índice utilizado para representar el número actual o posición en un flujo o proceso.
   *
   * @type {number} - Valor inicializado en 1.
   */
  indice: number = 1;

  /**
   * @property {ConsultaioState} consultaState - Estado actual relacionado con la consulta.
   */
  public consultaState!: ConsultaioState;

  /**
   * Constructor de la clase PasoUnoCsComponent.
   *
   * @param seccionStore - Inyección de dependencia del servicio `SeccionLibStore`
   *                       utilizado para gestionar el estado de las secciones.
   *
   * Este constructor inicializa el componente y llama al método `asignarSecciones`
   * para configurar las secciones necesarias al cargar el componente.
   */
  constructor(
    private seccionStore: SeccionLibStore,
    private consultaQuery: ConsultaioQuery,
    private autorizacionProgrmaNuevoService: NuevoProgramaIndustrialService
  ) {
    this.asignarSecciones();
  }
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.formularioDeshabilitado = seccionState.readonly;
          if (this.consultaState.update) {
            this.guardarDatosFormulario();
          }
        })
      )
      .subscribe();
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.autorizacionProgrmaNuevoService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.autorizacionProgrmaNuevoService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método para asignar las secciones existentes al stored
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];
    const PREDETERMINADO = SECCIONES_TRAMITE_80101;
    for (const LLAVE_SECCION in PREDETERMINADO.PASO_1) {
      if (
        Object.prototype.hasOwnProperty.call(
          PREDETERMINADO.PASO_1,
          LLAVE_SECCION
        )
      ) {
        const KEY = LLAVE_SECCION as keyof typeof PREDETERMINADO.PASO_1;
        SECCIONES.push(PREDETERMINADO.PASO_1[KEY]);
        FORMA_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORMA_VALIDA);
  }
}
