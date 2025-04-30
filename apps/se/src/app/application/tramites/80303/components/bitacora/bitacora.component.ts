import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  Bitacora,
  BITACORA_ENCABEZADO_DE_TABLA,
} from '../../models/modificacion-programa-immex-baja-submanufacturera.model';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-bitacora',
  standalone: true,
  imports: [CommonModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss',
})
export class BitacoraComponent implements OnInit, OnDestroy {
  /**
   * Notificador utilizado para gestionar la destrucción de suscripciones en el componente.
   * Este Subject emite un valor cuando el componente se destruye, permitiendo cancelar
   * suscripciones activas y prevenir fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  bitacoraTablaDatos: Bitacora[] = [];
  bitacoraTablaConfiguracion = {
    configuracionTabla: BITACORA_ENCABEZADO_DE_TABLA,
  };

  constructor(
    public modificacionProgramaImmexBajaSubmanufactureraService: ModificacionProgramaImmexBajaSubmanufactureraService,
    public tramite80303Querry: Tramite80303Query
  ) {}

  ngOnInit(): void {
    this.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl(
      this,
      'bitacoraTablaDatos',
      '/80303/bitacoraTablaDatos.json'
    );
    this.tramite80303Querry.selectTramiteState$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state) => {
        this.bitacoraTablaDatos = state.bitacoraTablaDatos;
      });
  }
  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Notifica a todos los observables que deben completarse y limpia las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Notifica a todos los observables que deben completar.
    this.destroyNotifier$.unsubscribe(); // Cancela cualquier suscripción activa.
  }
}
