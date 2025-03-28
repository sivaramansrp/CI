import { camCertificadoStore } from "../estados/cam-certificado.store";
import { Injectable } from "@angular/core";
import { camState } from "../estados/cam-certificado.store";
import { Query } from "@datorama/akita";


/**
 * Query to manage the state of Prosec authorization.
 */
@Injectable({ providedIn: 'root' })
export class camCertificadoQuery extends Query<camState> {

    selectCam$ = this.select((state) => {
        return state;
      });
    
    selectmercanciaTabla$ = this.select((state) => {
    return state.mercanciaTabla;
    });

    formCertificado$ = this.select((state) => {
        return state.formCertificado;
      });

    formDatosCertificado$ = this.select((state) => {
      return state.formDatosCertificado;
    });

    selectFormDatosDelDestinatario$ = this.select((state) => {
      return state.formDatosDelDestinatario;
    });

    selectFormDestinatario$ = this.select((state) => {
      return state.formDestinatario;
    });
    /**
     * Constructor to inject AutorizacionProsecStore.
     * @param store AutorizacionProsecStore instance
     */
    constructor(protected override store: camCertificadoStore) {
        super(store);
    }
}