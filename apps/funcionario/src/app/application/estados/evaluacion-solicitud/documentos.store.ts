import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Store, StoreConfig } from '@datorama/akita'

export interface SolicitudDocumentosState {
    documentosSeleccionados: string[];
    solicitudFirma: boolean;
    firmar: boolean;
  }
  
  /**
   * Creación del estado inicial para la interfaz de solicitud de documentos
   * @returns SolicitudDocumentosState
   */
  export function createInitialState(): SolicitudDocumentosState {
    return {
        solicitudFirma: false,
        documentosSeleccionados: [],
        firmar: true
    };
  }

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'DocumentosStates', resettable: true})
export class DocumentosStates extends Store<SolicitudDocumentosState>{
    constructor(){
       super( createInitialState());
    }
    resetStore(){
        this.reset();
    }

    setSolicitudDocumentos( documentosSeleccionados : string[]){
        this.update(state => ({... state, documentosSeleccionados}));
    }

    public limpiarDocumentos() {
        this.reset();
      }
}
