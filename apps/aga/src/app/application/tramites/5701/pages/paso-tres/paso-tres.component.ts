import { Component, OnInit } from '@angular/core';
import { base64ToHex, encodeToISO88591Hex } from '@libs/shared/data-access-user/src/core/utils/utilerias';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { CadenaOriginalRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/cadena-original-request.model';

import { CadenaOriginalService, TramiteFolioService, TramiteFolioStore } from '@ng-mf/data-access-user';


import { BaseResponse } from '../../../../core/models/5701/base-response.model';
import { FirmaElectronicaService } from '@libs/shared/data-access-user/src/core/services/shared/firma-electronica/firma-electronica.service';

import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { Router } from '@angular/router';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { Tramite5701Store } from '../../../../core/estados/tramites/tramite5701.store';



@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent implements OnInit {

  /**
 * URL del servicio o endpoint al que se realizará la solicitud relacionada con la firma.
 * Puede ser utilizado para enviar la firma generada o para obtener la cadena original.
 */
  url: string = '';


  /**
   * Cadena original generada a partir de los datos del trámite.
   * Esta cadena será firmada con el certificado digital y la llave privada proporcionados.
   */
  cadenaOriginal?: string;

  /**
   * Folio del trámite que se está procesando.
   * Este folio es único para cada trámite y se utiliza para identificarlo en el sistema.
   */
  folio!: string;

  /**
   * Objeto que contiene los datos necesarios para generar la cadena original.
   * Este objeto es enviado al servicio de firma electrónica para obtener la cadena original.
   */
  datosCadena!: CadenaOriginalRequest;

  /**
   * Objeto que contiene los datos reales de la firma electrónica generada después del proceso de firma.
   * Incluye:
   * - firma: Cadena de la firma generada (en base64).
   * - certSerialNumber: Número de serie del certificado digital.
   * - rfc: RFC extraído del certificado.
   * - fechaFin: Fecha de vencimiento del certificado.
   */
  datosFirmaReales?: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };

  /**
   * @description Constructor del componente PasoTresComponent.
   * @param router - Inyecta el servicio Router para la navegación.
   * @param tramiteFolioServices - Inyecta el servicio TramiteFolioService para obtener los datos del trámite.
   * @param tramiteStore - Inyecta el store TramiteFolioStore para manejar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore,
    private firma: FirmaElectronicaService,
    private tramite5701Query: Tramite5701Query,
    private tramite5701Store: Tramite5701Store,
    private cadenaOriginalService: CadenaOriginalService
  ) { }

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   * En este método, se obtiene la URL actual del router, se separa en partes y se construye la URL base
   */
  ngOnInit(): void {
    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');
    this.obtenerCadenaOriginal();
  }

 /**
  *  Obtiene la cadena original del trámite 5701.
  *  Realiza una solicitud al servicio `CadenaOriginalService` para obtener los datos
  *  necesarios para generar la cadena original.
  */
   obtenerCadenaOriginal(): void {
    this.cadenaOriginalService.generarCadena().subscribe({
      next: (response) => {
        this.datosCadena = response.datos;
        this.firma.obtenerCadenaOriginal(this.datosCadena).subscribe({
          next: (resp) => { this.cadenaOriginal = resp.datos;
           },
          error: (err) => console.error('Error al generar cadena:', err)
        });
      },
      error: (err) => console.error('Error al cargar datos del trámite:', err)
    });
  }

  /**
   * Maneja el evento de firma y obtiene los datos de la firma.
   * @param datos - Objeto que contiene la firma, número de serie del certificado y RFC.
   */
  datosFirma(datos: { firma: string; certSerialNumber: string; rfc: string, fechaFin: string }): void {
    this.datosFirmaReales = datos;
    this.obtieneFirma(datos.firma);
  }


  /**
   * Envía la firma al servidor y maneja la respuesta.
   * Convierte la cadena original y la firma a formato hexadecimal,
   * construye el payload para la solicitud de firma y envía la solicitud.
   * Al recibir una respuesta exitosa, guarda el trámite y redirige al acuse.
   * @param firma - Firma en base64 que se debe procesar.
   */
  obtieneFirma(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
      console.error('Faltan datos para completar la firma');
      return;
    }

    // Utilerías de conversión
    const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    const FIRMAHEX = base64ToHex(firma);

    const ID_SOLICITUD = this.tramite5701Query.getValue().idSolicitud;

    const PAYLOAD: FirmarRequest = {
      id_solicitud: Number(ID_SOLICITUD),
      cadena_original: CADENAHEX,
      cert_serial_number: this.datosFirmaReales.certSerialNumber,
      clave_usuario: this.datosFirmaReales.rfc,
      fecha_firma: new Date().toISOString(),
      clave_rol: 'Solicitante',
      sello: FIRMAHEX,
      fecha_fin_vigencia: this.datosFirmaReales.fechaFin,
      documentos_requeridos: [
        {
          id_documento_seleccionado: 2,
          hash_documento:
            '38656330353332373039613434623662366339313236393033393631343734346535613836633964',
          sello_documento:
            '3d785a782a37f150e5005a59f8f5d57f0b55024aadf83f04227b76603967a53e1e6dced585e45cae9d0c68f971d2f2f9a110e0f0629cc7b6580dae5ed277d77614d53e530006499cb10ac6dcfdf5c1f4ec82e4ea64629c2e376fe33233d7bacac273d042c14c85c83eed5daed3b840afd1c3639f0a2d20381d4303aebef5ab28',
        },
      ],
    };

    this.firma
      .enviarFirma(PAYLOAD)
      .pipe(
        tap((response: BaseResponse<string>) => {
          if (response.datos) {
            this.folio = response.datos;
          }
        }),
        switchMap(() => this.tramiteFolioServices.obtenerTramite(19)),
        tap((tramite) => {
          // Guardamos el trámite y el folio real
          this.tramiteStore.establecerTramite(tramite.data, firma, ID_SOLICITUD ?? 0);
          this.tramiteStore.establecerTramite(this.folio, firma, ID_SOLICITUD ?? 0);
          this.router.navigate([`${this.url}/acuse`]);
        }),
        catchError((error) => {
          console.error('Error en el proceso de firma:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }
}

