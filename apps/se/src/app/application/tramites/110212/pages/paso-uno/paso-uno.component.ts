import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
// import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
// import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { Tramite110212Query } from '../../../../estados/queries/tramite110212.query';
import { Tramite110212State } from '../../../../estados/tramites/tramite110212.store';
import { Tramite110212Store } from '../../../../estados/tramites/tramite110212.store';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';

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
  imports: [CommonModule, SolicitanteComponent,CertificadoOrigenComponent,DestinatarioComponent,DatosCertificadoComponent]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  formSubmit(formSubmit: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
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
  public tramiteState!: Tramite110212State;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();
  formulario: any;

  /**
   * Constructor del componente.
   * 
   * @param {Tramite110212Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110212Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite110212Store,
    public tramiteQuery: Tramite110212Query
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