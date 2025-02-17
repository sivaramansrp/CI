// File: src/app/services/digitalizar-documentos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Import necessary models and helpers
// These should be defined in your project accordingly
import { DigitalizarDocumento } from '../models/digitalizar-documento.model';
import { Constraint } from '../models/constraint.model';
import { FilterDataPage } from '../models/filter-data-page.model';
import { Catalogo } from '../models/catalogo.model';
import { TipoDeDocumento } from '../models/tipo-de-documento.model';
import { MailMessage, MailMessageAttachment } from '../models/mail-message.model';
import { FirmaElectronica } from '../models/firma-electronica.model';
import { RegistroDigitalizarDocumento } from '../models/registro-digitalizar-documento.model';

import { DateHelper } from '../helpers/date.helper';
import { CodecHelper } from '../helpers/codec.helper';
import { WebServiceHelper } from '../helpers/web-service.helper';
import { DocumentFileSystemHelper } from '../helpers/document-file-system.helper';

@Injectable({
  providedIn: 'root'
})
export class DigitalizarDocumentosService {
  
  private mailFrom: string = 'default@mail.com'; // Replace with environment variable
  private mailPersonalFrom: string = 'Default Name'; // Replace with environment variable
  private documentPathDigitalizacion: string = '/path/to/digitalizacion/'; // Replace with environment variable
  
  constructor(
    private http: HttpClient,
    private dateHelper: DateHelper,
    private codecHelper: CodecHelper,
    private webServiceHelper: WebServiceHelper,
    private documentFileSystemHelper: DocumentFileSystemHelper
  ) {}

  /**
   * Prepara el objeto FilterDataPage con los criterios de búsqueda para realizar la consulta de 
   * documentos digitalizados.
   */
  prepararFiltrosDigitalizarDocumentos(
    eDocument: string,
    fechaInicio: Date,
    fechaFin: Date,
    rfcConsulta: string,
    rfcPropietario: string,
    certificadoUtilizado: any, // Replace with actual type
    tipoTramite: number,
    gridParams: any // Replace with actual GridParams type
  ): FilterDataPage {
    const filterDataPage = new FilterDataPage();
    const constraints: Constraint[] = [];

    if (tipoTramite != null) {
      constraints.push(new Constraint('FILTRO_TIPO_TRAMITE', 'IGUAL', tipoTramite));
    }

    if (eDocument && eDocument.trim() !== '') {
      constraints.push(new Constraint('FILTRO_EDOCUMENT', 'IGUAL', eDocument));
    }

    if (rfcConsulta && rfcConsulta.trim() !== '') {
      constraints.push(new Constraint('FILTRO_RFC_CONSULTA', 'IGUAL', rfcConsulta));
    }

    if (fechaInicio != null) {
      constraints.push(new Constraint('FILTRO_FECHA_INICIO', 'MENOR_IGUAL', fechaInicio));
    }

    if (fechaFin != null) {
      constraints.push(new Constraint('FILTRO_FECHA_FIN', 'MENOR_IGUAL', fechaFin));
    }

    if (rfcPropietario && rfcPropietario.trim() !== '') {
      constraints.push(new Constraint('FILTRO_RFC_PROPIETARIO', 'IGUAL', rfcPropietario));
    }

    if (certificadoUtilizado != null && certificadoUtilizado.certSerialNumber?.trim() !== '') {
      constraints.push(new Constraint('FILTRO_NUMERO_DE_CERTIFICADO', 'IGUAL', certificadoUtilizado.certSerialNumber));
    }

    if (gridParams != null) {
      filterDataPage.currentPage = gridParams.requestedPage;
    }

    filterDataPage.constraints = constraints;

    return filterDataPage;
  }

  /**
   * Verifica si la lista de constraints contiene el rfc de consulta.
   */
  validaFiltroRFC(constraints: Constraint[]): boolean {
    return constraints.some(constraint => constraint.atributo === 'FILTRO_RFC_CONSULTA');
  }

  /**
   * Calcula los días de diferencia entre dos fechas.
   */
  static getDiasDeDiferencia(fechaInicio: Date, fechaFin: Date): number {
    const start = new Date(fechaInicio).getTime();
    const end = new Date(fechaFin).getTime();
    const diffTime = end - start;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Genera una lista de documentos del tipo DigitalizarDocumento.
   */
  getDigitalizarDocumento(listaDocumentos: any[]): DigitalizarDocumento[] {
    const listaDigitalizarDocumento: DigitalizarDocumento[] = [];

    if (listaDocumentos != null) {
      listaDocumentos.forEach(doc => {
        const digitalizarDocumento = new DigitalizarDocumento();
        digitalizarDocumento.idDocumento = doc[0];
        digitalizarDocumento.tipoDocumento = doc[1];
        digitalizarDocumento.nombreTipoDocumento = doc[2];
        digitalizarDocumento.nombreDocumento = doc[3];
        digitalizarDocumento.rfcPropietario = doc[4];
        digitalizarDocumento.rfcConsulta = String(doc[5]);
        digitalizarDocumento.fechaCreacion = this.dateHelper.convertDateToString(new Date(doc[6]));
        digitalizarDocumento.eDocument = doc[7];
        listaDigitalizarDocumento.push(digitalizarDocumento);
      });
    }

    return listaDigitalizarDocumento;
  }

  /**
   * Genera una lista de mapas con los datos correspondientes a los documentos digitalizados.
   */
  preparaDatosParaReporte(listaDocumentos: DigitalizarDocumento[]): Map<string, string>[] {
    const listaDeDatos: Map<string, string>[] = [];

    if (listaDocumentos != null) {
      listaDocumentos.forEach(digDocumento => {
        const mapDatos = new Map<string, string>();
        mapDatos.set('COLUMNA_TIPO_DE_DOCUMENTO', digDocumento.nombreTipoDocumento || '');
        mapDatos.set('COLUMNA_NOMBRE_DE_DOCUMENTO', digDocumento.nombreDocumento || '');
        mapDatos.set('COLUMNA_RFC_CONSULTA', digDocumento.rfcConsulta || '');
        mapDatos.set('COLUMNA_FECHA_DE_CREACION', digDocumento.fechaCreacion || '');
        mapDatos.set('COLUMNA_EDOCUMENT', digDocumento.eDocument || '');
        listaDeDatos.push(mapDatos);
      });
    }

    return listaDeDatos;
  }

  /**
   * Genera una cadena que representa una tabla en HTML.
   */
  buildHtmlTable(tableName: string, listColumns: string[], listData: Map<string, string>[]): string {
    let html = `
      <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        </head>
        <body>
          <h1>${tableName || ''}</h1>
          <table border="1">
            <tr>
              ${listColumns.map(col => `<th>${col || ''}</th>`).join('')}
            </tr>
            ${listData.map(row => `
              <tr>
                ${listColumns.map(col => `<td>'${row.get(col) || ''}'</td>`).join('')}
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;
    return html;
  }

  /**
   * Obtiene una lista de catálogo a partir de un mapa.
   */
  obtenerListaCatalogo(mapCatalogo: Map<string, any>): Catalogo[] {
    const listaCatalogo: Catalogo[] = [];

    if (mapCatalogo != null) {
      mapCatalogo.forEach((value) => {
        const catalogo: Catalogo = value as Catalogo;
        listaCatalogo.push(catalogo);
      });
    }

    return listaCatalogo;
  }

  /**
   * Devuelve una lista de TipoDeDocumento a partir de la lista 
   * de objetos del tipo Catalogo. 
   */
  obtieneListaTipoDeDocumentos(documentos: Catalogo[]): TipoDeDocumento[] {
    return documentos.map(documento => {
      const tipoDeDocumento = new TipoDeDocumento();
      tipoDeDocumento.idTipoDeDocumento = Number(documento.clave);
      tipoDeDocumento.descripcion = documento.descripcion;
      return tipoDeDocumento;
    });
  }

  /**
   * Reemplaza todos los objetos que se encuentren en la colección listaTipoDocumento.
   */
  complementaListaCatalogoTipoDocumentoSagarpa(
    listaTipoDocumento: CatalogoTipoDocumento[],
    listaTipoDocumentoSagarpa: CatalogoTipoDocumento[]
  ): void {
    if (listaTipoDocumento != null) {
      listaTipoDocumentoSagarpa.forEach(catTipoDocumento => {
        const index = listaTipoDocumento.findIndex(item => item.clave === catTipoDocumento.clave);
        if (index !== -1) {
          listaTipoDocumento[index] = catTipoDocumento;
        }
      });
    }
  }

  /**
   * Agrega una lista de CatalogoTipoDocumento Sagarpa a la lista principal.
   */
  addListaCatalogoTipoDocumentoSagarpa(
    listaTipoDocumento: Set<CatalogoTipoDocumento>,
    listaTipoDocumentoSagarpa: Set<CatalogoTipoDocumento>
  ): void {
    if (listaTipoDocumento && listaTipoDocumentoSagarpa) {
      listaTipoDocumentoSagarpa.forEach(item => listaTipoDocumento.add(item));
    }
  }

  /**
   * Genera una lista con objetos CatalogoTipoDocumento a partir de un arreglo de objetos.
   */
  obtenerListaCatalogoTipoDocumento(tuples: any[][]): Set<CatalogoTipoDocumento> {
    const listaCatalogoTipoDocumento = new Set<CatalogoTipoDocumento>();

    if (tuples != null) {
      tuples.forEach(tuple => {
        const catalogo = new CatalogoTipoDocumento();
        catalogo.clave = tuple[0].toString();
        catalogo.descripcion = tuple[1];
        catalogo.tipoTramite = Number(tuple[2]);
        listaCatalogoTipoDocumento.add(catalogo);
      });
    }

    return listaCatalogoTipoDocumento;
  }

  /**
   * Genera el mensaje de correo para notificaciones.
   */
  generarMensajeDeCorreo(
    respuesta: any, // Replace with ConsultaDigitalizarDocumentoResponse type
    to: string,
    numeroDeOperacion: number,
    fechaRecepcion: Date
  ): Observable<MailMessage> {
    return this.obtenXML(respuesta).pipe(
      map(xmlRespuesta => {
        console.debug(`XML de salida para notificacion por correo: ${xmlRespuesta}`);

        const mensajePersonalTo = `No. de Operación : ${numeroDeOperacion}`;
        const mailMessage = new MailMessage(this.mailFrom, this.mailPersonalFrom, to, mensajePersonalTo);
        
        const body = `
          Se anexa la respuesta de registro de Digitalizar Documentos con número de Operación : ${numeroDeOperacion}
          Recibido en la fecha : ${this.dateHelper.convertDateHoursToString(fechaRecepcion)}
          
          ${xmlRespuesta}
        `;
        mailMessage.body = body;
        
        const attachment = new MailMessageAttachment(
          `resultado_operacion_${numeroDeOperacion}.txt`,
          'text/plain',
          new TextEncoder().encode(xmlRespuesta)
        );
        mailMessage.addAttachment(attachment);
        
        return mailMessage;
      })
    );
  }

  /**
   * Convierte un objeto a una cadena XML.
   */
  obtenXML(peticion: any): Observable<string> { // Replace 'any' with actual type
    // This requires a library to convert JSON to XML
    // For example, using 'xml-js' or similar
    // Here is a placeholder implementation

    // Import xml2js or any other library as needed
    // const xml = convertObjectToXML(peticion);
    // return of(xml);

    // Placeholder:
    return new Observable(observer => {
      try {
        // Implement actual XML conversion logic
        const xml = new XMLSerializer().serializeToString(peticion); // This is not accurate
        observer.next(xml);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /**
   * Genera el nombre completo del archivo origen.
   */
  crearNombreCompletoArchivoOrigen(nombreArchivoOrigen: string): string {
    return `${this.documentPathDigitalizacion}${nombreArchivoOrigen}`;
  }

  /**
   * Genera el nombre completo del archivo destino.
   */
  crearNombreCompletoArchivoDestino(nombreArchivoDestino: string): string {
    return `${this.documentFileSystemHelper.getRutaArchivos()}${nombreArchivoDestino}`;
  }

  /**
   * Convierte un arreglo de bytes a un objeto.
   */
  toObject(bytes: Uint8Array): any { // Replace 'any' with actual type
    // This is typically handled on the backend.
    // On frontend, you might use ArrayBuffer or similar.
    // Placeholder implementation:
    return {};
  }

  /**
   * Obtiene el RFC del solicitante desde la cadena original.
   */
  getRfcSolicitanteFromFirmaElectronica(firmaElectronica: FirmaElectronica): string {
    let rfcSolicitante = '';
    
    if (firmaElectronica != null) {
      const strCadenaOriginal = firmaElectronica.cadenaOriginal;
      if (strCadenaOriginal != null) {
        const elementsCadenaOriginal = strCadenaOriginal.split('|');
        if (elementsCadenaOriginal != null && elementsCadenaOriginal.length > 1) {
          rfcSolicitante = elementsCadenaOriginal[1];
        }
      }
    }
    
    return rfcSolicitante;
  }

  /**
   * Genera la cadena original para el registro de digitalización.
   */
  generarCadenaOriginalRegistroDigitalizacionWS(
    peticion: any, // Replace with RegistroDigitalizarDocumentoRequest type
    rfcSolicitante: string
  ): string {
    let cadenaOriginal = `|${rfcSolicitante || ''}|${peticion.correoElectronico || ''}|${peticion.documento.idTipoDocumento || ''}|${peticion.documento.nombreDocumento || ''}|`;

    const rfcDeConsulta = peticion.documento.rfcConsulta;
    if (rfcDeConsulta && rfcDeConsulta.trim() !== '') {
      cadenaOriginal += `${rfcDeConsulta}|`;
    }

    return cadenaOriginal;
  }

  /**
   * Genera la cadena original para consultar e-document.
   */
  generarCadenaOriginalConsultarEdocumentWS(
    peticion: any, // Replace with ConsultaDigitalizarDocumentoRequest type
    rfcSolicitante: string
  ): string {
    return `|${rfcSolicitante || ''}|${peticion.numeroOperacion || ''}|`;
  }

  /**
   * Obtiene un arreglo de bytes desde un DataHandler.
   * En Angular, esto podría ser manejado como Blob o ArrayBuffer.
   */
  getArrayOfBytesFromBlob(blob: Blob): Observable<Uint8Array> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const bytes = new Uint8Array(arrayBuffer);
        observer.next(bytes);
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
      reader.readAsArrayBuffer(blob);
    });
  }

  /**
   * Crea un objeto Firma a partir de una firma electrónica.
   */
  creaFirma(firmaElectronica: FirmaElectronica, rfcSolicitante: string): any { // Replace 'any' with Firma type
    const firma = this.webServiceHelper.obtenerFirma(firmaElectronica);
    firma.cadenaOriginal = this.codecHelper.encodeHexString(
      new TextEncoder().encode(firmaElectronica.cadenaOriginal || '').toString()
    );
    firma.claveUsuario = rfcSolicitante;
    return firma;
  }

  /**
   * Decodifica una cadena escapada.
   */
  unescape(cadena: string): string {
    let s = '';
    try {
      if (cadena && cadena.trim() !== '') {
        s = decodeURIComponent(cadena);
      }
    } catch (e) {
      console.error(`UnsupportedEncodingException, error al decodificar la cadena: ${cadena}`, e);
    }
    return s;
  }

  /**
   * Genera un objeto FileBean equivalente en Angular.
   */
  generarFileBean(file: File, nombreArchivoAdjunto: string): File {
    const nombreCompleto = `${nombreArchivoAdjunto}.pdf`;
    // In Angular, you typically use the File object directly
    // Additional processing can be done as needed
    return new File([file], nombreCompleto, { type: 'application/pdf' });
  }

  /**
   * Envía el MailMessage al servidor para su procesamiento.
   * Este método asume que existe un endpoint backend que maneja el envío de correos.
   */
  enviarMensajeDeCorreo(mailMessage: MailMessage): Observable<any> {
    const url = '/api/enviar-correo'; // Replace with actual API endpoint
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, mailMessage, { headers });
  }

  // Getters and Setters
  getMailFromAddress(): string {
    return this.mailFrom;
  }

  setMailFromAddress(mailFrom: string): void {
    this.mailFrom = mailFrom;
  }

  getMailPersonalFrom(): string {
    return this.mailPersonalFrom;
  }

  setMailPersonalFrom(mailPersonalFrom: string): void {
    this.mailPersonalFrom = mailPersonalFrom;
  }

  getDocumentPathDigitalizacion(): string {
    return this.documentPathDigitalizacion;
  }

  setDocumentPathDigitalizacion(path: string): void {
    this.documentPathDigitalizacion = path;
  }

}