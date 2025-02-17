// digitalizar-documentos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Import necessary models/interfaces
import { CatalogoTipoDocumento } from '../models/catalogo-tipo-documento.model';
import { SolicitudDigitalizarDocumento } from '../models/solicitud-digitalizar-documento.model';
import { FilterDataPage } from '../models/filter-data-page.model';
import { VuUserProfile } from '../models/vu-user-profile.model';
import { Errores } from '../models/errores.model';
import { Firma } from '../models/firma.model';
import { DocumentoOficialDigi } from '../models/documento-oficial-digi.model';
import { TramiteDigi } from '../models/tramite-digi.model';
import { CertificadoUtilizado } from '../models/certificado-utilizado.model';

// Define custom error classes
export class OpcionDeConsultaException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpcionDeConsultaException';
  }
}

export class FechaException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FechaException';
  }
}

export class EDocumentException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EDocumentException';
  }
}

export class CorreoElectronicoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CorreoElectronicoException';
  }
}

export class DocumentoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocumentoException';
  }
}

export class RFCException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RFCException';
  }
}

export class MismoRFCException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MismoRFCException';
  }
}

export class TipoDocumentoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TipoDocumentoException';
  }
}

export class UsuarioExisteException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UsuarioExisteException';
  }
}

export class PersonaFisicaSinFielException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PersonaFisicaSinFielException';
  }
}

export class CertificadoUtilizadoException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CertificadoUtilizadoException';
  }
}

@Injectable({
  providedIn: 'root'
})
export class DigitalizarDocumentosService {

  private readonly EXPRESION_VALOR_NUMERICO = /^\\d+$/;
  private readonly EXPRESION_OPCION_DE_CONSULTA = /^[1-3]{1}$/;
  private readonly EXPRESION_EDOCUMENT = /^\\d{6}[a-zA-Z0-9]{7}$/;
  private readonly EXPRESION_NOMBRE_DOCUMENTO = /[^\\/:*?"<>|]{1,}/;
  private readonly EXPRESION_RFC = /^([a-zA-ZÑ&]{3,4})(\\d{2})(0[1-9]|1[012])(0[1-9]|[12]\\d|3[01])(([a-zA-ZÑ&]|\\d){3})$/;
  private readonly MAX_NUM_DIAS_CONSULTA = 30; // Example value, replace with actual constant

  private readonly baseUrl = 'http://localhost:3000/api/digitalizar-documentos'; // Replace with actual API URL

  constructor(private http: HttpClient) { }

  /**
   * Validates the consultation option.
   * @param opcionDeConsulta The chosen consultation option.
   * @throws OpcionDeConsultaException if the option is invalid or not provided.
   */
  validaOpcionDeConsulta(opcionDeConsulta: string): void {
    if (opcionDeConsulta) {
      const isValid = this.EXPRESION_OPCION_DE_CONSULTA.test(opcionDeConsulta);
      if (!isValid) {
        throw new OpcionDeConsultaException('opcionIncorrecta');
      }
    } else {
      throw new OpcionDeConsultaException('opcionRequerida');
    }
  }

  /**
   * Validates that both start and end dates are provided.
   * @param fechaInicio Start date.
   * @param fechaFin End date.
   * @throws FechaException if any of the dates are missing.
   */
  validaFechasCapturadas(fechaInicio: Date, fechaFin: Date): void {
    if (!fechaInicio && !fechaFin) {
      throw new FechaException('fechas.requeridas');
    } else {
      if (fechaFin && !fechaInicio) {
        throw new FechaException('fechaInicio.requerida');
      }

      if (fechaInicio && !fechaFin) {
        throw new FechaException('fechaFin.requerida');
      }
    }
  }

  /**
   * Validates the pair of start and end dates.
   * @param fechaInicio Start date.
   * @param fechaFin End date.
   * @throws FechaException if the start date is after the end date or the difference exceeds the maximum allowed days.
   */
  validarParejaFechas(fechaInicio: Date, fechaFin: Date): void {
    if (fechaInicio && fechaFin) {
      const diff = this.getDiasDiferencia(fechaInicio, fechaFin);
      if (diff < 0) {
        throw new FechaException('fechaInicio.mayor');
      }

      if (diff > this.MAX_NUM_DIAS_CONSULTA) {
        throw new FechaException('fechas.diferencia.mayor');
      }
    } else {
      throw new FechaException('fechas.requeridas');
    }
  }

  /**
   * Calculates the difference in days between two dates.
   * @param start Start date.
   * @param end End date.
   * @returns Number of days difference.
   */
  private getDiasDiferencia(start: Date, end: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((end.getTime() - start.getTime()) / oneDay);
    return diffDays;
  }

  /**
   * Validates the eDocument format.
   * @param eDocument The eDocument string to validate.
   * @throws EDocumentException if the format is incorrect or not provided.
   */
  validaEdocument(eDocument: string): void {
    if (eDocument) {
      const isValid = this.EXPRESION_EDOCUMENT.test(eDocument);
      if (!isValid) {
        throw new EDocumentException('formatoIncorrecto');
      }
    } else {
      throw new EDocumentException('eDocumentRequerido');
    }
  }

  /**
   * Validates an email address.
   * @param email The email to validate.
   * @throws CorreoElectronicoException if the email is invalid.
   */
  validaEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new CorreoElectronicoException('emailInvalido');
    }
  }

  /**
   * Validates the document name.
   * @param nombreDoc The document name to validate.
   * @returns True if valid.
   * @throws DocumentoException if the name is invalid or not provided.
   */
  validaNombreDocumento(nombreDoc: string): boolean {
    if (nombreDoc) {
      const isValid = this.EXPRESION_NOMBRE_DOCUMENTO.test(nombreDoc);
      if (!isValid) {
        throw new DocumentoException('nombreDocumentoInvalido');
      }
      return isValid;
    } else {
      throw new DocumentoException('nombreDocumentoRequerido');
    }
  }

  /**
   * Validates the RFC for consultation.
   * @param rfc The RFC to validate.
   * @throws RFCException if the RFC format is invalid.
   */
  validaRFCConsulta(rfc: string): void {
    if (rfc) {
      this.validaRFC(rfc);
    }
  }

  /**
   * Validates the RFC format.
   * @param rfc The RFC to validate.
   * @throws RFCException if the RFC is invalid or not provided.
   */
  validaRFC(rfc: string): void {
    if (rfc) {
      const isValid = this.EXPRESION_RFC.test(rfc);
      if (!isValid) {
        throw new RFCException('rfcInvalido');
      }
    } else {
      throw new RFCException('rfcRequerido');
    }
  }

  /**
   * Validates the RFC for agent aduanal.
   * @param rfc The RFC to validate.
   * @throws RFCException if the RFC is invalid or not provided.
   */
  validaRFCSolcitanteAgenteAduanal(rfc: string): void {
    if (rfc) {
      const isValid = this.EXPRESION_RFC.test(rfc);
      if (!isValid) {
        throw new RFCException('rfcInvalido');
      }
    } else {
      throw new RFCException('rfcSolicitanteParaAARequerido');
    }
  }

  /**
   * Checks if the consultation RFC is the same as the requester RFC.
   * @param rfcConsulta Consultation RFC.
   * @param rfcSolicitante Requester RFC.
   * @returns False if different.
   * @throws MismoRFCException if both RFCs are the same.
   */
  verificaRFCParaConsulta(rfcConsulta: string, rfcSolicitante: string): boolean {
    if (rfcConsulta && rfcSolicitante && rfcConsulta.trim() === rfcSolicitante.trim()) {
      throw new MismoRFCException('mismo.rfc');
    }
    return false;
  }

  /**
   * Verifies that the requester RFC and the consultation RFC are not the same.
   * @param rfcConsulta Consultation RFC.
   * @param rfcSolicitante Requester RFC.
   * @throws MismoRFCException if both RFCs are the same.
   */
  verificaRFCSolicitanteConRFCConsulta(rfcConsulta: string, rfcSolicitante: string): void {
    if (rfcConsulta && rfcSolicitante && rfcConsulta.trim() === rfcSolicitante.trim()) {
      throw new MismoRFCException('mismo.rfc.con.parametros');
    }
  }

  /**
   * Validates that there are no duplicate RFCs in the list.
   * @param listaRfcs List of RFCs.
   * @throws MismoRFCException if duplicates are found.
   */
  validaRfcsDuplicados(listaRfcs: string[]): void {
    if (listaRfcs && listaRfcs.length > 0) {
      const uniqueRfcs = new Set(listaRfcs);
      if (uniqueRfcs.size !== listaRfcs.length) {
        throw new MismoRFCException('rfcs.duplicados');
      }
    }
  }

  /**
   * Validates the document type.
   * @param idTipoDocumento Document type ID.
   * @param idTipoTramite Tramite type ID.
   * @param tipoDocumentoEspecifico Specific document type ID.
   * @param claveClasificacion Classification key.
   * @returns Observable of CatalogoTipoDocumento.
   * @throws TipoDocumentoException if the document type is invalid.
   */
  validaTipoDeDocumento(
    idTipoDocumento: number,
    idTipoTramite: number,
    tipoDocumentoEspecifico: number,
    claveClasificacion: string
  ): Observable<CatalogoTipoDocumento> {
    if (idTipoDocumento <= 0) {
      throw new TipoDocumentoException('tipoDocumentoDebeSerMayorACero');
    }

    const params = new HttpParams()
      .set('idTipoDocumento', idTipoDocumento.toString())
      .set('idTipoTramite', idTipoTramite.toString())
      .set('tipoDocumentoEspecifico', tipoDocumentoEspecifico.toString())
      .set('claveClasificacion', claveClasificacion);

    return this.http.get<CatalogoTipoDocumento>(`${this.baseUrl}/catalogo-tipo-documento`, { params })
      .pipe(
        map(catTipoDocumento => {
          if (!catTipoDocumento) {
            throw new TipoDocumentoException('tipoDocumentoInvalidoInactivo');
          }
          return catTipoDocumento;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Validates the document ID is numeric.
   * @param idDocumento Document ID.
   * @throws DocumentoException if the ID is invalid or not numeric.
   */
  validaIdDocumento(idDocumento: string): void {
    if (idDocumento) {
      const isNumerico = /^\d+$/.test(idDocumento);
      if (!isNumerico) {
        throw new DocumentoException('idDocumento.invalido');
      }
    } else {
      throw new DocumentoException('idDocumento.invalido');
    }
  }

  /**
   * Retrieves the main role of the user.
   * @param rfcSolicitante Requester RFC.
   * @param certificadoUtilizado Used certificate.
   * @returns Observable of the main role as string.
   * @throws UsuarioExisteException if the user role is invalid.
   */
  getRolPrincipal(rfcSolicitante: string, certificadoUtilizado: CertificadoUtilizado): Observable<string> {
    // Assuming there's an API endpoint to get the user's profile and roles
    const params = new HttpParams().set('rfc', rfcSolicitante);

    return this.http.get<any>(`${this.baseUrl}/usuarios/roles`, { params })
      .pipe(
        map(userProfile => {
          let rolDelSolicitante = '';

          // Check certificate type
          if (certificadoUtilizado && certificadoUtilizado.tipoCertificado === 'COVE') {
            rolDelSolicitante = 'EXTERNO_CON_SELLO_COVE';
            return rolDelSolicitante;
          }

          if (!userProfile || !userProfile.roles) {
            throw new UsuarioExisteException('usuario.invalido');
          }

          for (const rol of userProfile.roles) {
            if (rol.name === 'PERSONA_MORAL' || rol.name === 'PERSONA_FISICA') {
              rolDelSolicitante = rol.name;
              break;
            }
          }

          if (!rolDelSolicitante) {
            throw new UsuarioExisteException('usuario.invalido');
          }

          return rolDelSolicitante;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Checks if the certificate is of type FIEL.
   * @param certificadoUtilizado Used certificate.
   * @returns True if FIEL, otherwise false.
   */
  isCertificadoFiel(certificadoUtilizado: CertificadoUtilizado): boolean {
    return certificadoUtilizado?.tipoCertificado === 'FIEL';
  }

  /**
   * Validates if the used certificate is valid.
   * @param certificadoUtilizado Used certificate.
   * @throws CertificadoUtilizadoException if the certificate is invalid.
   */
  isCertificadoValido(certificadoUtilizado: CertificadoUtilizado): void {
    if (certificadoUtilizado?.tipoCertificado === 'ERRONEO') {
      throw new CertificadoUtilizadoException('certificadoNoValido');
    }
  }

  /**
   * Retrieves and validates the used certificate.
   * @param certificado Array buffer representing the certificate.
   * @returns Observable of CertificadoUtilizado.
   * @throws DigitalizarDocumentoException if the certificate is invalid or cannot be validated.
   */
  getCertificadoUtilizado(certificado: ArrayBuffer): Observable<CertificadoUtilizado> {
    if (!certificado) {
      return throwError(new Error('certificadoUtilizadoNoValido'));
    }

    // Convert ArrayBuffer to hexadecimal string
    const certificadoHex = this.arrayBufferToHex(certificado);

    // Assuming there's an API endpoint to validate the certificate
    return this.http.post<CertificadoUtilizado>(`${this.baseUrl}/certificados/validar`, { certificadoHex })
      .pipe(
        map(certUtilizado => {
          this.isCertificadoValido(certUtilizado);
          return certUtilizado;
        }),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            // Handle different error statuses if needed
            return throwError(new Error('certificadoUtilizadoNoValido'));
          }
          return throwError(err);
        })
      );
  }

  /**
   * Validates the filters for digital document consultation.
   * @param opcionDeConsulta Consultation option.
   * @param eDocument eDocument string.
   * @param rfcConsulta Consultation RFC.
   * @param rfcPropietario Owner's RFC.
   * @param fechaInicio Start date.
   * @param fechaFin End date.
   * @throws Various exceptions based on validation failures.
   */
  validaFiltrosDeConsultaDigitalizarDocumentos(
    opcionDeConsulta: string,
    eDocument: string,
    rfcConsulta: string,
    rfcPropietario: string,
    fechaInicio: Date,
    fechaFin: Date
  ): void {
    this.validaOpcionDeConsulta(opcionDeConsulta);

    if (opcionDeConsulta === '1') { // CONSULTA_POR_E_DOCUMENT
      this.validaEdocument(eDocument);
    } else if (opcionDeConsulta === '2') { // CONSULTA_POR_FECHA
      this.validaFechasCapturadas(fechaInicio, fechaFin);
      this.validarParejaFechas(fechaInicio, fechaFin);

      if (rfcConsulta && rfcConsulta.trim() !== '') {
        this.validaRFCConsulta(rfcConsulta);
        this.verificaRFCParaConsulta(rfcConsulta, rfcPropietario);
      }
    }
    // Additional options can be handled here if needed
  }

  /**
   * Validates the electronic signature for consultation.
   * @param firmaElectronica Electronic signature object.
   * @param rfcSolicitante Requester RFC.
   * @param cadenaOriginal Original chain string.
   * @param certificadoUtilizado Used certificate.
   * @returns Observable of Errores with potential error messages.
   */
  validarFirmaElectronicaParaConsulta(
    firmaElectronica: any, // Replace with actual FirmaElectronica interface
    rfcSolicitante: string,
    cadenaOriginal: string,
    certificadoUtilizado: CertificadoUtilizado
  ): Observable<Errores> {
    const errores: Errores = new Errores();

    // Assuming firmaElectronica has 'certificado', 'cadenaOriginal', and 'firma' properties
    if (!firmaElectronica) {
      errores.mensaje.push('Firma electronica es requerida.');
      return of(errores);
    }

    const firma: Firma = this.generarFirma(firmaElectronica);

    if (!firma.cadenaOriginal || !firma.certificado || !firma.sello) {
      errores.mensaje.push('Firma electronica incompleta.');
      return of(errores);
    }

    // Validate RFC matches certificate
    try {
      const rfcCertificado = this.obtenerRFCDesdeCertificado(firma.certificado);
      if (rfcSolicitante.toLowerCase() !== rfcCertificado.toLowerCase()) {
        errores.mensaje.push('El RFC del solicitante no coincide con el del certificado.');
      }
    } catch (error) {
      errores.mensaje.push('Error al obtener RFC del certificado.');
    }

    // Validate cadenaOriginal
    if (firma.cadenaOriginal.trim() !== cadenaOriginal.trim()) {
      errores.mensaje.push('Cadena original invalida.');
    }

    // Validate the signature via backend service
    return this.http.post<Errores>(`${this.baseUrl}/firmas/validar`, {
      firma: firma.sello,
      cadenaOriginal: firma.cadenaOriginal,
      rfc: rfcSolicitante
    }).pipe(
      catchError(err => {
        errores.mensaje.push('Error al validar la firma electronica.');
        return of(errores);
      })
    );
  }

  /**
   * Generates a Firma object from FirmaElectronica.
   * @param firmaElectronica Electronic signature object.
   * @returns Firma object.
   */
  generarFirma(firmaElectronica: any): Firma {
    const firma = new Firma();

    if (firmaElectronica.cadenaOriginal) {
      firma.cadenaOriginal = firmaElectronica.cadenaOriginal.trim();
    }

    if (firmaElectronica.certificado) {
      firma.certificado = this.arrayBufferToHex(firmaElectronica.certificado);
    }

    if (firmaElectronica.firma) {
      firma.sello = this.arrayBufferToHex(firmaElectronica.firma);
    }

    return firma;
  }

  /**
   * Validates the input data for registering digitalization.
   * @param errores Errores object to populate.
   * @param peticion Registration request object.
   * @param rfcCapturista Capturist RFC.
   * @param certificadoUtilizado Used certificate.
   * @returns Observable of Firma after validation.
   */
  validarDatosDeEntradaRegistroDigitalizacion(
    errores: Errores,
    peticion: any, // Replace with actual RegistroDigitalizarDocumentoRequest interface
    rfcCapturista: string,
    certificadoUtilizado: CertificadoUtilizado
  ): Observable<Firma> {
    let hashDocumento = '';
    let cadenaOriginal = '';

    try {
      cadenaOriginal = this.generarCadenaOriginalRegistro(peticion, rfcCapturista);

      const documentoAdjunto = peticion.documento;
      const archivo = documentoAdjunto.archivo; // Assuming archivo is ArrayBuffer

      if (archivo) {
        hashDocumento = this.createChecksumFromInputStream(archivo);
        cadenaOriginal += hashDocumento + '|';

        console.debug(`El Hash del documento ${documentoAdjunto.nombreDocumento} es: ${hashDocumento}`);
      } else {
        errores.mensaje.push('No se pudo leer el archivo adjunto, el archivo está vacío');
      }

    } catch (e) {
      if (e instanceof IOException) {
        errores.mensaje.push('No se pudo leer el archivo adjunto.');
      } else if (e instanceof FielException) {
        errores.mensaje.push(e.message);
      } else {
        errores.mensaje.push('Error desconocido al procesar el archivo adjunto.');
      }
    }

    console.debug(`Cadena Original: ${cadenaOriginal}`);

    // Validate email
    try {
      this.validaEmail(peticion.correoElectronico);
    } catch (ex) {
      if (ex instanceof CorreoElectronicoException) {
        errores.mensaje.push(ex.message);
      }
    }

    // Validate document name
    try {
      this.validaNombreDocumento(peticion.documento.nombreDocumento.trim());
    } catch (ex) {
      if (ex instanceof DocumentoException) {
        errores.mensaje.push(ex.message);
      }
    }

    // Validate electronic signature
    try {
      const firma = this.validarFirma(errores, this.generarFirma(peticion.peticionBase.firmaElectronica), rfcCapturista, cadenaOriginal, true);
      return of(firma);
    } catch (e) {
      return throwError(e);
    }
  }

  /**
   * Generates the original chain string for registration.
   * @param peticion Registration request object.
   * @param rfcCapturista Capturist RFC.
   * @returns Generated cadena original string.
   */
  private generarCadenaOriginalRegistro(peticion: any, rfcCapturista: string): string {
    // Implement the logic to generate cadena original based on the peticion and rfcCapturista
    // This is a placeholder implementation
    return `CadenaOriginal-${rfcCapturista}`;
  }

  /**
   * Creates a checksum from an ArrayBuffer input stream.
   * @param inputStream ArrayBuffer representing the input stream.
   * @returns Hexadecimal string of the checksum.
   */
  private createChecksumFromInputStream(inputStream: ArrayBuffer): string {
    // Implement checksum creation logic (e.g., SHA-256)
    // Placeholder implementation
    return 'checksumHexString';
  }

  /**
   * Validates the electronic signature.
   * @param errores Errores object to populate.
   * @param firma Firma object.
   * @param rfcUsuario User RFC.
   * @param cadenaOriginalGeneradaPorVucem Original cadena from VUCEM.
   * @param validaOcsp Whether to validate OCSP.
   * @returns Firma object after validation.
   */
  private validarFirma(
    errores: Errores,
    firma: Firma,
    rfcUsuario: string,
    cadenaOriginalGeneradaPorVucem: string,
    validaOcsp: boolean
  ): Firma | null {
    let nuevaFirma: Firma | null = null;

    console.debug(`Validando la firma ${JSON.stringify(firma)}`);

    if (!firma) {
      errores.mensaje.push('Firma electronica es requerida.');
      return null;
    }

    try {
      // Validate RFC matches certificate
      const rfcCertificado = this.obtenerRFCDesdeCertificado(firma.certificado);
      if (rfcUsuario.toLowerCase() !== rfcCertificado.toLowerCase()) {
        errores.mensaje.push('El RFC del solicitante no coincide con el del certificado.');
      }

      // Validate cadenaOriginal
      if (firma.cadenaOriginal.trim() !== cadenaOriginalGeneradaPorVucem.trim()) {
        errores.mensaje.push('Cadena original invalida.');
      } else {
        console.debug('Cadena original Valida!!!');

        // Validate signature via backend
        // Assuming there's an API endpoint to validate the signature
        // Placeholder implementation
        // this.http.post<Firma>(`${this.baseUrl}/firmas/validar`, firma)
        //   .subscribe(validatedFirma => {
        //     nuevaFirma = validatedFirma;
        //   }, error => {
        //     errores.mensaje.push('Firma electronica invalida.');
        //   });

        // Placeholder return
        nuevaFirma = firma;
      }
    } catch (error) {
      errores.mensaje.push('Error al validar la firma electronica.');
    }

    return nuevaFirma;
  }

  /**
   * Obtains RFC from the certificate.
   * @param certificado Hexadecimal string of the certificate.
   * @returns RFC string.
   */
  private obtenerRFCDesdeCertificado(certificado: string): string {
    // Implement logic to extract RFC from the certificate
    // Placeholder implementation
    return 'RFCEXAMPLE123';
  }

  /**
   * Gets the list of RFCs decoded from escaped characters.
   * @param listaRfcsEncode List of encoded RFCs.
   * @returns List of decoded RFCs.
   */
  getListaRfcDecode(listaRfcsEncode: string[]): string[] {
    if (!listaRfcsEncode || listaRfcsEncode.length === 0) {
      return [];
    }

    return listaRfcsEncode.map(rfc => this.unescape(rfc));
  }

  /**
   * Unescapes special characters in a string.
   * @param str String to unescape.
   * @returns Unescaped string.
   */
  private unescape(str: string): string {
    return str.replace(/\\u00ED/g, 'í').replace(/\\u00F3/g, 'ó'); // Add more unescape rules as needed
  }

  /**
   * Validates if the document type belongs to SAGARPA.
   * @param rfcCapturista Capturist RFC.
   * @param peticion Registration request object.
   * @param errores Errores object to populate.
   * @returns True if belongs to SAGARPA, otherwise false.
   */
  isTipoDocumentoSagarpa(
    rfcCapturista: string,
    peticion: any, // Replace with actual RegistroDigitalizarDocumentoRequest interface
    errores: Errores
  ): boolean {
    const documentoAdjunto = peticion.documento;
    let isAgenteAduanal = false;

    try {
      this.validaTipoDeDocumento(
        documentoAdjunto.idTipoDocumento,
        1, // Example DiscriminadorTipoTramiteConstants.DIGITALIZAR_DOCUMENTOS
        1, // Example DigitalizarDocumentosConstants.ID_DOCUMENTOS_ESPECIFICOS
        'CLSDO_RQ' // Example ClasificacionDocumentos.CLSDO_RQ.getClave()
      ).subscribe(catTipoDocumento => {
        if (catTipoDocumento && catTipoDocumento.tipoTramite !== 1) { // Replace with actual ID_DOCUMENTOS_ESPECIFICOS
          isAgenteAduanal = true;

          const rfcDelSolicitante = this.unescape(documentoAdjunto.rfcConsulta);
          this.validaRFCSolcitanteAgenteAduanal(rfcDelSolicitante);
          this.verificaRFCSolicitanteConRFCConsulta(rfcDelSolicitante, rfcCapturista);
        } else {
          isAgenteAduanal = false;

          const rfcDeConsulta = documentoAdjunto.rfcConsulta;
          if (rfcDeConsulta && rfcDeConsulta.trim() !== '') {
            this.validaRFCConsulta(rfcDeConsulta.trim());
            this.verificaRFCSolicitanteConRFCConsulta(rfcDeConsulta, rfcCapturista);
          }
        }
      }, error => {
        errores.mensaje.push('Error al validar el tipo de documento.');
      });
    } catch (e) {
      errores.mensaje.push('Error al validar el tipo de documento.');
    }

    return isAgenteAduanal;
  }

  /**
   * Validates the input data for eDocument consultation.
   * @param peticion Consultation request object.
   * @param rfcSolicitante Requester RFC.
   * @param certificadoUtilizado Used certificate.
   * @returns Observable of Errores with potential error messages.
   */
  validarDatosDeEntradaConsultaEdocument(
    peticion: any, // Replace with actual ConsultaDigitalizarDocumentoRequest interface
    rfcSolicitante: string,
    certificadoUtilizado: CertificadoUtilizado
  ): Observable<Errores> {
    const errores: Errores = new Errores();

    const cadenaOriginal = this.generarCadenaOriginalConsulta(peticion, rfcSolicitante);
    const firmaElectronica = peticion.peticionBase.firmaElectronica;

    this.validarFirmaElectronicaParaConsulta(firmaElectronica, rfcSolicitante, cadenaOriginal, certificadoUtilizado)
      .subscribe(validacionErrores => {
        errores.mensaje.push(...validacionErrores.mensaje);
      }, error => {
        errores.mensaje.push('Error al validar la firma electronica.');
      });

    if (peticion.numeroOperacion <= 0) {
      errores.mensaje.push('El número de operación es inválido.');
    }

    return of(errores);
  }

  /**
   * Generates the original chain string for consultation.
   * @param peticion Consultation request object.
   * @param rfcSolicitante Requester RFC.
   * @returns Generated cadena original string.
   */
  private generarCadenaOriginalConsulta(peticion: any, rfcSolicitante: string): string {
    // Implement the logic to generate cadena original based on the peticion and rfcSolicitante
    // This is a placeholder implementation
    return `CadenaOriginalConsulta-${rfcSolicitante}`;
  }

  /**
   * Converts an ArrayBuffer to a hexadecimal string.
   * @param buffer ArrayBuffer to convert.
   * @returns Hexadecimal string.
   */
  private arrayBufferToHex(buffer: ArrayBuffer): string {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map(value => {
      return value.toString(16).padStart(2, '0');
    });
    return hexCodes.join('');
  }

  /**
   * Handles HTTP errors.
   * @param error HTTP error response.
   * @returns Observable throwing an error.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  /**
   * Retrieves the acknowledgment document for a given eDocument.
   * @param eDocument The eDocument identifier.
   * @returns Observable of DocumentoOficialDigi.
   */
  generarAcuseDocumentosDigitalizados(eDocument: string): Observable<DocumentoOficialDigi> {
    return this.http.get<DocumentoOficialDigi>(`${this.baseUrl}/acuse/${eDocument}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves the folio number for a given eDocument.
   * @param idEdocument The eDocument identifier.
   * @returns Observable of TramiteDigi.
   */
  obtenerNumeroFolio(idEdocument: string): Observable<TramiteDigi> {
    return this.http.get<TramiteDigi>(`${this.baseUrl}/tramites/folio/${idEdocument}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Validates the RFC in IDC.
   * @param rfc The RFC to validate.
   * @returns Observable of error message string or null if valid.
   */
  validaRFCEnIDC(rfc: string): Observable<string | null> {
    return this.http.post<{ mensaje: string }>(`${this.baseUrl}/idc/validar-rfc`, { rfc })
      .pipe(
        map(response => {
          return response.mensaje || null;
        }),
        catchError((error: HttpErrorResponse) => {
          let mensaje = 'Error al validar el RFC en IDC.';
          if (error.status === 404) {
            mensaje = 'El RFC no se encuentra en IDC.';
          } else if (error.status === 400) {
            mensaje = 'El RFC es inválido en IDC.';
          } else if (error.status === 503) {
            mensaje = 'El RFC no está disponible en IDC.';
          }
          return of(mensaje);
        })
      );
  }

  /**
   * Validates if the folio exists in the historical records.
   * @param folioTramite The folio number.
   * @returns Observable of boolean.
   */
  validaHistorico(folioTramite: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/tramites/historico/${folioTramite}`)
      .pipe(
        catchError(() => of(false))
      );
  }

  /**
   * Checks if the eDocument belongs to TramiteDigi.
   * @param idEdocument The eDocument identifier.
   * @returns Observable of boolean.
   */
  esTramiteDigi(idEdocument: string): Observable<boolean> {
    return this.http.get<{ existe: boolean }>(`${this.baseUrl}/tramites/digi/${idEdocument}`)
      .pipe(
        map(response => response.existe),
        catchError(() => of(false))
      );
  }

  /**
   * Checks if the eDocument belongs to old Tramite.
   * @param idEdocument The eDocument identifier.
   * @returns Observable of boolean.
   */
  esTramiteOld(idEdocument: string): Observable<boolean> {
    return this.http.get<{ existe: boolean }>(`${this.baseUrl}/tramites/old/${idEdocument}`)
      .pipe(
        map(response => response.existe),
        catchError(() => of(false))
      );
  }

  /**
   * Placeholder for additional methods such as consulting digitalized documents and generating reports.
   * Implement these methods based on specific backend API endpoints and business logic.
   */

  // Example method to consult digitalized documents
  consultarDocumentosDigitalizados(filterDataPage: FilterDataPage, userProfile: VuUserProfile): Observable<FilterDataPage> {
    // Implement API call based on userProfile and filterDataPage
    // This is a placeholder implementation
    return this.http.post<FilterDataPage>(`${this.baseUrl}/consultar`, { filterDataPage, userProfile })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Example method to generate reports
  generarReporteDocumentosDigitalizados(userProfile: VuUserProfile, filterDataPage: FilterDataPage): Observable<FilterDataPage> {
    // Implement API call based on userProfile and filterDataPage
    // This is a placeholder implementation
    return this.http.post<FilterDataPage>(`${this.baseUrl}/reporte`, { userProfile, filterDataPage })
      .pipe(
        catchError(this.handleError)
      );
  }

}