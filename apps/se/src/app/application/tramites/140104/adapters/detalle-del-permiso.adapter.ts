/**
 * @fileoverview
 * Este archivo contiene el servicio adaptador para convertir entre el estado de Akita y los formatos de payload de API
 * para el trámite de ampliación de servicios 80205.
 */
import { Cancelacion } from '../models/cancelacion-de-solicitus.model';
import { DetalleDelPermisoPayload } from '../../../shared/models/detalleDelPermiso.model';
import { Injectable } from '@angular/core';
import { Solicitud140104State } from '../estados/desistimiento-de-permiso.store';


/**
 * Interfaz que representa los detalles de la solicitud
 */
interface Solicitud {
  idSolicitud: string;
  discriminatorValue: string;
  cveRolCapturista: string;
  cveUsuarioCapturista: string;
  solicitante: {
    cveUsuario: string;
    rfc: string;
    razonSocial: string;
    descripcionGiro: string;
    correoElectronico: string;
    telefono: string;
    domicilio: {
      pais: {
        clave: string;
        nombre: string;
      };
      entidadFederativa: {
        clave: string;
        nombre: string;
      };
      delegacionMunicipio: {
        clave: string;
        nombre: string;
      };
      colonia: {
        clave: string;
        nombre: string;
      };
      localidad: {
        clave: string;
        nombre: string;
      };
      codigoPostal: string;
      calle: string;
      numeroExterior: string;
      numeroInterior: string;
    };
  };
}

interface CuerpoTablaCancelacion {
  idResolucion: string;
  numeroResolucion: string;
  regimen: string;
  clasificacionRegimen: string;
  condicionMercancia: string;
  fraccionArancelaria: string;
  unidadMedida: string;
  cantidadImportarExportar: string;
  vigenciaResolucion: string;
  valorAutorizado: string;
  inicioResolucion: string;
  numFolioTramite: string;
  valorSolicitado: string;
  cantidadImportarExportarSolicitada: string;
  general: string;
}

@Injectable({
  providedIn: 'root'
})
export class DetalleDelAdapter {
  static cuerpoTablaCancelacion: CuerpoTablaCancelacion[] = [
    {
      idResolucion: "0100001000320221005000001",
      numeroResolucion: "NR",
      regimen: "Importación",
      clasificacionRegimen: "General",
      condicionMercancia: "Nueva",
      fraccionArancelaria: "72069099",
      unidadMedida: "Kilogramo",
      cantidadImportarExportar: "1000000",
      vigenciaResolucion: "2025-12-31",
      valorAutorizado: "100000",
      inicioResolucion: "2025-01-01",
      numFolioTramite: "140105",
      valorSolicitado: "95000",
      cantidadImportarExportarSolicitada: "950000",
      general: "Sí"
    }
  ];

  /**
   * Convierte del estado de Akita al formato de payload de API usando las mismas claves
   * @param _state El estado actual de Akita (no usado en este ejemplo)
   * @returns Payload formateado para la API
   */
  static toFormPayload(_state: Solicitud140104State): DetalleDelPermisoPayload {
    const SOLICITUD: Solicitud = {
      idSolicitud: "",
      discriminatorValue: "140105",
      cveRolCapturista: "PersonaMoral",
      cveUsuarioCapturista: "AAL0409235E6",
      solicitante: {
        cveUsuario: "AAL0409235E6",
        rfc: "AAL0409235E6",
        razonSocial: "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
        descripcionGiro: "Siembra, cultivo y cosecha de otros cultivos",
        correoElectronico: "vucem2021@gmail.com",
        telefono: "55-98764532",
        domicilio: {
          pais: {
            clave: "MEX",
            nombre: "ESTADOS UNIDOS MEXICANOS"
          },
          entidadFederativa: {
            clave: "SIN",
            nombre: "SINALOA"
          },
          delegacionMunicipio: {
            clave: "25001",
            nombre: "AHOME"
          },
          colonia: {
            clave: "00181210001",
            nombre: "MIGUEL HIDALGO"
          },
          localidad: {
            clave: "00181210008",
            nombre: "LOS MOCHIS"
          },
          codigoPostal: "81210",
          calle: "CAMINO VIEJO",
          numeroExterior: "1353",
          numeroInterior: ""
        }
      }
    };

    const NUMERO_FOLIO_TRAMITE_CANCELADOS: Cancelacion[] = this.cuerpoTablaCancelacion.map((item) => ({
      idResolucion: item.idResolucion,
      numeroResolucion: item.numeroResolucion,
      regimen: item.regimen,
      clasificacionRegimen: item.clasificacionRegimen,
      condicionMercancia: item.condicionMercancia,
      fraccionArancelaria: item.fraccionArancelaria,
      unidadMedida: item.unidadMedida,
      cantidadImportarExportar: item.cantidadImportarExportar,
      vigenciaResolucion: item.vigenciaResolucion,
      valorAutorizado: item.valorAutorizado,
      inicioResolucion: item.inicioResolucion,
      numFolioTramite: item.numFolioTramite,
      valorSolicitado: item.valorSolicitado,
      cantidadImportarExportarSolicitada: item.cantidadImportarExportarSolicitada,
      general: item.general
    }));

   return {
  solicitud: SOLICITUD,
  puedeCapturarRepresentanteLegalCG: false,
  claveEntidadFederativa: "SIN",
  idTramite: "140105",
  motivoCancelacion: "API Test 2",
  numeroFolioTramiteCancelados: NUMERO_FOLIO_TRAMITE_CANCELADOS
};
  }
}