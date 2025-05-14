/* eslint-disable @nx/enforce-module-boundaries */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery, ConsultaioState, TieneConsultaio } from '@ng-mf/data-access-user';
import { Pantallas301Service } from '../../services/pantallas301.service';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { Solocitud301Service } from '../../services/service301.service';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220401
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-pantalla-datos',
  standalone: false,
  templateUrl: './datos.component.html',
})
export class DatosComponent implements OnInit,OnDestroy,AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  
   /**
  * Indica si el formulario está en modo de actualización (patch).
  * Si es `true`, el formulario se utiliza para editar un registro existente.
  */
   public esFormularioActualizacion: boolean = false; 

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;
  public tieneConsulta:TieneConsultaio = {
    readonly: false,
    create: false,
    update: false,
  }
  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  indice: number = 1;
  /**
   * Este método se utiliza para establecer el índice del subtítulo.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  constructor(
    public pantallasSvc: Pantallas301Service,
    private solocitud301Service: Solocitud301Service,
    private consultaioQuery: ConsultaioQuery,
    private consultaQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioActualizacion =
            seccionState.parameter === 'FLUJO_FUNCIONARIO_ATENDER_REQUERIMIENTO' || seccionState.parameter === 'FLUJO_FUNCIONARIO_AUTORIZACION' || seccionState.parameter === 'FLUJO_FUNCIONARIO_EVALUAR' || seccionState.parameter === 'BANDEJA_SOLICITUDES'
              ? true
              : false;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.readonly) {
      this.getBandejaSolicitudesDatos();
    }
    if(this.esFormularioActualizacion){
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  public getBandejaSolicitudesDatos(): void {
    this.tieneConsulta.readonly = this.consultaState.readonly;
    this.tieneConsulta.create = this.consultaState.create;
    this.tieneConsulta.update = this.consultaState.update;
    this.pantallasSvc.getPantallaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      this.solocitud301Service.actualizarEstadoFormulario(response);
    });
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud301Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud301Service.actualizarEstadoFormulario(resp);
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

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}