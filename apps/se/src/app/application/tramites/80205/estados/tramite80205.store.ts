import{ Servicio, ServicioInmex, Servicios } from '../models/datos-info.model'; 
import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo} from '@ng-mf/data-access-user';
import { Injectable } from '@angular/core';


export interface AmpliacionServiciosState {
  infoRegistro: Servicios;
  aduanaDeIngreso: Catalogo[];
  datosImmex:Servicio[]; 
  datos :ServicioInmex[];
  aduanaDeIngresoSelecion: Catalogo;
  formaValida: { [key: string]: boolean };
  empresas: ServicioInmex[];
  servicios: Servicio[];
  rfcEmpresa: string ;
  numeroPrograma: string ;
  tiempoPrograma: string ;
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
  datosImmex:[] ,
  datos :[],
  aduanaDeIngresoSelecion: {
    id: -1, 
    descripcion: ''
  },
  formaValida: {
    entidadFederativa: false
  },
    rfcEmpresa: '',
    numeroPrograma: '',
    tiempoPrograma: ''

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
        setFormValida(formaValida: { [key: string]: boolean }) :void {
            this.update(state => {
              const IS_VALID = {...state.formaValida, ...formaValida}
              return {
                ...state,
                formaValida: IS_VALID
              }
            })
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
            setCamposEmpresa(rfcEmpresa: string, numeroPrograma: string, tiempoPrograma: string): void {
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

 
}
