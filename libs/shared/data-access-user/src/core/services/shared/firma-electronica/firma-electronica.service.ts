/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENVIAR_FIRMA, API_GENERAR_CADENA_ORIGINAL } from '../../../constants/api-constants';
import { FielPayload, FirmarRequest } from '../../../models/shared/firma-electronica/request/firmar-request.model';
import { AUTH_ROUTE } from '../../../servers/common-server-route';
import { BaseResponse } from '../../../models/shared/base-response.model';
import { CadenaOriginalRequest } from '../../../models/shared/firma-electronica/request/cadena-original-request.model';
import { ENVIRONMENT } from '../../../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WindowKey } from '../../../models/shared/window-key';

import { JSONResponse } from '@libs/shared/data-access-user/src';



@Injectable({
  providedIn: 'root'
})
export class FirmaElectronicaService {

  urlServer = ENVIRONMENT.API_HOST;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la cadena original para firmar.
   */
  obtenerCadenaOriginal<T>(body: CadenaOriginalRequest): Observable<BaseResponse<T>> {
    return this.http.post<BaseResponse<T>>(`${this.urlServer}/${API_GENERAR_CADENA_ORIGINAL}`, body);
  }

  /**
 * Envía una solicitud de firma para un trámite específico.
 *
 * @param body Objeto de tipo `FirmarRequest` que contiene los datos necesarios para firmar el trámite.
 * @returns Un `Observable` de tipo `BaseResponse` que contiene el resultado de la operación.
 */
  enviarFirma<T>(body: FirmarRequest): Observable<BaseResponse<T>> {
    return this.http.post<BaseResponse<T>>(`${this.urlServer}/${API_ENVIAR_FIRMA}`, body);
  }

  /**
   * Firma una cadena original utilizando los archivos de certificado y llave, y la contraseña proporcionada.
   * 
   * @param cerInput Input HTML para el archivo de certificado (.cer).
   * @param keyInput Input HTML para el archivo de llave privada (.key).
   * @param passwordInput Input HTML para la contraseña de la llave privada.
   * @param cadenaOriginal Cadena original a firmar (opcional).
   * @param soloValidar Si es true, solo valida sin generar firma (opcional, por defecto false).
   * 
   * @returns Un objeto con la firma generada, el certificado en formato hexadecimal, el número de serie y el RFC.
   */
  // eslint-disable-next-line class-methods-use-this
  async firmarCadena(
    cerInput: HTMLInputElement,
    keyInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    cadenaOriginal?: string,
    soloValidar: boolean = false
  ): Promise<{ firma?: string; certificado: any; serialNumber: string; rfc: string, fechaFin: string }> {
    try {
      const PKI = window['PKI' as WindowKey];

      if (!PKI?.SAT?.FielUtil) { throw new Error('La librería FielUtil no está disponible'); }
      if (!cerInput.files?.length || !keyInput.files?.length) { throw new Error('No se seleccionaron archivos válidos'); }
      if (!passwordInput.value) { throw new Error('La contraseña no puede estar vacía'); }

      const COMPATIBILIDAD = PKI.SAT.FielUtil.validaNavegador(cerInput);
      if (COMPATIBILIDAD !== true) { throw new Error(PKI.SAT.FielUtil.obtenMensajeError(COMPATIBILIDAD)); }

      const CADENAAFIRMAR = soloValidar ? ' ' : (cadenaOriginal || '');

      return await new Promise((resolve, reject) => {
        PKI.SAT.FielUtil.validaFielyFirmaCadena(
          cerInput,
          keyInput,
          passwordInput,
          () => CADENAAFIRMAR,
          (error_code: any, certificado: any, firma: any) => {
            if (error_code === 0) {
              try {
                const CERT = new PKI.SAT.Certificado(certificado);
                
                resolve({
                  firma: soloValidar ? undefined : firma,
                  certificado: certificado.hex,
                  serialNumber: CERT.getNumeroSerie().replace(/ /g, ''),
                  rfc: CERT.getRFC().replace(/ /g, ''),
                  fechaFin: CERT.getFechaFin().toISOString()
                });
              } catch (error) {
                reject(error);
              }
            } else {
              reject(new Error(PKI.SAT.FielUtil.obtenMensajeError(error_code)));
            }
          },
          CADENAAFIRMAR
        );
      });
    } catch (error) {
      console.error('Error en firmarCadena:', error);
      throw error;
    }
  }

  /**
   * Valida la vigencia del certificado (USAR CUANDO SEA NECESARIO).
   * @param cert El certificado a validar.
   * @throws Error si el certificado no está vigente.
   */
  // eslint-disable-next-line class-methods-use-this
  private validarVigenciaCertificado(cert: any): void {
    const HOY = new Date();
    const INICIO = new Date(cert.getFechaInicio());
    const FIN = new Date(cert.getFechaFin());

    if (HOY < INICIO || HOY > FIN) {
      throw new Error('El certificado no está vigente. Verifica la vigencia del .cer');
    }
  }

  public loginFielAuthentication(payload: FielPayload): Observable<JSONResponse> {
    return this.http.post<JSONResponse>(AUTH_ROUTE.LOGIN, payload);
  }
}