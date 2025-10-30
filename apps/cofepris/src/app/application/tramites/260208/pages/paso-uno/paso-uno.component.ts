import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  ConsultaioQuery,
  ConsultaioState,
  SolicitanteComponent
} from '@ng-mf/data-access-user';

import { ImportacionDestinadosDonacioService } from '../../services/importacion-destinados-donacio.service';

import {
  Subject,
  map,
  takeUntil
} from 'rxjs';

import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260208Query } from '../../estados/tramite260208Query.query';
import { Tramite260208Store } from '../../estados/tramite260208Store.store';


@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  
  /**
   * Índice de la pestaña/tab actualmente seleccionada.
   * Puede ser undefined si no hay pestaña seleccionada.
   * @type {number | undefined}
   * @default 1
   */
  indice: number | undefined = 1;

  /**
   * Subject utilizado para manejar la desuscripción de observables
   * cuando el componente es destruido.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

/**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  @ViewChild('solicitante') solicitante!: SolicitanteComponent

  @ViewChild('contenedorDatos') contenedorDatos!: ContenedorDeDatosSolicitudComponent;

  @ViewChild('tercerosRelacionados') tercerosRelacionados!: TercerosRelacionadosVistaComponent;

  @ViewChild('pagoDerechos') pagoDerechos!: PagoDeDerechosContenedoraComponent;

  /**
   * Constructor que inyecta las dependencias necesarias para el manejo del estado del trámite.
   * @constructor
   * @param {Tramite260208Query} tramite260208Query - Query para acceder al estado del trámite
   * @param {Tramite260208Store} tramite260208Store - Store para actualizar el estado del trámite
   * @param {ConsultaioQuery} consultaQuery - Query para acceder al estado de la consulta
   * @param {ImportacionDestinadosDonacioService} importacionDestinadosDonacioService - Servicio para importar datos de donación
   */

  constructor(
    private tramite260208Query: Tramite260208Query,
    private tramite260208Store: Tramite260208Store,
    private consultaQuery: ConsultaioQuery,
    private importacionDestinadosDonacioService: ImportacionDestinadosDonacioService
  ) { 
        this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })).subscribe();
  }

  /**
   * Método del ciclo de vida OnInit de Angular.
   * Se suscribe a los cambios en la pestaña seleccionada del trámite.
   * @method ngOnInit
   */
  ngOnInit(): void {
    if (this.consultaState && this.consultaState.procedureId === '260208' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

    this.tramite260208Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
  * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
  * Luego reinicializa el formulario con los valores actualizados desde el store.
  */
  guardarDatosFormulario(): void {
    this.importacionDestinadosDonacioService.getRegistroTomaMuestrasMercanciasData().pipe(
      takeUntil(this.destroyNotifier$)).subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.importacionDestinadosDonacioService.actualizarEstadoFormulario(resp);
        }
      });
  }
  
  /**
   * Actualiza la pestaña seleccionada en el store del trámite.
   * @method seleccionaTab
   * @param {number} i - Índice de la nueva pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.tramite260208Store.updateTabSeleccionado(i);
  }

  public validarFormularios(): boolean {
    let isValid = true;

    if (this.solicitante?.form) {
      if (this.solicitante.form.invalid) {
        this.solicitante.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.contenedorDatos) {
      if (!this.contenedorDatos.validarFormularioDatos()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.tercerosRelacionados) {
      if (!this.tercerosRelacionados.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.pagoDerechos) {
      if (!this.pagoDerechos.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  }

  /**
   * Método del ciclo de vida OnDestroy de Angular.
   * Limpia las suscripciones activas emitiendo un valor al destroyNotifier$
   * y completando el subject.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
