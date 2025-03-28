import { CamState } from "../estados/cam-certificado.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { camCertificadoStore } from "../estados/cam-certificado.store";


/**
 * Query to manage the state of Prosec authorization.
 */
@Injectable({ providedIn: 'root' })
export class camCertificadoQuery extends Query<CamState> {

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