import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite110217State, Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { Destinatario110217Component } from '../../components/destinatario/destinatario.component';
import { HistProductoresComponent } from '../../components/hist-productores/hist-productores.component';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';

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
  imports: [
    CommonModule,
    SolicitanteComponent,
    DatosCertificadoComponent,
    Destinatario110217Component,
    CertificadoOrigenComponent,
    HistProductoresComponent
  ],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {ConsultaioState} consultaDatos
   * @description Estado actual de la consulta, que contiene información relacionada con el trámite y el solicitante.
   */
  consultaDatos!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esDatosRespuesta: boolean = false;

  /**
   * Referencia al componente `SolicitanteComponent`.
   *
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * de solicitante dentro de la plantilla.
   */
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

  /**
   * Referencia al componente `CertificadoOrigenComponent`.
   */
  @ViewChild('certificadoOrigenRef') certificadoOrigenComp!: CertificadoDeOrigenComponent;

  /**
   * Referencia al componente `Destinatario110217Component`.
   */
  @ViewChild('destinatarioRef') destinatarioComp!: Destinatario110217Component;

  /**
   * Referencia al componente `DatosCertificadoComponent`.
   */
  @ViewChild('datosCertificadoRef') datosCertificadoComp!: DatosCertificadoComponent;

  /**
   * Referencia al componente `HistoricoProductoresComponent`.
   */
  @ViewChild('historicoProductoresRef') historicoProductoresComp!: HistProductoresComponent;

  /**
   * Evento que se emite cuando cambia de tab.
   */
  @Output() cambioDePestana = new EventEmitter<void>();

  /**
   * Índice de la pestaña activa.
   *
   * Esta propiedad indica cuál pestaña está activa actualmente.
   */
  indice: number = 1;

  /**
   * Tracking de tabs completadas
   * Almacena qué tabs han sido visitadas y completadas por el usuario
   */
  tabsCompletadas: Set<number> = new Set();

  /**
   * Estado actual del trámite.
   *
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite110217State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   *
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   *
   * @param {Tramite110217Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110217Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite110217Store,
    public tramiteQuery: Tramite110217Query,
    private certificadosOrigenService: CertificadosOrigenService,
    private consultaioQuery: ConsultaioQuery
  ) {}

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
    this.indice = this.tramiteState.pestanaActiva;
  }

  /**
   * Método para obtener los datos de consulta del servicio.
   *  Este método realiza una llamada al servicio `CertificadosOrigenService`
   *  para obtener los datos necesarios para la consulta del certificado de origen.
   *  @returns {void}
   *  @memberof PasoUnoComponent
   * */
   public fetchGetDatosConsulta(): void {
    this.certificadosOrigenService
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
          this.store.setGrupoDeTransporte(respuesta.datos.grupoDeTransporte);
          this.store.setTercerOperador(respuesta.datos.tercerOperador);
          this.store.setGrupoOperador(respuesta.datos.grupoOperador);
          this.store.setGrupoTratado(respuesta.datos.grupoTratado);
          this.store.setGrupoDeDomicilio(respuesta.datos.grupoDeDomicilio);
          this.store.setMercanciaTablaDatos(respuesta.datos.mercanciaSeleccionadasTablaDatos);
          this.store.setMercanciaDisponsiblesTablaDatos(respuesta.datos.mercanciaDisponsiblesTablaDatos);
          this.store.setDatosConfidencialesProductor(respuesta.datos.datosConfidencialesProductor);
          this.store.setProductorMismoExportador(respuesta.datos.productorMismoExportador);
          this.store.setProductoresExportador(respuesta.datos.productoresExportador);
        }
      });
  }
  /**
   * Método para seleccionar una pestaña específica.
   *
   * Este método actualiza el índice de la pestaña activa y almacena el valor
   * en el store. También marca la tab anterior como completada si tenía form válido.
   *
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    // Marcar la tab actual como completada si tiene form válido
    this.marcarTabComoCompletada(this.indice);
    
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
    this.cambioDePestana.emit(); // Emite evento cuando cambia de tab
  }

  /**
   * Marca una tab como completada si su formulario es válido
   * @param tabIndex - Índice de la tab a verificar
   */
  private marcarTabComoCompletada(tabIndex: number): void {
    let isValid = false;
    
    // Tab 2: Certificado de origen
    if (tabIndex === 2 && this.certificadoOrigenComp?.formCertificado) {
      isValid = this.certificadoOrigenComp.formCertificado.valid;
    }
    
    // Tab 4: Destinatario  
    if (tabIndex === 4 && this.destinatarioComp?.validateAllForms) {
      isValid = this.destinatarioComp.validateAllForms();
    }
    
    // Tab 5: Datos certificado
    if (tabIndex === 5 && this.datosCertificadoComp?.formDatosCertificado) {
      isValid = this.datosCertificadoComp.formDatosCertificado.valid;
    }
    
    // Si es válida, marcarla como completada
    if (isValid) {
      this.tabsCompletadas.add(tabIndex);
    } else if ([2, 4, 5].includes(tabIndex)) {
      // Si es una tab requerida pero inválida, removerla de completadas
      this.tabsCompletadas.delete(tabIndex);
    }
  }

  /**
   * Valida todos los formularios del paso uno.
   * 
   * Requiere que TODAS las tabs necesarias estén completadas:
   * - Tab 2: Certificado de origen
   * - Tab 4: Destinatario  
   * - Tab 5: Datos certificado
   * 
   * @returns {boolean} `true` si TODAS las tabs requeridas están completadas
   */
  public validarTodosLosFormularios(): boolean {
    // Marcar la tab actual como completada antes de validar
    this.marcarTabComoCompletada(this.indice);
    
    // Tabs requeridas que deben estar completadas
    const REQUIRED_TABS = [2, 4, 5];
    
    // Verificar si todas las tabs requeridas están completadas
    const ALL_TABS_COMPLETED = REQUIRED_TABS.every(tab => this.tabsCompletadas.has(tab));
    
    // Si no todas están completadas, mostrar errores en la tab actual
    if (!ALL_TABS_COMPLETED) {
      // Validar y mostrar errores en la tab actual
      if (this.indice === 2 && this.certificadoOrigenComp?.formCertificado) {
        this.certificadoOrigenComp.formCertificado.markAllAsTouched();
      }
      
      if (this.indice === 4 && this.destinatarioComp?.markAllFormsAsTouched) {
        this.destinatarioComp.markAllFormsAsTouched();
      }
      
      if (this.indice === 5 && this.datosCertificadoComp?.formDatosCertificado) {
        this.datosCertificadoComp.formDatosCertificado.markAllAsTouched();
      }
    }
    
    // Verificar que todas las tabs requeridas estén completadas
    return ALL_TABS_COMPLETED;
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
