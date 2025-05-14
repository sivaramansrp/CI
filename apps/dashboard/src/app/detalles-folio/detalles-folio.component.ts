import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmarNotificacionService } from '../services/confirmar-notificacion.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detalles-folio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalles-folio.component.html',
  styleUrl: './detalles-folio.component.css',
})
export class DetallesFolioComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  folioTablaDatos = {
    tipoDeSolicitud: '',
    folioDelTramite: '',
  };
  constructor(
    private confirmarNotificacionService: ConfirmarNotificacionService
  ) {
    //constructor
  }

  ngOnInit(): void {
    this.confirmarNotificacionService
      .getFolioDatos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.folioTablaDatos = data;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  // Datos de ejemplo para la tabla
}
