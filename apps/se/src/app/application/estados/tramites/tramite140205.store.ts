import { Catalogo } from '@libs/shared/data-access-user/src';

import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
import { GrupoCupo, GrupoDatalleCupo, GrupoEmpresa, GrupoFolio } from '../../tramites/140205/model/cancelaciones-certificado.model';
/**
 * Interfaz que define el estado inicial del trámite 140205.
 * 
 * Esta interfaz contiene todas las propiedades necesarias para gestionar el estado
 * del trámite, incluyendo datos del productor, receptor, transporte, mercancía, entre otros.
 */
export interface Tramite140205State {
  pasoActivo?: number;
  grupoEmpresa:GrupoEmpresa;
  grupoCupo: GrupoCupo;
  grupoDatalleCupo:GrupoDatalleCupo;
  grupoFolio:GrupoFolio;
 }

/**
 * Función que crea el estado inicial del trámite 140205.
 * 
 * @returns {Tramite140205State} El estado inicial del trámite.
 */
export function createInitialState(): Tramite140205State {
  return {
    pasoActivo: 1,
    grupoEmpresa: {
      rfc: '',
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      actividadEconomica: '',
      datosRfc: '',
      clave: '',
      correo: '',
      calle: '',
      numeroExterior: '',
      numeroInterior: '',
      codigoPostal: '',
      colonia: '',
      pais: '',
      estado: '',
      localidad: '',
      telefono: '',
      municipio: '',
    } ,
    grupoCupo: {
      aduanero: '',
      mecanismo:'',
      tratado: '',
      nombreProducto: '',
      nombreSubproducto: '',
      federal: '',
    },
    grupoDatalleCupo: {
      aduanero: '', 
      clasificacionSubproducto: '',
      descripcionProducto: '',
      unidad: '',
      mecanismo: '',
      tratado: '',
      arancelarias: '',
      paises: '',
      observaciones: '',
      fundamentos: '',
      inicio: '',
      fin: '',
    },
    grupoFolio: {
      montoAsignado: '',
      montoDisponible:'',
      montoExpedido: '',
    },
    
  };
}
/**
 * Servicio para gestionar el estado del trámite 140205.
 * 
 * Este servicio utiliza Akita para manejar el estado del trámite, permitiendo
 * actualizaciones y consultas de las propiedades definidas en el estado.
 */
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite140205', resettable: true })
export class Tramite140205Store extends Store<Tramite140205State> {
  /**
 * Constructor de la clase Tramite140205Store.
 * 
 * Inicializa el estado del trámite utilizando la función `createInitialState`.
 */
  constructor() {
    super(createInitialState());
  }
  /**
   * Actualiza el paso activo en el flujo del trámite.
   *
   * Este método permite establecer el paso actual en el flujo del trámite.
   *
   * @param {number} pasoActivo - El número del paso activo a establecer.
   */
  public setPasoActivo(pasoActivo: number): void {
    this.update((state) => ({
      ...state,
      pasoActivo,
    }));
  }
  
  /**
   * Actualiza el RFC en el estado del trámite.
   *
   * Este método permite establecer el RFC en el estado del trámite.
   *
   * @param {string} rfc - El RFC a establecer.
   */
  public setGrupoEmpresaRFC(rfc: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        rfc,
      },
    }));
  }

    public setGrupoEmpresaNombre(nombre: string): void {
      this.update((state) => ({
        ...state,
        grupoEmpresa: {
          ...state.grupoEmpresa,
          nombre,
        },
      }));
}
  public setGrupoEmpresaPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        primerApellido,
      },
    }));
  }
  public setGrupoEmpresaSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        segundoApellido,
      },
    }));
  }
  public setGrupoEmpresaActividadEconomica(actividadEconomica: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        actividadEconomica,
      },
    }));
  }
  public setGrupoEmpresaDatosRfc(datosRfc: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        datosRfc,
      },
    }));
  }
  public setGrupoEmpresaClave(clave: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        clave,
      },
    }));
  }

  public setGrupoEmpresaCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        correo,
      },
    }));
  }
  public setGrupoEmpresaCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        calle,
      },
    }));
  }
  public setGrupoEmpresaNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        numeroExterior,
      },
    }));
  }
  public setGrupoEmpresaNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        numeroInterior,
      },
    }));
  }
  public setGrupoEmpresaCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        codigoPostal,
      },
    }));
  }
  public setGrupoEmpresaColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        colonia,
      },
    }));
  }
  public setGrupoEmpresaPais(pais: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        pais,
      },
    }));
  }
  public setGrupoEmpresaEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        estado,
      },
    }));
  }
  public setGrupoEmpresaLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        localidad,
      },
    }));
  }
  public setGrupoEmpresaTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        telefono,
      },
    }));
  }

  public setGrupoEmpresaMunicipio(municipio: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        municipio,
      },
    }));
  }


  public setGrupoCupoAduanero(aduanero: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        aduanero,
      },
    }));
  }
  public setGrupoCupoMecanismo(mecanismo: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        mecanismo,
      },
    }));
  }
  public setGrupoCupoTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        tratado,
      },
    }));
  }
  public setGrupoCupoNombreProducto(nombreProducto: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        nombreProducto,
      },
    }));
  }

  public setGrupoCupoNombreSubproducto(nombreSubproducto: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        nombreSubproducto,
      },
    }));
  }
  public setGrupoCupoFederal(federal: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        federal,
      },
    }));
  }

  public setGrupoDatalleCupoAduanero(aduanero: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        aduanero,
      },
    }));
  }
  public setGrupoDatalleCupoClasificacionSubproducto(clasificacionSubproducto: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        clasificacionSubproducto,
      },
    }));
  }
  public setGrupoDatalleCupoDescripcionProducto(descripcionProducto: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        descripcionProducto,
      },
    }));
  }
  public setGrupoDatalleCupoUnidad(unidad: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        unidad,
      },
    }));
  }
  public setGrupoDatalleCupoMecanismo(mecanismo: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        mecanismo,
      },
    }));
  }
  public setGrupoDatalleCupoTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        tratado,
      },
    }));
  }

  public setGrupoDatalleCupoArancelarias(arancelarias: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        arancelarias,
      },
    }));
  }
  public setGrupoDatalleCupoPaises(paises: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        paises,
      },
    }));
  }
  public setGrupoDatalleCupoObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        observaciones,
      },
    }));
  }

  public setGrupoDatalleCupoFundamentos(fundamentos: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        fundamentos,
      },
    }));
  }
  public setGrupoDatalleCupoFin(fin: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        fin,
      },
    }));
  }
  public setGrupoDatalleCupoInicio(inicio: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        inicio,
      },
    }));
  }
  public setGrupoFolioMontoAsignado(montoAsignado: string): void {
    this.update((state) => ({
      ...state,
      grupoFolio: {
        ...state.grupoFolio,
        montoAsignado,
      },
    }));
  }

  public setGrupoFolioMontoDisponible(montoDisponible: string): void {
    this.update((state) => ({
      ...state,
      grupoFolio: {
        ...state.grupoFolio,
        montoDisponible,
      },
    }));
  }
  public setGrupoFolioMontoExpedido(montoExpedido: string): void {
    this.update((state) => ({
      ...state,
      grupoFolio: {
        ...state.grupoFolio,
        montoExpedido,
      },
    }));
  }
}
