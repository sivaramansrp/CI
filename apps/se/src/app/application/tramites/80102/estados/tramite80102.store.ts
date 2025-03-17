import { Catalogo, CatalogoPaises } from '@ng-mf/data-access-user';
import {
  DatosEmpresaExtranjera,
  Servicio,
  ServicioInmex,
  Servicios,
} from '../models/autorizacion-programa-nuevo.model';
import { DatosSubcontratista, PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { Store, StoreConfig } from '@datorama/akita';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { Injectable } from '@angular/core';

export interface AmpliacionServiciosState {
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

 datosSubcontratista:DatosSubcontratista;
  plantasBuscadas:PlantasSubfabricante[],
  plantasSubfabricantesAgregar:PlantasSubfabricante [],
  plantasPorCompletar:PlantasSubfabricante[],
  indicePrevioRuta:number

}

export const INITIAL_AMPLIACION_SERVICIOS_STATE: AmpliacionServiciosState = {
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
    modalidad: '',
    programaPreOperativo: '',
    datosGeneralis: {
      paginaWWeb: '',
      localizacion: '',
    },
    obligacionesFiscales: {
      opinionPositiva: '',
      fechaExpedicion: '',
      aceptarObligacionFiscal: '',
    },
    formaModificaciones: {
      nombreDelFederatario: '',
      nombreDeNotaria: '',
      estado: '',
      nombreDeActa: '',
      fechaDeActa: '',
      rfc: '',
      nombreDeRepresentante: '',
    },
    formaCertificacion: {
      certificada: '',
      fechaInicio: '',
      fechaVigencia: '',
    },
    formaSocioAccionistas: {
      nationalidadMaxicana: '',
      tipoDePersona: '',
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

  datosSubcontratista:{
    rfc: '',
    estado: '',
  },
    plantasBuscadas:[],
    plantasSubfabricantesAgregar: [],
    plantasPorCompletar:[],
    indicePrevioRuta:0
};

/**
 * AmpliacionServicios Store
 * @export
 * @class AmpliacionServiciosStore
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ampliacion-servicios', resettable: true })
export class AmpliacionServiciosStore extends Store<AmpliacionServiciosState> {
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
    this.update((state) => ({
      ...state,
      datosComplimentos,
    }));
  }

  setDatosSubcontratista(datosSubcontratista: { rfc: string; estado: string }): void {
    this.update((state) => ({
      ...state,
      datosSubcontratista: datosSubcontratista,
    }));
  }

  setPlantasSubfabricantesAgregar(
    plantasSubfabricantesAgregar: PlantasSubfabricante[]
  ): void {
    this.update((state) => ({
      ...state,
      plantasSubfabricantesAgregar: plantasSubfabricantesAgregar,
    }));
  }

  setPlantasBuscadas(plantasBuscadas:PlantasSubfabricante[]):void{
    this.update((state) => ({
      ...state,
      plantasBuscadas: plantasBuscadas,
    }));
  }

  eliminarPlantas(eliminarPlantas:PlantasSubfabricante[]): void {
    this.update(state => {
      const PLANTAS = [...state.plantasSubfabricantesAgregar].filter(ele => 
        !eliminarPlantas.some((plantas)=>plantas.calle===ele.calle)
      );
      return {
        ...state,
        plantasSubfabricantesAgregar: PLANTAS
      }
    })
  }

  setPlantasPorCompletar(plantasPorCompletar:PlantasSubfabricante[]):void{
    this.update((state) => ({
      ...state,
      plantasPorCompletar: plantasPorCompletar,
    }));
  }

  setindicePrevioRuta(indice:number):void{
    this.update((state) => ({
      ...state,
      indicePrevioRuta: indice,
    }));
  }
}
