import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AlertComponent } from 'ngx-bootstrap/alert';



/**
 * Modelo que contiene los atributos necesarios para mostrar una notificación al usuario.
 */
export interface Notificacion {
  /**
   * @description El tipo de la notificación a mostrar.
   */
  tipoNotificacion: string;
  /**
   * @description Variable de entrada para definir qué tipo de notificación se va a mostrar.
   */
  categoria: string;
  /**
   * @description Variable de entrada para determinar si se requiere una confirmación por parte       del usuario.
   */
  modo: string;
  /**
   * @description Variable de entrada para obtener el título a mostrar en la notificación.
   */
  titulo: string;
  /**
   * @description Variable de entrada para obtener el mensaje a mostrar en la notificación.
   */
  mensaje: string;
  /**
   * @description Variable de entrada para obtener el mensaje a mostrar en la notificación.
   */
  ttl?: string;

  cerrar: boolean;

  palabraClave?: string;
}

/**
 * Enum que contiene los tipos de noficiaciones que pueden ser mostrados dentro de la
 * aplicación.
 */
export enum TipoNotificacionEnum {
  ALERTA = 'alert',
  TOASTR = 'toastr',
  BANNER = 'banner'
}

/**
 * Enum que contiene los tipos de noficiaciones que pueden ser mostrados dentro de la
 * aplicación.
 */
export enum CategoriaMensaje {
  ALERTA = 'warning',
  EXITO = 'success',
  ERROR = 'danger',
  INFORMACION = 'info',
}

@Component({
  selector: 'lib-notificaciones',
  standalone: true,
  imports: [CommonModule, AlertComponent],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.scss',
})
export class NotificacionesComponent implements OnChanges {
  /**
   * @description Variable de entrada para definir qué tipo de notificación se va a mostrar.
   * @see ENUM
   */
  @Input()
  public notificacionInput!: Notificacion;

  // TODO: Descomentar esta línea cuando se requiera 
  //@Output()
  //confirmacionModal: EventEmitter<boolean> = new EventEmitter();

  /**
   * Constantes para utilizar los valores de enumeración en la plantilla,
   * ya que no podemos hacer referencia a los valores de enumeración directamente.
   */
  public readonly eTipoNoficacionEnum = TipoNotificacionEnum;

  /**
   * Marcar para mostrar u ocultar modal
   */
  public mostrarModal: boolean = false;



  isOpen: boolean = false;

  @ViewChild('modalNotificacion') modalElement!: ElementRef;

  constructor(
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
  ) {
    //
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notificacionInput']) {
      this.notificacionInput = changes['notificacionInput'].currentValue;
      switch (this.notificacionInput?.tipoNotificacion) {
        case TipoNotificacionEnum.ALERTA:
          this.mostrarModal = true;
          break;
        case TipoNotificacionEnum.TOASTR:
          this.creaToastr();
          break;
        default:
          break;
      }
    }
  }

  /**
   * @description Metodo para definir el tipo de toastr a mostrar en pantalla
   */
  public creaToastr(): void {
    switch (this.notificacionInput?.categoria) {
      case (CategoriaMensaje.ALERTA):
        this.toastr.warning(this.notificacionInput?.mensaje);
        break;
      case (CategoriaMensaje.ERROR):
        this.toastr.error(this.notificacionInput?.mensaje);
        break;
      case (CategoriaMensaje.EXITO):
        this.toastr.success(this.notificacionInput?.mensaje);
        break;
      case (CategoriaMensaje.INFORMACION):
        this.toastr.info(this.notificacionInput?.mensaje);
        break;
      default:
        break;
    }
  }

  /**
   * Abre el modal estableciendo `mostrarModal` en verdadero.
   *
   * Este método se utiliza para mostrar el cuadro de diálogo modal en la interfaz de usuario.
   * Cuando se llama, establece el indicador `mostrarModal` en verdadero, haciendo que el modal sea visible.
   */
  abrirModal(): void {
    this.mostrarModal = true;
  }

  /**
   * Abre el modal estableciendo `mostrarModal` en verdadero.
   *
   * Este método se utiliza para mostrar el cuadro de diálogo modal en la interfaz de usuario.
   * Cuando se llama, establece el indicador `mostrarModal` en verdadero, haciendo que el modal sea visible.
   */
  confirmarAccion(): void {
    this.mostrarModal = false;
    // TODO: Descomentar esta línea cuando se requiera 
    //this.confirmacionModal.emit(true);
  }

  /**
   * Cierra el modal estableciendo la propiedad `mostrarModal` en `false`.
   * Este método normalmente se llama cuando el usuario desea cerrar el cuadro de diálogo modal.
   */

  cerrarModal(): void {
    this.mostrarModal = false;
  }





}
