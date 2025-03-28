import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 90201
 * @returns Solicitud90201
 */
export interface Solicitud110203State {
  
    tratado: string;
    bloque:string;
    origen: string;
    destino: string;
    expedicion: string;
    vencimiento: string;    
    nombre: string; 
    primer: string; 
    segundo: string; 
    fiscal: string; 
    razon: string;
    calle: string;
    letra: string;
    ciudad: string;
    correo: string; 
    fax: string;     
    telefono: string;  
    medio: string;   
    observaciones: string;   
    precisa: string;   
    presenta: string;
    valorSeleccionado: string | number;
    numeroDeCertificado: string;
    tratadoAcuerdo: string;
    paisBloque: string;
          


}

export function createInitialState(): Solicitud110203State {
  return {
    tratado: '',
    bloque: '',
    origen: '',
    destino:'',
    expedicion:'',
    vencimiento:'',
    nombre: '',
    primer: '',
    segundo:'',
    fiscal:'',
    razon:'',
    calle: '',
    letra: '',
    ciudad:'',
    correo:'',
    fax:'',
    telefono:'',  
    medio:'',
    observaciones:'',
    precisa:'',  
    presenta:'',
     /**
     * Valor predeterminado seleccionado en el control de radio.
     * Representa la opción "Por número de certificado".
     */
     valorSeleccionado: 'Por número de certificado',

     /**
      * Valor inicial vacío para el número de certificado.
      */
     numeroDeCertificado: '',
 
     /**
      * Valor inicial vacío para el tratado o acuerdo.
      */
     tratadoAcuerdo: '',
 
     /**
      * Valor inicial vacío para el país o bloque económico.
      */
     paisBloque: '',  
   
   

  };
}
@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite110203', resettable: true })
  export class Tramite110203Store extends Store<Solicitud110203State> {
    constructor() {
      super(createInitialState());
    }
    
    public setTratado(tratado: string):void {
        this.update((state) => ({
            ...state,
            tratado,
        }));
    }
    public setBloque(bloque: string):void {
        this.update((state) => ({
            ...state,
            bloque,
        }));
    }
    public setOrigen(origen: string):void {
        this.update((state) => ({
            ...state,
            origen,
        }));
    }
    public setDestino(destino: string):void {
        this.update((state) => ({
            ...state,
            destino,
        }));
    }
    public setExpedicion(expedicion: string):void {
        this.update((state) => ({
            ...state,
            expedicion,
        }));
    }
    public setVencimiento(vencimiento: string):void {
        this.update((state) => ({
            ...state,
            vencimiento,
        }));
    }
    public setNombre(nombre: string):void {
        this.update((state) => ({
            ...state,
            nombre,
        }));
    }
    public setPrimer(primer: string):void {
        this.update((state) => ({
            ...state,
            primer,
        }));
    }
    public setSegundo(segundo: string):void {
        this.update((state) => ({
            ...state,
            segundo,
        }));
    }
    public setFiscal(fiscal: string):void {
        this.update((state) => ({
            ...state,
            fiscal,
        }));
    }
    public setRazon(razon: string):void {
        this.update((state) => ({
            ...state,
            razon,
        }));
    }
    public setCalle(calle: string):void {
        this.update((state) => ({
            ...state,
            calle,
        }));
    }
    public setLetra(letra: string):void {
        this.update((state) => ({
            ...state,
            letra,
        }));
    }
    public setCiudad(ciudad: string):void {
        this.update((state) => ({
            ...state,
            ciudad,
        }));
    }
    public setCorreo(correo: string):void {
        this.update((state) => ({
            ...state,
            correo,
        }));
    }
    public setFax(fax: string):void {
        this.update((state) => ({
            ...state,
            fax,
        }));
    }
    public setTelefono(telefono: string):void {
        this.update((state) => ({
            ...state,
            telefono,
        }));
    }
    public setMedio(medio: string):void {
        this.update((state) => ({
            ...state,
            medio,
        }));
    }  
    public setObservaciones(observaciones: string) :void{
        this.update((state) => ({
            ...state,
            observaciones,
        }));
    }
    public setPrecisa(precisa: string):void {
        this.update((state) => ({
            ...state,
            precisa,
        }));
    }
    public setPresenta(presenta: string):void {
        this.update((state) => ({
            ...state,
            presenta,
        }));
    }
      /**
   * Actualiza el valor seleccionado en el control de radio.
   * @param valorSeleccionado El nuevo valor a establecer.
   */
  public setValorSeleccionado(valorSeleccionado: string | number): void {
    this.update((state) => ({
      ...state,
      valorSeleccionado
    }));
  }

  /**
   * Actualiza el número de certificado ingresado por el usuario.
   * @param numeroDeCertificado El nuevo número de certificado a establecer.
   */
  public setNumeroDeCertificado(numeroDeCertificado: string): void {
    this.update((state) => ({
      ...state,
      numeroDeCertificado
    }));
  }

  /**
   * Actualiza el tratado o acuerdo seleccionado por el usuario.
   * @param tratadoAcuerdo El nuevo tratado o acuerdo a establecer.
   */
  public setTratadoAcuerdo(tratadoAcuerdo: string): void {
    this.update((state) => ({
      ...state,
      tratadoAcuerdo
    }));
  }

  /**
   * Actualiza el país o bloque económico seleccionado por el usuario.
   * @param paisBloque El nuevo país o bloque económico a establecer.
   */
  public setPaisBloque(paisBloque: string): void {
    this.update((state) => ({
      ...state,
      paisBloque
    }));
  }

  /**
   * Limpia la selección de la radio
   */
  public limpiarSeleccion(): void {
    this.reset();
  }
   

}