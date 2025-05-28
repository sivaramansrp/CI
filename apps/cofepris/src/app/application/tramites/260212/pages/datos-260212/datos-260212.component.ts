import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject,map,takeUntil } from 'rxjs';
import { Service260212Service } from '../../services/service260212.service';

/**
 * @descripción
 * Componente `Datos260212Component` encargado de manejar las pestañas (tabs) 
 * en la interfaz de usuario. Proporciona la funcionalidad de selección de pestañas.
 */
@Component({
  selector: 'app-datos-260212',
  standalone: false,
  templateUrl: './datos-260212.component.html',
})
export class Datos260212Component implements OnInit, AfterViewInit, OnDestroy {
 /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
    @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

      /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
 
  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;

  constructor(private consultaQuery: ConsultaioQuery,
    private service260212Service:Service260212Service){}

  
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

    /**
     * Se ejecuta después de que la vista ha sido inicializada.
     * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
     * para establecer el tipo de persona como MORAL_NACIONAL.
     */
    ngAfterViewInit() :void{
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    }
/**
 * Índice de la pestaña actualmente seleccionada.
 * Inicializado a 1 por defecto.
 */
  indice = 1;

  /**
   * Método para seleccionar una pestaña específica.
   *
   * @param i El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
    guardarDatosFormulario(): void {
    this.service260212Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.service260212Service.actualizarEstadoFormulario(resp);
        }
      });
  }
 
    ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
