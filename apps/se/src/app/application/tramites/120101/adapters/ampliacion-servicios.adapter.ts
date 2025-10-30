import { BuscarTablaDatos, InstrumentoCupoTPL } from '../models/insumos.model';
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
      idMecanismo: data.idMecanismo ?? null,
      idCupo: data.id ?? null,
      clavefraccionArancelaria: data.clavefraccionArancelaria ?? "",
      producto: data.productoDescripcion ?? "",
      tratadoAcuerdo: data.cveTratado ?? "",
      subproducto: data.subProductoClasificacion ?? "",
      descripcionMecanismoAsignacion: data.asignacionMecanismo ?? "",
      categoriaTextil: data.categoriaTextil ?? "",
      regimen: data.regimen ?? "",
      descripcionCategoriaTextil: data.categoriaTextilDescripcion ?? "",
      paisOrigenDestino: data.paisOrigenDestino ?? "",
      descripcionUnidadMedida: data.unidad ?? "",
      fechaInicioVigenciaMecanismo: data.fechaInicioVigencia ?? "",
      fechaFinVigenciaMecanismo: data.fechaFinVigencia ?? "",
      cveRegimen: data.cveRegimenClasificacion ?? "",
      factorConversion: data.conversionFactor ?? null,
      idCategoriaTextil: data.idCategoriaTextil ?? null,
      idRegimen: "REG.01" ?? null,
      cvePais: data.cvePaisDestino ?? "",
      montoDisponible: data.montoDisponible ?? null,
      descripcionCupo: data.descripcionCupo ?? "",
      numFolioAsignacionTpl: data.numFolioAsignacionTpl ?? null,
      idAsignacion: data.idAsignacion ?? null,
      solicitarMercancia: data.solicitarMercancia ?? false,
      cveUmOficialCupo: data.cveUmOficialCupo ?? "",
      descripcionFraccion: data.descripcionFraccion ?? "",
      idFraccionHtsUsa: data.idFraccionHtsUsa ?? null,
      codCategoriaTextil: data.codCategoriaTextil ?? "",
      cveOficialCupo: data.cveOficialCupo ?? ""
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
      nombre: item.DescripcionDelInsumo || "",
      clave_fraccion_arancelaria: "84799018",
      pais_origen: {
        clave:  "MX"
      },
      base_insumo_empaque_pk: {
        id_solicitud: "",
        id_insumo: 100
      },
      id_regimen: "REG.01",
      id_fraccion_hts_usa: 1
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
        clasificacion_bien_final: "A",
        paisOrigenCorte: DATA.paisEnQueSeRealizoElCorte,
        paisOrigenEnsamble: DATA.paisEnQueSeRealizoElEnsamble,
        paisOrigenFibra: DATA.paisDeOrigenDeLaFibra,
        paisOrigenHilado: DATA.paisEnQueSeRealizoElHilado,
        paisOrigenHiladoTLCAN: "",
        paisOrigenTejido: DATA.paisEnQueSeRealizoElTejido || "",
        paisOrigenTejidoAForma: DATA.paisEnQueSeRealizoElTejidoAForma || "",
        paisOrigenTejidoTLCAN: DATA.paisEnQueSeRealizoElTejidoTLCAN || ""

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
      "cve_regimen": "REG.01",
      "cve_clasificacion_regimen": "01",
      "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "Juan Pérez",
        "es_persona_moral": true,
        "certificado_serial_number": "SN123456789",
        "domicilio": {
          "pais": "México",
          "codigo_postal": "06700",
          "estado": "Ciudad de México",
          "municipio_alcaldia": "Cuauhtémoc",
          "localidad": "Centro",
          "colonia": "Roma Norte",
          "calle": "Av. Insurgentes Sur",
          "numero_exterior": "123",
          "numero_interior": "Piso 5, Oficina A",
          "lada": "55",
          "telefono": "1234567890",
          "entidad_federativa": {
            "cveEntidad": "BCS",
            "nombre": "Ciudad de México",
            "codEntidadIdc": "CDMX",
            "cvePais": "MEX",
            "fechaCaptura": "2025-06-09",
            "fechaInicioVigencia": "2025-06-01",
            "fechaFinVigencia": "2025-12-31",
            "activo": true,
            "pais": "México",
            "claveEnIDC": "CDMX09"
          }
        }
      },
      "detalle_instrumento_cupo_tpl":{...MAPPEDDETALLEINSTRUMENTOCUPOTPL[0]},
      "unidad_administrativa_representacion_federal": {
        "clave":DATA.representacionFederal || "1016"
      },
      "denominacion_exposicion": "Expo Example",
      "entidad_federativa": {
        "clave": DATA.estado || ""
      },
      "insumos": [
        ...LISTINSUMOSTPL
      ],
      "solicitud": {...PROCESOSPRODUCTIVOS}
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
  mappedBuscarPayloadDatos(data: any): InstrumentoCupoTPL {

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
   * Mapea una lista de objetos de entrada a una nueva estructura de objetos con propiedades específicas.
   *
   * @param items - Arreglo de objetos de entrada que contienen los datos a transformar.
   * @returns Un nuevo arreglo de objetos, cada uno con las propiedades mapeadas según la estructura requerida para la tabla de datos.
   */
  mapBuscarTablaDatosList(items: any[]): any[] {
    return items.map(item => ({
      idMecanismo: item.idMecanismo,
      id: item.idCupo,
      cveTratado: item.tratadoAcuerdo,
      cveRegimenClasificacion: item.cveRegimen,
      cvePaisDestino: item.cvePais,
      fraccionArancelaria: item.clavefraccionArancelaria,
      categoriaTextilDescripcion: item.descripcionCategoriaTextil,
      productoDescripcion: item.producto,
      subProductoClasificacion: item.subproducto,
      fechaInicioVigencia: item.fechaInicioVigenciaMecanismo,
      fechaFinVigencia: item.fechaFinVigenciaMecanismo,
      montoDisponible: item.montoDisponible,
      categoriaTextil: item.codCategoriaTextil,
      asignacionMecanismo: item.descripcionMecanismoAsignacion,
      unidad: item.descripcionUnidadMedida,
      conversionFactor: item.factorConversion,
      clavefraccionArancelaria: item.clavefraccionArancelaria,
      codCategoriaTextil: item.codCategoriaTextil,
      cveOficialCupo: item.cveOficialCupo,
      cveUmOficialCupo: item.cveUmOficialCupo,
      descripcionCupo: item.descripcionCupo,
      descripcionFraccion: item.descripcionFraccion,
      idAsignacion: item.idAsignacion,
      idCategoriaTextil: item.idCategoriaTextil,
      idFraccionHtsUsa: item.idFraccionHtsUsa,
      idRegimen: item.idRegimen,
      numFolioAsignacionTpl: item.numFolioAsignacionTpl,
      paisOrigenDestino: item.paisOrigenDestino,
      regimen: item.regimen,
      solicitarMercancia: item.solicitarMercancia
    }));
  }

}