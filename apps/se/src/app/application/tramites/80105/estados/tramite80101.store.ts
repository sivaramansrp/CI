import { AnexoEncabezado, AnexoUnoEncabezado, DatosAnexotressUno } from '../../../shared/models/nuevo-programa-industrial.model';
import { AnnexoDosTres, AnnexoUno } from '../models/nuevo-programa-industrial.model';
import { AnexoDosEncabezado } from '../../../shared/models/nuevo-programa-industrial.model';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoPaises } from '@ng-mf/data-access-user';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { DatosEmpresaExtranjera} from '../models/nuevo-programa-industrial.model';
import { DatosSubcontratista } from '../../../shared/models/empresas-subfabricanta.model';
import { DisponsibleFiscal } from '../../../shared/models/empresas.model';
import { EmpressaSubFabricantePlantas } from '../../../shared/models/empresas-subfabricanta.model';
import { FederatariosEncabezado } from '../../../shared/models/federatarios-y-plantas.model';
import { Injectable } from '@angular/core';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { Servicio } from '../models/nuevo-programa-industrial.model';
import { ServicioInmex } from '../models/nuevo-programa-industrial.model';
import { Servicios } from '../models/nuevo-programa-industrial.model';
import { SociaoAccionistas } from '../../../shared/models/complimentos.model';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';

/**
 * Representa el estado de Tramite80101 en la aplicación.
 * 
 * @interface Tramite80101State
 * 
 * @property {Servicios} infoRegistro - Información del registro de servicios.
 * @property {Catalogo[]} aduanaDeIngreso - Lista de aduanas de ingreso disponibles.
 * @property {Servicio[]} datosImmex - Datos relacionados con el programa IMMEX.
 * @property {ServicioInmex[]} datos - Información detallada de servicios IMMEX.
 * @property {Catalogo} aduanaDeIngresoSelecion - Aduana de ingreso seleccionada.
 * @property {{ [key: string]: boolean }} formaValida - Validación de formularios por clave.
 * @property {ServicioInmex[]} empresas - Lista de empresas relacionadas con IMMEX.
 * @property {Servicio[]} servicios - Lista de servicios disponibles.
 * @property {string} rfcEmpresa - RFC de la empresa.
 * @property {string} numeroPrograma - Número del programa IMMEX.
 * @property {string} tiempoPrograma - Duración del programa IMMEX.
 * @property {CatalogoPaises[]} paisesOrigen - Lista de países de origen.
 * @property {DatosEmpresaExtranjera[]} datosEmpresaExtranjera - Información de empresas extranjeras.
 * @property {DatosEmpresaExtranjera} formaEmpresaExtranjera - Detalles de la empresa extranjera seleccionada.
 * @property {DatosComplimentos} datosComplimentos - Información de complementos relacionados.
 * @property {SociaoAccionistas[]} tablaDatosComplimentos - Tabla de datos de socios accionistas nacionales.
 * @property {SociaoAccionistas[]} tablaDatosComplimentosExtranjera - Tabla de datos de socios accionistas extranjeros.
 * @property {EmpressaSubFabricantePlantas} empressaSubFabricantePlantas - Información de subfabricantes y plantas.
 * @property {AnnexoDosTres} annexoDosTres - Información del anexo dos y tres.
 * @property {AnnexoUno} annexoUno - Información del anexo uno.
 * @property {number} indicePrevioRuta - Índice previo de la ruta seleccionada.
 * @property {FederatariosEncabezado[]} tablaDatosFederatarios - Tabla de datos de fedatarios públicos.
 */
export interface Tramite80101State {
  
/** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number | null;
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

  /** Contiene los datos del primer anexo Tress. */
  datosAnexoTress: DatosAnexotressUno;
  /** Contiene los datos del segundo anexo Tress. */
  datosAnexoTressDos: DatosAnexotressUno;

  empressaSubFabricantePlantas: EmpressaSubFabricantePlantas;
  annexoDosTres: AnnexoDosTres,
  annexoUno: AnnexoUno,
  
  indicePrevioRuta: number;
  tablaDatosFederatarios: FederatariosEncabezado[]
  empresasSeleccionadas: DisponsibleFiscal[];
}

/**
 * Estado inicial para el trámite 80101 relacionado con la ampliación de servicios.
 * Este objeto define la estructura y valores predeterminados para manejar el estado
 * de la aplicación en este trámite específico.
 * 
 * Propiedades:
 * - `infoRegistro`: Contiene información básica del registro, como modalidad, folio y año.
 * - `empresas`: Lista de empresas relacionadas con el trámite.
 * - `servicios`: Servicios asociados al trámite.
 * - `aduanaDeIngreso`: Lista de aduanas de ingreso disponibles.
 * - `datosImmex`: Información relacionada con el programa IMMEX.
 * - `datos`: Datos adicionales relacionados con el trámite.
 * - `aduanaDeIngresoSelecion`: Aduana de ingreso seleccionada por el usuario.
 * - `formaValida`: Validaciones relacionadas con la forma del trámite.
 * - `rfcEmpresa`: RFC de la empresa asociada al trámite.
 * - `numeroPrograma`: Número del programa IMMEX.
 * - `tiempoPrograma`: Duración del programa IMMEX.
 * - `paisesOrigen`: Lista de países de origen relacionados con el trámite.
 * - `datosEmpresaExtranjera`: Información de empresas extranjeras relacionadas.
 * - `formaEmpresaExtranjera`: Detalles de la forma de empresa extranjera.
 * - `datosComplimentos`: Información complementaria del trámite, incluyendo modalidad,
 *   obligaciones fiscales, modificaciones, certificaciones y datos de socios o accionistas.
 * - `empressaSubFabricantePlantas`: Información sobre subfabricantes y plantas relacionadas.
 * - `annexoDosTres`: Datos relacionados con los anexos II y III.
 * - `tablaDatosComplimentos`: Tabla de datos complementarios.
 * - `tablaDatosComplimentosExtranjera`: Tabla de datos complementarios para empresas extranjeras.
 * - `annexoUno`: Información relacionada con el anexo I, incluyendo datos de exportación,
 *   importación y navegación.
 * - `indicePrevioRuta`: Índice para manejar la navegación previa en rutas.
 * - `tablaDatosFederatarios`: Tabla de datos de fedatarios públicos.
 */
export const INITIAL_AMPLIACION_SERVICIOS_STATE: Tramite80101State = {
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
    entidadFederativa: false,
    formaEmpresaExtranjera: false,
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
  datosAnexoTress:{
  fraccionArancelaria:"",
  descripcion: ""
  },
  datosAnexoTressDos:{
  fraccionArancelaria:"",
  descripcion: ""
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
  annexoDosTres:{
    anexoDosTablaLista:[],
    anexoTresTablaLista:[]
  },
  
  tablaDatosComplimentos: [],
  tablaDatosComplimentosExtranjera: [],

  annexoUno:{
    exportarDatosTabla:[],
    importarDatosTabla:[],
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
    seccionActiva:''
  },

  indicePrevioRuta: 0,
  tablaDatosFederatarios: [],
  idSolicitud: 0,
  empresasSeleccionadas: [],
};

/**
 * AmpliacionServicios Store
 * @export
 * @class Tramite80102Store
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-80102', resettable: true })
export class Tramite80101Store extends Store<Tramite80101State> {
  constructor() {
    super(INITIAL_AMPLIACION_SERVICIOS_STATE);
  }

  /**
   * Establece la información de registro en el estado de la tienda.
   *
   * @param infoRegistro - Objeto de tipo `Servicios` que contiene la información de registro a actualizar.
   */
  setInfoRegistro(infoRegistro: Servicios): void {
    this.update((state) => ({
      ...state,
      infoRegistro,
    }));
  }

  /**
   * Establece el catálogo de aduanas de ingreso en el estado de la tienda.
   * 
   * @param aduanaDeIngreso - Una lista de objetos del tipo `Catalogo` que representa las aduanas de ingreso.
   * 
   * @remarks
   * Este método actualiza el estado de la tienda con la información proporcionada
   * en el parámetro `aduanaDeIngreso`.
   */
  setAduanaDeIngreso(aduanaDeIngreso: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngreso,
    }));
  }

  /**
   * Actualiza el estado con los datos proporcionados de IMMEX.
   *
   * @param datosImmex - Una lista de objetos de tipo `Servicio` que contiene los datos de IMMEX a establecer en el estado.
   */
  setDatosImmex(datosImmex: Servicio[]): void {
    this.update((state) => ({
      ...state,
      datosImmex,
    }));
  }

  /**
   * Establece los datos en el estado de la tienda.
   * 
   * @param datos - Una lista de objetos de tipo `ServicioInmex` que se asignarán al estado.
   */
  setDatos(datos: ServicioInmex[]): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  /**
   * Establece la aduana de ingreso seleccionada en el estado de la tienda.
   *
   * @param aduanaDeIngresoSelecion - El objeto de tipo `Catalogo` que representa la aduana de ingreso seleccionada.
   */
  setAduanaDeIngresoSeleccion(aduanaDeIngresoSelecion: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngresoSelecion,
    }));
  }

  /**
   * Actualiza el estado de la validez del formulario combinando los valores existentes
   * con los nuevos valores proporcionados.
   *
   * @param formaValida - Un objeto donde las claves representan los nombres de los campos
   * y los valores son booleanos que indican si el campo es válido o no.
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
   * Establece el RFC de la empresa en el estado de la tienda.
   *
   * @param rfcEmpresa - El RFC de la empresa que se desea establecer.
   */
  setRfcEmpresa(rfcEmpresa: string): void {
    this.update((state) => ({
      ...state,
      rfcEmpresa,
    }));
  }
  /**
   * Establece el número de programa en el estado de la tienda.
   *
   * @param numeroPrograma - El número de programa que se debe asignar al estado.
   */
  setNumeroPrograma(numeroPrograma: string): void {
    this.update((state) => ({
      ...state,
      numeroPrograma,
    }));
  }
  /**
   * Establece el tiempo del programa en el estado de la tienda.
   *
   * @param tiempoPrograma - El tiempo del programa que se debe establecer.
   */
  setTiempoPrograma(tiempoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tiempoPrograma,
    }));
  }
  /**
   * Establece los campos relacionados con la empresa en el estado.
   *
   * @param rfcEmpresa - El RFC de la empresa.
   * @param numeroPrograma - El número del programa asociado.
   * @param tiempoPrograma - El tiempo asignado al programa.
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
   * Establece la lista de empresas en el estado.
   *
   * @param empresas - Arreglo de objetos de tipo `ServicioInmex` que representa las empresas a actualizar en el estado.
   */
  setEmpresas(empresas: ServicioInmex[]): void {
    this.update((state) => ({
      ...state,
      empresas,
    }));
  }

  /**
   * Establece la lista de servicios en el estado de la tienda.
   * 
   * @param servicios - Un arreglo de objetos de tipo `Servicio` que se asignará al estado.
   */
  setServicios(servicios: Servicio[]): void {
    this.update((state) => ({
      ...state,
      servicios,
    }));
  }

  /**
   * Agrega un nuevo servicio al estado actual.
   *
   * @param servicio - El objeto de tipo `Servicio` que se agregará a la lista de servicios.
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
   * Establece la lista de países de origen en el estado de la tienda.
   *
   * @param paisesOrigen - Un arreglo de objetos de tipo `CatalogoPaises` que representa los países de origen.
   */
  setPaisesOrigen(paisesOrigen: CatalogoPaises[]): void {
    this.update((state) => ({
      ...state,
      paisesOrigen,
    }));
  }

  /**
   * Agrega los datos de una empresa extranjera al estado actual.
   * 
   * @param datosEmpresaExtranjera - Objeto que contiene la información de la empresa extranjera.
   *                                Este objeto será extendido con un identificador único generado automáticamente.
   * 
   * @remarks
   * Este método utiliza la función `update` para modificar el estado actual,
   * añadiendo los datos de la nueva empresa extranjera al arreglo existente.
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
   * Elimina los datos de empresas extranjeras especificados del estado actual.
   *
   * @param datosEmpresaExtranjera - Un arreglo de objetos `DatosEmpresaExtranjera` que representan
   * los datos de las empresas extranjeras a eliminar.
   *
   * Este método actualiza el estado eliminando los elementos que coincidan con los
   * identificadores proporcionados en el arreglo `datosEmpresaExtranjera`.
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
   * Actualiza el estado con los datos complementarios proporcionados.
   *
   * @param datosComplimentos - Objeto que contiene los datos complementarios a actualizar.
   * 
   * Este método combina los datos existentes en el estado con los nuevos datos proporcionados
   * y actualiza el estado con el resultado.
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
   * Establece las plantas subfabricantes a agregar en el estado de la tienda.
   *
   * @param plantasSubfabricantesAgregar - Lista de objetos de tipo `PlantasSubfabricante` 
   * que representan las plantas subfabricantes que se deben agregar.
   * 
   * Este método actualiza el estado de la tienda añadiendo o reemplazando 
   * las plantas subfabricantes especificadas en la propiedad 
   * `empressaSubFabricantePlantas`.
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
   * Establece las plantas buscadas para el subfabricante.
   * 
   * @param plantasBuscadas - Una lista de objetos de tipo `PlantasSubfabricante` 
   * que representan las plantas buscadas.
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
   * Elimina las plantas especificadas de la lista de plantasSubfabricantesAgregar
   * en el estado de la tienda.
   *
   * @param eliminarPlantas - Un arreglo de objetos `PlantasSubfabricante` que
   * contiene las plantas a eliminar. Se identifican por la propiedad `calle`.
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
   * Establece las plantas por completar para el subfabricante.
   * 
   * @param plantasPorCompletar - Una lista de objetos de tipo `PlantasSubfabricante` 
   * que representan las plantas que deben ser agregadas.
   * 
   * Actualiza el estado de la tienda para incluir las plantas proporcionadas 
   * en la propiedad `plantasSubfabricantesAgregar` dentro de `empressaSubFabricantePlantas`.
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
   * Agrega un nuevo conjunto de datos a la tabla de complementos en el estado.
   * 
   * @param datos - Objeto que contiene la información de socios o accionistas que se agregará.
   *                Se genera un identificador único (UUID) para cada entrada.
   * 
   * @remarks
   * Este método actualiza el estado actual añadiendo un nuevo elemento a la lista
   * `tablaDatosComplimentos`. Utiliza `crypto.randomUUID()` para generar un identificador único.
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
   * Elimina elementos de la tabla `tablaDatosComplimentos` en el estado actual
   * basándose en los datos proporcionados.
   *
   * @param datos - Una lista de objetos `SociaoAccionistas` que contienen los elementos
   *                a comparar para determinar qué elementos eliminar de la tabla.
   *
   * El método filtra los elementos de `tablaDatosComplimentos` que no coinciden
   * con los identificadores (`id`) de los objetos proporcionados en el parámetro `datos`.
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
   * Agrega un nuevo registro a la tabla de datos de complementos extranjera.
   * 
   * @param datos - Objeto que contiene la información del socio o accionista que se agregará.
   *                Este objeto se extiende con un identificador único generado automáticamente.
   * 
   * @remarks
   * Este método actualiza el estado de la tienda añadiendo un nuevo elemento al arreglo
   * `tablaDatosComplimentosExtranjera`. El identificador único se genera utilizando 
   * `crypto.randomUUID()`.
   */
  aggregarTablaDatosComplimentosExtranjera(datos: SociaoAccionistas): void {
    this.update((state) => {
      const DATOS = {
        ...datos,
        id: crypto.randomUUID().toString(),
      };
      return {
        ...state,
        tablaDatosComplimentosExtranjera: [...state.tablaDatosComplimentosExtranjera, DATOS],
      };
    });
  }

  /**
   * Elimina elementos de la tabla `tablaDatosComplimentosExtranjera` en el estado actual,
   * excluyendo aquellos que coincidan con los identificadores proporcionados en el arreglo `datos`.
   *
   * @param datos - Un arreglo de objetos `SociaoAccionistas` que contiene los elementos
   *                cuyos identificadores se utilizarán para filtrar la tabla.
   */
  eliminarTablaDatosComplimentosExtranjera(datos: SociaoAccionistas[]): void {
    this.update((state) => {
      const DOMICILIOS = [...state.tablaDatosComplimentosExtranjera].filter((ele) =>
        datos.some((datos) => ele.id !== datos.id)
      );
      return {
        ...state,
        tablaDatosComplimentosExtranjera: DOMICILIOS,
      };
    });
  }

  //annexo dos y tres estados

  /**
   * Establece la lista de la tabla Anexo Dos en el estado de la tienda.
   *
   * @param anexoDosTablaLista - Un arreglo de objetos de tipo `AnexoEncabezado` que representa la nueva lista de la tabla Anexo Dos.
   * 
   * Este método actualiza el estado de la tienda para incluir la nueva lista de la tabla Anexo Dos,
   * manteniendo el resto de las propiedades del estado sin cambios.
   */
  setAnnexoDosTableLista(anexoDosTablaLista:AnexoEncabezado[]):void{
    this.update((state) => ({
      ...state,
      annexoDosTres: {
        ...state.annexoDosTres,
        anexoDosTablaLista: anexoDosTablaLista,
      }
     
    }));
  }

  /**
   * Establece la lista de la tabla Anexo Tres en el estado de la tienda.
   *
   * @param anexoTresTablaLista - Arreglo de objetos de tipo `AnexoEncabezado` que representa la nueva lista de la tabla Anexo Tres.
   */
  setAnnexoTresTableLista(anexoTresTablaLista:AnexoEncabezado[]):void{
    this.update((state) => ({
      ...state,
      annexoDosTres: {
        ...state.annexoDosTres,
        anexoTresTablaLista: anexoTresTablaLista,
      }
     
    }));
  }

  /**
   * Establece el índice previo de la ruta en el estado de la tienda.
   *
   * @param indice - El índice que se establecerá como el índice previo de la ruta.
   */
  setindicePrevioRuta(indice: number): void {
    this.update((state) => ({
      ...state,
      indicePrevioRuta: indice,
    }));
  }

  /**
   * Establece la sección activa en el estado de "annexoUno".
   *
   * @param seccionActiva - El identificador de la sección activa que se debe establecer.
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
   * Establece los datos necesarios para la navegación en el estado de la aplicación.
   * 
   * @param datosParaNavegar - Objeto que contiene los datos para navegar, 
   * puede ser de tipo `AnexoUnoEncabezado` o `AnexoDosEncabezado`.
   * 
   * @remarks
   * Este método actualiza el estado de la aplicación añadiendo o modificando 
   * los datos de navegación en el objeto `annexoUno`.
   */
  setDatosParaNavegar(datosParaNavegar:AnexoUnoEncabezado | AnexoDosEncabezado):void{
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        datosParaNavegar: datosParaNavegar,
      }
     
    }));
  }

  /**
   * Establece los datos de la tabla de importación en el estado.
   *
   * @param importarDatosTabla - Un arreglo de objetos de tipo `AnexoUnoEncabezado` que contiene los datos a importar.
   * 
   * Este método actualiza el estado del componente añadiendo o reemplazando 
   * los datos de la tabla de importación en la propiedad `annexoUno`.
   */
  setImportarDatosTabla(importarDatosTabla:AnexoUnoEncabezado[]):void{
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        importarDatosTabla: importarDatosTabla,
      }
     
    }));
  }

  /**
   * Establece los datos de la tabla para exportar y actualiza el estado correspondiente.
   *
   * @param exportarDatosTabla - Un arreglo de objetos de tipo `AnexoDosEncabezado` que contiene los datos a exportar.
   */
  setExportarDatosTabla(exportarDatosTabla:AnexoDosEncabezado[]):void{
    this.update((state) => ({
      ...state,
      annexoUno: {
        ...state.annexoUno,
        exportarDatosTabla: exportarDatosTabla,
      }
     
    }));
  }

  /**
   * Agrega un nuevo elemento de tipo `FederatariosEncabezado` a la lista `tablaDatosFederatarios` 
   * en el estado actual de la tienda.
   *
   * @param formaFederatarios - El objeto de tipo `FederatariosEncabezado` que se añadirá 
   * a la lista `tablaDatosFederatarios`.
   */
  setFederatarios(formaFederatarios: FederatariosEncabezado): void {
    this.update((state) => ({
      ...state,
      tablaDatosFederatarios: [...state.tablaDatosFederatarios, formaFederatarios],
    }));
  }

      /**
   * Actualiza la propiedad `datosAnexoTress` en el store con los datos proporcionados.
   * Fusiona el estado existente de `datosAnexoTress` con los nuevos valores recibidos.
   *
   * @param datosAnexoTress - Objeto que contiene los nuevos datos a fusionar en `datosAnexoTress`.
   */
  setDatosAnexoTres(datosAnexoTress: DatosAnexotressUno): void {
    this.update((state) => {
      const VALUE = { ...state.datosAnexoTress, ...datosAnexoTress };
      return { ...state, datosAnexoTress: VALUE };
    });
  }

  /**
   * Actualiza la propiedad `datosAnexoTressDos` en el store con los datos proporcionados.
   * Fusiona el estado existente de `datosAnexoTressDos` con los nuevos valores recibidos.
   *
   * @param datosAnexoTressDos - Objeto que contiene los nuevos datos a fusionar en `datosAnexoTressDos`.
   */
  setDatosAnexoTresDos(datosAnexoTressDos: DatosAnexotressUno): void {
    this.update((state) => {
      const VALUE = { ...state.datosAnexoTressDos, ...datosAnexoTressDos };
      return { ...state, datosAnexoTressDos: VALUE };
    });
  }
  
  /**
   * Guarda el ID de la solicitud en el estado.
   *
   * @param idSolicitud - El ID de la solicitud que se va a guardar.
   */
  public setIdSolicitud(idSolicitud: number): void {
    this.update((state) => ({
      ...state,
      idSolicitud,
    }));
  }

  /**
     * Establece la lista de empresas seleccionadas en el estado.
     * @param empresasSeleccionadas - Arreglo de empresas seleccionadas.
     */
      public setSeleccionadas(empresasSeleccionadas: DisponsibleFiscal[]):void {
        this.update((state) => ({
          ...state,
          empresasSeleccionadas,
        }));
      }
}
