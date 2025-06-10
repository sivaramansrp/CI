/**
 * Class: FirmarRequest
 * 
 * Description:
 * 
 * Modelo que representa la estructura de una solicitud de firma para un trámite específico.
 *
 * @author Miguel Arturo Rojas Hernández
 * @email marojash@desarrollo-ultrasist.com.mx
 * 
 * @created 05 de junio 2024
 * @version 1.0
 * @category Modelo de salida
 */

/** Representa un documento que se requiere firmar. */
export interface DocumentoRequeridoFirmar {
  id_documento_seleccionado: number;
  hash_documento: string;
  sello_documento: string;
}

/** Representa la solicitud para firmar un trámite. */
export interface FirmarRequest {
  id_solicitud: number;
  cadena_original: string;
  cert_serial_number: string;
  clave_usuario: string;
  fecha_firma: string;
  clave_rol: string;
  sello: string;
  fecha_fin_vigencia: string;
  documentos_requeridos: DocumentoRequeridoFirmar[];
}