import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ImportacionRetornoSanitarioService } from '../../service/importacion-retorno-sanitario.service';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';


/**
 * Componente PasoUnoComponent
 * 
 * Este componente gestiona el primer paso del trámite 260103, permitiendo la selección de pestañas,
 * la carga de datos desde el servidor y la actualización del estado del formulario.
 * Utiliza servicios y stores para manejar el estado y la lógica de negocio relacionada con el trámite.
 *
 * @author
 * @version 1.0
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * Índice utilizado para realizar selecciones o identificaciones de elementos. 
   * Puede ser un número o estar indefinido.
   * @type {number | undefined}
   */
  indice: number | undefined = 1;

  /**
   * Notificador para gestionar la destrucción de observables y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Esta variable se utiliza para almacenar el índice del subtítulo.
 */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;


  /**
   * Constructor del componente PasoUnoComponent.
   * 
   * @param tramite260103Query Consulta el estado del trámite 260103.
   * @param tramite260103Store Maneja el estado del store para el trámite 260103.
   * @param consultaQuery Consulta el estado general del usuario.
   * @param importacionRetornoSanitarioService Servicio para manejar datos de importación y retorno sanitario.
   */
  constructor(
    private tramite260103Query: Tramite260103Query,
    private tramite260103Store: Tramite260103Store,
    private consultaQuery: ConsultaioQuery,
    private importacionRetornoSanitarioService: ImportacionRetornoSanitarioService
  ) {
   this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$)).subscribe((seccionState) => {
        this.consultaState = seccionState;
        if (this.consultaState && this.consultaState.procedureId === '260103' &&
          this.consultaState.update) {
          this.guardarDatosFormulario();
        } else {
          this.esDatosRespuesta = true;
        }
      });  
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe al flujo de datos `getTabSeleccionado$` para obtener el índice de la pestaña seleccionada
   * y actualizar el valor de `indice`. Se utiliza `takeUntil` para desuscribirse cuando el componente se destruya.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
      this.tramite260103Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.importacionRetornoSanitarioService
      .getTramiteDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.importacionRetornoSanitarioService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Método para seleccionar una pestaña. Actualiza el estado de la pestaña seleccionada en el store.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
      this.tramite260103Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
