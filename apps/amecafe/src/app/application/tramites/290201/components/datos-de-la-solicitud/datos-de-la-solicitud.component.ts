import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { ReplaySubject, takeUntil } from 'rxjs';

import { AlertComponent } from '@libs/shared/data-access-user/src';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { Solicitud } from '../../models/tabla-model';

import { SOLICITUD_HEADER, TEXTOS_SOLICITUD } from '../../constants/tabla-enum';

/**
 * Componente para gestionar los datos de la solicitud.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.css',
})
export class DatosDeLaSolicitudComponent implements OnDestroy, OnInit {
  /**
   * Observable que se utiliza para gestionar la destrucción del componente
   * y evitar fugas de memoria.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Contiene los textos de enumeración definidos en `TEXTOS_SOLICITUD`.
   */
  TEXTOS = TEXTOS_SOLICITUD;

  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en `true` (ampliado).
   */
  colapsable: boolean = true;

  /**
   * Contiene los datos del encabezado de la tabla, definidos en `SOLICITUD_HEADER.hSolicitud`.
   */
  tablaHeadData = SOLICITUD_HEADER.hSolicitud;

  /**
   * Recibe la lista de solicitudes como datos de fila de la tabla.
   */
  @Input() tablaFilaDatos: Solicitud[] = [];

  /**
 * Evento que emite la fila seleccionada de la tabla.
 */
@Output() filaSeleccionada: EventEmitter<Solicitud> = new EventEmitter<Solicitud>();

/**
 * Datos de ejemplo para una solicitud (MOCK).
 */
MOCK_SOLICITUD: Solicitud = {
  formasdelcafe: '1',
  tipos: '2',
  calidad: '3',
  procesos: '2',
  certifications: '1',
  adunadesalida: '2',
  paisdestino: '1',
  entidaddeprocedencia: '1',
  ciclocafetalero: '1',
};
  /**
   * Constructor del componente.
   * @param registrarsolicitud Servicio para gestionar las solicitudes.
   */
  constructor(private registrarsolicitud: RegistrarSolicitudService) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama al método `getSolicitudData()` para obtener los datos de la solicitud.
   */
  ngOnInit(): void {
    this.getSolicitudData();
  }

 /**
 * Método que se ejecuta al hacer clic en una fila de la tabla.
 * Emite el evento `filaSeleccionada` con los datos de la solicitud seleccionada.
 */
onRowClick(): void {
    this.filaSeleccionada.emit(this.MOCK_SOLICITUD);
}
  /**
   * Alterna el estado del panel plegable (expandir/contraer).
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene los datos de la solicitud desde el servicio `RegistrarSolicitudService`
   * y los asigna a la propiedad `tablaFilaDatos`.
   */
  getSolicitudData(): void {
    this.registrarsolicitud
      .getSolicitudData()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.tablaFilaDatos = data as Solicitud[];
      });
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Completa los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
