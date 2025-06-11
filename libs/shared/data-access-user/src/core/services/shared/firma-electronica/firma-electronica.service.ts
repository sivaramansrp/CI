import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../models/shared/base-response.model';
import { CadenaOriginalRequest } from '../../../models/shared/firma-electronica/request/cadena-original-request.model';
import { FirmarRequest } from '../../../models/shared/firma-electronica/request/firmar-request.model';
import { WindowKey } from '../../../models/shared/window-key';

@Injectable({
  providedIn: 'root'
})
export class FirmaElectronicaService {

  urlServer = ENVIRONMENT.URL_SERVER;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la cadena original para firmar.
   */
  obtenerCadenaOriginal(body: CadenaOriginalRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlServer}/api/tramite/cadena-original`, body);
  }

  /**
   * Envía la firma electrónica al backend.
   */
  enviarFirma(body: FirmarRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlServer}/api/tramite/firmar`, body);
  }

    /**
   * Valida y firma la cadena usando FielUtil.js
   * @param certFile Archivo del certificado (.cer)
   * @param keyFile Archivo de la llave privada (.key)
   * @param password Contraseña de la llave privada
   * @param cadenaOriginal Cadena original a firmar
   * @returns Promesa con los datos de la firma
   */
  async firmarCadena(
  cerInput: HTMLInputElement,
  keyInput: HTMLInputElement,
  passwordInput: HTMLInputElement 
): Promise<{ firma: string; certificado: any; serialNumber: string; rfc: string }> {
  try {
    const PKI = window['PKI' as WindowKey];

    if (!PKI?.SAT?.FielUtil) {
      throw new Error('La librería FielUtil no está disponible');
    }

    // Verificar que los inputs tengan archivos
    if (!cerInput.files?.length || !keyInput.files?.length) {
      throw new Error('No se seleccionaron archivos válidos');
    }

    // Validar que el password input tenga valor
    if (!passwordInput.value) {
      throw new Error('La contraseña no puede estar vacía');
    }

    // Validar compatibilidad del navegador
    const compatibilidad = PKI.SAT.FielUtil.validaNavegador(cerInput);
    if (compatibilidad !== true) {
      throw new Error(PKI.SAT.FielUtil.obtenMensajeError(compatibilidad));
    }

    return await new Promise((resolve, reject) => {
      PKI.SAT.FielUtil.validaFielyFirmaCadena(
        cerInput,
        keyInput,
        passwordInput,
        (certificado: any) => {
          try {
            const cert = new PKI.SAT.Certificado(certificado);
            this.validarVigenciaCertificado(cert);
            
            resolve({
              firma: '',
              certificado,
              serialNumber: cert.getNumeroSerie().replace(/ /g, ''),
              rfc: cert.getRFC().replace(/ /g, '')
            });
          } catch (error) {
            reject(error);
          }
        },
        (error_code: any, certificado: any, firma: any) => {
          if (error_code === 0) {
            try {
              const cert = new PKI.SAT.Certificado(certificado);
              this.validarVigenciaCertificado(cert);
              
              resolve({
                firma,
                certificado,
                serialNumber: cert.getNumeroSerie().replace(/ /g, ''),
                rfc: cert.getRFC().replace(/ /g, '')
              });
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error(PKI.SAT.FielUtil.obtenMensajeError(error_code)));
          }
        }
      );
    });
  } catch (error) {
    console.error('Error en firmarCadena:', error);
    throw error;
  }
}

  private validarVigenciaCertificado(cert: any): void {
    const hoy = new Date();
    const inicio = new Date(cert.getFechaInicio());
    const fin = new Date(cert.getFechaFin());

    if (hoy < inicio || hoy > fin) {
      throw new Error('El certificado no está vigente. Verifica la vigencia del .cer');
    }
  }
}
