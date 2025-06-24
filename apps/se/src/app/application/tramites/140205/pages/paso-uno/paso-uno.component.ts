import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CancelacionCertificadosComponent } from '../../components/cancelacion-certificados/cancelacion-certificados.component';
import { CommonModule } from '@angular/common';
import { DatosEmpresaComponent } from '../../components/datos-empresa/datos-empresa.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';
import { Tramite140205State } from '../../../../estados/tramites/tramite140205.store';
import { Tramite140205Store } from '../../../../estados/tramites/tramite140205.store';
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
  imports: [CommonModule,DatosEmpresaComponent,CancelacionCertificadosComponent]
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
  public tramiteState!: Tramite140205State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();


    /**
   * @property {Tramite140205State} solicitudState
   * @description Estado actual de la solicitud.
   */
  public solicitudState!: Tramite140205State;
  /**
   * Constructor del componente.
   * 
   * @param {Tramite140205Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite140205Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite140205Store,
    public tramiteQuery: Tramite140205Query,
     private cancelacionCertificadosService: CancelacionCertificadosService,
     private consultaioQuery: ConsultaioQuery
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
    this.cancelacionCertificadosService
      .getDatosConsulta()
      .pipe(takeUntil(this.destroyNotifier$)).subscribe((respuesta) => {
        if (respuesta.success) {
          this.esDatosRespuesta = true;
       this.store.setGrupoEmpresa(respuesta.datos.GrupoEmpresa);
       this.store.setGrupoFolio(respuesta.datos.GrupoFolio);
       this.store.setGrupoCupo(respuesta.datos.GrupoCupo);
        this.store.setGrupoDatalleCupo(respuesta.datos.GrupoDatalleCupo);
        }
      });
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