import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from "@ng-mf/data-access-user";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from "../../components/datos-de-la-solicitud/datos-de-la-solicitud.component";
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PermisoImportacionService } from "../../services/permiso-importacion.service";
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';



@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent, DatosDeLaSolicitudComponent, SolicitanteComponent],
  standalone: true,
})
export class PasoUnoComponent implements OnDestroy, OnInit {

  /** Notificador para destruir el componente y evitar fugas de memoria. */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * @property destroyNotifier$
   * @description Notificador observable que permite cancelar las suscripciones activas cuando se destruye el componente.
   * Ayuda a prevenir fugas de memoria.
   * @type {Subject<void>}
   */
  public destroyNotifier$: Subject<void> = new Subject();

  indice: number = 1;

  constructor(private consultaQuery: ConsultaioQuery,
    private permisoImportacionService: PermisoImportacionService,
  ) {
     this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
        this.consultaState = seccionState;
      })).subscribe();
  }


  ngOnInit(): void {
      if (this.consultaState.update) {
        this.guardarDatosFormulario();
      } else {
        this.esDatosRespuesta = true;
      }
  }

   /**
   * Guarda los datos del formulario obtenidos del servicio.
   */
  guardarDatosFormulario(): void {
    this.permisoImportacionService
      .obtenerRegistroTomarMuestrasDatos().pipe(
        takeUntil(this.destroyNotifier$)
      )
      .subscribe((resp) => {
        if(resp) {
          this.esDatosRespuesta = true;
          this.permisoImportacionService.actualizarEstadoFormulario(resp);
        }
      });
  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @description Ciclo de vida de Angular: limpia las suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}