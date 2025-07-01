import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL, } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Solicitud32508State, Tramite32508Store } from '../../state/Tramite32508.store';
import { Subject, map, takeUntil } from 'rxjs';
import { AdaceService } from '../../services/adace.service';
import { Router } from '@angular/router';
import { SolicitanteComponent, } from '@libs/shared/data-access-user/src';
/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
})
export class PasoUnoComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private router: Router,
    private consultaioQuery: ConsultaioQuery,
    private tramite32508Store: Tramite32508Store,
    private adaceService: AdaceService,
    private fb: FormBuilder) 
    {
    // El constructor se utiliza para la inyección de dependencias.
    }
  /**
 * Referencia al componente de solicitante.
 */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para notificar y completar las suscripciones activas al destruir el componente, evitando fugas de memoria.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  solicitanteForm!: FormGroup;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud32508State;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  ngOnInit(): void {
    this.solicitanteForm = this.fb.group({
      adace: [{ value: this.solicitudState?.adace || 'ADACE-01', disabled: this.esFormularioSoloLectura }]
    });
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    if (this.consultaDatos.update) {
      this.fetchGetDatosConsulta();
    }
  }

  /**
  * @method inicializarEstadoFormulario
  * @description Inicializa el estado del formulario según el modo de solo lectura.
  * 
  * Si la propiedad `soloLectura` es verdadera, deshabilita todos los controles del formulario.
  * En caso contrario, habilita los controles del formulario
  * 
  * @returns {void}
  */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.solicitanteForm.get('adace')?.disable();
    } else {
      this.solicitanteForm.get('adace')?.enable();
    }
  }
  /**
 * @method fetchGetDatosConsulta
 * @description Método para obtener los datos de consulta desde el servicio `DatosTramiteService` y actualizar el estado del store `tramite32508Store`.
 * 
 * Este método realiza una solicitud HTTP para obtener los datos de consulta y, si la respuesta es exitosa, actualiza múltiples propiedades del store con los datos recibidos.
 * Utiliza el operador `takeUntil` para cancelar la suscripción cuando el componente se destruye, evitando fugas de memoria.
 * 
 * @returns {void}
 */
  public fetchGetDatosConsulta(): void {
    this.adaceService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta.success) {
          this.tramite32508Store.setClaveFiscalizador(respuesta.datos.claveFiscalizado);
          this.tramite32508Store.setAdace(respuesta.datos.adace);
          this.tramite32508Store.setTipoDictamen(respuesta.datos.tipoDictamen);
          this.tramite32508Store.setRfc(respuesta.datos.rfc);
          this.tramite32508Store.setNombre(respuesta.datos.nombre);
          this.tramite32508Store.setNumeroInscripcion(respuesta.datos.numeroInscripcion);
          this.tramite32508Store.setAno(respuesta.datos.ano);
          this.tramite32508Store.setMes(respuesta.datos.mes);
          this.tramite32508Store.setRadioPartial(respuesta.datos.radioParcial);
          this.tramite32508Store.setRadioTotal(respuesta.datos.radioTotal);
          this.tramite32508Store.setSaldoPendiente(respuesta.datos.saldoPendiente);
          this.tramite32508Store.setAprovechamiento(respuesta.datos.aprovechamiento);
          this.tramite32508Store.setDisminucionAplicada(respuesta.datos.disminucionAplicada);
          this.tramite32508Store.setCompensacionAplicada(respuesta.datos.compensacionAplicada);
          this.tramite32508Store.setSaldoPendienteDisminuir(respuesta.datos.saldoPendienteDisminuir);
          this.tramite32508Store.setCantidad(respuesta.datos.cantidad);
          this.tramite32508Store.setLlaveDePago(respuesta.datos.llaveDePago);
          this.tramite32508Store.setArchivo(respuesta.datos.archivo);
          this.tramite32508Store.setFechaPago(respuesta.datos.fechaPago);
          this.tramite32508Store.setFechaElaboracion(respuesta.datos.fechaElaboracion);
          this.tramite32508Store.setSaldoPendienteCompensar(respuesta.datos.saldoPendienteCompensar);
        }
      });
  }

  /**
   * Método que se ejecuta después de que las vistas del componente han sido inicializadas.
   * Configura los formularios dinámicos y obtiene el tipo de persona.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Se utiliza para limpiar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
