import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { EmpresasTerciarizadasComponent } from '../../components/empresas-terciarizadas/empresas-terciarizadas.component';
import { registroSolicitudImmexService } from '../../services/registro-expansion.service';
/**
 * Componente que representa el primer paso de un trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
/**
 * Componente que representa el primer paso de un trámite.
 */
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
     * Índice utilizado para identificar la posición actual en un proceso o lista.
     * @type {number}
     */
  indice: number = 1;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Subject para notificar la destrucción del componente. */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la consulta obtenido desde el store global.
   * Contiene la información relevante para el flujo del trámite en este paso.
   */
  public consultaState!: ConsultaioState;

  @ViewChild('empresasTerciarizadas') empresasTerciarizadas!: EmpresasTerciarizadasComponent;
  /** Referencia al componente hijo SolicitanteComponent para acceso a sus métodos y propiedades */
@ViewChild(SolicitanteComponent, { static: false }) solicitante!: SolicitanteComponent;

  constructor(
    @Inject(registroSolicitudImmexService)
    public registroSolicitudService: registroSolicitudImmexService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   *
   * Suscribe al observable `selectConsultaioState$` para obtener el estado actual de la consulta
   * y lo asigna a la propiedad `consultaState`. Dependiendo del valor de `update` en el estado,
   * decide si debe cargar los datos del formulario o marcar que los datos de respuesta están listos.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
    })).subscribe();
    if (this.consultaState.update) {
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
    this.registroSolicitudService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.registroSolicitudService.actualizarEstadoFormulario(resp);
        } else {
          this.esDatosRespuesta = false;
        }
      });
  }

  /**
   * Selecciona una pestaña específica.
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  /**
* Valida todos los formularios del paso uno incluyendo solicitante, certificado, datos y destinatario
* @returns true si todos los formularios son válidos, false en caso contrario
*/
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
   if (this.empresasTerciarizadas) {
      if (!this.empresasTerciarizadas.validarFormularios()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }
    return isValid;
  }
  /**
   * Método de limpieza al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
