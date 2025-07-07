import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Component } from '@angular/core';
import { map } from 'rxjs';

import { CommonModule } from '@angular/common';
import { DatosDelTramiteComponent } from '../../components/datos-del-tramite/datos-del-tramite.component';
import { RegistroCaatAereoService } from '../../services/RegistroCaatAereoController.service';
import { Tramite40401Query } from '../../../../core/queries/tramite40401.query';
import { Tramite40401State } from '../../../../core/estados/tramites/tramite40401.store';
import { Tramite40401Store } from '../../../../core/estados/tramites/tramite40401.store';

/**
 * Componente para el paso uno del wizard.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SolicitanteComponent,
    DatosDelTramiteComponent,
  ],
})
export class PasoUnoComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Referencia al componente hijo de tipo SolicitanteComponent.
   */
  @ViewChild(SolicitanteComponent)
  solicitante!: SolicitanteComponent;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  /**
 * Estado actual del trámite.
 *
 * Esta propiedad almacena el estado del trámite obtenido desde el store.
 */
  public tramiteState!: Tramite40401State;

  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  
  consultaDatos!: ConsultaioState;

  constructor(
    public store: Tramite40401Store,
    public tramiteQuery: Tramite40401Query,
    private consultaQuery: ConsultaioQuery,
    private registroCaatAereoService: RegistroCaatAereoService
  ) {
    // Inicializa el paso activo en el store
  }
  /**
   * Selecciona una pestaña del wizard.
   * @param {number} i - Índice de la pestaña.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
  }

  /**
   * Método del ciclo de vida `OnInit`.
   *
   * Inicializa el formulario y carga los datos necesarios para el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.indice = this.tramiteState.pestanaActiva;

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          // seccionState.update = true; // Asegura que se actualice el estado 
          this.consultaDatos = seccionState;

        })
      )
      .subscribe();

    if (this.consultaDatos.update) {
      this.guardarDatosFormulario();
    }else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
      this.registroCaatAereoService
        .obtenerCAATAereoData()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          this.esDatosRespuesta = true;

          // Actualiza el estado del chofer40103Store con los datos del director general
          this.store.setPais(data.TipoDeCaatAereo);
          this.store.setCodigo(data.DodigoDeTransportacion);
          this.store.setTransportacion(data.EmpresaDeTransportacion);
        });
  }
  /**
   * Método del ciclo de vida `OnDestroy`.
   *
   * Libera los recursos y completa el `Subject` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

    /**
   * Gancho del ciclo de vida de Angular que se ejecuta
   * después de que la vista del componente ha sido completamente inicializada.
   * Inicializa los datos de persona y domicilio fiscal.
   */
    ngAfterViewInit(): void {
      this.obtenerTipoPersona();
    }
    
    /**
     * @method obtenerTipoPersona
     * @description Obtiene el tipo de persona y lo establece en el componente `SolicitanteComponent`.
     * 
     * Este método utiliza un `setTimeout` para ejecutar la función `obtenerTipoPersona` del componente `SolicitanteComponent` con el valor `TIPO_PERSONA.MORAL_NACIONAL`.
     * 
     * Verifica si la referencia al componente `SolicitanteComponent` existe antes de llamar al método.
     * 
     * @returns {void}
     */
    obtenerTipoPersona(): void {
      setTimeout(() => {
        if (this.solicitante) {
          this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
        }
      }, 50);
    }
}
