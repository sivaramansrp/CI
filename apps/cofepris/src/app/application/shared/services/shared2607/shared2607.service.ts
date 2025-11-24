import { combineLatest, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Solicitud260702Query } from '../../estados/queries/shared2607/tramites260702.query';

@Injectable({
  providedIn: 'root'
})
export class Shared2607Service {

  constructor(
     private _http: HttpClient,
     private solicitud260702Query: Solicitud260702Query,
  ) {
    // Constructor del servicio
   }

     getAllState(): Observable<Record<string, unknown>> {
       return combineLatest([
         this.solicitud260702Query.allStoreData$,
       ]).pipe(
         map(([solicitud260702Query,]) =>
           Shared2607Service.mergeStates(
              solicitud260702Query as unknown as Record<string, unknown>,
           )
         )
       );
     }

  /**
   * @description
   * Utility function to merge multiple state objects.
   * Removes duplicate keys and retains only meaningful values.
   * @param {...Record<string, any>} states - List of state objects to merge.
   * @returns {Record<string, unknown>} Merged state object.
   */
  private static mergeStates(...states: Record<string, unknown>[]): Record<string, unknown> {
    const RESULT: Record<string, unknown> = {};

    for (const STATE of states) {
      for (const [KEY, VALUE] of Object.entries(STATE)) {
        const EXISTING = RESULT[KEY];

        const IS_MEANINGFUL = VALUE !== null && VALUE !== undefined &&
          !(typeof VALUE === 'string' && VALUE.trim() === '') &&
          !(Array.isArray(VALUE) && VALUE.length === 0);

        if (!EXISTING || IS_MEANINGFUL) {
          RESULT[KEY] = VALUE;
        }
      }
    }

    return RESULT;
  }


   buildPayload(data: Record<string, unknown>, discriminatorValue: number): Record<string, unknown> {
    const ESTABLECIMIENTO = Shared2607Service.buildEstablecimiento(data);
    const DATOS_SCIAN = Shared2607Service.buildDatosScian(data);
    const MERCANCIAS = Shared2607Service.buildMercancias(data);
    const REPRESENTANTE_LEGAL = Shared2607Service.buildRepresentanteLegal(data);
    return {
       solicitante: {
        rfc: "AAL0409235E6",
        nombre: "ACEROS ALVARADO S.A. DE C.V.",
        actividadEconomica: "Fabricación de productos de hierro y acero",
        correoElectronico: "contacto@acerosalvarado.com",
        domicilio: {
            pais: "México",
            codigoPostal: "06700",
            estado: "Ciudad de México",
            municipioAlcaldia: "Cuauhtémoc",
            localidad: "Centro",
            colonia: "Roma Norte",
            calle: "Av. Insurgentes Sur",
            numeroExterior: "123",
            numeroInterior: "Piso 5, Oficina A",
            lada: "55",
            telefono: "123456"
        }
    },
    solicitud: {
        discriminatorValue: discriminatorValue,
        declaracionesSeleccionadas: true,
        regimen: "General",
        aduanaAIFA: "ALTAMIRA",
        aduanaAICM: "MEXICO",
        informacionConfidencial: true,
        tienePrioridad: false,
        tipoModalidad: null,
        numeroFolioTramiteOriginal: null,
        justificacion: null,
        observaciones: "Solicitud para importación de muestras médicas para uso personal"
    },
    establecimiento: ESTABLECIMIENTO,
    datosSCIAN: DATOS_SCIAN,
    mercancias: MERCANCIAS,
    "representanteLegal": REPRESENTANTE_LEGAL,
    "gridTerceros_TIPERS_FAB": [
        {
            "idPersonaSolicitud": "1",
            "ideTipoTercero": "TIPERS.FAB",
            "personaMoral": "1",
            "booleanExtranjero": "0",
            "booleanFisicaNoContribuyente": "0",
            "denominacion": "LABORATORIOS PISA S.A. DE C.V.",
            "razonSocial": "LABORATORIOS PISA S.A. DE C.V.",
            "rfc": "LPI950101ABC",
            "curp": "",
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "telefono": "5555123456",
            "correoElectronico": "contacto@pisa.com.mx",
            "actividadProductiva": "MANUFACTURA",
            "actividadProductivaDesc": "Fabricación de productos farmacéuticos",
            "descripcionGiro": "Laboratorio farmacéutico",
            "numeroRegistro": "REG-001-2024",
            "domicilio": {
                "calle": "Av. Industria No. 2000",
                "numeroExterior": "2000",
                "numeroInterior": "A",
                "pais": {
                    "clave": "MEX",
                    "nombre": "México"
                },
                "colonia": {
                    "clave": "001",
                    "nombre": "Industrial"
                },
                "delegacionMunicipio": {
                    "clave": "015",
                    "nombre": "Cuauhtémoc"
                },
                "localidad": {
                    "clave": "001",
                    "nombre": "Ciudad de México"
                },
                "entidadFederativa": {
                    "clave": "09",
                    "nombre": "Ciudad de México"
                },
                "informacionExtra": "Zona Industrial Norte",
                "codigoPostal": "06400",
                "descripcionColonia": "Industrial Norte"
            },
            "idSolicitud": "12345"
        }
    ],
    "gridTerceros_TIPERS_DES": [
        {
            "idPersonaSolicitud": "2",
            "ideTipoTercero": "TIPERS.DES",
            "personaMoral": "1",
            "booleanExtranjero": "0",
            "booleanFisicaNoContribuyente": "0",
            "denominacion": "DISTRIBUIDORA MEDICA S.A. DE C.V.",
            "razonSocial": "DISTRIBUIDORA MEDICA S.A. DE C.V.",
            "rfc": "DME950101ABC",
            "curp": "",
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "telefono": "5555987654",
            "correoElectronico": "contacto@distmedica.com.mx",
            "actividadProductiva": "DISTRIBUCION",
            "actividadProductivaDesc": "Distribución de productos farmacéuticos",
            "descripcionGiro": "Distribuidor autorizado",
            "numeroRegistro": "REG-DIS-002-2024",
            "domicilio": {
                "calle": "Av. Revolución",
                "numeroExterior": "1500",
                "numeroInterior": "B",
                "pais": {
                    "clave": "MEX",
                    "nombre": "México"
                },
                "colonia": {
                    "clave": "002",
                    "nombre": "San Ángel"
                },
                "delegacionMunicipio": {
                    "clave": "010",
                    "nombre": "Álvaro Obregón"
                },
                "localidad": {
                    "clave": "001",
                    "nombre": "Ciudad de México"
                },
                "entidadFederativa": {
                    "clave": "09",
                    "nombre": "Ciudad de México"
                },
                "informacionExtra": "Zona Comercial",
                "codigoPostal": "01000",
                "descripcionColonia": "San Ángel"
            },
            "idSolicitud": "12345"
        }
    ],
    "gridTerceros_TIPERS_PVD": [
        {
            "idPersonaSolicitud": "3",
            "ideTipoTercero": "TIPERS.PVD",
            "personaMoral": "1",
            "booleanExtranjero": "1",
            "booleanFisicaNoContribuyente": "0",
            "denominacion": "GLOBAL PHARMA SUPPLIERS INC.",
            "razonSocial": "GLOBAL PHARMA SUPPLIERS INC.",
            "rfc": "",
            "curp": "",
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "telefono": "+911234567890",
            "correoElectronico": "sales@globalpharma.in",
            "actividadProductiva": "PROVEEDURIA",
            "actividadProductivaDesc": "Proveedor internacional de productos farmacéuticos",
            "descripcionGiro": "Proveedor internacional",
            "numeroRegistro": "IND-REG-2024-001",
            "domicilio": {
                "calle": "Industrial Area, Sector 5",
                "numeroExterior": "Plot 45",
                "numeroInterior": "Building C",
                "pais": {
                    "clave": "IND",
                    "nombre": "India"
                },
                "colonia": {
                    "clave": "999",
                    "nombre": "Industrial Zone"
                },
                "delegacionMunicipio": {
                    "clave": "999",
                    "nombre": "Mumbai"
                },
                "localidad": {
                    "clave": "999",
                    "nombre": "Mumbai"
                },
                "entidadFederativa": {
                    "clave": "999",
                    "nombre": "Maharashtra"
                },
                "informacionExtra": "Near International Airport",
                "codigoPostal": "400001",
                "descripcionColonia": "Industrial Zone"
            },
            "idSolicitud": "12345"
        }
    ],
    "gridTerceros_TIPERS_FAC": [
        {
            "idPersonaSolicitud": "4",
            "ideTipoTercero": "TIPERS.FAC",
            "personaMoral": "1",
            "booleanExtranjero": "0",
            "booleanFisicaNoContribuyente": "0",
            "denominacion": "FACTURACION MEDICA S.A. DE C.V.",
            "razonSocial": "FACTURACION MEDICA S.A. DE C.V.",
            "rfc": "FME950101ABC",
            "curp": "",
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "telefono": "5555444333",
            "correoElectronico": "facturacion@medica.com.mx",
            "actividadProductiva": "SERVICIOS",
            "actividadProductivaDesc": "Servicios de facturación y administración",
            "descripcionGiro": "Servicios administrativos",
            "numeroRegistro": "REG-FAC-003-2024",
            "domicilio": {
                "calle": "Paseo de la Reforma",
                "numeroExterior": "500",
                "numeroInterior": "Piso 10",
                "pais": {
                    "clave": "MEX",
                    "nombre": "México"
                },
                "colonia": {
                    "clave": "003",
                    "nombre": "Juárez"
                },
                "delegacionMunicipio": {
                    "clave": "015",
                    "nombre": "Cuauhtémoc"
                },
                "localidad": {
                    "clave": "001",
                    "nombre": "Ciudad de México"
                },
                "entidadFederativa": {
                    "clave": "09",
                    "nombre": "Ciudad de México"
                },
                "informacionExtra": "Torre Corporativa",
                "codigoPostal": "06600",
                "descripcionColonia": "Juárez"
            },
            "idSolicitud": "12345"
        }
    ],
    "pagoDeDerechos": {
        "claveDeReferencia": "REF260702001",
        "cadenaPagoDependencia": "CAD260702001",
        "banco": {
            "clave": "002",
            "descripcion": "BANCO NACIONAL DE MÉXICO, S.A."
        },
        "llaveDePago": "ABC1234567",
        "fecPago": "15/10/2025",
        "impPago": "1500.00"
    }
         };
  }

  static buildEstablecimiento(data: Record<string, unknown>): Record<string, unknown> {
    return {
      "RFCResponsableSanitario": "XAXX010101000",
      "razonSocial": data['denominacion'] || "",
      "correoElectronico": data['correoElectronico'] || "",
      "domicilio": {
          "codigoPostal": data['codigopostal'] || "",
          "entidadFederativa": {
              "clave": data['estado'] || ""
          },
          "descripcionMunicipio": data['municipoyalcaldia'] || "",
          "informacionExtra": data['localidad'] || "",
          "descripcionColonia": data['colonia'] || "",
          "calle":  data['calle'] || "",
          "lada": data['lada'] || "",
          "telefono": data['telefono'] || "",
      },
      "original": "",
      "avisoFuncionamiento": true,
      "numeroLicencia": data['licenciaSanitaria'] || "",
      "aduanas": data['aduana'] || ""
    }
  }

   static buildDatosScian(data: Record<string, unknown>): {cveScian: string, descripcion: string, selected: boolean}[] {
    const NICOTABLA = data['nicoTabla'] as Array<{ [key: string]: unknown }> | undefined;
    if (!Array.isArray(NICOTABLA)) {
      return [];
    }

    return NICOTABLA.map(item => ({
      "cveScian": String(item['claveScian'] ?? ""),
      "descripcion": String(item['descripcionDelScian'] ?? ""),
      "selected": true
    }));
  }

static buildMercancias(data: Record<string, unknown>): Record<string, unknown>[] {
    const MERCANCIA_TABLA = data['mercanciaTabla'] as Array<{ [key: string]: unknown }> | undefined;
    if (!Array.isArray(MERCANCIA_TABLA)) {
      return [];
    }

    return MERCANCIA_TABLA.map(item => ({
   
          "idMercancia": "1",
            "idClasificacionProducto": item['clasificaionProductos'] as string || "",
            "nombreClasificacionProducto": "Fab. sustancias químicas básicas",
            "ideSubClasificacionProducto": "32541",
            "nombreSubClasificacionProducto": "Fab. productos farmacéuticos",
            "descDenominacionEspecifica": "Medicamentos para uso humano",
            "descDenominacionDistintiva": "Paracetamol Tabletas 500mg",
            "descripcionMercancia": "Acetaminophen",
            "formaFarmaceuticaDescripcionOtros": "Tableta",
            "estadoFisicoDescripcionOtros": "Sólido",
            "fraccionArancelaria": {
                "clave":item['fraccionArancelaria'] as string || "",
                "descripcion": "Los demás medicamentos constituidos por productos mezclados"
            },
            "unidadMedidaComercial": {
                "descripcion": item['umc'] as string || ""
            },
            "cantidadUMCConComas": item['cantidadUMC'] as string || "",
            "unidadMedidaTarifa": {
                "descripcion": item['umt'] as string || ""
            },
            "cantidadUMTConComas": item['cantidadUMT'] as string || "",
            "presentacion": "Frasco x 100 tabletas",
            "registroSanitarioConComas": "COFEPRIS-REG-001-2024-SSA1",
            "nombreCortoPaisOrigen": Array.isArray(item['paisDeOrigen']) ? item['paisDeOrigen'].join(', ') : String(item['paisDeOrigen'] ?? ''),
            "nombreCortoPaisProcedencia": Array.isArray(item['paisDeProcedencia']) ? item['paisDeProcedencia'].join(', ') : String(item['paisDeProcedencia'] ?? ''),
            "tipoProductoDescripcionOtros": "Analgésico",
            "nombreCortoUsoEspecifico": "Uso humano",
            "fechaCaducidadStr": "31/12/2026",
            "numeroLote": "LOT2025001",
            "fechaSalida": "15/01/2025",
            "descripcionManejoEspecial": "Mantener en lugar fresco y seco. Proteger de la luz directa.",
            "importeFacturaUSD": "25000.00"
    }));
  }

    static buildRepresentanteLegal(data: Record<string, unknown>): Record<string, unknown> {
    return {
      "rfc": data['rfc'] || '',
      "resultadoIDC": "",
      "nombre": data['legalRazonSocial'] || '',
      "apellidoPaterno": data['apellidoPaterno'] || '',
      "apellidoMaterno": data['apellidoMaterno'] || ''
    };
  }

}
