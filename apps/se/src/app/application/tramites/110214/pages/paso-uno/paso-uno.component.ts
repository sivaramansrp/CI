import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { Subject } from 'rxjs';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { Tramite110214State } from '../../../../estados/tramites/tramite110214.store';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso uno del trámite.
 * 
 * Este componente permite al usuario navegar entre diferentes pestañas y gestionar
 * las secciones relacionadas con el trámite, como solicitante, destinatario, histórico
 * de productores y datos del certificado.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent,
    DatosCertificadoComponent, HistoricoProductoresComponent,
    DestinatarioComponent, CertificadoOrigenComponent
  ]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Referencia al componente `SolicitanteComponent`.
   * 
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * de solicitante dentro de la plantilla.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Índice de la pestaña activa.
   * 
   * Esta propiedad indica cuál pestaña está activa actualmente.
   */
  indice: number = 1;

  /**
   * Estado actual del trámite.
   * 
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite110214State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /**
   * Constructor del componente.
   * 
   * @param {Tramite110214Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110214Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query,
    private consultaioQuery: ConsultaioQuery,
    private validarInicialmenteCertificadoService: ValidarInicialmenteCertificadoService,
  ) { }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método suscribe al estado del trámite y establece la pestaña activa
   * según el estado almacenado.
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

  /**
   * Método para seleccionar una pestaña específica.
   * 
   * Este método actualiza el índice de la pestaña activa y almacena el valor
   * en el store.
   * 
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
  }
  /**
   * @method fetchGetDatosConsulta
   * @description Obtiene los datos de consulta desde el servicio `ValidarInicialmenteCertificadoService` y actualiza el estado del trámite.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de consulta y, si la respuesta es exitosa, actualiza múltiples propiedades del store con los datos recibidos.
   * 
   * Utiliza el operador `takeUntil` para cancelar las suscripciones cuando el componente se destruye, evitando fugas de memoria.
   * 
   * @returns {void}
   */
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
        }
      });
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}