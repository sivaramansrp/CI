import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
  FormularioDinamico,
  TIPO_PERSONA,
} from '@ng-mf/data-access-user';
import {
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  PERSONA_MORAL_NACIONAL,
} from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import {
  SharedModule,
  SolicitanteComponent,
} from '@libs/shared/data-access-user/src';
import { map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoDeProductoresComponent } from '../../components/historico-de-productores/historico-de-productores.component';
import { RegistroService } from '../../services/registro.service';
import { Subject } from 'rxjs';
import { Tramite110221Store } from '../../../../estados/tramites/Tramite110221.store';

/**
 * Componente que representa el primer paso del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    SolicitanteComponent,
    CertificadoDeOrigenComponent,
    DatosCertificadoComponent,
    DestinatarioComponent,
    HistoricoDeProductoresComponent,
  ],
})
export class PasoUnoComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
   * Catálogo de entidades federativas.
   * @type {Object}
   */
  entidadFederativa!: {
    data: string;
    domicilioFiscal?: { entidadFederativa?: string };
  };

  /**
   * Datos de consulta del trámite.
   * @type {ConsultaioState}
   */
  consultaDatos!: ConsultaioState;

  /**
   * Bandera que indica si se están utilizando datos de respuesta del servidor.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Subject para gestionar la destrucción de suscripciones.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param registroService Servicio para obtener datos de catálogos.
   * @param consultaioQuery Query para acceder al estado de consulta.
   * @param tramite110221Store Store del trámite 110221.
   */
  constructor(
    private registroService: RegistroService,
    private consultaioQuery: ConsultaioQuery,
    private tramite110221Store: Tramite110221Store
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el catálogo de entidades federativas y procesa los datos de consulta.
   * @returns {void}
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

    this.registroService.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;
      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;
    });
  }

  /**
   * Referencia al componente de solicitante.
   * @type {SolicitanteComponent}
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Tipo de persona seleccionada.
   * @type {number}
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico para la persona.
   * @type {FormularioDinamico[]}
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico para el domicilio fiscal.
   * @type {FormularioDinamico[]}
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Método que se ejecuta después de inicializar la vista.
   * Configura formularios dinámicos y obtiene el tipo de persona.
   * @returns {void}
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param {number} i - Índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene datos de consulta del servicio y actualiza el store.
   * @returns {void}
   */
  public fetchGetDatosConsulta(): void {
    this.registroService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta?.success) {
          this.esDatosRespuesta = true;
          this.tramite110221Store.setTercerOperador(
            respuesta?.datos?.tercerOperador
          );
          this.tramite110221Store.setTratado(respuesta?.datos?.tratado);
          this.tramite110221Store.setPais(respuesta?.datos?.pais);
          this.tramite110221Store.setFraccionArancelaria(
            respuesta?.datos?.fraccionArancelaria
          );
          this.tramite110221Store.setNumRegistro(
            respuesta?.datos?.numeroRegistro
          );
          this.tramite110221Store.setNomComercial(
            respuesta?.datos?.nombreComercial
          );
          this.tramite110221Store.setFechInicioB(
            respuesta?.datos?.fechaInicial
          );
          this.tramite110221Store.setFechFinB(respuesta?.datos?.fechaFinal);
          this.tramite110221Store.setArchivo(respuesta?.datos?.archivo);
          this.tramite110221Store.setfraccionMercanArancelaria(
            respuesta?.datos?.fraccionMercanciaArancelaria
          );
          this.tramite110221Store.setnombretecnico(
            respuesta?.datos?.nombreTecnico
          );
          this.tramite110221Store.setnombrecomercialdelamercancia(
            respuesta?.datos?.nombreComercialDelaMercancia
          );
          this.tramite110221Store.setcriterioparaconferir(
            respuesta?.datos?.criterioParaConferir
          );
          this.tramite110221Store.setnomreeningles(
            respuesta?.datos?.nombreEnIngles
          );
          this.tramite110221Store.setcantidad(respuesta?.datos?.cantidad);
          this.tramite110221Store.setUMC(respuesta?.datos?.umc);
          this.tramite110221Store.setvalordelamercancia(
            respuesta?.datos?.valorDelaMercancia
          );
          this.tramite110221Store.setcomplementodeladescripcion(
            respuesta?.datos?.complementoDelaDescripcion
          );
          this.tramite110221Store.setTipoFactura(respuesta?.datos?.tipoFactura);
          this.tramite110221Store.setFecha(respuesta?.datos?.fecha);
          this.tramite110221Store.setNFactura(respuesta?.datos?.numeroFactura);
          this.tramite110221Store.setObservaciones(
            respuesta?.datos?.observaciones
          );
          this.tramite110221Store.setIdioma(respuesta?.datos?.idioma);
          this.tramite110221Store.setEntidad(respuesta?.datos?.entidad);
          this.tramite110221Store.setRepresentacion(
            respuesta?.datos?.representacion
          );
          this.tramite110221Store.setCheckbox(
            respuesta?.datos?.casillaVerificacion
          );
          this.tramite110221Store.setJustificacion(
            respuesta?.datos?.justificacion
          );
          this.tramite110221Store.setNombre(respuesta?.datos?.nombre);
          this.tramite110221Store.setApellidoPrimer(
            respuesta?.datos?.apellidoPrimer
          );
          this.tramite110221Store.setApellidoSegundo(
            respuesta?.datos?.apellidoSegundo
          );
          this.tramite110221Store.setNumeroFiscal(
            respuesta?.datos?.numeroFiscal
          );
          this.tramite110221Store.setRazonSocial(respuesta?.datos?.razonSocial);
          this.tramite110221Store.setCiudad(respuesta?.datos?.ciudad);
          this.tramite110221Store.setCalle(respuesta?.datos?.calle);
          this.tramite110221Store.setNumeroLetra(respuesta?.datos?.numeroLetra);
          this.tramite110221Store.setLada(respuesta?.datos?.lada);
          this.tramite110221Store.setTelefono(respuesta?.datos?.telefono);
          this.tramite110221Store.setFax(respuesta?.datos?.fax);
          this.tramite110221Store.setCorreoElectronico(
            respuesta?.datos?.correoElectronico
          );
          this.tramite110221Store.setNacion(respuesta?.datos?.nacion);
          this.tramite110221Store.setTransporte(respuesta?.datos?.transporte);
        }
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Limpia las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
