import {
  AnnexoDosTres,
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
import { Store, StoreConfig } from '@datorama/akita';
import { AnexoEncabezado } from '../../../shared/models/nuevo-programa-industrial.model';
import { Injectable } from '@angular/core';

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
  annexoDosTres: AnnexoDosTres,
  
  indicePrevioRuta: number;
}

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

  indicePrevioRuta: 0,
};

/**
 * AmpliacionServicios Store
 * @export
 * @class Tramite80102Store
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite-80102', resettable: true })
export class Tramite80102Store extends Store<Tramite80102State> {
  constructor() {
    super(INITIAL_AMPLIACION_SERVICIOS_STATE);
  }

  setInfoRegistro(infoRegistro: Servicios): void {
    this.update((state) => ({
      ...state,
      infoRegistro,
    }));
  }
  setAduanaDeIngreso(aduanaDeIngreso: Catalogo[]): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngreso,
    }));
  }
  setDatosImmex(datosImmex: Servicio[]): void {
    this.update((state) => ({
      ...state,
      datosImmex,
    }));
  }
  setDatos(datos: ServicioInmex[]): void {
    this.update((state) => ({
      ...state,
      datos,
    }));
  }

  setAduanaDeIngresoSeleccion(aduanaDeIngresoSelecion: Catalogo): void {
    this.update((state) => ({
      ...state,
      aduanaDeIngresoSelecion,
    }));
  }
  setFormValida(formaValida: { [key: string]: boolean }): void {
    this.update((state) => {
      const IS_VALID = { ...state.formaValida, ...formaValida };
      return {
        ...state,
        formaValida: IS_VALID,
      };
    });
  }
  setRfcEmpresa(rfcEmpresa: string): void {
    this.update((state) => ({
      ...state,
      rfcEmpresa,
    }));
  }
  setNumeroPrograma(numeroPrograma: string): void {
    this.update((state) => ({
      ...state,
      numeroPrograma,
    }));
  }
  setTiempoPrograma(tiempoPrograma: string): void {
    this.update((state) => ({
      ...state,
      tiempoPrograma,
    }));
  }
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

  setEmpresas(empresas: ServicioInmex[]): void {
    this.update((state) => ({
      ...state,
      empresas,
    }));
  }

  setServicios(servicios: Servicio[]): void {
    this.update((state) => ({
      ...state,
      servicios,
    }));
  }

  agregarServicio(servicio: Servicio): void {
    this.update((state) => ({
      ...state,
      servicios: [...state.servicios, servicio],
    }));
  }
  agregarEmpresa(empresa: ServicioInmex): void {
    this.update((state) => ({
      ...state,
      empresas: [...state.empresas, empresa],
    }));
  }

  setPaisesOrigen(paisesOrigen: CatalogoPaises[]): void {
    this.update((state) => ({
      ...state,
      paisesOrigen,
    }));
  }

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

  setDatosComplimentos(datosComplimentos: DatosComplimentos): void {
    this.update((state) => {
      const VALUE = { ...state.datosComplimentos, ...datosComplimentos };
      return { ...state, datosComplimentos: VALUE };
    });
  }

  setDatosSubcontratista(datosSubcontratista: DatosSubcontratista): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        datosSubcontratista: datosSubcontratista,
      },
    }));
  }

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

  setPlantasBuscadas(plantasBuscadas: PlantasSubfabricante[]): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        plantasBuscadas: plantasBuscadas,
      },
    }));
  }

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

  setPlantasPorCompletar(plantasPorCompletar: PlantasSubfabricante[]): void {
    this.update((state) => ({
      ...state,
      empressaSubFabricantePlantas: {
        ...state.empressaSubFabricantePlantas,
        plantasSubfabricantesAgregar: plantasPorCompletar,
      },
    }));
  }

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

  setAnnexoDosTableLista(anexoDosTablaLista:AnexoEncabezado[]):void{
    this.update((state) => ({
      ...state,
      annexoDosTres: {
        ...state.annexoDosTres,
        anexoDosTablaLista: anexoDosTablaLista,
      }
     
    }));
  }

  setAnnexoTresTableLista(anexoTresTablaLista:AnexoEncabezado[]):void{
    this.update((state) => ({
      ...state,
      annexoDosTres: {
        ...state.annexoDosTres,
        anexoTresTablaLista: anexoTresTablaLista,
      }
     
    }));
  }

  setindicePrevioRuta(indice: number): void {
    this.update((state) => ({
      ...state,
      indicePrevioRuta: indice,
    }));
  }

}
