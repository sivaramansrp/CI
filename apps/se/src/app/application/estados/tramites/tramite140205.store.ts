import { GrupoCupo, GrupoDatalleCupo, GrupoEmpresa, GrupoFolio } from '../../tramites/140205/model/cancelaciones-certificado.model';
import { Injectable } from '@angular/core';
import { Store } from '@datorama/akita';
import { StoreConfig } from '@datorama/akita';
/**
 * Interfaz que define el estado inicial del trámite 140205.
 * 
 * Esta interfaz contiene todas las propiedades necesarias para gestionar el estado
 * del trámite, incluyendo datos del productor, receptor, transporte, mercancía, entre otros.
 */
export interface Tramite140205State {
  /** 
   * Número del paso activo en el flujo del trámite.
   * 
   * Este número indica en qué paso se encuentra el usuario dentro del proceso de trámite.
   */
  pasoActivo?: number;
  /**
   * Número de la pestaña activa en el flujo del trámite.
   * 
   * Este número indica cuál pestaña está activa actualmente en la interfaz de usuario.
   */
  pestanaActiva: number;
  /**
   * Datos de la empresa.
   * 
   * Esta propiedad almacena la información relacionada con la empresa que realiza el trámite.
   */
  grupoEmpresa:GrupoEmpresa;
  /**
   * Datos del cupo.
   * 
   * Esta propiedad almacena la información relacionada con el cupo del trámite.
   */
  grupoCupo: GrupoCupo;
  /**
   * Datos del detalle del cupo.
   * 
   * Esta propiedad almacena la información relacionada con el detalle del cupo del trámite.
   */
  grupoDatalleCupo:GrupoDatalleCupo;
  /**
   * Datos del folio.
   * 
   * Esta propiedad almacena la información relacionada con el folio del trámite.
   */
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
    pestanaActiva: 1,
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

  /**
   * Actualiza el nombre en el estado del trámite.
   */ 
    public setGrupoEmpresaNombre(nombre: string): void {
      this.update((state) => ({
        ...state,
        grupoEmpresa: {
          ...state.grupoEmpresa,
          nombre,
        },
      }));
}
  /**
   * Actualiza el nombre en el estado del trámite.
   *
   * Este método permite establecer el nombre en el estado del trámite.
   *
   * @param {string} nombre - El nombre a establecer.
   */
  public setGrupoEmpresaPrimerApellido(primerApellido: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        primerApellido,
      },
    }));
  }
  /**
   * Actualiza el segundo apellido en el estado del trámite.
   *
   * Este método permite establecer el segundo apellido en el estado del trámite.
   *
   * @param {string} segundoApellido - El segundo apellido a establecer.
   */
  public setGrupoEmpresaSegundoApellido(segundoApellido: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        segundoApellido,
      },
    }));
  }
  /**
   * Actualiza la actividad económica en el estado del trámite.
   *
   * Este método permite establecer la actividad económica en el estado del trámite.
   *
   * @param {string} actividadEconomica - La actividad económica a establecer.
   */
  public setGrupoEmpresaActividadEconomica(actividadEconomica: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        actividadEconomica,
      },
    }));
  }
  /**
   * Actualiza los datos RFC en el estado del trámite.
   *
   * Este método permite establecer los datos RFC en el estado del trámite.
   *
   * @param {string} datosRfc - Los datos RFC a establecer.
   */
  public setGrupoEmpresaDatosRfc(datosRfc: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        datosRfc,
      },
    }));
  }
  /**
   * Actualiza la clave en el estado del trámite.
   *
   * Este método permite establecer la clave en el estado del trámite.
   *
   * @param {string} clave - La clave a establecer.
   */
  public setGrupoEmpresaClave(clave: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        clave,
      },
    }));
  }

  /**
   * Actualiza el correo en el estado del trámite.
   *
   * Este método permite establecer el correo en el estado del trámite.
   *
   * @param {string} correo - El correo a establecer.
   */
  public setGrupoEmpresaCorreo(correo: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        correo,
      },
    }));
  }
  /**
   * Actualiza la calle en el estado del trámite.
   *
   * Este método permite establecer la calle en el estado del trámite.
   *
   * @param {string} calle - La calle a establecer.
   */
  public setGrupoEmpresaCalle(calle: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        calle,
      },
    }));
  }
  /**
   * Actualiza el número exterior en el estado del trámite.
   *
   * Este método permite establecer el número exterior en el estado del trámite.
   *
   * @param {string} numeroExterior - El número exterior a establecer.
   */
  public setGrupoEmpresaNumeroExterior(numeroExterior: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        numeroExterior,
      },
    }));
  }
  /**
   * Actualiza el número interior en el estado del trámite.
   *
   * Este método permite establecer el número interior en el estado del trámite.
   *
   * @param {string} numeroInterior - El número interior a establecer.
   */
  public setGrupoEmpresaNumeroInterior(numeroInterior: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        numeroInterior,
      },
    }));
  }
  /**
   * Actualiza el código postal en el estado del trámite.
   *
   * Este método permite establecer el código postal en el estado del trámite.
   *
   * @param {string} codigoPostal - El código postal a establecer.
   */
  public setGrupoEmpresaCodigoPostal(codigoPostal: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        codigoPostal,
      },
    }));
  }
  /**
   * Actualiza la colonia en el estado del trámite.
   *
   * Este método permite establecer la colonia en el estado del trámite.
   *
   * @param {string} colonia - La colonia a establecer.
   */
  public setGrupoEmpresaColonia(colonia: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        colonia,
      },
    }));
  }
  /**
   * Actualiza el país en el estado del trámite.
   *
   * Este método permite establecer el país en el estado del trámite.
   *
   * @param {string} pais - El país a establecer.
   */
  public setGrupoEmpresaPais(pais: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        pais,
      },
    }));
  }
  /**
   * Actualiza el estado en el estado del trámite.
   *
   * Este método permite establecer el estado en el estado del trámite.
   *
   * @param {string} estado - El estado a establecer.
   */
  public setGrupoEmpresaEstado(estado: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        estado,
      },
    }));
  }
  /**
   * Actualiza la localidad en el estado del trámite.
   *
   * Este método permite establecer la localidad en el estado del trámite.
   *
   * @param {string} localidad - La localidad a establecer.
   */
  public setGrupoEmpresaLocalidad(localidad: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        localidad,
      },
    }));
  }
  /**
   * Actualiza el teléfono en el estado del trámite.
   *
   * Este método permite establecer el teléfono en el estado del trámite.
   *
   * @param {string} telefono - El teléfono a establecer.
   */
  public setGrupoEmpresaTelefono(telefono: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        telefono,
      },
    }));
  }
  /**
   * Actualiza el municipio en el estado del trámite.
   *
   * Este método permite establecer el municipio en el estado del trámite.
   *
   * @param {string} municipio - El municipio a establecer.
   */
  public setGrupoEmpresaMunicipio(municipio: string): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa: {
        ...state.grupoEmpresa,
        municipio,
      },
    }));
  }

  /**
   * Actualiza el aduanero en el estado del trámite.
   *
   * Este método permite establecer el aduanero en el estado del trámite.
   *
   * @param {string} aduanero - El aduanero a establecer.
   */
  public setGrupoCupoAduanero(aduanero: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        aduanero,
      },
    }));
  }
  /**
   * Actualiza la clasificación del subproducto en el estado del trámite.
   *
   * Este método permite establecer la clasificación del subproducto en el estado del trámite.
   *
   * @param {string} clasificacionSubproducto - La clasificación del subproducto a establecer.
   */
  public setGrupoCupoMecanismo(mecanismo: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        mecanismo,
      },
    }));
  }
  /**
   * Actualiza el tratado en el estado del trámite.
   *
   * Este método permite establecer el tratado en el estado del trámite.
   *
   * @param {string} tratado - El tratado a establecer.
   */
  public setGrupoCupoTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        tratado,
      },
    }));
  }
  /**
   * Actualiza el nombre del producto en el estado del trámite.
   *
   * Este método permite establecer el nombre del producto en el estado del trámite.
   *
   * @param {string} nombreProducto - El nombre del producto a establecer.
   */
  public setGrupoCupoNombreProducto(nombreProducto: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        nombreProducto,
      },
    }));
  }
  /**
   * Actualiza el nombre del subproducto en el estado del trámite.
   *
   * Este método permite establecer el nombre del subproducto en el estado del trámite.
   *
   * @param {string} nombreSubproducto - El nombre del subproducto a establecer.
   */
  public setGrupoCupoNombreSubproducto(nombreSubproducto: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        nombreSubproducto,
      },
    }));
  }
  /**
   * Actualiza el federal en el estado del trámite.
   *
   * Este método permite establecer el federal en el estado del trámite.
   *
   * @param {string} federal - El federal a establecer.
   */
  public setGrupoCupoFederal(federal: string): void {
    this.update((state) => ({
      ...state,
      grupoCupo: {
        ...state.grupoCupo,
        federal,
      },
    }));
  }

  /**
   * Actualiza el aduanero en el estado del trámite.
   *
   * Este método permite establecer el aduanero en el estado del trámite.
   *
   * @param {string} aduanero - El aduanero a establecer.
   */
  public setGrupoDatalleCupoAduanero(aduanero: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        aduanero,
      },
    }));
  }
  /**
   * Actualiza la clasificación del subproducto en el estado del trámite.
   *
   * Este método permite establecer la clasificación del subproducto en el estado del trámite.
   *
   * @param {string} clasificacionSubproducto - La clasificación del subproducto a establecer.
   */
  public setGrupoDatalleCupoClasificacionSubproducto(clasificacionSubproducto: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        clasificacionSubproducto,
      },
    }));
  }
  /**
   * Actualiza la descripción del producto en el estado del trámite.
   *
   * Este método permite establecer la descripción del producto en el estado del trámite.
   *
   * @param {string} descripcionProducto - La descripción del producto a establecer.
   */
  public setGrupoDatalleCupoDescripcionProducto(descripcionProducto: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        descripcionProducto,
      },
    }));
  }
  /**
   * Actualiza la unidad en el estado del trámite.
   *
   * Este método permite establecer la unidad en el estado del trámite.
   *
   * @param {string} unidad - La unidad a establecer.
   */
  public setGrupoDatalleCupoUnidad(unidad: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        unidad,
      },
    }));
  }
  /**
   * Actualiza el mecanismo en el estado del trámite.
   *
   * Este método permite establecer el mecanismo en el estado del trámite.
   *
   * @param {string} mecanismo - El mecanismo a establecer.
   */
  public setGrupoDatalleCupoMecanismo(mecanismo: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        mecanismo,
      },
    }));
  }
  /**
   * Actualiza el tratado en el estado del trámite.
   *
   * Este método permite establecer el tratado en el estado del trámite.
   *
   * @param {string} tratado - El tratado a establecer.
   */
  public setGrupoDatalleCupoTratado(tratado: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        tratado,
      },
    }));
  }
  /**
   * Actualiza las arancelarias en el estado del trámite.
   *
   * Este método permite establecer las arancelarias en el estado del trámite.
   *
   * @param {string} arancelarias - Las arancelarias a establecer.
   */
  public setGrupoDatalleCupoArancelarias(arancelarias: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        arancelarias,
      },
    }));
  }
  /**
   * Actualiza los países en el estado del trámite.
   *
   * Este método permite establecer los países en el estado del trámite.
   *
   * @param {string} paises - Los países a establecer.
   */
  public setGrupoDatalleCupoPaises(paises: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        paises,
      },
    }));
  }
  /**
   * Actualiza las observaciones en el estado del trámite.
   *
   * Este método permite establecer las observaciones en el estado del trámite.
   *
   * @param {string} observaciones - Las observaciones a establecer.
   */
  public setGrupoDatalleCupoObservaciones(observaciones: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        observaciones,
      },
    }));
  }
  /**
   * Actualiza los fundamentos en el estado del trámite.
   *
   * Este método permite establecer los fundamentos en el estado del trámite.
   *
   * @param {string} fundamentos - Los fundamentos a establecer.
   */
  public setGrupoDatalleCupoFundamentos(fundamentos: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        fundamentos,
      },
    }));
  }
  /**
   * Actualiza la fecha de fin en el estado del trámite.
   *
   * Este método permite establecer la fecha de fin en el estado del trámite.
   *
   * @param {string} fin - La fecha de fin a establecer.
   */
  public setGrupoDatalleCupoFin(fin: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        fin,
      },
    }));
  }
  /**
   * Actualiza la fecha de inicio en el estado del trámite.
   *
   * Este método permite establecer la fecha de inicio en el estado del trámite.
   *
   * @param {string} inicio - La fecha de inicio a establecer.
   */
  public setGrupoDatalleCupoInicio(inicio: string): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo: {
        ...state.grupoDatalleCupo,
        inicio,
      },
    }));
  }
  /**
   * Actualiza el monto asignado en el estado del trámite.
   *
   * Este método permite establecer el monto asignado en el estado del trámite.
   *
   * @param {string} montoAsignado - El monto asignado a establecer.
   */
  public setGrupoFolioMontoAsignado(montoAsignado: string): void {
    this.update((state) => ({
      ...state,
      grupoFolio: {
        ...state.grupoFolio,
        montoAsignado,
      },
    }));
  }
  /**
   * Actualiza el monto disponible en el estado del trámite.
   *
   * Este método permite establecer el monto disponible en el estado del trámite.
   *
   * @param {string} montoDisponible - El monto disponible a establecer.
   */
  public setGrupoFolioMontoDisponible(montoDisponible: string): void {
    this.update((state) => ({
      ...state,
      grupoFolio: {
        ...state.grupoFolio,
        montoDisponible,
      },
    }));
  }
  /**
   * Actualiza el monto expedido en el estado del trámite.
   *
   * Este método permite establecer el monto expedido en el estado del trámite.
   *
   * @param {string} montoExpedido - El monto expedido a establecer.
   */
  public setGrupoFolioMontoExpedido(montoExpedido: string): void {
    this.update((state) => ({
      ...state,
      grupoFolio: {
        ...state.grupoFolio,
        montoExpedido,
      },
    }));
  }
  /**
   * Actualiza la pestaña activa en el estado del trámite.
   *
   * Este método permite establecer la pestaña activa en el estado del trámite.
   *
   * @param {number} pestanaActiva - El número de la pestaña activa a establecer.
   */
  public setPestanaActiva(pestanaActiva: number): void {
    this.update((state) => ({
      ...state,
      pestanaActiva,
    }));
  }

  /**
   * Actualiza el grupo de empresa en el estado del trámite.
   *
   * Este método permite establecer el grupo de empresa en el estado del trámite.
   *
   * @param {GrupoEmpresa} grupoEmpresa - El grupo de empresa a establecer.
   */
  public setGrupoEmpresa(grupoEmpresa: GrupoEmpresa): void {
    this.update((state) => ({
      ...state,
      grupoEmpresa,
    }));
  }

  /**
   * Actualiza el grupo de cupo en el estado del trámite.
   *
   * Este método permite establecer el grupo de cupo en el estado del trámite.
   *
   * @param {GrupoCupo} grupoCupo - El grupo de cupo a establecer.
   */
  public setGrupoCupo(grupoCupo: GrupoCupo): void {
    this.update((state) => ({
      ...state,
      grupoCupo,
    }));
  }

  /**
   * Actualiza el grupo de detalle de cupo en el estado del trámite.
   *
   * Este método permite establecer el grupo de detalle de cupo en el estado del trámite.
   *
   * @param {GrupoDatalleCupo} grupoDatalleCupo - El grupo de detalle de cupo a establecer.
   */
  public setGrupoDatalleCupo(grupoDatalleCupo: GrupoDatalleCupo): void {
    this.update((state) => ({
      ...state,
      grupoDatalleCupo,
    }));
  }
  /**
   * Actualiza el grupo de folio en el estado del trámite.
   *
   * Este método permite establecer el grupo de folio en el estado del trámite.
   *
   * @param {GrupoFolio} grupoFolio - El grupo de folio a establecer.
   */
  public setGrupoFolio(grupoFolio: GrupoFolio): void {
    this.update((state) => ({
      ...state,
      grupoFolio,
    }));
  }

}
