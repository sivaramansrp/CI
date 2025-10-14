import { Injectable } from '@angular/core';
import { SolicitudDeRegistroTpl120101State } from '../../../estados/tramites/tramite120101.store';





@Injectable({
  providedIn: 'root'
})
export class AmpliacionServiciosAdapter {

  constructor() {
    // Constructor vacío
  }


  /**
   * Convierte un objeto de datos en el formato requerido para el detalle de instrumento de cupo TPL.
   *
   * @param data - Objeto de entrada que contiene los datos a transformar.
   * @returns Un objeto con las propiedades mapeadas para el detalle de instrumento de cupo TPL.
   *
   * Propiedades del objeto retornado:
   * - idMecanismoAsignacion: Identificador del mecanismo de asignación (o null si no existe).
   * - cveOficialCupo: Clave oficial del cupo (cadena vacía por defecto).
   * - cveFraccionArancelaria: Clave de fracción arancelaria (cadena vacía si no existe).
   * - idCategoriaTextil: Identificador de la categoría textil (o null si no existe).
   * - idFraccionHtsUsa: Identificador de fracción HTS USA (null por defecto).
   * - cveUmOficialCupo: Clave de unidad oficial del cupo (cadena vacía si no existe).
   * - fechaFinVigenciaMecanismo: Fecha de fin de vigencia del mecanismo (cadena vacía si no existe).
   * - montoDisponible: Monto disponible (o null si no existe).
   * - cvePais: Clave del país de destino (cadena vacía si no existe).
   * - idAsignacion: Identificador de asignación (null por defecto).
   * - solicitarMercancia: Indica si se solicita mercancía (false por defecto).
   */
  convertTodetalleInstrumentoCupoTPL(data: any): any {
    return {
      idMecanismoAsignacion: data.id ?? null,
      cveOficialCupo: "",
      cveFraccionArancelaria: data.fraccionArancelaria ?? "",
      idCategoriaTextil: data.categoriaTextil ?? null,
      idFraccionHtsUsa: null,
      cveUmOficialCupo: data.unidad ?? "",
      fechaFinVigenciaMecanismo: data.fechaFinVigencia ?? "",
      montoDisponible: data.montoDisponible ?? null,
      cvePais: data.cvePaisDestino ?? "",
      idAsignacion: null,
      solicitarMercancia: false
    };
  }

  /**
   * Mapea un arreglo de objetos `tablaInsumos` a una nueva lista de insumos con la estructura requerida por TPL.
   * 
   * @param tablaInsumos - Arreglo de insumos provenientes de la tabla, cada uno con propiedades como `FraccionArancelaria`, `PaisDeOrigen`, y `DescripcionDelInsumo`.
   * @returns Un arreglo de objetos insumo transformados, listos para ser utilizados en el proceso de ampliación de servicios.
   */
  mapTablaInsumosToListInsumosTPL(tablaInsumos: any[]): any {
    return tablaInsumos.map(item => ({
      baseInsumoEmpaquePK: {
        idSolicitud: null,
        idInsumo: null
      },
      nombre: "",
      proveedor: "",
      fabricanteProductor: "",
      rfcFabricanteProductor: "",
      claveFraccionArancelaria: item.FraccionArancelaria || "",
      idRegimen: "",
      idFraccionHtsUsa: null,
      fraccionArancelariaHTSUSAClave: "",
      importeValor: null,
      peso: null,
      volumen: null,
      paisOrigen: item.PaisDeOrigen !== "undefined" ? item.PaisDeOrigen : "",
      originario: null,
      descripcionOriginario: "",
      nombreInsumo: item.DescripcionDelInsumo || "",
      unidadMedida: "",
      originarios: []
    }));
  }

  /**
   * Mapea los datos de país de origen de diferentes etapas del proceso textil a un objeto estructurado.
   *
   * @param DATA - Objeto que contiene la información de los países en los que se realizaron distintas etapas del proceso (corte, ensamble, fibra, hilado, tejido, etc.).
   * @returns Un objeto con las propiedades correspondientes a cada etapa del proceso y su país de origen. Si algún dato no está presente, se asigna una cadena vacía.
   */
  mapPaisOrigenData(DATA: any): any {
    return {
      paisOrigenCorte: DATA.paisEnQueSeRealizoElCorte || "",
      paisOrigenEnsamble: DATA.paisEnQueSeRealizoElEnsamble || "",
      paisOrigenFibra: DATA.paisDeOrigenDeLaFibra || "",
      paisOrigenHilado: DATA.paisEnQueSeRealizoElHilado || "",
      paisOrigenHiladoTLCAN: "",
      paisOrigenTejido: DATA.paisEnQueSeRealizoElTejido || "",
      paisOrigenTejidoAForma: DATA.paisEnQueSeRealizoElTejidoAForma || ""
    };
  }

  /**
   * Genera el payload para guardar el formulario de solicitud de registro TPL 120101.
   *
   * @param state - El estado actual de la solicitud de registro TPL 120101.
   * @returns Un objeto con la estructura requerida para el envío del formulario, incluyendo los datos de la solicitud,
   *          detalle del instrumento de cupo TPL, entidad federativa, lista de insumos TPL y procesos productivos.
   */
  toFormGuardarPayload(state: SolicitudDeRegistroTpl120101State): any {
    const DATA = state as any;
    const MAPPEDDETALLEINSTRUMENTOCUPOTPL = DATA['cuerpoTabla'].map((item: any) => this.convertTodetalleInstrumentoCupoTPL(item));
    const LISTINSUMOSTPL = this.mapTablaInsumosToListInsumosTPL(DATA['tablaInsumos'] || []);
    const PROCESOSPRODUCTIVOS = this.mapPaisOrigenData(DATA);

    const PAYLOAD = {
      "solicitud": {

        "idSolicitud": null,

        "clavePais": "",

        "denominacionExposicion": "",

        "clasificacionBienFinal": "",
        ...PROCESOSPRODUCTIVOS,
        "cupoTpl": {

          "detalleInstrumentoCupoTPL": { ...MAPPEDDETALLEINSTRUMENTOCUPOTPL[0] },

          "entidadFederativa": {

            "idFederativa": null,

            "nombreFederativa": ""

          }

        },

        "listInsumosTPL": [...LISTINSUMOSTPL],

        "listProcesosProductivos": [{ ...PROCESOSPRODUCTIVOS }]

      }
    }

    return PAYLOAD;

  }


  /**
   * Mapea los datos de entrada a un objeto con las propiedades requeridas para el trámite de ampliación de servicios.
   *
   * @param data - Objeto de entrada que contiene la información a transformar.
   * @returns Un objeto con las siguientes propiedades:
   * - idTratadoAcuerdo: Identificador del tratado o acuerdo (string).
   * - claveRegimen: Clave del régimen de clasificación (string).
   * - clavePais: Clave del país (string).
   * - cveFraccion: Clave de la fracción arancelaria (string).
   * - descripcionFraccion: Descripción de la fracción (string).
   * - idFraccionHtsUsa: Identificador de la fracción HTS USA (string).
   */
  mappedBuscarDatos(data: any): any {

    return {
      idTratadoAcuerdo: data.tratado ?? "",
      claveRegimen: data.clasificacion ?? "",
      clavePais: data.pais ?? "",
      cveFraccion: data.fraccionArancelaria ?? "",
      descripcionFraccion: data.fraccion ?? "",
      idFraccionHtsUsa: data.idFraccionHtsUsa ?? ""
    };


  }

  /**
   * Genera el payload necesario para la búsqueda de una solicitud de registro tipo 120101.
   *
   * @param state El estado actual de la solicitud de registro (`SolicitudDeRegistroTpl120101State`).
   * @returns Un objeto con la estructura requerida para realizar la búsqueda, incluyendo datos del solicitante,
   *          domicilio, información del trámite y parámetros adicionales.
   */
  toFormBuscarPayload(state: SolicitudDeRegistroTpl120101State): any {
    const DATA = state as any;
    const BUSCARDATOS = this.mappedBuscarDatos(DATA);
    const PAYLOAD = {
      "solicitud": {
        "solicitante": {
          "domicilio": {
            "pais": "",
            "entidadFederativa": "",
            "delegacionMunicipio": "",
            "colonia": "",
            "localidad": "",
            "codigoPostal": "81210",
            "calle": "CAMINO VIEJO",
            "numeroExterior": "1353",
            "numeroInterior": ""
          },
          "rfc": "AAL0409235E6",
          "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
          "descripcionGiro": "Siembra, cultivo y cosecha de otros cultivos",
          "correoElectronico": "vucem2021@gmail.com",
          "telefono": "55-98764532",
          "cveUsuario": "AAL0409235E6"
        },
        "cveRolCapturista": "PersonaMoral",
        "cveUsuarioCapturista": "AAL0409235E6",
        ...BUSCARDATOS,
        "idSolicitud": "",
        "tramite": {
          "numFolioTramite": ""
        }
      },
      "puedeCapturarRepresentanteLegalCG": false,
      "buscarInstrumentos": "Buscar",
      "idMecanismoAsignacion": 0,
      "cveFraccionArancelaria": "",
      "paisOrigenDestino": "",
      "idCategoriaTextil": "",
      "descripcionHTSUSA": "Selecciona un valorSelecciona un valor",
      "idHtsUsa": "",
      "parametrosBP": {
        "idSolicitud": ""
      }
    }
    return PAYLOAD;

  }

}