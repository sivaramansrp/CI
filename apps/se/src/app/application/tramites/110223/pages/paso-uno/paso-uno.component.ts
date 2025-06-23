import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, FormularioDinamico, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL, PERSONA_MORAL_NACIONAL } from '@libs/shared/data-access-user/src/tramites/constantes/solicitante-constantes.enum';
import { SharedModule, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos_certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110223Store } from '../../../../estados/tramites/Tramite110223.store';

/**
 * Componente que representa el primer paso del trámite.
 * Se encarga de gestionar la información del solicitante,
 * el domicilio fiscal y otros datos asociados al certificado.
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
    HistoricoProductoresComponent,
  ],
})
export class PasoUnoComponent implements OnDestroy, OnInit, AfterViewInit {
  /**
   * Catálogo de entidades federativas obtenido desde el servicio de registros.
   */
  entidadFederativa!: {
    data: string;
    domicilioFiscal?: { entidadFederativa?: string };
  };

  /**
   * Tipo de persona (física o moral) seleccionada en el formulario.
   */
  tipoPersona!: number;

  /**
   * Configuración del formulario dinámico correspondiente a la persona.
   */
  persona: FormularioDinamico[] = [];

  /**
   * Configuración del formulario dinámico correspondiente al domicilio fiscal.
   */
  domicilioFiscal: FormularioDinamico[] = [];

  /**
   * Índice del paso actual en el flujo del asistente.
   */
  indice: number = 1;

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
   * Referencia al componente hijo `SolicitanteComponent`,
   * usado para obtener y manipular información del solicitante.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Constructor del componente.
   * @param registro Servicio para obtener datos de catálogos, como entidades federativas.
   */
  constructor(private registro: RegistroService, private consultaioQuery: ConsultaioQuery,
    private tramite110223Store: Tramite110223Store) {
      // El constructor se utiliza para la inyección de dependencias.
    }

  /**
   * Ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * Carga el catálogo de entidades federativas desde el servicio.
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
    this.registro.getCatalogoById(21).subscribe((resp) => {
      this.entidadFederativa = resp;

      const DATA = JSON.parse(this.entidadFederativa.data);
      this.entidadFederativa = DATA?.domicilioFiscal?.entidadFederativa;
    });
    if (this.consultaDatos?.update) {
      this.fetchGetDatosConsulta();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  /**
   * Ciclo de vida de Angular que se ejecuta después de que las vistas hijas han sido inicializadas.
   * Configura los formularios dinámicos de persona y domicilio fiscal,
   * y obtiene el tipo de persona a través del componente solicitante.
   */
  ngAfterViewInit(): void {
    this.persona = PERSONA_MORAL_NACIONAL;
    this.domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
  }

  /**
   * Método que permite seleccionar una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  
  /**
   * Obtiene datos de consulta del servicio y actualiza el store.
   * @returns {void}
   */
  public fetchGetDatosConsulta(): void {
    this.registro
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta) => {
        if (respuesta?.success) {
          this.esDatosRespuesta = true;

          this.tramite110223Store.setTercerOperador(respuesta?.datos?.tercerOperador);
this.tramite110223Store.setTratado(respuesta?.datos?.tratado);
this.tramite110223Store.setPais(respuesta?.datos?.pais);
this.tramite110223Store.setFraccionArancelaria(respuesta?.datos?.fraccionArancelaria);
this.tramite110223Store.setfraccionMercanArancelaria(respuesta?.datos?.fraccionMercanciaArancelaria);
this.tramite110223Store.setnombretecnico(respuesta?.datos?.nombreTecnico);
this.tramite110223Store.setvalorContenidoRegional(respuesta?.datos?.valorContenidoRegional);
this.tramite110223Store.setotrasInstancias(respuesta?.datos?.otrasInstancias);
this.tramite110223Store.setcriterioparapreferencial(respuesta?.datos?.criterioParaPreferencial);
this.tramite110223Store.setcantidad(respuesta?.datos?.cantidad);
this.tramite110223Store.setUMC(respuesta?.datos?.umc);
this.tramite110223Store.setTipoFactura(respuesta?.datos?.tipoFactura);
this.tramite110223Store.setFecha(respuesta?.datos?.fecha);
this.tramite110223Store.setNFactura(respuesta?.datos?.numeroFactura);
this.tramite110223Store.setnumeroSerie(respuesta?.datos?.numeroSerie);
this.tramite110223Store.setCheckbox(respuesta?.datos?.casillaVerificacion);
this.tramite110223Store.setJustificacion(respuesta?.datos?.justificacion);
this.tramite110223Store.setvalordelamercancia(respuesta?.datos?.valorDelaMercancia);
this.tramite110223Store.setcomplementodeladescripcion(respuesta?.datos?.complementoDelaDescripcion);
this.tramite110223Store.setnombrecomercialdelamercancia(respuesta?.datos?.nombreComercialDelaMercancia);
this.tramite110223Store.setNumRegistro(respuesta?.datos?.numeroRegistro);
this.tramite110223Store.setNomComercial(respuesta?.datos?.nombreComercial);
this.tramite110223Store.setFechInicioB(respuesta?.datos?.fechaInicial);
this.tramite110223Store.setFechFinB(respuesta?.datos?.fechaFinal);
this.tramite110223Store.setArchivo(respuesta?.datos?.archivo);
this.tramite110223Store.setObservaciones(respuesta?.datos?.observaciones);
this.tramite110223Store.setEntidad(respuesta?.datos?.entidad);
this.tramite110223Store.setRepresentacion(respuesta?.datos?.representacion);
this.tramite110223Store.setNombre(respuesta?.datos?.nombre);
this.tramite110223Store.setNumeroFiscal(respuesta?.datos?.numeroFiscal);
this.tramite110223Store.setCiudad(respuesta?.datos?.ciudad);
this.tramite110223Store.setCalle(respuesta?.datos?.calle);
this.tramite110223Store.setNumeroLetra(respuesta?.datos?.numeroLetra);
this.tramite110223Store.setnumeroDeRegistroFiscal(respuesta?.datos?.numeroDeRegistroFiscal);
this.tramite110223Store.setTelefono(respuesta?.datos?.telefono);
this.tramite110223Store.setFax(respuesta?.datos?.fax);
this.tramite110223Store.setCorreoElectronico(respuesta?.datos?.correoElectronico);
this.tramite110223Store.setNacion(respuesta?.datos?.nacion);
this.tramite110223Store.setDatosConfidencialesProductor(respuesta?.datos?.datosConfidencialesProductor);
this.tramite110223Store.setProductorMismoExportador(respuesta?.datos?.productorMismoExportador);
this.tramite110223Store.setAgregarDatosProductorNumeroRegistroFiscal(respuesta?.datos?.numeroRegistroFiscal);
this.tramite110223Store.setAgregarDatosProductorFax(respuesta?.datos?.agregarDatosProductorFax);

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
