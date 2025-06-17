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

  urlServer = ENVIRONMENT.API_HOST;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la cadena original para firmar.
   */
  obtenerCadenaOriginal(body: CadenaOriginalRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlServer}/api/tramite/solicitud/genera-cadena-original`, body);
  }

  /**
   * Envía la firma electrónica al backend.
   */
  enviarFirma(body: FirmarRequest): Observable<BaseResponse> {
    return this.http.post<BaseResponse>(`${this.urlServer}/api/tramite/firmar`, body);
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
  async firmarCadena(
    cerInput: HTMLInputElement,
    keyInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    cadenaOriginal?: string,
    soloValidar: boolean = false
  ): Promise<{ firma?: string; certificado: any; serialNumber: string; rfc: string, fechaFin: string }> {
    try {
      const PKI = window['PKI' as WindowKey];

      if (!PKI?.SAT?.FielUtil) throw new Error('La librería FielUtil no está disponible');
      if (!cerInput.files?.length || !keyInput.files?.length) throw new Error('No se seleccionaron archivos válidos');
      if (!passwordInput.value) throw new Error('La contraseña no puede estar vacía');

      const compatibilidad = PKI.SAT.FielUtil.validaNavegador(cerInput);
      if (compatibilidad !== true) throw new Error(PKI.SAT.FielUtil.obtenMensajeError(compatibilidad));

      const cadenaAFirmar = soloValidar ? ' ' : (cadenaOriginal || '');

      return await new Promise((resolve, reject) => {
        PKI.SAT.FielUtil.validaFielyFirmaCadena(
          cerInput,
          keyInput,
          passwordInput,
          () => cadenaAFirmar,
          (error_code: any, certificado: any, firma: any) => {
            if (error_code === 0) {
              try {
                const cert = new PKI.SAT.Certificado(certificado);
                //this.validarVigenciaCertificado(cert);

                resolve({
                  firma: soloValidar ? undefined : firma,
                  certificado: certificado.hex,
                  serialNumber: cert.getNumeroSerie().replace(/ /g, ''),
                  rfc: cert.getRFC().replace(/ /g, ''),
                  fechaFin: cert.getFechaFin().toISOString()
                });
              } catch (error) {
                reject(error);
              }
            } else {
              reject(new Error(PKI.SAT.FielUtil.obtenMensajeError(error_code)));
            }
          },
          cadenaAFirmar
        );
      });
    } catch (error) {
      console.error('Error en firmarCadena:', error);
      throw error;
    }
  }

  /**
   * Valida la vigencia del certificado.
   * @param cert El certificado a validar.
   * @throws Error si el certificado no está vigente.
   */
  private validarVigenciaCertificado(cert: any): void {
    const hoy = new Date();
    const inicio = new Date(cert.getFechaInicio());
    const fin = new Date(cert.getFechaFin());

    if (hoy < inicio || hoy > fin) {
      throw new Error('El certificado no está vigente. Verifica la vigencia del .cer');
    }
  }
}