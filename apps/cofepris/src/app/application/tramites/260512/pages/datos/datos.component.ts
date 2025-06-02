import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject,map,takeUntil } from 'rxjs';
import { DatosDomicilioLegalState } from '../../../../shared/estados/stores/datos-domicilio-legal.store';
import { SolicitudService } from '../../../../shared/services/solicitud.service';
import { SolicitudState } from '../../../../shared/estados/stores/aviso-calidad.store';

/**
 * @description
 * Componente principal para gestionar la selección de subtítulos en la página de datos.
 * Este componente permite cambiar entre diferentes secciones o pestañas
 * utilizando un índice que representa el subtítulo seleccionado.
 */
@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit , OnDestroy {
  /**
   * @description
   * Variable que almacena el índice del subtítulo seleccionado.
   * Por defecto, el índice inicial es `1`.
   */
  indice: number = 1;

    /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

public solicitudState!: SolicitudState;

public DatosDomicilioLegalState!: DatosDomicilioLegalState;

  constructor(
    private solicitudService: SolicitudService,
    private consultaQuery: ConsultaioQuery,


  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

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

    guardarDatosFormulario(): void {
    this.solicitudService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solicitudService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * @description
   * Método que establece el índice del subtítulo seleccionado.
   * Este método se utiliza para cambiar entre diferentes subtítulos o pestañas.
   * @param i Índice del subtítulo que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}