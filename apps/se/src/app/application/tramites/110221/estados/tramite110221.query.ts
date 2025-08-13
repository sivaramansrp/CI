import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Tramite110221State} from "./tramite110221.store";
import { Tramite110221Store } from "./tramite110221.store";

/**
 * @descripcion
 * Query para gestionar el estado del certificado CAM.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110221Query extends Query<Tramite110221State> {
  /**
   * @descripcion
   * Observable que selecciona el estado completo del certificado.
   */
  selectTramite$ = this.select((state) => {
    return state;
  });

  /**
   * Selecciona si todos los valores de la forma son válidos.
   * Verifica si todas las propiedades de `formaValida` son `true`.
   * @returns {Observable<boolean>} - Observable que indica si la forma es válida.
   */
  FormaValida$ = this.select((state) => {
    return Object.values(state.formaValida).every(value => value === true);
  });

  /**
   * @descripcion
   * Observable que selecciona la tabla de mercancías del estado.
   */
  selectmercanciaTabla$ = this.select((state) => {
    return state.mercanciaTabla;
  });

  /**
   * @descripcion
   * Observable que selecciona los datos del formulario de certificado.
   */
  formCertificado$ = this.select((state) => {
    return state.formCertificado;
  });

    /**
   * @descripcion
   * Observable que selecciona los datos del formulario de certificado.
   */
    formulario$ = this.select((state) => {
      return state.formulario;
    });

    /**
   * @descripcion
   *  Observable que selecciona los datos del formulario de certificado.
   */ 
    agregarDatosProductorFormulario$ = this.select((state) => {
      return state.agregarDatosProductorFormulario;
    });

  /**
   * @descripcion
   * Observable que selecciona los datos del formulario de datos del certificado.
   */
  formDatosCertificado$ = this.select((state) => {
    return state.formDatosCertificado;
  });

  /**
   * Selecciona todo el estado de la solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * @descripcion
   * Constructor que inyecta el almacén `camCertificadoStore`.
   * @param store - Instancia de `camCertificadoStore`.
   */
  constructor(protected override store: Tramite110221Store) {
    super(store);
  }
}