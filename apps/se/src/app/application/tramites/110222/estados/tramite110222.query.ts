import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Tramite110222State} from "./tramite110222.store";
import { Tramite110222Store } from "./tramite110222.store";

/**
 * @descripcion
 * Query para gestionar el estado del certificado CAM.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110222Query extends Query<Tramite110222State> {
  /**
   * @descripcion
   * Observable que selecciona el estado completo del certificado.
   */
  selectTramite$ = this.select((state) => {
    return state;
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
   * @descripcion
   * Observable que selecciona los datos del formulario de destinatario.
   */
  selectFormDatosDelDestinatario$ = this.select((state) => {
    return state.formDatosDelDestinatario;
  });

  selectFormExportador$ = this.select((state) => {
    return state.formExportor;
  });

  /**
   * @descripcion
   * Observable que selecciona el formulario de destinatario.
   */
  selectFormDestinatario$ = this.select((state) => {
    return state.formDestinatario;
  });

  /**
   * @descripcion
   * Constructor que inyecta el almacén `camCertificadoStore`.
   * @param store - Instancia de `camCertificadoStore`.
   */
  constructor(protected override store: Tramite110222Store) {
    super(store);
  }
}