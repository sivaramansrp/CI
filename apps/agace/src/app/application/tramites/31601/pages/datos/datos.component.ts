import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Solocitud31601Service } from '../../services/service31601.service';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 31601
 * Establecer el índice del subtítulo
 */

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
})


export class DatosComponent implements OnInit,AfterViewInit, OnDestroy {
  @ViewChild(SolicitanteComponent, { static: false }) solicitante!: SolicitanteComponent;
  constructor(
    private consultaQuery: ConsultaioQuery,
    private solocitud31601Service: Solocitud31601Service,
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
   /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
   indice: number = 1;
   
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
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
   * Este método se utiliza para establecer el índice del subtítulo.
   */
   seleccionaTab(i: number): void {
     this.indice = i;
   }

   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud31601Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud31601Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.solicitante) {
      this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
    }
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
