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

    /**
     * Constructor to inject AutorizacionProsecStore.
     * @param store AutorizacionProsecStore instance
     */
    constructor(protected override store: camCertificadoStore) {
        super(store);
    }
}