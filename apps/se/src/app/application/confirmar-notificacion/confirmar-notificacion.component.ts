import { CategoriaMensaje, FirmaElectronicaComponent, Notificacion, NotificacionesComponent } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmarNotificacionIniciarResponse } from '../core/models/confirmar-notificacion/response/confirmar-notificacion-iniciar-response.model';
import { ConfirmarNotificacionService } from '../core/services/confirmar-notificacion/confirmar-notificacion.service';
import { DetallesFolioComponent } from '../shared/components/detalles-folio/detalles-folio.component';
import { Location } from '@angular/common';
import { NotificacionActoAdministrativoComponent } from '../shared/components/notificacion-acto-administrativo/notificacion-acto-administrativo.component';
import { Router } from '@angular/router';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * @component ConfirmarNotificacionComponent
 * @description
 * Componente encargado de gestionar el flujo de confirmación de una notificación.
 * Maneja el cambio de pasos entre los componentes internos como Acuse de Recibo, Firma Electrónica, y detalles del acto administrativo.
 *
 * @example
 * <ng-mf-confirmar-notificacion></ng-mf-confirmar-notificacion>
 */
@Component({
  selector: 'ng-mf-confirmar-notificacion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    DetallesFolioComponent,
    NotificacionActoAdministrativoComponent,
    FirmaElectronicaComponent,
    NotificacionesComponent
],
  templateUrl: './confirmar-notificacion.component.html',
  styleUrl: './confirmar-notificacion.component.scss',
})
export class ConfirmarNotificacionComponent implements OnInit {
  /**
   * @property indiceDePaso
   * @description
   * Controla el índice del paso actual en el flujo.
   * - 1: Inicio
   * - 2: Acto Administrativo
   * - 3: Acuse de Recibo / Firma Electrónica
   *
   * El valor inicial es 1. Si la navegación actual incluye el estado `isAcuseRecibo`, se establece en 3.
   *
   * @type {number}
   */
  public indiceDePaso = 1;

  /**
   * Datos de la notificación, que se pasan al componente NotificacionActoAdministrativo.
   *
   * @type {ConfirmarNotificacionIniciarResponse | null}
   */
  notificacionData!: ConfirmarNotificacionIniciarResponse;

  /**
   * Nueva notificación para mostrar mensajes de error o información al usuario.
   */
  nuevaNotificacion: Notificacion | null = null;


  /**
   * @constructor
   * @param {Router} router - Servicio de Angular Router para la navegación entre rutas.
   */
  constructor(
    private router: Router,
    private confirmarNotificacionService: ConfirmarNotificacionService,
    private location: Location,) {
    const CURRENT_NAVIGATION = this.router.getCurrentNavigation();
    if (CURRENT_NAVIGATION?.extras.state?.['isAcuseRecibo']) {
      this.indiceDePaso = 3;
    }
  }

  ngOnInit(): void {
    this.getConfirmarNotificacion();
  }

  /**
   * @method alContinuar
   * @description
   * Incrementa el `indiceDePaso` para avanzar al siguiente paso en el flujo.
   *
   * @returns {void}
   */
  alContinuar(): void {
    this.indiceDePaso = this.indiceDePaso + 1;
  }

  /**
   * @method obtieneFirma
   * @description
   * Método invocado cuando se obtiene la firma electrónica.
   * Ajusta el `indiceDePaso` directamente al paso 3.
   *
   * @param {string} ev - Evento recibido (firmado).
   * @returns {void}
   */
  obtieneFirma(ev: string): void {
    this.indiceDePaso = 3;
  }

  /**
   * @method cerrar
   * @description
   * Finaliza el flujo y redirige al usuario a la bandeja de tareas pendientes.
   *
   * @returns {void}
   */
  cerrar(): void {
    this.router.navigate(['/bandeja-de-tareas-pendientes']);
  }

  /**
   * @method getConfirmarNotificacion
   * @description
   * Obtiene los datos de la notificación utilizando el servicio ConfirmarNotificacionService.
   * Actualiza la propiedad `notificacionData` con la respuesta recibida.
   *
   * @returns {void}
   */
  getConfirmarNotificacion(): void {
    const NUMFOLIO = '0201300101820252540000005';
    this.confirmarNotificacionService.getIniciarNotificacion(NUMFOLIO).subscribe({
      next: (response) => {
        if (response.codigo === '00') {
          this.notificacionData = response.datos ?? {} as ConfirmarNotificacionIniciarResponse;
        } else {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: response.error || 'Error al consultar la notificacion',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          this.location.back();
        }
      },
      error: (err) => {
        console.error('Error al obtener la notificación:', err);
      }
    });
  }
}
