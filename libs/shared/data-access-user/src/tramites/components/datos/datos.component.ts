/* eslint-disable @nx/enforce-module-boundaries */
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { SolicitanteComponent } from 'libs/shared/data-access-user/src/tramites/components/solicitante/solicitante.component';
import { Solocitud301Service } from '../../../core/services/service301.service';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';

import { Solicitud301State } from '../../../core/estados/tramite301.store';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroParaLaComponent } from '../registro-para-la/registro-para-la.component';

import { DeLaMuestraComponent } from '../de-la-muestra/de-la-muestra.component';
import { InformacionDeLaComponent } from '../informacion-de-la/informacion-de-la.component';
import { PagoDeDerechosComponent } from '../pago-de-derechos/pago-de-derechos.component';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220401
 * Establecer el índice del subtítulo
 */
@Component({
  selector: 'app-pantalla-datos',
  standalone: true,
  templateUrl: './datos.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagoDeDerechosComponent,
    InformacionDeLaComponent,
    DeLaMuestraComponent,
    RegistroParaLaComponent, 
    SolicitanteComponent],
})
export class DatosComponent implements OnInit,OnDestroy,AfterViewInit {
  /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Esta variable se utiliza para almacenar el estado de la consulta.
   */
  public consultaState!:ConsultaioState;
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
    private solocitud301Service: Solocitud301Service,
    private consultaQuery: ConsultaioQuery
  ) {
  // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * `ngOnInit` en el código TypeScript proporcionado es un método de ciclo de vida ofrecido por Angular. 
   * En este componente específico (`DatosComponent`), el método `ngOnInit` se utiliza para suscribirse 
   * al observable `selectConsultaioState$` de `consultaQuery` y realizar algunas operaciones basadas 
   * en los valores emitidos.
   */ 
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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud301Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp: unknown) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solocitud301Service.actualizarEstadoFormulario(resp as Solicitud301State);
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
   * Método del ciclo de vida que se llama cuando el componente es destruido.
   * Emite un valor y completa el subject `destroyNotifier$` para notificar a las suscripciones
   * que deben limpiar recursos y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}