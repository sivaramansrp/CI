
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitanteComponent, TIPO_PERSONA } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Solicitud260401Service } from '../../services/service260401.service';

/**
 * Componente DatosTerritorioComponent
 * 
 * Este componente es responsable de manejar los datos del territorio en la solicitud.
 * Permite la navegación entre los pasos de la solicitud y la actualización del índice del paso actual.
 */
@Component({
  selector: 'app-datos-territorio',
  templateUrl: './datos-territorio.component.html',
})
export class DatosTerritorioComponent implements AfterViewInit, OnInit {


  public esDatosRespuesta: boolean = false;

  public consultaState!: ConsultaioState;

  private destroyNotifier$: Subject<void> = new Subject();
  
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  constructor(private consultaQuery: ConsultaioQuery, private solicitud260401Service: Solicitud260401Service) {
    // Constructor del componente, se pueden inyectar servicios aquí si es necesario.
  }

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
      // this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  // guardarDatosFormulario(): void {
  //   this.solicitud260401Service
  //     .getRegistroTomaMuestrasMercanciasData().pipe(
  //       takeUntil(this.destroyNotifier$)
  //     )
  //     .subscribe((resp) => {
  //       if(resp){
  //       this.esDatosRespuesta = true;
  //       this.solicitud260401Service.actualizarEstadoFormulario(resp);
  //       }
  //     });
  // }

  /**
   * Se ejecuta después de que la vista ha sido inicializada.
   * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
   * para establecer el tipo de persona como MORAL_NACIONAL.
   */
  ngAfterViewInit() :void{
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Índice actual del subtítulo seleccionado en la interfaz.
   */
  indice: number = 1;

  /**
   * Método para actualizar el índice del subtítulo seleccionado.
   * 
   * @param i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
