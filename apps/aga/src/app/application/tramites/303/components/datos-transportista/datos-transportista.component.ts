import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { TablaSeleccion, Transportista } from '@libs/shared/data-access-user/src';
import { CONFIGURACION_ENCABEZADO_TRASPORTISTA } from '../../../../core/enums/303/trasportistas.enum';
import { Router } from '@angular/router';
import { Tramite303Query } from '../../../../core/queries/tramite303.query';
import { Tramite303Store } from '../../../../core/estados/tramites/tramite303.store';

@Component({
  selector: 'datos-transportista',
  templateUrl: './datos-transportista.component.html',
  styleUrls: ['./datos-transportista.component.scss']
})
export class DatosTransportistaComponent implements OnDestroy, OnInit {
  /** Configuración de la tabla de selección */
  tablaSeleccion = TablaSeleccion;
  /** Configuración de la tabla de transportistas */
  encabezadoDeTablaTrasportista = CONFIGURACION_ENCABEZADO_TRASPORTISTA;
  /** Lista de transportistas seleccionados */
  personasTrasportistas: Transportista[] = [];
  /** Lista de transportistas seleccionados */
  trasportistasSeleccionados: Transportista[] = [];
  /** Notificador para destruir las suscripciones y evitar fugas de memoria */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Estado del trámite 303 consultado */
  public tramiteConsultado?: Tramite303Store;
  constructor(private tramite303Query: Tramite303Query,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tramite303Query.selectSolicitud$
      .pipe(
        map((seccionState) => {
          this.tramiteConsultado = seccionState;
          this.personasTrasportistas = seccionState?.listaTransportistas || [];
        }),
        takeUntil(this.destroyNotifier$)
      )
      .subscribe();
  }

  /**
   * Método para agregar un nuevo transportista.
   * Redirige al usuario a la página de registro de transportista.
   */
  agregarTransportista(): void {
    this.router.navigate(['aga/despacho-mercancias/registro-trasportista']);
  }

  /**
   * Método para destruir el componente y liberar recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}