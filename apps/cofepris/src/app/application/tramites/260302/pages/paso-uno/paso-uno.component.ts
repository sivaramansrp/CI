import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';
import { ExportacionMateriasPrimasService } from '../../service/exportacion-materias-primas.service';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

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

  constructor(
    private tramite260302Query:Tramite260302Query,
    private tramite260302Store: Tramite260302Store,
    private consultaQuery: ConsultaioQuery,
    private exportacionMateriasPrimasServiceService: ExportacionMateriasPrimasService,    
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$)).subscribe((seccionState) => {
      this.consultaState = seccionState;
      if (this.consultaState && this.consultaState.procedureId === '260302' &&
        this.consultaState.update) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
    }); 
  }
  /*
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
   this.exportacionMateriasPrimasServiceService
     .getTramiteDatos().pipe(
       takeUntil(this.destroyNotifier$)
     )
     .subscribe((resp) => {
       if(resp){
       this.esDatosRespuesta = true;
       this.exportacionMateriasPrimasServiceService.actualizarEstadoFormulario(resp);
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
      this.tramite260302Query.getTabSeleccionado$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((tab) => {
          this.indice = tab;
        });
  }

  /**
   * Método para seleccionar una pestaña. Actualiza el estado de la pestaña seleccionada en el store.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
      this.tramite260302Store.updateTabSeleccionado(i);
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
