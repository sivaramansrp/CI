import { Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistProductoresComponent } from '../../components/hist-productores/hist-productores.component';
import { Subject } from 'rxjs';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { Tramite110214State } from '../../../../estados/tramites/tramite110214.store';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent,
    DatosCertificadoComponent, HistProductoresComponent,
    DestinatarioComponent, CertificadoOrigenComponent
  ]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  
/**
 * Referencia al componente 'Solicitante' en la plantilla.
 * Permite acceder a sus propiedades y métodos desde el componente padre.
 */
@ViewChild('Solicitante', { static: false }) solicitante!: SolicitanteComponent;

/** Referencia al componente 'DatosCertificadoComponent' en la plantilla.
 * Permite interactuar con sus métodos y propiedades.
 */
@ViewChild('DatosCertificadoComponent', { static: false }) datosCertificadoComponent!: DatosCertificadoComponent;

/** Referencia al componente 'DestinatarioComponent' en la plantilla.
 * Facilita el acceso a sus funcionalidades desde este componente.
 */
@ViewChild('DestinatarioComponent', { static: false }) destinatarioComponent!: DestinatarioComponent;

/** Referencia al componente 'HistoricoProductoresComponent' en la plantilla.
 * Permite gestionar sus métodos y propiedades.
 */
@ViewChild('HistProductoresComponent', { static: false }) histProductoresComponent!: HistProductoresComponent;

/** Referencia al componente 'CertificadoOrigenComponent' en la plantilla.
 * Proporciona acceso a sus métodos y propiedades.
 */
@ViewChild('CertificadoOrigenComponent', { static: false }) certificadoOrigenComponent!: CertificadoOrigenComponent;

/** Índice que representa la pestaña activa en el componente. */
indice: number = 1;

/** Estado del trámite actual, utilizado para almacenar y gestionar datos relacionados con el trámite. */
public tramiteState!: Tramite110214State;

/** Notificador para destruir observables y evitar fugas de memoria. */
destroyNotifier$: Subject<void> = new Subject();

/** Estado de la consulta, utilizado para almacenar los datos obtenidos de la consulta. */
consultaDatos!: ConsultaioState;

/** Bandera que indica si los datos de la consulta ya están disponibles. */
public esDatosRespuesta: boolean = false;

/** Indica si el formulario del componente DatosCertificadoComponent es válido. */
private isDatosCertificadoComponentValid: boolean = false;

/** Indica si el formulario del componente DestinatarioComponent es válido. */
private isDestinarioComponentValid: boolean = false;

/** Indica si el formulario del componente HistProductoresComponent es válido. */
private isHistProductoresComponentValid: boolean = false;

/** Indica si el formulario del componente CertificadoOrigenComponent es válido. */
private isCertificadoOrigenComponentValid: boolean = false;

/**
 * Constructor del componente.
 * 
 * @param store 
 * @param tramiteQuery 
 * @param consultaioQuery 
 * @param validarInicialmenteCertificadoService 
 */
 
  constructor(
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query,
    private consultaioQuery: ConsultaioQuery,
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
  ) { }

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
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
        })
      )
      .subscribe();
    if (this.consultaDatos.update) {
      this.fetchGetDatosConsulta();
    } else {
      this.esDatosRespuesta = true;
    }
  }

  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
  }

  public fetchGetDatosConsulta(): void {
    this.validarInicialmenteCertificadoService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        if (respuesta.success) {
          this.esDatosRespuesta = true;
          this.store.setObservaciones(respuesta.datos.observaciones);
          this.store.setIdioma(respuesta.datos.idioma);
          this.store.setEntidadFederativa(respuesta.datos.entidadFederativa);
          this.store.setRepresentacionFederal(respuesta.datos.representacionFederal);
          this.store.setGrupoReceptor(respuesta.datos.grupoReceptor);
          this.store.setGrupoOperador(respuesta.datos.grupoOperador); 
          this.store.setGrupoDeDirecciones(respuesta.datos.grupoDeDirecciones);
          this.store.setGrupoRepresentativo(respuesta.datos.grupoRepresentativo);
          this.store.setTercerOperador(respuesta.datos.tercerOperador);
          this.store.setPeriodo(respuesta.datos.blnPeriodo);
          this.store.setGrupoTratado(respuesta.datos.grupoTratado);
          this.store.setMercanciaTablaDatos(respuesta.datos.mercanciaSeleccionadasTablaDatos);
          this.store.setMercanciaDisponsiblesTablaDatos(respuesta.datos.mercanciaDisponsiblesTablaDatos);
          this.store.setDatosConfidencialesProductor(respuesta.datos.datosConfidencialesProductor);
          this.store.setProductorMismoExportador(respuesta.datos.productorMismoExportador);
          this.store.setProductoresExportador(respuesta.datos.productoresExportador);
          this.store.setHistoricoMercanciaSeleccionadasTablaDatos(respuesta.datos.historicoMercanciaSeleccionadasTablaDatos);

          this.store.setNombreTercerOperador(respuesta.datos.nombreTercerOperador);
          this.store.setPrimerApellidoTercerOperador(respuesta.datos.primerApellidoTercerOperador);
          this.store.setSegundoApellidoTercerOperador(respuesta.datos.segundoApellidoTercerOperador);
          this.store.setRegistroFiscalTercerOperador(respuesta.datos.registroFiscalTercerOperador);
          this.store.setRazonSocialTercerOperador(respuesta.datos.razonSocialTercerOperador);
        }
      });
  }

  /**
   * Valida todos los formularios del paso uno.
   * Retorna true si todos los formularios son válidos, false en caso contrario.
   */
  public validarFormularios(): boolean {
    this.isCertificadoOrigenComponentValid = this.tramiteQuery.getValue().formValidity?.certificadoOrigen ?? false; 
    this.isDatosCertificadoComponentValid = this.tramiteQuery.getValue().formValidity?.datosCertificado ?? false;
    this.isDestinarioComponentValid = this.tramiteQuery.getValue().formValidity?.destinatario ?? false;
    this.isHistProductoresComponentValid = this.tramiteQuery.getValue().formValidity?.histProductores ?? false;

    if (!this.isCertificadoOrigenComponentValid) {
      this.certificadoOrigenComponent?.validarFormulario(); 
    }

    if (!this.isDatosCertificadoComponentValid) {
      this.datosCertificadoComponent?.validarFormulario();
    }

    if (!this.isDestinarioComponentValid) {
      this.destinatarioComponent?.validarFormulario();
    }

    if (!this.isHistProductoresComponentValid) {
      this.histProductoresComponent?.validarFormulario();
    }

    return this.isDatosCertificadoComponentValid && this.isDestinarioComponentValid &&
      this.isHistProductoresComponentValid && this.isCertificadoOrigenComponentValid;

  }

  /**
   * Maneja el clic en el botón de continuar.
   * Valida los formularios y muestra un mensaje de error si hay campos faltantes.
   */
  public continuar(): void {
    if (this.validarFormularios()) {
      // Lógica para continuar al siguiente paso
    } 
  }

  /**
   * Muestra una notificación de error.
   * 
   * @param {string} titulo - Título de la notificación.
   * @param {string} mensaje - Mensaje de la notificación.
   */
  

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}