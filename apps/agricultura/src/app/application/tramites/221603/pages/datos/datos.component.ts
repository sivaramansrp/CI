import { AfterViewInit ,Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, ConsultaioStore, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { SanidadService } from '../../service/sanidad.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
/**
 * Componente que gestiona la información del solicitante en el trámite 221603.
 * Permite seleccionar el tipo de persona y cambiar entre diferentes pestañas de datos.
 */
export class DatosComponent implements OnInit, AfterViewInit, OnDestroy {

  consultaState!: ConsultaioState
  esDatosRespuesta: boolean = false;
  destroyNotifier$:Subject<void> = new Subject<void>();

  constructor(private consultaQuery: ConsultaioQuery,
              private consultaStore: ConsultaioStore,
            private sanidadService: SanidadService) {}  

  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   * Se utiliza para interactuar con el componente hijo y establecer el tipo de persona.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   * Representa la pestaña activa en la vista.
   */
  indice: number = 1;

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(true) {
      // this.consultaState.update
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

   guardarDatosFormulario(): void {
    this.sanidadService
      .getData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.sanidadService.actualizarEstadoFormulario(resp);
        }
      });
  }
 

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit(): void {
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   * Cambia la pestaña activa en la interfaz de usuario.
   * 
   * i Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}