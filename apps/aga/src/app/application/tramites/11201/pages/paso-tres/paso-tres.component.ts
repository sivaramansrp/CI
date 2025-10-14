import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';
import { NotificacionesComponent,CategoriaMensaje, DocumentoService, Notificacion, TramiteFolioQueries, TramiteFolioStore, base64ToHex, encodeToISO88591Hex } from '@libs/shared/data-access-user/src';

/**
 * Componente para el paso tres del trámite 301.
 * Este componente se utiliza para mostrar los pasos del asistente - 301
 * Lista de pasos
 * Índice del paso
 */
@Component({
  selector: 'paso-tres',
  standalone: true,
  templateUrl: './paso-tres.component.html',
  imports: [FirmaElectronicaComponent, CommonModule, NotificacionesComponent],
})
export class PasoTresComponent {
  /**
   * componente doc
   * @constructor
   * @param {Router} router - Servicio de Angular para la navegación entre rutas.
   */
  constructor(private router: Router) {
    // Constructor del componente
  }

  /**
  * Cadena original generada a partir de los datos del trámite.
  * Esta cadena será firmada con el certificado digital y la llave privada proporcionados.
  */
  cadenaOriginal?: string;
    /**
   * Notificación que se muestra al usuario en caso de error o éxito en el proceso de firma.
   * Incluye información sobre el tipo de notificación, categoría, título y mensaje.
   */
  nuevaNotificacion!: Notificacion;

    /**
 * Objeto que contiene los datos reales de la firma electrónica generada después del proceso de firma.
 * Incluye:
 * - firma: Cadena de la firma generada (en base64).
 * - certSerialNumber: Número de serie del certificado digital.
 * - rfc: RFC extraído del certificado.
 * - fechaFin: Fecha de vencimiento del certificado.
 */
  datosFirmaReales!: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };

/**
 * Maneja el evento de firma y obtiene los datos de la firma.
 * @param datos - Objeto que contiene la firma, número de serie del certificado y RFC.
 */
  datosFirma(datos: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }): void {
    this.datosFirmaReales = datos;
    this.obtieneFirma(datos.firma);
  }

    /**
   * Método para obtener la firma del documento.
   * Este método se encarga de enviar la solicitud de firma al servicio correspondiente.
   * @param firma - La firma en formato base64 que se desea procesar.
   */
  obtieneFirma(firma: string): void {
    // if (!this.cadenaOriginal || !this.datosFirmaReales) {
    //   console.error('Faltan datos para completar la firma');
    //   this.nuevaNotificacion = {
    //     tipoNotificacion: 'toastr',
    //     categoria: CategoriaMensaje.ERROR,
    //     modo: 'action',
    //     titulo: 'Error',
    //     mensaje: 'Faltan datos para completar la firma.',
    //     cerrar: false,
    //     txtBtnAceptar: '',
    //     txtBtnCancelar: '',
    //   };
    //   return;
    // }

    // const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    // const FIRMAHEX = base64ToHex(firma);

    // this.documentoService
    //   .obtenerDatosFirma<FirmarRequest>()
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     switchMap((response) => {
    //       const PAYLOAD: FirmarRequest = {
    //         cadena_original: CADENAHEX,
    //         cert_serial_number: this.datosFirmaReales.certSerialNumber,
    //         clave_usuario: this.datosFirmaReales.rfc,
    //         fecha_firma: PasoTresComponent.formatFecha(new Date()),
    //         clave_rol: 'Solicitante',
    //         sello: FIRMAHEX,
    //         fecha_fin_vigencia: PasoTresComponent.formatFecha(this.datosFirmaReales.fechaFin),
    //         documentos_requeridos: response.datos?.documentos_requeridos || [],
    //       };

    //       return this.firma.enviarFirma<string>(String(this.solicitudState.idSolicitud), PAYLOAD);
    //     }),
    //     tap((firmaResponse: BaseResponse<string>) => {
    //       // Validar si la firma fue exitosa
    //       if (firmaResponse.codigo !== '00' || !firmaResponse.datos) {
    //         this.nuevaNotificacion = {
    //           tipoNotificacion: 'toastr',
    //           categoria: CategoriaMensaje.ERROR,
    //           modo: 'action',
    //           titulo: 'Error al firmar la solicitud',
    //           mensaje: firmaResponse.mensaje || firmaResponse.error || 'Ocurrió un error al procesar la firma.',
    //           cerrar: false,
    //           txtBtnAceptar: '',
    //           txtBtnCancelar: '',
    //         };
    //         throw new Error('Firma no exitosa');
    //       }

    //       // Éxito: guardar folio
    //       this.folio = firmaResponse.datos;
    //     }),
    //     tap(() => {
    //       // Solo se ejecuta si todo fue exitoso
    //       this.tramiteStore.establecerTramite(
    //         this.folio,
    //         firma,
    //         this.solicitudState.idSolicitud ?? 0
    //       );
    //       this.router.navigate([`${this.url}/acuse`]);
    //     }),
    //     catchError((error) => {
    //       console.error('Error en el proceso de firma:', error);
    //       if (!this.nuevaNotificacion) {
    //         this.nuevaNotificacion = {
    //           tipoNotificacion: 'toastr',
    //           categoria: CategoriaMensaje.ERROR,
    //           modo: 'action',
    //           titulo: 'Error inesperado',
    //           mensaje: error?.error.error || 'Ocurrió un error al procesar la firma.',
    //           cerrar: false,
    //           txtBtnAceptar: '',
    //           txtBtnCancelar: '',
    //         };
    //       }
    //       return of(null); // Evita que se propague y corte el flujo sin redirigir
    //     })
    //   )
    //   .subscribe();
  }

}
