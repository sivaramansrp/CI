import { Injectable } from "@angular/core";
import { PeruState } from "./tramite110205.store";
import { Query } from "@datorama/akita";
import { Tramite110205Store } from "./tramite110205.store";

/**
 * @descripcion
 * Query para gestionar el estado del certificado CAM.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110205Query extends Query<PeruState> {
  /**
   * @descripcion
   * Observable que selecciona el estado completo del certificado.
   */
  selectPeru$ = this.select((state) => {
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
  constructor(protected override store: Tramite110205Store) {
    super(store);
  }
}