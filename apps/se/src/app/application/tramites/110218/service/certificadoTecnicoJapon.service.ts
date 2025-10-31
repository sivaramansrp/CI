import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Catalogo } from '@ng-mf/data-access-user';

import { Solicitud110218State ,Tramite110218Store} from '../estados/tramites/tramite110218.store';
import { PROC_110218 } from '../servers/api.route';
import { Tramite110218Query } from '../estados/queries/tramite110218.query';

/**
 * Servicio para gestionar la información relacionada con el Certificado Técnico Japón.
 */
@Injectable({
  providedIn: 'root'
})
export class CertificadoTecnicoJaponService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar peticiones.
   * @param estado Estado global del trámite.
   */
  constructor(private http: HttpClient,private estado :Tramite110218Store, private tramite110218Query: Tramite110218Query) { }


    /**
   * Envía una petición HTTP POST al endpoint definido para guardar los datos del trámite 110203.
   * Recibe un objeto genérico como cuerpo de la solicitud.
   * Devuelve un observable con la respuesta del servidor en formato de objeto.
   */
    guardarDatosPost(body: Record<string, unknown>): Observable<Record<string, unknown>> {
      return this.http.post<Record<string, unknown>>(PROC_110218.GUARDAR, body);
    }
  /**
   * Obtiene los datos del certificado técnico Japón.
   */
  getDatosCertificado(): Observable<{ [key: string]: string | number | boolean }> {
    return this.http.get<{ [key: string]: string | number | boolean }>('assets/json/110218/certificado-tecnico-japon.json');
  }

  

  /**
   * Envía una petición HTTP POST al endpoint definido para guardar los datos del trámite 110203.
   * Recibe un objeto genérico como cuerpo de la solicitud.
   * Devuelve un observable con la respuesta del servidor en formato de objeto.
   */
  gettratados(): Observable<{ tratadoAcuerdo: string; paisBloque: string; paisdeOrigen: string; paisDestino: string; fechadeExpedicion: string; fechadeVencimiento: string }> {
    return this.http.get<{ tratadoAcuerdo: string; paisBloque: string; paisdeOrigen: string; paisDestino: string; fechadeExpedicion: string; fechadeVencimiento: string }>('assets/json/110218/tratados.json');
  }

  /**
   * Obtiene el representante legal.
   */
  getrepresentante(): Observable<{ empresa: string }> {
    return this.http.get<{ empresa: string }>('assets/json/110218/representante-legal.json');
  }
 
  /**
   * Obtiene el catálogo de unidades de medida.
   */
  getUnidadMedida():Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/110218/unidad-medida.json');
  }
  
  /**
   * Obtiene el catálogo de tipos de factura.
   */
  getTipodeFctura():Observable<Catalogo[]>{
    return this.http.get<Catalogo[]>('assets/json/110218/tipo-de-factura.json');
  }

  /**
   * Obtiene el registro actual del trámite.
   */
  obtenerRegistro(): Observable<Solicitud110218State> {
    return this.http.get<Solicitud110218State>('./assets/json/110218/datos.json');
  }

  /**
   * Actualiza el estado global del trámite con los datos proporcionados.
   * @param {Tramite110102State} registro - Los datos del registro que se actualizarán en el estado global.
   */
  actualizarRegistro(registro: Solicitud110218State): void {
    this.estado.setTramite110218State({
      ...registro
    });
  }

  /** Actualiza el estado del formulario en el store con los datos proporcionados.  
 *  Establece el régimen seleccionado desde el objeto de estado.
 *  */
  actualizarEstadoFormulario(DATOS: Solicitud110218State): void {
    this.estado.update(DATOS);
  }

/** Obtiene los datos simulados del registro de toma de muestras de mercancías  
 *  desde un archivo JSON local para el trámite 110203. */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110218State> {
    return this.http.get<Solicitud110218State>('assets/json/110203/serviciosExtraordinarios.json');
  }

  /**
   * Obtiene el estado completo de la solicitud 110218 desde el store.
   * Retorna un observable que emite los cambios en el estado de la solicitud.
   * Permite suscribirse para reaccionar ante actualizaciones del estado.
   */
    getAllState(): Observable<Solicitud110218State> {
      return this.tramite110218Query.selectTramite110218State$;
    }


    /**
     * Construye el objeto de información correspondiente a los tratados o acuerdos comerciales.
     * Toma los datos del estado de la solicitud y asigna los campos necesarios.
     * Devuelve un objeto con los valores de tratado, país, bloque, origen, destino y fechas relevantes.
     */
      buildTratados(data:Solicitud110218State): unknown {
      return {
        "tratadoAcuerdo":data.tratadoAcuerdo,
        "paisBloque": data.paisBloque,
        "pais": data.paisdeOrigen,
        "paisDestino": data.paisDestino,
        "fechaExpedicion": data.fechadeExpedicion,
        "fechaVencimiento": data.fechadeVencimiento
      };
    }
    
    /**
     * Construye el objeto con la información del destinatario a partir del estado de la solicitud.
     * Incluye datos personales, razón social y domicilio completo del destinatario.
     * Devuelve un objeto estructurado con los campos requeridos para el envío del trámite.
     */
    buildDestinatario(data:Solicitud110218State):unknown {
      return {
        "nombre": data.nombre,
        "primer_apellido": data.primerApellido,
        "segundo_apellido": data.segundoApellido,
        "numero_registro_fiscal": data.numeroderegistroFiscal,
        "razon_social": data.razonSocial,
        "domicilio": {
          "ciudad_poblacion_estado_provincia": data.ciudad,
          "calle": data.calle,
          "numero_letra": data.numeroLetra,
          "telefono": data.telefono,
          "fax": data.fax,
          "correo_electronico": data.correoElectronico,
      },
    }
    }
    
    /**
     * Construye el objeto con la información relacionada al medio de transporte.
     * Toma el valor del campo 'medio' desde el estado de la solicitud.
     * Devuelve un objeto con la clave 'medio_de_transporte' para incluir en el trámite.
     */
   buildTransporte(data: Solicitud110218State): unknown {
  return {
    "puertoEmbarque": data.puertodeEmbarque || "Aeropuerto Internacional de la Ciudad de México",
    "puertoDesembarque": data.puertodeDesembarque || "Aeropuerto de Frankfurt",
    "puertoTransito": data.puertodeTransito || "Aeropuerto de Madrid",
    "nombreEmbarcacion": data.nombredelaEmbarcacion || "Vuelo LH123",
    "numeroVuelo": data.numerodeVuelo || "LH123"
  };
}

buildRepresentanteLegal(data: Solicitud110218State): unknown {
  return {
    "representanteLegal": {
      "nombre": data.nombre || "Ana Martínez",
      "razonSocial": data.razonSocial || "Comercializadora Global S.A. de C.V.",
      "puesto": data.cargo || "Gerente de Exportaciones",
      "telefono": data.telefono || "555-9876-5432",
      "fax": data.fax || "555-4321-6789",
      "correoElectronico": data.correoElectronico || "ana.martinez@comercialglobal.com"
    }
  };
}

/**
 * Construye el objeto con la información del certificado de origen asociado a la solicitud.
 * Incluye datos como el ID, folio, fecha de emisión, país destino y país asociado.
 * Utiliza los valores del estado de la solicitud para completar los campos correspondientes.
 */
  buildCertificado(data: Solicitud110218State): unknown {
    return {
      certificado: {
        solicitud: {
          certificadoOrigen: {
            idCertificado: 1001,
            folio: 'CO-2025-001',
            fechaEmision: '2025-10-13',
            paisDestino: 'MX',
            precisa: data.precisa ?? '',
          },
        },
        paisAsociado: {
          cvePais: data.cvePais ?? '',
        }
      },
    };
  }

    
 
    
    /**
     * Construye el objeto con los datos detallados del certificado para la solicitud.
     * Incluye observaciones, precisiones, presentación y la información de las mercancías seleccionadas.
     * Devuelve un objeto estructurado con los campos necesarios para completar el certificado.
     */
      buildDatosCertificado(data: Solicitud110218State): unknown {
        return {
          "lugarRegistro": data.lugar || "Ciudad de México",
          "observaciones": data.observaciones || "Certificado válido para productos agrícolas procesados",
          "mercanciasSeleccionadas": data.tableDataDatos.map(data => {
            return {
              "numero_de_orden": data.numerodeOrden,
              "fraccion_arancelaria": data.fraccionArancelaria,
              "nombre_tecnico": data.nombreTecnico,
              "nombre_comercial": data.nombreComercial,
              "nombre_ingles": data.nombreIngles,
              "numero_de_registro": data.numeroRegistro,
            };
          })
        };
    }
  
  }