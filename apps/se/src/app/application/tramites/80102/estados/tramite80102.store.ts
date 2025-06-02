import {
  AnexoDosEncabezado,
  AnexoEncabezado,

  AnexoUnoEncabezado,
} from '../../../shared/models/nuevo-programa-industrial.model';
import {
  AnnexoDosTres,
  AnnexoUno,
  DatosEmpresaExtranjera,
  Servicio,
  ServicioInmex,
  Servicios,
} from '../models/autorizacion-programa-nuevo.model';
import { Catalogo, CatalogoPaises } from '@libs/shared/data-access-user/src';
import {
  DatosComplimentos,
  SociaoAccionistas,
} from '../../../shared/models/complimentos.model';
import {
  DatosSubcontratista,
  EmpressaSubFabricantePlantas,
  PlantasSubfabricante,
} from '../../../shared/models/empresas-subfabricanta.model';
import { FederatariosEncabezado, PlantasDisponibles, PlantasImmex } from '../../../shared/models/federatarios-y-plantas.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * @file tramite80102.store.ts
 * @description Este archivo contiene la definición del estado y las funciones relacionadas con el manejo del estado 
 * para el trámite 80102 en la aplicación. Utiliza Akita para la gestión del estado.
 * 
 */
/**
 * @interface Tramite80102State
 * @description Define la estructura del estado para el trámite 80102.
 * 
 * @property {Servicios} infoRegistro - Información del registro del trámite.
 * @property {Catalogo[]} aduanaDeIngreso - Lista de aduanas de ingreso.
 * @property {Servicio[]} datosImmex - Datos relacionados con IMMEX.
 * @property {ServicioInmex[]} datos - Datos generales del trámite.
 * @property {Catalogo} aduanaDeIngresoSelecion - Aduana seleccionada.
 * @property {{ [key: string]: boolean }} formaValida - Validación de formularios.
 * @property {ServicioInmex[]} empresas - Lista de empresas.
 * @property {Servicio[]} servicios - Lista de servicios.
 * @property {string} rfcEmpresa - RFC de la empresa.
 * @property {string} numeroPrograma - Número del programa.
 * @property {string} tiempoPrograma - Tiempo del programa.
 * @property {CatalogoPaises[]} paisesOrigen - Lista de países de origen.
 * @property {DatosEmpresaExtranjera[]} datosEmpresaExtranjera - Datos de empresas extranjeras.
 * @property {DatosEmpresaExtranjera} formaEmpresaExtranjera - Datos del formulario de empresas extranjeras.
 @property {DatosComplimentos} datosComplimentos - Datos de complementos.
 * @property {SociaoAccionistas[]} tablaDatosComplimentos - Tabla de datos de socios o accionistas.
 * @property {SociaoAccionistas[]} tablaDatosComplimentosExtranjera - Tabla de datos de socios o accionistas extranjeros.
 * @property {EmpressaSubFabricantePlantas} empressaSubFabricantePlantas - Datos de subfabricantes.
 * @property {AnnexoDosTres} annexoDosTres - Datos de los anexos dos y tres.
 * @property {AnnexoUno} annexoUno - Datos del anexo uno.
 * @property {number} indicePrevioRuta - Índice previo de la ruta.
 * @property {FederatariosEncabezado[]} tablaDatosFederatarios - Tabla de datos de fedatarios.
 */
export interface Tramite80102State {
  infoRegistro: Servicios;
  aduanaDeIngreso: Catalogo[];
  datosImmex: Servicio[];
  datos: ServicioInmex[];
  aduanaDeIngresoSelecion: Catalogo;
  formaValida: { [key: string]: boolean };
  empresas: ServicioInmex[];
  servicios: Servicio[];
  rfcEmpresa: string;
  numeroPrograma: string;
  tiempoPrograma: string;
  paisesOrigen: CatalogoPaises[];
  datosEmpresaExtranjera: DatosEmpresaExtranjera[];
  formaEmpresaExtranjera: DatosEmpresaExtranjera;

  datosComplimentos: DatosComplimentos;

  tablaDatosComplimentos: SociaoAccionistas[];
  tablaDatosComplimentosExtranjera: SociaoAccionistas[];

  empressaSubFabricantePlantas: EmpressaSubFabricantePlantas;
  annexoDosTres: AnnexoDosTres;
  annexoUno: AnnexoUno;

  indicePrevioRuta: number;
  tablaDatosFederatarios: FederatariosEncabezado[];
  plantasImmexTablaLista: PlantasImmex[];
  plantasDisponiblesTablaLista: PlantasDisponibles[];
}

/**
 * @const {Tramite80102State} INITIAL_AMPLIACION_SERVICIOS_STATE
 * @description Estado inicial para el trámite 80102 relacionado con la ampliación de servicios.
 * 
 * @property {Object} infoRegistro - Información del registro inicial.
 * @property {string} infoRegistro.seleccionaLaModalidad - Modalidad seleccionada.
 * @property {string} infoRegistro.folio - Folio del trámite.
 * @property {string} infoRegistro.ano - Año del trámite.
 * 
 * @property {Array} empresas - Lista de empresas asociadas.
 * @property {Array} servicios - Lista de servicios disponibles.
 * @property {Array} aduanaDeIngreso - Lista de aduanas de ingreso.
 * @property {Array} datosImmex - Datos relacionados con IMMEX.
 * @property {Array} datos - Datos generales del trámite.
 * 
 * @property {Object} aduanaDeIngresoSelecion - Aduana de ingreso seleccionada.
 * @property {number} aduanaDeIngresoSelecion.id - ID de la aduana seleccionada.
 * @property {string} aduanaDeIngresoSelecion.descripcion - Descripción de la aduana seleccionada.
 * 
 * @property {Object} formaValida - Validación de formularios.
 * @property {boolean} formaValida.complimentos - Validación de cumplimientos.
 * @property {boolean} formaValida.servicios - Validación de servicios.
 * @property {boolean} formaValida.submanufacturas - Validación de submanufacturas.
 * 
 * @property {string} rfcEmpresa - RFC de la empresa.
 * @property {string} numeroPrograma - Número del programa.
 * @property {string} tiempoPrograma - Tiempo del programa.
 * 
 * @property {Array} paisesOrigen - Lista de países de origen.
 * @property {Array} datosEmpresaExtranjera - Datos de empresas extranjeras.
 * 
 * @property {Object} formaEmpresaExtranjera - Información de la empresa extranjera.
 * @property {string} formaEmpresaExtranjera.id - ID de la empresa extranjera.
 * @property {string} formaEmpresaExtranjera.taxIdEmpresaExt - Tax ID de la empresa extranjera.
 * @property {string} formaEmpresaExtranjera.entidadFederativaEmpresaExt - Entidad federativa de la empresa extranjera.
 * @property {string} formaEmpresaExtranjera.nombreEmpresaExt - Nombre de la empresa extranjera.
 * @property {string} formaEmpresaExtranjera.direccionEmpresaExtranjera - Dirección de la empresa extranjera.
 * 
 * @property {Object} datosComplimentos - Datos relacionados con cumplimientos.
 * @property {string} datosComplimentos.modalidad - Modalidad del trámite.
 * @property {string} datosComplimentos.programaPreOperativo - Programa pre-operativo.
 * @property {Object} datosComplimentos.datosGeneralis - Datos generales.
 * @property {string} datosComplimentos.datosGeneralis.paginaWWeb - Página web.
 * @property {string} datosComplimentos.datosGeneralis.localizacion - Localización.
 * @property {Object} datosComplimentos.obligacionesFiscales - Obligaciones fiscales.
 * @property {string} datosComplimentos.obligacionesFiscales.opinionPositiva - Opinión positiva.
 * @property {string} datosComplimentos.obligacionesFiscales.fechaExpedicion - Fecha de expedición.
 * @property {string} datosComplimentos.obligacionesFiscales.aceptarObligacionFiscal - Aceptación de obligación fiscal.
 * @property {Object} datosComplimentos.formaModificaciones - Modificaciones del trámite.
 * @property {string} datosComplimentos.formaModificaciones.nombreDelFederatario - Nombre del federatario.
 * @property {string} datosComplimentos.formaModificaciones.nombreDeNotaria - Nombre de la notaría.
 * @property {string} datosComplimentos.formaModificaciones.estado - Estado.
 * @property {string} datosComplimentos.formaModificaciones.nombreDeActa - Nombre del acta.
 * @property {string} datosComplimentos.formaModificaciones.fechaDeActa - Fecha del acta.
 * @property {string} datosComplimentos.formaModificaciones.rfc - RFC.
 * @property {string} datosComplimentos.formaModificaciones.nombreDeRepresentante - Nombre del representante.
 * @property {Object} datosComplimentos.formaCertificacion - Información de certificación.
 * @property {string} datosComplimentos.formaCertificacion.certificada - Estado de certificación.
 * @property {string} datosComplimentos.formaCertificacion.fechaInicio - Fecha de inicio.
 * @property {string} datosComplimentos.formaCertificacion.fechaVigencia - Fecha de vigencia.
 * @property {Object} datosComplimentos.formaSocioAccionistas - Información de socios o accionistas.
 * @property {string} datosComplimentos.formaSocioAccionistas.nationalidadMaxicana - Nacionalidad mexicana.
 * @property {string} datosComplimentos.formaSocioAccionistas.tipoDePersona - Tipo de persona.
 * @property {Object} datosComplimentos.formaSocioAccionistas.formaDatos - Datos del socio o accionista.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.rfc - RFC.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.taxId - Tax ID.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.razonSocial - Razón social.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.pais - País.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.codigoPostal - Código postal.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.estado - Estado.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.correoElectronico - Correo electrónico.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.nombre - Nombre.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.apellidoPaterno - Apellido paterno.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.apellidoMaterno - Apellido materno.
 * @property {string} datosComplimentos.formaSocioAccionistas.formaDatos.cp - Código postal.
 * 
 * @property {Object} empressaSubFabricantePlantas - Información de subfabricantes y plantas.
 * @property {Object} empressaSubFabricantePlantas.datosSubcontratista - Datos del subcontratista.
 * @property {string} empressaSubFabricantePlantas.datosSubcontratista.rfc - RFC del subcontratista.
 * @property {string} empressaSubFabricantePlantas.datosSubcontratista.estado - Estado del subcontratista.
 * @property {Array} empressaSubFabricantePlantas.plantasBuscadas - Plantas buscadas.
 * @property {Array} empressaSubFabricantePlantas.plantasSubfabricantesAgregar - Plantas de subfabricantes a agregar.
 * @property {Array} empressaSubFabricantePlantas.plantasPorCompletar - Plantas por completar.
 * 
 * @property {Object} annexoDosTres - Información de anexos dos y tres.
 * @property {Array} annexoDosTres.anexoDosTablaLista - Lista de datos del anexo dos.
 * @property {Array} annexoDosTres.anexoTresTablaLista - Lista de datos del anexo tres.
 * 
 * @property {Array} tablaDatosComplimentos - Tabla de datos de cumplimientos.
 * @property {Array} tablaDatosComplimentosExtranjera - Tabla de datos de cumplimientos extranjeros.
 * 
 * @property {Object} annexoUno - Información del anexo uno.
 * @property {Array} annexoUno.exportarDatosTabla - Datos para exportar en el anexo uno.
 * @property {Array} annexoUno.importarDatosTabla - Datos para importar en el anexo uno.
 * @property {Object} annexoUno.datosParaNavegar - Datos para navegación en el anexo uno.
 * @property {string} annexoUno.datosParaNavegar.encabezadoFraccion - Encabezado de fracción.
 * @property {string} annexoUno.datosParaNavegar.encabezadoDescripcionComercial - Descripción comercial.
 * @property {boolean} annexoUno.datosParaNavegar.estatus - Estatus.
 * @property {string} annexoUno.datosParaNavegar.encabezadoFraccionArancelaria - Fracción arancelaria.
 * @property {string} annexoUno.datosParaNavegar.encabezadoAnexoII - Encabezado del anexo II.
 * @property {string} annexoUno.datosParaNavegar.encabezadoTipo - Tipo.
 * @property {string} annexoUno.datosParaNavegar.encabezadoUmt - Unidad de medida.
 * @property {string} annexoUno.datosParaNavegar.encabezadoCategoria - Categoría.
 * @property {string} annexoUno.datosParaNavegar.encabezadoValorEnMercado - Valor en el mercado.
 * @property {string} annexoUno.seccionActiva - Sección activa del anexo uno.
 * 
 * @property {number} indicePrevioRuta - Índice previo de la ruta.
 * 
 * @property {Array} tablaDatosFederatarios - Tabla de datos de federatarios.
 */
export const INITIAL_AMPLIACION_SERVICIOS_STATE: Tramite80102State = {
  infoRegistro: {
    seleccionaLaModalidad: '',
    folio: '',
    ano: '',
  },
  empresas: [],
  servicios: [],
  aduanaDeIngreso: [],
  datosImmex: [],
  datos: [],
  aduanaDeIngresoSelecion: {
    id: -1,
    descripcion: '',
  },
  formaValida: {
    complimentos: false,
    servicios: false,
    submanufacturas: false,
  },
  rfcEmpresa: '',
  numeroPrograma: '',
  tiempoPrograma: '',
  paisesOrigen: [],
  datosEmpresaExtranjera: [],
  formaEmpresaExtranjera: {
    id: '',
    taxIdEmpresaExt: '',
    entidadFederativaEmpresaExt: '',
    nombreEmpresaExt: '',
    direccionEmpresaExtranjera: '',
  },
  datosComplimentos: {
    modalidad: 'Servicios',
    programaPreOperativo: '',
    datosGeneralis: {
      paginaWWeb: '',
      localizacion: '',
    },
    obligacionesFiscales: {
      opinionPositiva: 'Si',
      fechaExpedicion: '2025-03-15',
      aceptarObligacionFiscal: '',
    },
    formaModificaciones: {
      nombreDelFederatario: '',
      nombreDeNotaria: '',
      estado: '',
      nombreDeActa: '',
      fechaDeActa: '2025-01-20',
      rfc: '',
      nombreDeRepresentante: 'Maria Lopez',
    },
    formaCertificacion: {
      certificada: 'No',
      fechaInicio: '',
      fechaVigencia: '',
    },
    formaSocioAccionistas: {
      nationalidadMaxicana: 'false',
      tipoDePersona: 'false',
      formaDatos: {
        rfc: '',
        taxId: '',
        razonSocial: '',
        pais: '',
        codigoPostal: '',
        estado: '',
        correoElectronico: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        cp: '',
      },
    },
  },

  empressaSubFabricantePlantas: {
    datosSubcontratista: {
      rfc: '',
      estado: '',
    },
    plantasBuscadas: [],
    plantasSubfabricantesAgregar: [],
    plantasPorCompletar: [],
  },
  annexoDosTres: {
    anexoDosTablaLista: [],
    anexoTresTablaLista: [],
  },

  tablaDatosComplimentos: [],
  tablaDatosComplimentosExtranjera: [],

  annexoUno: {
    exportarDatosTabla: [],
    importarDatosTabla: [],
    datosParaNavegar: {
      encabezadoFraccion: '',
      encabezadoDescripcionComercial: '',
      estatus: false,
      encabezadoFraccionArancelaria: '',
      encabezadoAnexoII: '',
      encabezadoTipo: '',
      encabezadoUmt: '',
      encabezadoCategoria: '',
      encabezadoValorEnMercado: '',
    },
    seccionActiva: '',
  },

  indicePrevioRuta: 0,

  tablaDatosFederatarios: [],
  plantasImmexTablaLista: [],
  plantasDisponiblesTablaLista: [],
};


@Injectable({ providedIn: 'root' })

@StoreConfig({ name: 'tramite-80102', resettable: true })

/**
 * @class Tramite80102Store
 * @description Clase que representa el store para el trámite 80102.
 * 
 * @extends {Store<Tramite80102State>}
 * @property {Tramite80102State} state - Estado del store.
 * 
 * @constructor
 */
export class Tramite80102Store extends Store<Tramite80102State> {
  constructor() {
    super(INITIAL_AMPLIACION_SERVICIOS_STATE);
  }

  /**
   * @method setInfoRegistro
   * @description Actualiza la información del registro en el estado.
   * 
   * @param {Servicios} infoRegistro - Información del registro a actualizar.
   */
  setInfoRegistro(infoRegistro: Servicios): void {
    this.update((state) => ({
      ...state,
      infoRegistro,
    }));
  }

  /**
   * @method setAduanaDeIngreso
   * @description Actualiza la lista de aduanas de ingreso en el estado.
   * 
   * @param {Catalogo[]} aduanaDeIngreso - Lista de aduanas de ingreso a actualizar.
   */
  setAduanaDeIngreso(aduanaDeIngreso: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngreso,
    }));
  }
  /**
   * @method setDatosImmex
   * @description Actualiza la lista de datos IMMEX en el estado.
   * 
   * @param {Servicio[]} datosImmex - Lista de datos IMMEX a actualizar.
   */
  setDatosImmex(datosImmex: Servicio[]): void {
    this.update((state) => ({
      ...state,
      datosImmex,
    }));
  }

  /**
   * @method setDatos
   * @description Actualiza la lista de datos en el estado.
   * 
   * @param {ServicioInmex[]} datos - Lista de datos a actualizar.
   */
  setDatos(datos: ServicioInmex[]): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  /**
   * @method setAduanaDeIngresoSeleccion
   * @description Actualiza la aduana de ingreso seleccionada en el estado.
   * 
   * @param {Catalogo} aduanaDeIngresoSelecion - Aduana de ingreso seleccionada a actualizar.
   */
  setAduanaDeIngresoSeleccion(aduanaDeIngresoSelecion: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngresoSelecion,
    }));
  }

  /**
   * @method setFormaValida
   * @description Actualiza la validación de formularios en el estado.
   * 
   * @param {Object} formaValida - Objeto con las validaciones a actualizar.
   */
  setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }

  /**
   * @method setRfcEmpresa
   * @description Actualiza el RFC de la empresa en el estado.
   * 
   * @param {string} rfcEmpresa - RFC de la empresa a actualizar.
   */
  setRfcEmpresa(rfcEmpresa: string): void {
    this.update((state) => ({
      ...state,
      rfcEmpresa,
    }));
  }

  /**
   * @method setNumeroPrograma
   * @description Actualiza el número de programa en el estado.
   * 
   * @param {string} numeroPrograma - Número de programa a actualizar.
   */
  setNumeroPrograma(numeroPrograma: string): void {
    this.update((state) => ({
      ...state,
      numeroPrograma,
    }));
  }

  /**
   * @method setTiempoPrograma
   * @description Actualiza el tiempo del programa en el estado.
   * 
   * @param {string} tiempoPrograma - Tiempo del programa a actualizar.
   */
  setTiempoPrograma(tiempoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tiempoPrograma,
    }));
  }

  /**
   * @method setCamposEmpresa
   * @description Actualiza los campos de la empresa en el estado.
   * 
   * @param {string} rfcEmpresa - RFC de la empresa a actualizar.
   * @param {string} numeroPrograma - Número de programa a actualizar.
   * @param {string} tiempoPrograma - Tiempo del programa a actualizar.
   */
  setCamposEmpresa(
    rfcEmpresa: string,
    numeroPrograma: string,
    tiempoPrograma: string
  ): void {
    this.update((state) => ({
      ...state,
      rfcEmpresa,
      numeroPrograma,
      tiempoPrograma,
    }));
  }

  /**
   * @method setEmpresas
   * @description Actualiza la lista de empresas en el estado.
   * 
   * @param {ServicioInmex[]} empresas - Lista de empresas a actualizar.
   */
  setEmpresas(empresas: ServicioInmex[]): void {
    this.update((state) => ({
      ...state,
      empresas,
    }));
  }

  /**
   * @method setServicios
   * @description Actualiza la lista de servicios en el estado.
   * 
   * @param {Servicio[]} servicios - Lista de servicios a actualizar.
   */
  setServicios(servicios: Servicio[]): void {
    this.update((state) => ({
      ...state,
      servicios,
    }));
  }

  /**
   * @method setAnexoUnoEncabezado
   * @description Actualiza el encabezado del anexo uno en el estado.
   * 
   * @param {AnexoUnoEncabezado} anexoUnoEncabezado - Encabezado del anexo uno a actualizar.
   */
  agregarServicio(servicio: Servicio): void {
    this.update((state) => ({
      ...state,
      servicios: [...state.servicios, servicio],
    }));
  }

  /**
   * Agrega una nueva empresa al estado actual.
   *
   * @param empresa - Objeto de tipo `ServicioInmex` que representa la empresa a agregar.
   */
  agregarEmpresa(empresa: ServicioInmex): void {
    this.update((state) => ({
      ...state,
      empresas: [...state.empresas, empresa],
    }));
  }

  /**
   * Elimina una empresa del estado actual.
   *
   * @param empresa - Objeto de tipo `ServicioInmex` que representa la empresa a eliminar.
   */
  setPaisesOrigen(paisesOrigen: CatalogoPaises[]): void {
    this.update((state) => ({
      ...state,
      paisesOrigen,
    }));
  }
  
  /**
   * @method agregarDdatosEmpresaExtranjera
   * @description Agrega una nueva empresa extranjera al estado actual.
   * 
   * @param {DatosEmpresaExtranjera} datosEmpresaExtranjera - Objeto que representa los datos de la empresa extranjera a agregar.
   */
  agregarDdatosEmpresaExtranjera(
    datosEmpresaExtranjera: DatosEmpresaExtranjera
  ): void {
    this.update((state) => {
      const DATOS = {
        ...datosEmpresaExtranjera,
        id: crypto.randomUUID().toString(),
      };

      return {
        ...state,
        datosEmpresaExtranjera: [...state.datosEmpresaExtranjera, DATOS],
      };
    });
  }

  /**
   * Elimina datos de la empresa extranjera del estado actual.
   *
   * @param datosEmpresaExtranjera - Una lista de objetos `DatosEmpresaExtranjera` que se deben eliminar del estado.
   *
   * Este método actualiza el estado eliminando los elementos de `datosEmpresaExtranjera` que coincidan con los `id` 
   * proporcionados en el parámetro. Los datos restantes se asignan nuevamente al estado.
   */
  eliminarDatosEmpresaExtranjera(
    datosEmpresaExtranjera: DatosEmpresaExtranjera[]
  ): void {
    this.update((state) => {
      const DOMICILIOS = [...state.datosEmpresaExtranjera].filter((ele) =>
        datosEmpresaExtranjera.some((datos) => ele.id !== datos.id)
      );
      return {
        ...state,
        datosEmpresaExtranjera: DOMICILIOS,
      };
    });
  }

  
  /**
   * @method setDatosComplimentos
   * @description Actualiza el estado con los datos complementarios proporcionados.
   * Combina los datos existentes con los nuevos datos complementarios.
   * 
   * @param {DatosComplimentos} datosComplimentos - Objeto que contiene los datos complementarios a actualizar.
   * 
   * @example
   * // Ejemplo de uso:
   * const nuevosDatos = { campo1: 'valor1', campo2: 'valor2' };
   * this.setDatosComplimentos(nuevosDatos);
   */
  setDatosComplimentos(datosComplimentos: DatosComplimentos): void {
    this.update((state) => {
      const VALUE = { ...state.datosComplimentos, ...datosComplimentos };
      return { ...state, datosComplimentos: VALUE };
    });
  }

  /**
   * Establece los datos del subcontratista en el estado de la tienda.
   *
   * @param datosSubcontratista - Objeto que contiene la información del subcontratista.
   * 
   * Actualiza el estado `empressaSubFabricantePlantas` con los datos proporcionados
   * del subcontratista, manteniendo el resto de las propiedades del estado sin cambios.
   */
  setDatosSubcontratista(datosSubcontratista: DatosSubcontratista): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        datosSubcontratista: datosSubcontratista,
      },
    }));
  }

  /**
   * @method setPlantasSubfabricantesAgregar
   * @description Actualiza el estado de la tienda con una lista de plantas subfabricantes para agregar.
   * @param {PlantasSubfabricante[]} plantasSubfabricantesAgregar - Lista de plantas subfabricantes que se deben agregar.
   * @returns {void} No retorna ningún valor.
   */
  setPlantasSubfabricantesAgregar(
    plantasSubfabricantesAgregar: PlantasSubfabricante[]
  ): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        plantasSubfabricantesAgregar: plantasSubfabricantesAgregar,
      },
    }));
  }

  /**
   * @method setPlantasBuscadas
   * @description Actualiza el estado de la tienda con una lista de plantas buscadas.
   * @param {PlantasSubfabricante[]} plantasBuscadas - Lista de plantas buscadas que se deben establecer.
   * @returns {void} No retorna ningún valor.
   */
  setPlantasBuscadas(plantasBuscadas: PlantasSubfabricante[]): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        plantasBuscadas: plantasBuscadas,
      },
    }));
  }

  /**
   * @method eliminarPlantas
   * @description Elimina plantas del estado de la tienda.
   * @param {PlantasSubfabricante[]} eliminarPlantas - Lista de plantas a eliminar.
   * @returns {void} No retorna ningún valor.
   */
  eliminarPlantas(eliminarPlantas: PlantasSubfabricante[]): void {
    this.update((state) => {
      const PLANTAS = [
        ...state.empressaSubFabricantePlantas.plantasSubfabricantesAgregar,
      ].filter(
        (ele) => !eliminarPlantas.some((plantas) => plantas.calle === ele.calle)
      );
      return {
        ...state,
        empressaSubFabricantePlantas: {
          ...state.empressaSubFabricantePlantas,
          plantasSubfabricantesAgregar: PLANTAS,
        },
      };
    });
  }

  /**
   * @method setPlantasPorCompletar
   * @description Actualiza el estado de la tienda con una lista de plantas por completar.
   * @param {PlantasSubfabricante[]} plantasPorCompletar - Lista de plantas por completar que se deben establecer.
   * @returns {void} No retorna ningún valor.
   */
  setPlantasPorCompletar(plantasPorCompletar: PlantasSubfabricante[]): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        plantasSubfabricantesAgregar: plantasPorCompletar,
      },
    }));
  }

 
  
  /**
   * Agrega un nuevo elemento a la tabla de datos de complementos en el estado de la tienda.
   *
   * @param datos - Objeto que contiene la información de socios o accionistas que se agregará a la tabla.
   *
   * Este método genera un identificador único para el nuevo elemento utilizando `crypto.randomUUID()`
   * y actualiza el estado de la tienda añadiendo el nuevo elemento a la lista existente de `tablaDatosComplimentos`.
   */
  aggregarTablaDatosComplimentos(datos: SociaoAccionistas): void {
    this.update((state) => {
      const DATOS = {
        ...datos,
        id: crypto.randomUUID().toString(),
      };
      return {
        ...state,
        tablaDatosComplimentos: [...state.tablaDatosComplimentos, DATOS],
      };
    });
  }

  /**
   * Elimina elementos de la tabla `tablaDatosComplimentos` en el estado actual,
   * excluyendo aquellos que coincidan con los identificadores proporcionados en el arreglo `datos`.
   *
   * @param datos - Un arreglo de objetos `SociaoAccionistas` que contiene los elementos
   *                cuyos identificadores se utilizarán para filtrar la tabla.
   *
   */
  eliminarTablaDatosComplimentos(datos: SociaoAccionistas[]): void {
    this.update((state) => {
      const DOMICILIOS = [...state.tablaDatosComplimentos].filter((ele) =>
        datos.some((datos) => ele.id !== datos.id)
      );
      return {
        ...state,
        tablaDatosComplimentos: DOMICILIOS,
      };
    });
  }

  /**
   * Agrega un nuevo elemento a la tabla de datos de complementos extranjera.
   * 
   * @param datos - Objeto que contiene la información de socios o accionistas que se agregará a la tabla.
   * 
   * Este método actualiza el estado de la tienda añadiendo un nuevo elemento a la propiedad 
   * `tablaDatosComplimentosExtranjera`. Se genera un identificador único para el nuevo elemento 
   * utilizando `crypto.randomUUID()`.
   */
  aggregarTablaDatosComplimentosExtranjera(datos: SociaoAccionistas): void {
    this.update((state) => {
      const DATOS = {
        ...datos,
        id: crypto.randomUUID().toString(),
      };
      return {
        ...state,
        tablaDatosComplimentosExtranjera: [
          ...state.tablaDatosComplimentosExtranjera,
          DATOS,
        ],
      };
    });
  }

  /**
   * Elimina elementos de la tabla `tablaDatosComplimentosExtranjera` en el estado actual
   * que coincidan con los datos proporcionados en el parámetro `datos`.
   *
   * @param datos - Un arreglo de objetos de tipo `SociaoAccionistas` que contiene
   *                los elementos a eliminar de la tabla.
   *
   * Este método actualiza el estado eliminando los elementos de la tabla cuyos
   * identificadores (`id`) no coincidan con los identificadores de los elementos
   * proporcionados en el parámetro `datos`.
   */
  eliminarTablaDatosComplimentosExtranjera(datos: SociaoAccionistas[]): void {
    this.update((state) => {
      const DOMICILIOS = [...state.tablaDatosComplimentosExtranjera].filter(
        (ele) => datos.some((datos) => ele.id !== datos.id)
      );
      return {
        ...state,
        tablaDatosComplimentosExtranjera: DOMICILIOS,
      };
    });
  }


  /**
   * @method setAnnexoDosTableLista
   * @description Actualiza la lista de la tabla de anexos dos en el estado de la tienda.
   * 
   * @param {AnexoEncabezado[]} anexoDosTablaLista - La nueva lista de encabezados de anexos dos que se establecerá en el estado.
   * 
   */
  setAnnexoDosTableLista(anexoDosTablaLista: AnexoEncabezado[]): void {
    this.update((state) => ({
      ...state,
      annexoDosTres: {
        ...state.annexoDosTres,
        anexoDosTablaLista: anexoDosTablaLista,
      },
    }));
  }

  /**
   * @method setAnnexoTresTableLista
   * @description Actualiza la lista de la tabla de Anexo Tres en el estado de la tienda.
   * 
   * @param {AnexoEncabezado[]} anexoTresTablaLista - La nueva lista de encabezados de Anexo Tres que se establecerá en el estado.
   * 
   * @example
   * // Ejemplo de uso:
   * const nuevaLista: AnexoEncabezado[] = [...];
   * this.setAnnexoTresTableLista(nuevaLista);
   */
  setAnnexoTresTableLista(anexoTresTablaLista: AnexoEncabezado[]): void {
    this.update((state) => ({
      ...state,
      annexoDosTres: {
        ...state.annexoDosTres,
        anexoTresTablaLista: anexoTresTablaLista,
      },
    }));
  }

  

  /**
   * @method setImportarDatosTabla
   * @description Actualiza el estado de la aplicación con los datos proporcionados para la tabla de importación.
   * @param {AnexoUnoEncabezado[]} importarDatosTabla - Arreglo de encabezados de Anexo Uno que se utilizarán para actualizar la tabla de importación.
   * @returns {void} No retorna ningún valor.
   */
  setImportarDatosTabla(importarDatosTabla: AnexoUnoEncabezado[]): void {
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        importarDatosTabla: importarDatosTabla,
      },
    }));
  }

  /**
   * @method setExportarDatosTabla
   * @description Actualiza el estado con los datos de la tabla de exportación proporcionados.
   * @param {AnexoDosEncabezado[]} exportarDatosTabla - Arreglo de encabezados de Anexo Dos que se utilizarán para exportar los datos de la tabla.
   * @returns {void} No retorna ningún valor.
   */
  setExportarDatosTabla(
    exportarDatosTabla: AnexoDosEncabezado[]
  ): void {
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        exportarDatosTabla: exportarDatosTabla,
      },
    }));
  }

  /**
   * @method setDatosParaNavegar
   * @description Establece los datos necesarios para la navegación en el estado de la aplicación.
   * 
   * @param {AnexoUnoEncabezado | AnexoDosEncabezado} datosParaNavegar 
   * Los datos que se utilizarán para la navegación. Puede ser de tipo `AnexoUnoEncabezado` o `AnexoDosEncabezado`.
   * 
   * @returns {void} 
   * Este método no devuelve ningún valor.
   */
  setDatosParaNavegar(
    datosParaNavegar: AnexoUnoEncabezado | AnexoDosEncabezado
  ): void {
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        datosParaNavegar: datosParaNavegar,
      },
    }));
  }

  /**
   * Establece el índice previo de la ruta en el estado de la tienda.
   *
   * @param indice - El índice que se debe establecer como el índice previo de la ruta.
   */
  setindicePrevioRuta(indice: number): void {
    this.update((state) => ({
      ...state,
      indicePrevioRuta: indice,
    }));
  }

  /**
   * @method setAnnexoUnoSeccionActiva
   * @description Actualiza el estado de la sección activa en el objeto `annexoUno`.
   * 
   * @param {string} seccionActiva - El identificador de la sección activa que se debe establecer.
   * 
   * @example
   * // Ejemplo de uso:
   * this.setAnnexoUnoSeccionActiva('seccion1');
   * 
   * @remarks
   * Este método utiliza la función `update` para modificar el estado actual del objeto `annexoUno`,
   * asegurando que la propiedad `seccionActiva` se actualice con el valor proporcionado.
   */
  setAnnexoUnoSeccionActiva(seccionActiva: string): void {
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        seccionActiva: seccionActiva,
      },
    }));
  }

  /**
   * @method setFederatarios
   * @description Actualiza el estado de la tienda agregando un nuevo elemento a la lista de federatarios.
   * @param {FederatariosEncabezado} formaFederatarios - Objeto que representa los datos del federatario a agregar.
   * @returns {void}
   * 
   * Este método toma un objeto de tipo `FederatariosEncabezado` y lo agrega a la lista existente 
   * de `tablaDatosFederatarios` en el estado de la tienda. Utiliza la función `update` para 
   * garantizar que el estado se actualice de manera inmutable.
   */
  setFederatarios(formaFederatarios: FederatariosEncabezado): void {
    this.update((state) => ({
      ...state,
      tablaDatosFederatarios: [...state.tablaDatosFederatarios, formaFederatarios],
    }));
  }
}
