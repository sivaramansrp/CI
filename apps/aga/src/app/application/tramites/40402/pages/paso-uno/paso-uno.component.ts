import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, SolicitanteComponent } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { map, takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { Tramite40402Store } from '../../estados/tramite40402.store';
import { TransportacionMaritimaService } from '../../services/transportacion-maritima/transportacion-maritima.service';

/**
 * Componente para el primer paso del trámite.
 * 
 * @class PasoUnoComponent
 * @implements {AfterViewInit, OnDestroy, OnInit}
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
   * Referencia al componente Solicitante.
   * 
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona asociada al trámite.
   * 
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para persona.
   * 
   * @type {FormularioDinamico[]}
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para domicilio fiscal.
   * 
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice de la pestaña activa.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * Estado de validación del formulario.
   * 
   * @type {boolean}
   */
  validacion: boolean = false;

  /**
   * Datos del número de pedimento.
   * 
   * @type {string}
   */
  @Input() datosNroPedimento!: string;

  /**
   * Datos de consulta del trámite.
   * 
   * @type {ConsultaioState}
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indicador de respuesta de datos obtenida.
   * 
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para gestionar la destrucción de suscripciones.
   * 
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * 
   * @constructor
   * @param {TransportacionMaritimaService} service Servicio de transporte marítimo
   * @param {ConsultaioQuery} consultaioQuery Consulta de estado del trámite
   * @param {Tramite40402Store} store Almacén de estado del trámite
   */
  constructor(
    private service: TransportacionMaritimaService,
    private consultaioQuery: ConsultaioQuery,
    private store: Tramite40402Store
  ) {}

  /**
   * Inicialización del componente.
   * 
   * @method ngOnInit
   */
  ngOnInit(): void {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();

    if (this.consultaDatos?.update) {
      this.fetchGetDatosConsulta();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Hook de ciclo de vida después de la inicialización de la vista.
   * 
   * @method ngAfterViewInit
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
  }

  /**
   * Selecciona una pestaña por índice.
   * 
   * @method seleccionaTab
   * @param {number} i Índice de la pestaña a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene datos de consulta del servicio.
   * 
   * @method fetchGetDatosConsulta
   */
  public fetchGetDatosConsulta(): void {
    this.service
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta.success) {
          this.esDatosRespuesta = true;
          this.store.setSeguroNumero(respuesta?.datos?.seguroNumero);
          this.store.setNombrePFE(respuesta?.datos?.nombrePFE);
          this.store.setApellidoPaternoPFE(respuesta?.datos?.apellidoPaternoPFE);
          this.store.setApellidoMaternoPFE(respuesta?.datos?.apellidoMaternoPFE);
          this.store.setCorreoPFE(respuesta?.datos?.correoPFE);
          this.store.setPaisPFE(respuesta?.datos?.paisPFE);
          this.store.setCodigoPostalPFE(respuesta?.datos?.codigoPostalPFE);
          this.store.setCiudadPFE(respuesta?.datos?.ciudadPFE);
          this.store.setEstadoPFE(respuesta?.datos?.estadoPFE);
          this.store.setCallePFE(respuesta?.datos?.callePFE);
          this.store.setNumeroExteriorPFE(respuesta?.datos?.numeroExteriorPFE);
          this.store.setNumeroInteriorPFE(respuesta?.datos?.numeroInteriorPFE);

          this.store.setPersonaFisicaExtranjeraTabla(respuesta?.datos?.personaFisicaExtranjeraTabla);
          this.store.setPersonaMoralExtranjeraTabla(respuesta?.datos?.personaMoralExtranjeraTabla);

          this.store.setDenominacionPME(respuesta?.datos?.denominacionPME);
          this.store.setCorreoPME(respuesta?.datos?.correoPME);
          this.store.setPaisPME(respuesta?.datos?.paisPME);
          this.store.setCodigoPostalPME(respuesta?.datos?.codigoPostalPME);
          this.store.setCiudadPME(respuesta?.datos?.ciudadPME);
          this.store.setEstadoPME(respuesta?.datos?.estadoPME);
          this.store.setCallePME(respuesta?.datos?.callePME);
          this.store.setNumeroExteriorPME(respuesta?.datos?.numeroExteriorPME);
          this.store.setNumeroInteriorPME(respuesta?.datos?.numeroInteriorPME);

          this.store.setNombreDG(respuesta?.datos?.nombreDG);
          this.store.setApellidoPaternoDG(respuesta?.datos?.apellidoPaternoDG);
          this.store.setApellidoMaternoDG(respuesta?.datos?.apellidoMaternoDG);

          this.store.setTipoDeCaatAerea(respuesta?.datos?.tipoDeCaatAerea);
          this.store.setIdeCodTransportacionAerea(respuesta?.datos?.ideCodTransportacionAerea);
          this.store.setCodIataIcao(respuesta?.datos?.codIataIcao);
        }
      });
  }

  /**
   * Destrucción del componente.
   * 
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}