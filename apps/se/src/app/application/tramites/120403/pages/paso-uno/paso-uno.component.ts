import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico } from '@ng-mf/data-access-user';
import { ReplaySubject, map,takeUntil } from 'rxjs';
import { CuposService } from '../../services/cupos.service';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * Indica si los datos de respuesta están disponibles.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
   /**
     * Estado de la consulta, utilizado para manejar el estado de la aplicación.
     */
  public consultaState!: ConsultaioState;
  /**
   * Catálogo de entidades federativas.
   */
  entidadFederativa!: unknown;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
  * Emisor de eventos para comunicar el índice del paso actual.
  * Permite emitir el índice del paso seleccionado al componente padre.
  */
  @Output() dataEmitter = new EventEmitter<number>();
  /**
   * Indica si existen datos de respuesta del servidor para actualizar el formulario.
   */
   public esDatosRespuesta: boolean = false;
  /**
   * Constructor del componente.
   * Inicializa el componente y puede ser utilizado para inyecciones de dependencias si es necesario.
   */
  constructor(private consultaioQuery: ConsultaioQuery,
    private cupos: CuposService ){
    } 
    /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de consulta y carga datos si es necesario.
   */
  ngOnInit(): void {
     this.consultaioQuery.selectConsultaioState$.pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })
    ).subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormularios();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormularios(): void {
    this.cupos
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.cupos.actualizarEstadoFormulario(resp);
        }
      });
  }
  
  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.dataEmitter.emit(this.indice);

  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta cuando el componente es destruido.
   * Aquí se pueden realizar tareas de limpieza, pero en este caso lanza un error indicando que no está implementado.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
