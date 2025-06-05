import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src/enviroments/enviroment';
import { Observable } from 'rxjs';
import { WindowKey } from '../../../models/shared/window-key';
import { CadenaOriginalRequest } from '../../../models/shared/firma-electronica/request/cadena-original-request.model';
import { BaseResponse } from '../../../models/shared/base-response.model';
import { FirmarRequest } from '../../../models/shared/firma-electronica/request/firmar-request.model';

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
   * @param cadenaOriginal Cadena original a firmar (debe venir del backend)
   * @returns Promesa con los datos de la firma
   */
  async firmarCadena(
    certFile: File,
    keyFile: File,
    password: string,
  ): Promise<{ firma: string; certificado: any; serialNumber: string; rfc: string }> {
    try {
      // Validar que los archivos sean del tipo correcto
      if (!(certFile instanceof File) || !(keyFile instanceof File)) {
        throw new Error('Los archivos deben ser del tipo File');
      }
      
      const PKI = window['PKI' as WindowKey];

      if (!PKI?.SAT?.FielUtil) {
        throw new Error('La librería FielUtil no está disponible');
      }

      // Validar compatibilidad del navegador
      const compatibilidad = PKI.SAT.FielUtil.validaNavegador(certFile);
      if (compatibilidad !== true) {
        throw new Error(PKI.SAT.FielUtil.obtenMensajeError(compatibilidad));
      }

      return await new Promise((resolve, reject) => {
        PKI.SAT.FielUtil.validaFielyFirmaCadena(
          certFile,
          keyFile,
          password,
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
    const inicio = new Date(cert.getVigenciaInicio());
    const fin = new Date(cert.getVigenciaFin());

    if (hoy < inicio || hoy > fin) {
      throw new Error('El certificado no está vigente. Verifica la vigencia del .cer');
    }
  }
}
