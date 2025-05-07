import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite5601State {
    //formularioCertificacion
    tieneCertificacion: boolean;
    certificacionEmpresa: string;
    otraCertificacion: string;

    //formulario
    aduana: string;
    seccionAduanera: string;
    tipoOperacion: string;
    fechaOperacion: string;
    motivoDespachoDomicilio: string;
    observaciones: string;
  
    // formularioMercancia
    especificacionesMercancia: string;
    descripcionMercancia: string;
    tipoMoneda: string;
    valorMercancia: string;
  
    // formularioLogistica
    esquemasControlSeguridad: string;
    distanciaRutaTiempos: string;
  
    // formularioUbicacionMercancia
    direccion: string;
    telefono: string;
    distanciaAduana: string;
    referencias: string;
  }
  

  export function createInitialState(): Tramite5601State {
    return {
      tieneCertificacion: false,
      certificacionEmpresa: '',
      otraCertificacion: '',

      //formulario
      aduana: '',
      seccionAduanera: '',
      tipoOperacion: '',
      fechaOperacion: '',
      motivoDespachoDomicilio: '',
      observaciones: '',
  
      // formularioMercancia
      especificacionesMercancia: '',
      descripcionMercancia: '',
      tipoMoneda: '',
      valorMercancia: '',
  
      // formularioLogistica
      esquemasControlSeguridad: '',
      distanciaRutaTiempos: '',
  
      // formularioUbicacionMercancia
      direccion: '',
      telefono: '',
      distanciaAduana: '',
      referencias: ''
    };
  }
  


@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite5601', resettable: true })
export class Tramite5601Store extends Store<Tramite5601State> {

    constructor() {
        super(createInitialState());
    }

    public setTieneCertificacion(tieneCertificacion: boolean): void {
        this.update((state) => ({
            ...state,
            tieneCertificacion,
        }));
    }

    public setCertificacionEmpresa(certificacionEmpresa: string): void {
        this.update((state) => ({
            ...state,
            certificacionEmpresa,
        }));
    }

    public setOtraCertificacion(otraCertificacion: string): void {
        this.update((state) => ({
            ...state,
            otraCertificacion,
        }));
    }

    public setAduana(aduana: string): void {
        this.update((state) => ({
            ...state,
            aduana,
        }));
    }

    public setSeccionAduanera(seccionAduanera: string): void {
        this.update((state) => ({
            ...state,
            seccionAduanera,
        }));
    }
    public setTipoOperacion(tipoOperacion: string): void {
        this.update((state) => ({
            ...state,
            tipoOperacion,
        }));
    }
    public setFechaOperacion(fechaOperacion: string): void {
        this.update((state) => ({
            ...state,
            fechaOperacion,
        }));
    }
    public setMotivoDespachoDomicilio(motivoDespachoDomicilio: string): void {
        this.update((state) => ({
            ...state,
            motivoDespachoDomicilio,
        }));
    }
    public setObservaciones(observaciones: string): void {
        this.update((state) => ({
            ...state,
            observaciones,
        }));
    }

    public setEspecificacionesMercancia(especificacionesMercancia: string): void {
        this.update((state) => ({
          ...state,
          especificacionesMercancia,
        }));
      }
      
      public setDescripcionMercancia(descripcionMercancia: string): void {
        this.update((state) => ({
          ...state,
          descripcionMercancia,
        }));
      }
      
      public setTipoMoneda(tipoMoneda: string): void {
        this.update((state) => ({
          ...state,
          tipoMoneda,
        }));
      }
      
      public setValorMercancia(valorMercancia: string): void {
        this.update((state) => ({
          ...state,
          valorMercancia,
        }));
      }
      
      public setEsquemasControlSeguridad(esquemasControlSeguridad: string): void {
        this.update((state) => ({
          ...state,
          esquemasControlSeguridad,
        }));
      }
      
      public setDistanciaRutaTiempos(distanciaRutaTiempos: string): void {
        this.update((state) => ({
          ...state,
          distanciaRutaTiempos,
        }));
      }
      
      public setDireccion(direccion: string): void {
        this.update((state) => ({
          ...state,
          direccion,
        }));
      }
      
      public setTelefono(telefono: string): void {
        this.update((state) => ({
          ...state,
          telefono,
        }));
      }
      
      public setDistanciaAduana(distanciaAduana: string): void {
        this.update((state) => ({
          ...state,
          distanciaAduana,
        }));
      }
      
      public setReferencias(referencias: string): void {
        this.update((state) => ({
          ...state,
          referencias,
        }));
      }      

}