import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RevisionDocumentalComponent } from '../../components/revision-documental/revision-documental.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudDatosComponent } from '../../components/SolicitudDatos/SolicitudDatos.component';
import { Solocitud220503Service } from '../../services/service220503.service';
/** Componente para gestionar el primer paso del trámite */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  imports: [
    CommonModule,
    SolicitanteComponent,
    SolicitudDatosComponent,
    RevisionDocumentalComponent,
  ],
  standalone: true,
})
/** Componente para gestionar el primer paso del trámite */
export class PasoUnoComponent implements OnDestroy, OnInit {
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /** Realiza un seguimiento del índice de la pestaña seleccionada actualmente */
  indice: number = 1;

  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();
  public consultaState!:ConsultaioState;

    constructor(
    private solocitud220503Service: Solocitud220503Service,
    private consultaQuery: ConsultaioQuery
  ) {
// Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
  
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),map((seccionState) => {
          this.consultaState = seccionState;
      })).subscribe();
    if(this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
  }

    /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.solocitud220503Service
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp){
        this.esDatosRespuesta = true;
        this.solocitud220503Service.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Actualiza el índice de la pestaña seleccionada.
   * @param i - The index of the selected tab
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
  
    ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
